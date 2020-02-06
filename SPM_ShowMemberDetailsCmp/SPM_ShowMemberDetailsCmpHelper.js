({
    showDetail: function(component){
        var recordId = component.get('v.recordId');
        var action = component.get("c.getMemberById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log('the picture**** '+JSON.stringify(customResponse.picture));
                        component.set('v.member', customResponse.data);
                        component.set('v.pictureSrc', '/sfc/servlet.shepherd/version/download/'+customResponse.picture[0].Id);
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