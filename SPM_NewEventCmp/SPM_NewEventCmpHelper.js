({
    /**
     * called method on the initialization of the component
     * this method call for apex methods and initialize datas
     * @param {*} component 
     */
    doInit : function(component) {
        var timeSheet = component.get('v.timeSheet');
        var times = Array();
        for(var i=8; i<21; i++){
            times.push(
                i>9?i+':00':'0'+i+':00'
            );
        }
        component.set('v.times',times);
        if(timeSheet === null){
            component.set('v.timeSheet',{'Status':'Draft','startTime__c':'08:00','endTime__c':'09:00','ActivatedDate':new Date(),'StartDate':new Date(),'Task__c':'','AccountId':''});
        }
        else{
            timeSheet = JSON.parse(JSON.stringify(timeSheet));
            if(timeSheet.startTime__c != null){
                this.incrementEndTimeValue(component);
            }
        }
        /**
         * apex method that returns all projects where the connected user is member
         */
        var action = component.get('c.getProjectsByActualMemberHasProject');
        /**
         * apex method that returns all activities
         */
        var getAllActivities = component.get('c.getAllActivities');
        /**
         * apex method that returns all taks asigned to the connected user
         */
        var getCurrentUserTasks = component.get('c.getCurrentUserTasks');
        getCurrentUserTasks.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var value = response.getReturnValue();
                if(!value.hasError){
                    /**
                     * all assigned tasks for in all projects
                     */
                    var allAssignedTasks = value.data;
                    component.set('v.allAssignedTasks', allAssignedTasks);
                }
                else if(state === 'INCOMPLETE'){

                }
                else if(state === 'ERROR'){
                    console.log(response.getError());
                }
            }
        });
        getAllActivities.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var value = response.getReturnValue();
                if(!value.hasError){
                    var activities = value.data;
                    component.set('v.activities', activities);
                    if(timeSheet != null && timeSheet.Task__c != null){
                        this.setTaskActivities(component, timeSheet.Task__c);
                    }
                }
                else if(state === 'INCOMPLETE'){

                }
                else if(state === 'ERROR'){
                    console.log(response.getError());
                }
            }
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var value = response.getReturnValue();
                if(!value.hasError){
                    var projects = value.data;
                    component.set('v.projects', projects);
                    var selectedProjectId = component.get('v.timeSheet.AccountId');
                    if(selectedProjectId != '')
                        this.setProjectTasks(component, selectedProjectId);
                }
                else if(state === 'INCOMPLETE'){
                    this.showToast('ERROR','Impossible to get datas from the server. Check for the internet and refresh the page please','error');
                }
                else if(state === 'ERROR'){
                    this.showToast('ERROR','Impossible to get datas from the server. Check for the internet and refresh the page please','error');
                    console.log(response.getErrors());
                }
            }
        });
        $A.enqueueAction(getCurrentUserTasks);
        $A.enqueueAction(getAllActivities);
        $A.enqueueAction(action);

    },
    /**
     * 
     * @param {*} component 
     */
    incrementEndTimeValue : function(component){
        var startTime = component.get('v.timeSheet.startTime__c');
        var endTime = component.get('v.timeSheet.endTime__c');
        if(endTime<=startTime){
            var endHour = Number(startTime.split(':')[0])+1;
            var endTime = endHour>9?endHour+':00':'0'+endHour+':00';
            component.set('v.timeSheet.endTime__c',endTime);
        }
    },
    /**
     * 
     * @param {*} component 
     * @param {*} selectedProjectId 
     */
    setProjectTasks : function(component, selectedProjectId){
        var projects = component.get('v.projects');
        var allAssignedTasks = component.get('v.allAssignedTasks');
        var tasks = Array();
        projects.forEach(project => {
            if(project.Id === selectedProjectId){
                if(project.Assets != undefined){
                    project.Assets.forEach(task => {
                        allAssignedTasks.forEach(assignedTask => {
                            if(assignedTask.Id === task.Id){
                                tasks.push(task);
                            }
                        });
                    });
                }
            }
        });
        // var selectedTastkId = component.get('v.timeSheet.Task__c');
        // if(selectedTastkId == ''){
        //     selectedTastkId = tasks[0] != undefined ? tasks[0].Id:'';
        //     this.setTaskActivities(component, selectedTastkId);
        // }
        // component.set('v.timeSheet.Task__c',selectedTastkId);
        component.set('v.tasks', tasks);
    },
    /**
     * 
     * @param {*} component 
     * @param {*} selectedTaskId 
     */
    setTaskActivities : function(component, selectedTaskId){
        var activities = component.get('v.activities');
        var options = Array();
        activities.forEach(activity => {
            if(activity.AssetId === selectedTaskId){
                options.push({
                    label:activity.Subject,
                    value:activity.Subject
                });
            }
        });
        component.set('v.options', options);
    },
    /**
     * 
     * @param {*} component 
     */
    saveTimeSheet : function(component){
        var timeSheet = component.get("v.timeSheet");
        var actionType = component.get("v.action");
        var action = component.get("c."+actionType);
        var date = new Date(0);
        var startTime = component.find('startTime').get('v.value');
        var endTime = component.find('endTime').get('v.value');
        var startHrs = Number((startTime.split(':'))[0]),
            endHrs = Number((endTime.split(':'))[0]);
        var nbHrs = endHrs-startHrs;
        date.setHours(startHrs);
        timeSheet.startTime__c = date.getTime();
        date.setHours(endHrs);
        timeSheet.endTime__c = date.getTime();
        timeSheet = JSON.parse(JSON.stringify(timeSheet));
        timeSheet.number_hourses__c = nbHrs;
        if(actionType === 'updateTimeSheets'){
            action.setParam('timeSheets', new Array(timeSheet));
        }
        else{
            action.setParam('timeSheet', timeSheet);
        }
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                var value = response.getReturnValue();
                if(!value.hasError){
                    var event = component.getEvent('timeSheetSaved');
                    event.fire();
                    component.set('v.createNewEvent', false);
                    //this.showToast("success","Timesheet saved successfully","success");
                }
            }
            else if(state === 'INCOMPLETE'){
                this.showToast("incomplete","incomplete","error");
            }
            else if(state === 'ERROR'){
                //this.showToast("failed",value.message,"error");
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    /**
     * display a toast
     * @param {*} title the title of the toast
     * @param {*} message the message to display in the toast
     */
    showToast : function(title, message, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type" : type
        });
        toastEvent.fire();
    }
})