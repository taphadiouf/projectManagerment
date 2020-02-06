({
    closeModel : function(component, event, helper) {
        component.set('v.isModal',false);
    },

    assignProject : function(component, event, helper) {
        var customerId = component.get('v.customerId');
        console.log('l id du customer '+customerId)
        var project = component.get('v.project');
        project.CustomerId__c = customerId;
        var projects = [project];
        var action = component.get("c.updateProject");
        action.setParams({ projects: projects });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    helper.showToast('Success', 'Success', 'The record has been updated successfully');
                } else {
                    helper.showToast('Error', 'error', customResponse.messages);
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
        component.set("v.isModal", false);
        $A.enqueueAction(action);
    },

    doInit : function(component, event, helper) {
        helper.getAllProjects(component);
    }
})