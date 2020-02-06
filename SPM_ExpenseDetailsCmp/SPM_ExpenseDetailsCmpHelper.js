({
    showDetail: function (component) {
        var recordId = component.get('v.recordId');
        console.log('ici '+recordId);
        var action = component.get("c.getExpenseById");
        action.setParams({ id: recordId });
        action.setCallback(this, (response) => {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                console.log(customResponse);
                if (customResponse.hasError == false) {
                    var exp = customResponse.data;
                    console.log('expense init' + JSON.stringify(exp));
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