({
    helperMethod : function() {

    },
    getAllMembers : function(component) {
        console.log(' ############ running helper ');
        var action = component.get("c.getAllMembers");
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  var maList = component.get("v.members");  
                  let members=customResponse.data;
                    members.forEach(function(member){
                        maList.push({'value':member.Id,'label':member.Name})
                    });
                    console.log(' ############ running helper '+JSON.stringify(maList));
                    component.set("v.members",maList);
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
    },
    
})