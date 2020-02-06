({
    deletePrograms: function (component, row) {
        var action = component.get("c.deleteProgram");
        var program = [JSON.parse(JSON.stringify(row))];
        console.log('program a supprimer '+ JSON.stringify(program[0]))
        action.setParams({ program: program[0] });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var programs = component.get('v.numberOfProgramsToDisplay');
                    var programsAfterDelete = programs.filter(cust => cust.Id != program[0].Id);
                    component.set('v.numberOfProgramsToDisplay', programsAfterDelete);

                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "The record has been deleted successfully.",
                        "type": "Success"
                    });
                    toastEvent.fire();
                    $A.get('e.force:refreshView').fire();
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

    showDetail: function (component, event, row) {
        console.log('ici')
        var program = JSON.parse(JSON.stringify(row));
        console.log('ici')
        console.log(program.Id)
        component.set('v.recordId', program.Id);
        var recordId = component.get('v.recordId');
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ShowDetailsProgramCmp',
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


    editProgram: function (component, row) {
        var program = JSON.parse(JSON.stringify(row));
        component.set('v.isModal', true);
        component.set('v.recordId', program.Id);
        var action = component.get("c.getProgramById");
        action.setParams({ id: program.Id });
        action.setCallback(this, (response) => {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    console.log(customResponse.data);
                    component.set('v.program', customResponse.data);
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

    arrayRemove: function (arr, value) {

        return arr.filter(function (ele) {
            return ele != value;
        });

    },

    newProject: function (component, row) {
        var program = JSON.parse(JSON.stringify(row));
        console.log('ici')
        component.set('v.programId', program.Id);
        component.set('v.recordId', program.Id);
        component.set('v.isModalNewProject', true);
    }
})