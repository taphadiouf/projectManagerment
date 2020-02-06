({
    
    closeModelOrgUnit: function(component, event, helper) {
        // Set isModalOpen attribute to false  
            
            component.set("v.isModal", false);
    },
    
    
    addOrgUnit : function(component,event,helper){
        var orgUnits=[component.get('v.organisationUnit')];
        var action = component.get("c.createOrganisationUnit");
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
        component.set("v.isModal", false);
        $A.enqueueAction(action);
    }
    
})