({
    closeModal: function (component, event, helper) {
        component.set('v.isModal', false);
    },

    addProgram: function (component, event, helper) {

        /*var evt = $A.get('e.c:SPM_IsFormValidEvt');
        evt.fire();*/
        //if (component.get('v.isValidFields') == true) {
        var program = component.get('v.program');
        var action = component.get("c.createProgram");
        action.setParams({ program: program });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('program '+response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var programEvt = $A.get("e.c:SPM_NewProgramCreatedEvt");                  
                    programEvt.setParam('programs',customResponse.data);
                    programEvt.fire();
                    helper.showToast('Success', 'Success', 'The record has been created successfully');
                    $A.get('e.force:refreshView').fire();
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
        //}
    },

    updatePrograms: function (component, event, helper) {
        var programs = [component.get('v.program')];
        var action = component.get("c.updateProgram");
        action.setParams({ programs: programs });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    helper.showToast('Success', 'Success', 'The record has been updated successfully');
                    $A.get('e.force:refreshView').fire();
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
})