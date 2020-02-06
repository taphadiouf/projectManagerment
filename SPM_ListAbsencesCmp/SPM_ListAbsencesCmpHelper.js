({
    
    deleteAbsence: function (component, row) {
        var action = component.get("c.deleteAbsences");
        var absents = [JSON.parse(JSON.stringify(row))];
        console.log(absents[0]);
        action.setParams({ absences: absents });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var absences = component.get('v.numberOfAbsencesToDisplay');
                    var absencesAfterDelete = absences.filter(cust => cust.Id != absents[0].Id);
                    component.set('v.numberOfAbsencesToDisplay', absencesAfterDelete);
                   var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "The record has been deleted successfully.",
                        "type": "Success"
                    });
                    toastEvent.fire();
                    console.log("sucess deleted");
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

    showRowDetails: function (component,event,row) {
        var absence = [JSON.parse(JSON.stringify(row))];
        console.log(absence[0].Id)
        component.set('v.recordId',absence[0].Id);
        var recordId = component.get('v.recordId');
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ShowAbsenceDetailsCmp',
            },
            state: {
                "c__Id": recordId
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);

    },

    editAbsence: function(component, row){
        var absence = JSON.parse(JSON.stringify(row));
        component.set('v.isModal',true);
        component.set('v.recordId',absence.Id);
        var action = component.get("c.getAbsenceById");
            action.setParams({ id: absence.Id });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.absence', customResponse.data);
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