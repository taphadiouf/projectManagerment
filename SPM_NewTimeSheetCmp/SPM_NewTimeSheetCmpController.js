({
    closeModal: function (component, event, helper) {
        component.set('v.isModal', false);
    },

    addTimeSheet: function (component, event, helper) {

        /*var evt = $A.get('e.c:SPM_IsFormValidEvt');
        evt.fire();*/
        //if (component.get('v.isValidFields') == true) {
        var timeSheet = component.get('v.timeSheet');
        var action = component.get("c.createTimeSheet");
        action.setParams({ timeSheet: timeSheet });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var timeSheetEvt = $A.get("e.c:SPM_NewTimeSheetCreatedEvt");                  
                    timeSheetEvt.setParam('timeSheet',customResponse.data);
                    timeSheetEvt.fire();
                    //helper.showToast('Success', 'Success', 'The record has been created successfully');
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

    doInit: function (component, event, helper) {
        var recordId = component.get('v.recordId');
        if (recordId != null) {
            var action = component.get("c.getTimeSheetById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.timeSheet', customResponse.data);
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

    updateTimeSheet: function (component, event, helper) {
        var timeSheets = [component.get('v.timeSheet')];
        var action = component.get("c.updateTimeSheet");
        action.setParams({ timeSheets: timeSheets });
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