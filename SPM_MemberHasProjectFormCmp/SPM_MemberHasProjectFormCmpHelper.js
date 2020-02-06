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
    getAllMemberWithoutProjectId: function(component, projectId) {
        var action = component.get("c.getAllMemberWithoutProjectId");
        action.setParams({projectId: projectId})
        console.log('lid dans helper '+projectId)
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let members=customResponse.data;
                  console.log('les membre without project '+JSON.stringify(members));
                  members.forEach(function(member){
                    /* if(member.hasOwnProperty('SPM_Members__r')){
                        if(member.SPM_Members__r.hasOwnProperty('Name') && member.SPM_Members__r.hasOwnProperty('Id')){
                            member.value=member.SPM_Members__r.Id;
                            member.label = member.SPM_Members__r.Name;
                        }
                    } */
                    member.value=member.Id;
                    member.label=member.Name;
                    });
                    component.set("v.members",members); 
                    console.log('les non membre '+customResponse.data);
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
    
    getAllProjects: function(component) {
        var action = component.get("c.getAllProjects");
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let projects=customResponse.data;
                  projects.forEach(function(project){
                    project.value = project.Id;
                    project.label = project.Name;
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
    getAllRoles : function(component) {
        var action = component.get("c.getAllRoles");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let roles=customResponse.data;
                  roles.forEach(function(role){
                    role.value=role.roleValue__c;
                    role.label=role.Name;
                    });
                    component.set("v.roles",roles);
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
    
    showToast: function(component){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully."
        });
        toastEvent.fire();
    }
})