({
    getTasksByProjectId: function(component, projectId){
        var taskObject = {
            'AssetId':'',
            'Id': '',
            'Subject':'',
            'ActivityCompleted__c':false
        };
        
        var action = component.get("c.getCurrentUserTasks");
            action.setCallback(this, function (response) {
    
                var state = response.getState();
    
                if (component.isValid() && state === "SUCCESS") {
                    var tasks = response.getReturnValue().data;
                    tasks.forEach(task => {
                        if(task.Link__c){
                            var str  = task.Link__c.split(" ");
                            var taille  = str.length;
                            var p = str[0], 
                            n = str[taille-1];

                            task.assignMember = p[0]+n[0];
                        }else{
                            task.assignMember = '';
                        }
                        if(!task.hasOwnProperty('Cases')){
                            task.Cases = [];
                        }else{
                            var i=0, numberActivityChecked = 0;
                            for(i = 0; i<task.Cases.length; i++){
                                if(task.Cases[i].hasOwnProperty('ActivityCompleted__c')){
                                    if(task.Cases[i].ActivityCompleted__c){
                                        numberActivityChecked += 1;
                                    }
                                }
                            }
                            task.numberActivityChecked = numberActivityChecked;
                        }
                        if(task.hasOwnProperty('Description')){
                        task.Description=task.Description.replace(/(<([^>]+)>)/ig,"");
                        //console.log('replace test '+task.Description.replace(/(<([^>]+)>)/ig,""))
                        }
                        if(!task.hasOwnProperty('Link__c')){
                            task.Link__c='';
                        }
                    });
                    console.log('les taches du projets '+JSON.stringify(tasks));
                    component.set('v.tasks',tasks);
                    var tasksNotStarted = tasks.filter((task) =>task.Status.includes('Not Started Yet') );
                    component.set('v.tasksNotStarted',tasksNotStarted);
                    var tasksStarted = tasks.filter((task) =>task.Status.includes('In Progress') );
                    component.set('v.tasksStarted',tasksStarted);
                    var tasksTested = tasks.filter((task) =>task.Status.includes('Tested') );
                    component.set('v.tasksTested',tasksTested);
                    var tasksDone = tasks.filter((task) =>task.Status.includes('Done') );
                    component.set('v.tasksDone',tasksDone);
                }
    
            });
    
            $A.enqueueAction(action);
        },

        displayTaskByProject: function(component){
            var allTask = component.get('v.tasks');
            var tasks = allTask.filter((task) =>task.AccountId.includes(component.get('v.projectId')) );
            var tasksNotStarted = tasks.filter((task) =>task.Status.includes('Not Started Yet') );
            component.set('v.tasksNotStarted',tasksNotStarted);
            var tasksStarted = tasks.filter((task) =>task.Status.includes('In Progress') );
            component.set('v.tasksStarted',tasksStarted);
            var tasksTested = tasks.filter((task) =>task.Status.includes('Tested') );
            component.set('v.tasksTested',tasksTested);
            var tasksDone = tasks.filter((task) =>task.Status.includes('Done') );
            component.set('v.tasksDone',tasksDone);
            component.set('v.isDisplayProject',false);
        },

        updateListTaskHelper:function(component,event){
            if(event.getParam('isUpdate')){
                console.log('------------icici---------')
                this.getTasksByProjectId(component, component.get('v.recordId'));
                }else{
                var newTask = event.getParam('newTask');
                console.log('task created ::::: '+JSON.stringify(newTask));
                if(newTask.Status==='Not Started Yet'){
                    var tasksNotStarted = component.get('v.tasksNotStarted');
                    tasksNotStarted.push(newTask);
                    component.set('v.tasksNotStarted',tasksNotStarted);
                }else if(newTask.Status==='In Progress'){
                    var tasksStarted = component.get('v.tasksStarted');
                    tasksStarted.push(newTask);
                    component.set('v.tasksStarted',tasksStarted);
                }else if(newTask.Status==='Tested'){
                    var tasksTested = component.get('v.tasksTested');
                    tasksTested.push(newTask);
                    component.set('v.tasksTested',tasksTested);
                }else if(newTask.Status==='Done'){
                    var tasksDone = component.get('v.tasksDone');
                    tasksDone.push(newTask);
                    component.set('v.tasksDone',tasksDone);
                }
            }
        },
        updateListTasksHelper:function(component,event){
                var taskDeleted = event.getParam('taskDeleted');
                console.log('task deleted ::::: '+JSON.stringify(taskDeleted));
                if(taskDeleted.Status==='Not Started Yet'){
                    var tasksNotStarted = component.get('v.tasksNotStarted');
                    tasksNotStarted = tasksNotStarted.filter(task=>task.Id != taskDeleted.Id);
                    component.set('v.tasksNotStarted',tasksNotStarted);
                }else if(taskDeleted.Status==='In Progress'){
                    var tasksStarted = component.get('v.tasksStarted');
                    tasksStarted = tasksStarted.filter(task=>task.Id != taskDeleted.Id);
                    component.set('v.tasksStarted',tasksStarted);
                }else if(taskDeleted.Status==='Tested'){
                    var tasksTested = component.get('v.tasksTested');
                    tasksTested = tasksTested.filter(task=>task.Id != taskDeleted.Id);
                    component.set('v.tasksTested',tasksTested);
                }else if(taskDeleted.Status==='Done'){
                    var tasksDone = component.get('v.tasksDone');
                    tasksDone = tasksDone.filter(task=>task.Id != taskDeleted.Id);
                    component.set('v.tasksDone',tasksDone);
                }
        } 
})