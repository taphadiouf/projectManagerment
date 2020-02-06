({
    showDetail: function(component, event, helper){
        var recordId = component.get('v.recordId');
        var action = component.get("c.getTaskById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        //console.log('Member of project '+customResponse.dataMemberHasProject);
                        component.set('v.task', customResponse.data);
                        //component.set('v.projectManagement', customResponse.dataMemberHasProject);
                         task = customResponse.data;
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