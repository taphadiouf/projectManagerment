({
    doInit : function(component) {
        var memberId = component.get('v.recordId');
        var action = component.get("c.getMembersHasProjectById");
        action.setParams({ id: memberId});
        action.setCallback(this, (response) => {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    console.log(customResponse.data);
                    component.set('v.membersHasProject', customResponse.data);
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