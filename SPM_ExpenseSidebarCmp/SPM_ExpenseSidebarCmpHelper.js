({
    getAllProject: function (component) {
        var action = component.get("c.getAllProjects");
        action.setCallback(this, function (response) {

            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    let project = customResponse.data;
                    console.log('project' + project);
                    project.forEach(function (proj) {
                        proj.value = proj.Id;
                        proj.label = proj.Name;
                    });
                    component.set("v.projects", project);


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
    getAllExpenseType: function (component) {
        var action = component.get("c.getAllExpenseTypes");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    let expenseTypes = customResponse.data;
                    expenseTypes.forEach(function (expenseType) {
                        expenseType.value = expenseType.expenseTypeValue__c;
                        expenseType.label = expenseType.Name;
                    });
                    component.set("v.expenseTypes", expenseTypes);
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
    getAllMemberByProjectId: function (component, projectId) {
        var action = component.get("c.getAllMemberByProjectId");
        action.setParams({ projectId: projectId })
        action.setCallback(this, function (response) {

            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    let members = customResponse.data;
                    members.forEach(function (member) {
                        
                        member.label = member.SPM_Members__r.Name;
                        member.value = member.Id;
                    });
                    console.log('members ' + JSON.stringify(members));
                    component.set("v.membersHasProjects", members);
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