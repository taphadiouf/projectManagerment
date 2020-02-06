({
    closeModelOrgUnit: function(component, event, helper) {
        // Set isModalOpen attribute to false  
            
            component.set("v.isModal", false);
    },

    assign : function(component,event,helper){
        var memberHasTask = component.get('v.memberHasTask');
        if(component.get('v.taskId') != ''){
            memberHasTask.Task__c = component.get('v.taskId');
        }
        if(component.get('v.memberHasProjectId') != ''){
            memberHasTask.MemberHasProject__c = component.get('v.memberHasProjectId');
        }
        var membersHasTask=memberHasTask;
        var action = component.get("c.assignMemberTask");
        action.setParams({memberHasProjectHasTask : memberHasTask });
        action.setCallback(this, function(response) {
             var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                console.log('################# '+ JSON.stringify(customResponse.data));
                console.log('################# Tasks'+ JSON.stringify(customResponse.updateTasks));
                if(customResponse.hasError == false){
                    component.set('v.picture',customResponse.updateTasks[0].picture__c);
                    helper.showToast(
                        "Success",
                        "Success",
                        "The record has been created successfully"
                      );
                } else {
                    for(var message in customResponse.messages){
                        console.log(message);
                    }
                }
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
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
        component.set("v.isModal", false);
        $A.enqueueAction(action);
    }
})