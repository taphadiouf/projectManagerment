({
    showRowDetails: function (component,event,row) {
        var expense = [JSON.parse(JSON.stringify(row))];
        component.set('v.recordId',expense[0].Id);
        var recordId = component.get('v.recordId');
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ExpenseDetailsCmp',
            },
            state: {
                "c__Id": recordId,
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);   
    },

    
    deleteExpense: function (component, row) {
        var action = component.get("c.deleteExpenses");
        var expense = [JSON.parse(JSON.stringify(row))];
        console.log(expense[0]);
        action.setParams({ expense: expense });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "The record has been deleted successfully.",
                        "type": "Success"
                    });
                    toastEvent.fire();
                    $A.get('e.force:refreshView').fire();
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

  

    editExpense: function(component, row){
    var expense = JSON.parse(JSON.stringify(row));
        console.log('expense id '+expense.Id);
        component.set('v.isModal',true);
        component.set('v.isModalOpened',true);
        component.set('v.recordId',expense.Id);
        var action = component.get("c.getExpenseById");
            action.setParams({ id: expense.Id });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(' expenseListJs '+JSON.stringify(customResponse.data));
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
            $A.enqueueAction(action);
    }
})