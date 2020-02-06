({
    openModal: function (component, evt) {
        var modal = component.get("v.isModal");
        modal = true;
        component.set('v.isModal', modal);
    },
    
    addExpense: function (component, event, helper) {

        var evt = $A.get('e.c:SPM_IsFormValidEvt');
        evt.fire();
        if (component.get('v.isValidFields') == true) {
            var expense = component.get('v.expense');
            console.log('expense ' + JSON.stringify(expense));
            var action = component.get("c.createExpense");
            action.setParams({ expense: expense });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log(response.getReturnValue().data);
                    var customResponse = response.getReturnValue();
                    var expenseSaved = customResponse.data;
                    if (customResponse.hasError == false) {
                            expense.AccountId = '',
                            expense.Member_has_project__c = '',
                            expense.amount__c = '',
                            expense.SuppliedCompany = '',
                            expense.Origin = '',
                            expense.SuppliedName = '',
                            expense.SuppliedPhone = '',
                            expense.SPM_Description__c = '',
                            expense.CreatedDate = '',
                            expense.Type = ''
                        component.set('v.expense', expenseSaved);
                        var evt = component.getEvent('SPM_NewExpenseCreatedEvt');
                        evt.setParams({ 'expense': expenseSaved });
                        evt.fire();
                        helper.showToast('Success', 'Success', 'The record has been created successfully');
                    } else {
                        // helper.showToast('Error', 'error', customResponse.messages);
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

    updateExpense: function (component, event, helper) {
        var expense = component.get('v.expense');
        console.log('expense for updating' + JSON.stringify(expense));
        var action = component.get("c.updateExp");
        action.setParams({ expense: expense });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('expense updated ' + response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    helper.showToast('Success', 'Success', 'The record has been updated successfully');
                    $A.get('e.force:refreshView').fire();
                    console.log('expense updated ' + JSON.stringify(response.getReturnValue().data));
                } else {
                    // helper.showToast('Error', 'error', customResponse.messages);
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
        component.set('v.isModal', false);
        $A.enqueueAction(action);

    },

    

    doInit: function (component, event, helper) {
        var recordId = component.get('v.recordId');
        if (recordId != null) {
            var action = component.get("c.getExpenseById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.expense', customResponse.data);
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
            component.set('v.isModal', false);
            $A.enqueueAction(action);
        }
    },

    closeModal: function (component, event, helper) {
        component.set('v.isModal', false);
    }
})