({

    deleteMembersHasProject: function (component, row) {
        var action = component.get("c.deleteMembersHasProject");
        var memberHasProject = [JSON.parse(JSON.stringify(row))];
        console.log(memberHasProject[0]);
        action.setParams({ membersHasProject: memberHasProject });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var members = component.get('v.numberOfMembersHasProjectToDisplay');
                    var membersAfterDelete = members.filter(membre => membre.Id != memberHasProject[0].Id);
                    component.set('v.numberOfMembersHasProjectToDisplay', membersAfterDelete);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "The record has been deleted successfully.",
                        "type": "Success"
                    });
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

    showRowDetails: function (component, event, row) {
        var customer = [JSON.parse(JSON.stringify(row))];
        console.log(customer[0].Id)
        component.set('v.recordId',customer[0].Id);
        var recordId = component.get('v.recordId');
        /*var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ShowProjectDetailsCmp',
            },
            state: {
                "c__Id": recordId,
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);*/
       var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
        "recordId": recordId,
        "slideDevName": "related"
        });
        navEvt.fire();
    },

    editMembersHasProject: function (component, row) {
        var memberHasProject = JSON.parse(JSON.stringify(row));
        component.set('v.isModal', true);
        component.set('v.isModalOpened', true);
        component.set('v.memberId', memberHasProject.Id);
        var action = component.get("c.getMembersHasProjectById");
        action.setParams({ id: memberHasProject.Id });
        action.setCallback(this, (response) => {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    console.log(customResponse.data);
                    component.set('v.memberHasProject', customResponse.data);
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

    getAllMembersHasProjects: function (component, pageSize) {
        var action = component.get("c.getAllMembersHasProjects");

        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                console.log(JSON.stringify(response.getReturnValue().data));
                var membersHasProject = response.getReturnValue().data;
                membersHasProject.forEach(membersHasProject => {
                    if(membersHasProject.hasOwnProperty('SPM_Members__r')){
                        if(membersHasProject.SPM_Members__r.hasOwnProperty('Name')){
                            membersHasProject.SPM_Members__r = membersHasProject.SPM_Members__r.Name;
                        }
                    }

                });
                component.set('v.membersHasProject', membersHasProject);
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.membersHasProject").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfMembersHasProjectToDisplay = [];

                for (var i = 0; i < pageSize; i++) {

                    numberOfMembersHasProjectToDisplay.push(membersHasProject[i]);

                }

                component.set('v.numberOfMembersHasProjectToDisplay', numberOfMembersHasProjectToDisplay);

                //console.log(numberOfMembersToDisplay);

            }

        });

        $A.enqueueAction(action);
    },

    getAllMemberByProjectId: function (component, pageSize,projectId) {
        var action = component.get("c.getAllMemberByProjectId");
        action.setParams({projectId: projectId})

        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                console.log('ce qui est retourne '+response.getReturnValue().data);
                var membersHasProject = response.getReturnValue().data;
                membersHasProject.forEach(membersHasProject => {
                    
                    membersHasProject.SPM_Members__r = membersHasProject.SPM_Members__r.Name;

                });
                component.set('v.membersHasProject', membersHasProject);
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.membersHasProject").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfMembersHasProjectToDisplay = membersHasProject.slice(0, pageSize);
                component.set('v.numberOfMembersHasProjectToDisplay', numberOfMembersHasProjectToDisplay);

                //console.log(numberOfMembersToDisplay);

            }

        });

        $A.enqueueAction(action);
    },

    assignTask: function(component, row){
        var memberHasProject = JSON.parse(JSON.stringify(row));
        component.set('v.memberHasProjectId', memberHasProject.Id);
        component.set('v.projectId', memberHasProject.AccountId);
        console.log('project id '+ memberHasProject.AccountId);
        component.set('v.isModalAssign',true);
    }
})