({
	getAllActivitiesByTask: function(component,taskId){
        var action = component.get("c.getAllActivitiesByTaskId");
        action.setParams({taskId: taskId});
        action.setCallback(this, function (response) {
            
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS") {
                var activities = response.getReturnValue().data;
                component.set('v.activities',activities);            }
            
        });
        
        $A.enqueueAction(action);
        
    },

    updateListActivitiesHelper:function(component,event){
        var newActivity = event.getParam('newActivity');
        var ActivityUpdated = event.getParam('ActivityUpdated');
        var task = component.get('v.task');
        if(!event.getParam('isUpdate')){
            //var activities = component.get('v.activities');
            delete newActivity.SuppliedName;
            delete newActivity.RecordTypeId;
            console.log('taille list activities '+task.Cases.length)
            console.log('new Activity '+JSON.stringify(newActivity));
            if(!task.Cases.length){
                task.Cases = [newActivity];
            }else{
                task.Cases.push(newActivity);
            } 
            //activities.push(newActivity);
            component.set('v.task',task);
            console.log('activities '+activities)
            console.log('ici');
            //component.set('v.activities',activities);
        }else{
            var activitiesAfterUpdate = task.Cases.filter(activity=>activity.Id != ActivityUpdated.Id);
            activitiesAfterUpdate.push(ActivityUpdated);
            task.Cases = activitiesAfterUpdate;
            component.set('v.task',task);
        }
    },

    deleteActivity: function (component, row) {
        var action = component.get("c.deleteActivities");
        var activitiesRow = [row];
        console.log(activitiesRow[0]);
        action.setParams({ activities: activitiesRow });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "The record has been deleted successfully.",
                        "type": "Success"
                    });
                    toastEvent.fire();
                    var task = component.get('v.task');
                    var activities = task.Cases;  
                    var activitiesAfterDelete = activities.filter(activity=>activity.Id != row.Id);
                    task.Cases = activitiesAfterDelete;
                    component.set('v.task',task);
                }  else {
                    for (var message in customResponse.messages) {
                        console.log(message);
                    }
                }
            }
            else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);

    },

    

    editActivity: function(component, activity){
        component.set('v.isModal',true);
        component.set('v.recordId',activity.Id);
        var action = component.get("c.getActivityById");
            action.setParams({ id: activity.Id });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.activity', customResponse.data);
                    } else {
                        for (var message in customResponse.messages) {
                            console.log(message);
                        }
                    }
                }
                else {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " +
                                errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
    },
        
    editTasks: function(component, task){
        if(task.hasOwnProperty('Account')){
            delete task.Account;
        }
        if(task.hasOwnProperty('assignMember')){
            delete task.assignMember;
        }
        if(task.hasOwnProperty('Cases')){
            delete task.Cases;
        }
        if(task.hasOwnProperty('numberActivityChecked')){
            delete task.numberActivityChecked;
        }
        var tasks = [task];
        console.log('task to update '+JSON.stringify(tasks))
        var action = component.get("c.updateTask");
        action.setParams({ tasks: tasks });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                }
            }
        });
        $A.enqueueAction(action);
    },
 
    editActivities: function(component, activities,task){
        var action = component.get("c.updateActivities");
            action.setParams({ activities: activities });
            action.setCallback(this, function(response) {
              var state = response.getState();
              if (state === "SUCCESS") {
                console.log(response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    this.editTasks(component,task);
                }
                console.log('update success '+customResponse.data)
              } 
            });
            $A.enqueueAction(action);
    }
        
})