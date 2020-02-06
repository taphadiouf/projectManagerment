({

    getAllTasks : function(component) {
        console.log(' ############ running helper ');
        var action = component.get("c.getAllTasks");
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  var maList = component.get("v.tasks");  
                  let tasks=customResponse.data;
                    tasks.forEach(function(task){
                        maList.push({'value':task.Id,'label':task.Name})
                    });
                    console.log(' ############ running helper '+JSON.stringify(maList));
                    component.set("v.tasks",maList);
                } else {
                    console.log(customResponse.message);
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