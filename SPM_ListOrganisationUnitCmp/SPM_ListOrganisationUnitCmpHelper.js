({
        
    deleteOrganisationUnits: function (component, row) {
        var action = component.get("c.deleteOrganisationUnit");
        var organisationUnits = [JSON.parse(JSON.stringify(row))];
        console.log(organisationUnits[0]);
        
        action.setParams({ organisationUnit: organisationUnits });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var organisationUnit = component.get('v.numberOfOrganisationUnitToDisplay');
                    var organisationUnitAfterDelete = organisationUnit.filter(orgUnit=>orgUnit.Id != organisationUnits[0].Id);
                     console.log(organisationUnitAfterDelete);
                     component.set('v.numberOfOrganisationUnitToDisplay',organisationUnitAfterDelete);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "The record has been deleted successfully.",
                        "type": "Success"
                    });
                    toastEvent.fire();
                    $A.get("e.force:refreshView").fire();
                } else {
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
        $A.enqueueAction(action);

    },

    showRowDetails: function (row) {
        this.record = row; 
    },
     
    editOrganisationUnits: function(component, row){
       
        var organisationUnit = JSON.parse(JSON.stringify(row));
        component.set('v.isModal',true);
        component.set('v.recordId',organisationUnit.Id);
        var action = component.get("c.getOrganisationUnitById");
            action.setParams({ id: organisationUnit.Id });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.organisationUnit', customResponse.data);
                    } else {
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
            $A.enqueueAction(action);
    }
})