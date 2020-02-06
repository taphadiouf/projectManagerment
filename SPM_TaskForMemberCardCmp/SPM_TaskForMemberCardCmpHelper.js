({
    getTaskByMemberId: function (component, event, helper) {
        var memberId = component.get('v.recordId');
        var toDo = component.get('v.allItemsToDo');
        var inProgress = component.get('v.allItemsInProgress');
        var done = component.get('v.allItemsDone');
        console.log('memberId ###'+memberId);
        var action = component.get('c.getTaskByMembersHasProjectId');
        action.setParams({ id: memberId });
        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var tasks = response.getReturnValue().data;
                tasks.forEach(task =>{
                    if(task.Task__r.Status == 'Not Started Yet'){
                        toDo.push(task);
                    }
                    else if(task.Task__r.Status == 'In Progress'){
                        inProgress.push(task);
                    }
                    else if(task.Task__r.Status == 'Completed'){
                        done.push(task);
                    }
                })
                
                component.set('v.allItemsToDo', toDo);
                component.set('v.allItemsInProgress', inProgress);
                component.set('v.allItemsDone', done);
                component.set('v.isVisible', false);
                component.set('v.dataNotNull', true);
                console.log('tasks #### ' + JSON.stringify(component.get('v.allItemsToDo')));

            }
             else {
                for (var message in customResponse.messages) {
                    console.log(message);
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
            }

        });
        $A.enqueueAction(action);
    }
})