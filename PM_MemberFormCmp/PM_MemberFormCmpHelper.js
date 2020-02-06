({
	getAllUsers : function(component) {
		var action = component.get("c.getAllUsers");
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let users=customResponse.data;
                    users.forEach(function(user){
                        user.value=user.Id;
                        user.label=user.Name;
                    });
                    component.set("v.users",users);
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