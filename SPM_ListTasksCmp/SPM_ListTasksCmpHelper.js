({
    
    deleteTasks: function (component, row) {
        var action = component.get("c.deleteTask");
        var tasksRow = [JSON.parse(JSON.stringify(row))];
        console.log(tasksRow[0]);
        action.setParams({ tasks: tasksRow });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var tasks = component.get('v.numberOfTasksToDisplay');
                    var taksAfterDelete = tasks.filter(task => task.Id != tasksRow[0].Id);
                    component.set('v.numberOfTasksToDisplay', taksAfterDelete);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "The record has been deleted successfully.",
                        "type": "Success"
                    });
                    toastEvent.fire();
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

    showRowDetails: function (component,event,row) {
        var task = [JSON.parse(JSON.stringify(row))];
        console.log(task[0].Id)
        component.set('v.taskId',task[0].Id);
        var taskId = component.get('v.taskId');
        var recordId = component.get('v.recordId');
        /*var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_TaskDetailsCmp',
            },
            state: {
                "c__Id": taskId,
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);*/
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
        "recordId": task[0].Id,
        "slideDevName": "related"
        });
        navEvt.fire();
        
    },
    
    editTasks: function(component, row){
        var taskRow = JSON.parse(JSON.stringify(row));
        component.set('v.isModal',true);
        component.set('v.taskId',taskRow.Id);
        var action = component.get("c.getTaskById");
            action.setParams({ id: taskRow.Id });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.task', customResponse.data);
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

    assignMember: function(component, row){
        var taskRow = JSON.parse(JSON.stringify(row));
        component.set('v.taskId', taskRow.Id);
        component.set('v.projectId', taskRow.Account.Id);
        console.log('project id '+ taskRow.Account.Id);
        component.set('v.isModalAssign',true);
    },

    getTasks: function(component, pageSize){
    var action = component.get("c.getAllTasks");

        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var tasks = response.getReturnValue().data;
                console.log(tasks);
                tasks.forEach(task => {
                    task.AccountId = task.Account.Name;
                });
                component.set('v.tasks', tasks);
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.tasks").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfTasksToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {

                    for (var i = 0; i < component.get('v.totalSize'); i++) {

                        numberOfTasksToDisplay.push(tasks[i]);

                    }
                }else{
                    for (var i = 0; i < pageSize; i++) {

                        numberOfTasksToDisplay.push(tasks[i]);

                    }
                }

                component.set('v.numberOfTasksToDisplay', numberOfTasksToDisplay);

                //console.log(numberOfTasksToDisplay);

            }        /*
                    var res = Description.replace(/<[^>]*>/g, '');
                    component.set('v.Description', res);*/

        });

        $A.enqueueAction(action);
    },

    getTasksByProjectId: function(component, pageSize, projectId){
    var action = component.get("c.getAllTaskByProjectId");
        action.setParams({projectId: projectId});
        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var tasks = response.getReturnValue().data;
                console.log('les taches du projets '+tasks);
                tasks.forEach(task => {
                    task.AccountId = task.Account.Name;
                });
                component.set('v.tasks', tasks);
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.tasks").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfTasksToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {

                    for (var i = 0; i < component.get('v.totalSize'); i++) {

                        numberOfTasksToDisplay.push(tasks[i]);

                    }
                }else{
                    for (var i = 0; i < pageSize; i++) {

                        numberOfTasksToDisplay.push(tasks[i]);

                    }
                }

                component.set('v.numberOfTasksToDisplay', numberOfTasksToDisplay);

                //console.log(numberOfTasksToDisplay);

            }

        });

        $A.enqueueAction(action);
    }
                    
                     
})