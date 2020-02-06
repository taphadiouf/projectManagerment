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
                    console.log(users);
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
    
    getAllOrganisationUnits: function(component) {
        var action = component.get("c.getAllOrgUnits");
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let orgUnits=customResponse.data;
                    orgUnits.forEach(function(orgUnit){
                        orgUnit.value=orgUnit.Id;
                        orgUnit.label=orgUnit.Name;
                    });
                    component.set("v.orgUnits",orgUnits);
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
    getAllGenders : function(component) {
        var action = component.get("c.getAllGenders");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let genders=customResponse.data;
                    genders.forEach(function(gender){
                        gender.value=gender.genderValue__c;
                        gender.label=gender.Name;
                    });
                    component.set("v.genders",genders);
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
    getAllContrats: function(component) {
        var action = component.get("c.getAllContrats");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  let contrats=customResponse.data;
                    contrats.forEach(function(contrat){
                        contrat.value=contrat.contratValue__c;
                        contrat.label=contrat.Name;
                    });
                    component.set("v.contrats",contrats);
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