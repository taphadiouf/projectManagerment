({
    
    closeModelOrgUnit: function(component, event, helper) {
        // Set isModalOpen attribute to false  
            
            component.set("v.isModal", false);
    },
    
    
    addOrgUnit : function(cmp,evt,helper){
        var orgUnits=[cmp.get('v.organisationUnit')];
        var action = cmp.get("c.createOrganisationUnit");
        action.setParams({organisationUnit : orgUnits });
        action.setCallback(this, function(response) {
             var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError == false){
                    var orgUnitEvt = $A.get("e.c:SPM_NewOrgUnitCreatedEvt");                  
                    orgUnitEvt.setParam('orgUnits',customResponse.data);
                    orgUnitEvt.fire();
                } else {
                    for(var message in customResponse.messages){
                        console.log(message);
                    }
                }
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
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
        cmp.set("v.isModal", false);
        $A.enqueueAction(action);
    },
    /*
    updateOrganisationUnit: function (component, event, helper) {
        var orgU = [component.get('v.organisationUnit')];
        var action = component.get("c.updateOrganisationUnit");
        action.setParams({ organisationUnit: orgU });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    //helper.showToast('Success', 'Success', 'The record has been updated successfully');
                } else {
                    //helper.showToast('Error', 'error', customResponse.messages);
                    for (var message in customResponse.messages) {
                        console.log(message);
                    }
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
        component.set("v.isModal", false);
        $A.enqueueAction(action);
    }*/
})