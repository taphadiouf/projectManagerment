({
   /* getAllMembers : function(component,projectId) {
        var action = component.get("c.getAllMemberByProjectId");
        action.setParams({'projectId': projectId });
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let members=customResponse.data;
                    members.forEach(function(member){
                        member.value=member.SPM_Members__r.Id;
                        member.label=member.SPM_Members__r.Name;
                    });
                    component.set("v.members",members);
                    //alert(JSON.stringify(members));
                    console.log(JSON.stringify(members));
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
    },*/
    
  getAllProjects : function(component) {
        var action = component.get("c.getAllProjects");
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let projects=customResponse.data;
                    projects.forEach(function(project){
                        project.value=project.Id;
                        project.label=project.Name;
                    });
                    component.set("v.projects",projects);
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

   /* getAllMembersWithoutProject : function(component) {
        var action = component.get("c.getAllMemberWithoutProjects");
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
    }*/

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
    /* getAllStatus: function(component) {
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

    getAllValidFor: function(component) {
        var action = component.get("c.getAllValidFor");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let validFor=customResponse.data;
                    validFor.forEach(function(valid){
                        valid.value=valid.value__c;
                        valid.label=valid.Name;
                    });
                    component.set("v.validFor",validFor);
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
    },*/

     showToast: function(component){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully."
        });
        toastEvent.fire();
    }
})