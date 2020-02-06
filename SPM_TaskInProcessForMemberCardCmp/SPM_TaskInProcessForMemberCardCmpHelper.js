({
    updateTasks : function (component, tasks) {
        var action = component.get("c.updateTask");
        action.setParams({ tasks: tasks });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                var tasks = component.get('v.tasks');
                tasks.push(customResponse.data[0]);
                component.set('v.tasks', tasks);
                component.set('v.isDragLeave',true);
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

})