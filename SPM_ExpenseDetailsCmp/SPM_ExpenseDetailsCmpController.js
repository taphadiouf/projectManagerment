({
    doInit: function (component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        var id = myPageRef.state.c__Id;
        component.set("v.recordId", id);
        helper.showDetail(component);
    },
    goBack: function(component, event, helper){
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListExpenseCmp',
            },
            state: {
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);
    },

    handleUpdateStatus: function(component){
        var exp = component.get('v.expense');
        var action = component.get("c.updateStatus");
            action.setParams({ expense: exp });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log('expense'+JSON.stringify(customResponse.data));
                        component.set('v.expense', customResponse.data);
                        component.set('v.isSubmitted', true);
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
    }
    
})