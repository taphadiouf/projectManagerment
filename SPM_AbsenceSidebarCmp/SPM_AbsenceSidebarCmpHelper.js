({
    getAllMembers : function(component) {
        var action = component.get("c.getAllMembers");
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let members=customResponse.data;
                    members.forEach(function(member){
                        member.value=member.Id;
                        member.label=member.Name;
                    });
                    component.set("v.members",members);
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
    
    
  getAllTypes : function(component) {
        var action = component.get("c.getAllTypes");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let types=customResponse.data;
                    types.forEach(function(type){
                        type.value=type.value__c;
                        type.label=type.Name;
                    });
                    component.set("v.types",types);
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
     getAllStatus: function(component) {
        var action = component.get("c.getAllStatus");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let status=customResponse.data;
                    status.forEach(function(statu){
                        statu.value=statu.value__c;
                        statu.label=statu.Name;
                    });
                    component.set("v.status",status);
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