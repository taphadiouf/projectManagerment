({
    doInit : function(component, event, helper) {
        var recordId = component.get('v.recordId');
        if (recordId != null) {
            var action = component.get("c.getCustomerById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.customer', customResponse.data);
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

    addCustomer: function (component, event, helper) {

        var evt = $A.get('e.c:SPM_IsFormValidEvt');
        evt.fire();
        if (component.get('v.isValidFields') == true) {
        var customer = component.get('v.customer');
        var action = component.get("c.createCustomer");
        action.setParams({ customer: customer});
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var evt = $A.get('e.c:SPM_NewCustomerCreatedEvt');
                    evt.setParams({'customer': customer});
                    evt.fire();
                    customer.Name = '';
                    customer.MailingCity = '';
                    customer.MailingState = '';
                    customer.MailingCountry = '';
                    customer.Title = '';
                    customer.Department ='';
                    customer.AssistantName ='';
                    component.set('v.customer',customer);
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
        }
    },

    updateCustomers: function (component, event, helper) {
        var customers = [component.get('v.customer')];
        var action = component.get("c.updateCustomer");
        action.setParams({ customers: customers });
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

    closeModal: function (component, event, helper) {
        component.set('v.isModal', false);
    }
})