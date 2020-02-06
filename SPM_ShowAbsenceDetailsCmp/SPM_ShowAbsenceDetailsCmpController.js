({
    doInit: function (component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        var id = myPageRef.state.c__Id;
        //absenceSelected = myPageRef.state.c__absence;
        component.set("v.recordId", id);
        helper.showDetail(component);
        console.log('absence '+id)
    },
    reInit : function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
    },
    refreshComponent: function(component, event, helper){
        console.log('refresh')       
    },
    handleUpdateStatus: function(component){
        var absent = component.get('v.absence');
        var action = component.get("c.updateStatus");
            action.setParams({ absence: absent });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log('absence'+JSON.stringify(customResponse.data));
                        component.set('v.absence', customResponse.data);
                        //component.set('v.isSubmitted', true);
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