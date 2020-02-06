({
    getProjectById : function(component) {
        var action = component.get("c.getProjectById");
        action.setParam('projectId',component.get('v.projectId'));
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                    component.set("v.selectedProject",customResponse.data);
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
    /*getAllWorkUnits : function(component) {
        var action = component.get("c.getAllWorkUnits");
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let workUnits=customResponse.data;
                  workUnits.forEach(function(workUnit){
                    workUnit.value=workUnit.Id;
                    workUnit.label=workUnit.Name;
                    });
                    component.set("v.workUnits",workUnits);
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
*/
    getAllStatus : function(component) {
        var action = component.get("c.getAllStatus");
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let theStatus=customResponse.data;
                  theStatus.forEach(function(aStatus){
                    aStatus.value=aStatus.Task_Status_Value__c;
                    aStatus.label=aStatus.Name;
                    });
                    component.set("v.status",theStatus);
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