({
    addAbsence: function (component, event, helper) {

        var evt = $A.get('e.c:SPM_IsFormValidEvt');
        evt.fire();
        if (component.get('v.isValidFields') == true) {
            var absent= component.get('v.absence');
            //absent.SuppliedCompany = 'requested';
            var action = component.get("c.createAbsence");
            action.setParams({'absence': absent });
            action.setCallback(this, function (response) {
                var state = response.getState();
                console.log('response',response.getReturnValue());
                if (state == "SUCCESS") {
                    console.log(response.getReturnValue().data);
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        absent.SuppliedPhone = '',
                        absent.SuppliedName = '',
                        absent.CreatedDate = '',
                        absent.Subject = '',
                        absent.SuppliedCompany = '',
                        absent.EndDate__c = '',
                        absent.Note__c = ''
                        component.set('v.absence', absent);
                        helper.showToast('Success', 'Success', 'The record has been created successfully');
                        $A.get('e.force:refreshView').fire();
                    } else {
                        //helper.showToast('Error', 'error', customResponse.messages);
                        for (var message in customResponse.messages) {
                            console.log(message);
                        }
                        console.log("false");
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
        }
    },


    /*openModalAbsence : function(component,evt){
        var evt = $A.get("e.c:SPM_AbsenceEvt");
        evt.setParam("isModal","true");
        evt.fire();
    },*/

    openModalAbsence: function (component, evt) {
        var modal = component.get("v.isModal");
        modal = true;
        component.set('v.isModal', modal);
    },

    doInit: function (component, event, helper) {
        var recordId = component.get('v.recordId');
        if (recordId != null) {
            var action = component.get("c.getAbsenceById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.absence', customResponse.data);
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
                                           } else {
 }
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
        }
    },

    updateAbsence: function (component, event, helper) {
        var absents = [component.get('v.absence')];
        var action = component.get("c.updateAbsences");
        action.setParams({ absences: absents });
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

    openModal: function (component, event, helper) {
        component.set('v.isModalOpened', true);
    },
    closeModal: function (component, event, helper) {
        component.set('v.isModal', false);
    }


})