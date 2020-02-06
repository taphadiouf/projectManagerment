({
    getAllProjects : function(component) {
        var action = component.get("c.getAllProjects");
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                    let project =customResponse.data;
                    project.forEach(function(proj){ 
                        proj.value=proj.Id;
                        proj.label=proj.Name;    
                    });
                    component.set("v.projects",project);
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
}
  )