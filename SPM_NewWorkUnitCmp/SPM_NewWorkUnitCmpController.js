({
    doInit: function (component, event, helper) {
        var recordId = component.get('v.recordId');
        if (recordId != null) {
            var action = component.get("c.getWorkUnitById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.workUnit', customResponse.data);
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
        }
    },

    openModalWorkUnit: function(component, event, helper) {
        
        // Set isModalOpen attribute to true
        if(event.getParam("workUnits")=="true")
            component.set("v.isModal", true);
        
        
    },
    
    closeModalWorkUnit: function(component, event, helper) {
        // Set isModalOpen attribute to false  
            
            component.set("v.isModal", false);
    },
       
    addWorkUnit : function(component, event, helper){
        var workUnits=[component.get('v.workUnit')];
        var action = component.get("c.createWorkUnit");
        action.setParams({workUnit : workUnits });
        action.setCallback(this, function(response) {
             var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError == false){
                    var workUnitEvt = $A.get("e.c:SPM_NewWorkUnitCreatedEvt");                  
                    workUnitEvt.setParam('workUnits',customResponse.data);
                    workUnitEvt.fire();
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
    },

    updateWorkUnit: function (component, event, helper) {
        var workUnits = [component.get('v.workUnit')];
        var action = component.get("c.updateWorkUnit");
        action.setParams({ workUnit: workUnits });
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

    openModal: function (component, event, helper) {
        component.set('v.isModalOpened', true);
    },
    closeModal: function (component, event, helper) {
        component.set('v.isModal', false);
    }

})