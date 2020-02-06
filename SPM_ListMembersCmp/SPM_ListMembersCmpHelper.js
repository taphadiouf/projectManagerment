({

    deleteMember: function (component, row) {
        var action = component.get("c.deleteMembers");
        var membres = [JSON.parse(JSON.stringify(row))];
        console.log(membres[0]);
        action.setParams({ members: membres });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var members = component.get('v.numberOfMembersToDisplay');
                    var membersAfterDelete = members.filter(membre => membre.Id != membres[0].Id);
                    component.set('v.numberOfMembersToDisplay', membersAfterDelete);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "The record has been deleted successfully.",
                        "type": "Success"
                    });
                    toastEvent.fire();
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

    

    editMember: function (component, row) {
        var membre = JSON.parse(JSON.stringify(row));
        component.set('v.isModal', true);
        component.set('v.recordId', membre.Id);
        var action = component.get("c.getMemberById");
        action.setParams({ id: membre.Id });
        action.setCallback(this, (response) => {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    console.log(customResponse.data);
                    component.set('v.member', customResponse.data);
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

    getAllMember: function (component, pageSize) {
        var action = component.get("c.getAllMembers");
        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var members = response.getReturnValue().data;
                var membersHasProject = response.getReturnValue().membersHasProject;
                members.forEach(member => {
                    if(member.organisation_Unit__r != undefined){
                    member.orgUnit = member.organisation_Unit__r.Name;
                    }
                });
                component.set('v.members', members);
                component.set('v.membersHasProject', membersHasProject);
                console.log(response.getReturnValue().data);
                console.log('membersHasProject: '+response.getReturnValue().membersHasProject);
                component.set("v.totalSize", component.get("v.members").length);
                component.set("v.start", 0);
                component.set("v.end", pageSize - 1);
                var numberOfMembersToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {
                    for (var i = 0; i < component.get('v.totalSize'); i++) {
                        numberOfMembersToDisplay.push(members[i]);
                    }
                } else {
                    for (var i = 0; i < pageSize; i++) {
                        numberOfMembersToDisplay.push(members[i]);
                    }
                }
                component.set('v.numberOfMembersToDisplay', numberOfMembersToDisplay);
                //console.log(numberOfMembersToDisplay);
            }else {
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

    getAllMembersByOrUnit: function (component, pageSize,orgUnitId) {
       
        var action = component.get("c.getAllMembersByOrgUnitId");
        action.setParams({orgUnitId: orgUnitId });
        action.setCallback(this, function (response) {
            console.log('ici')
            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var members = response.getReturnValue().data;
                members.forEach(member => {
                    if(member.organisation_Unit__r != null){
                    member.orgUnit = member.organisation_Unit__r.Name;                        }
                });
                component.set('v.members', members);
                //component.set('v.member', members[0]);
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.members").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfMembersToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {

                    for (var i = 0; i < component.get('v.totalSize'); i++) {

                        numberOfMembersToDisplay.push(members[i]);

                    }
                } else {
                    for (var i = 0; i < pageSize; i++) {

                        numberOfMembersToDisplay.push(members[i]);

                    }
                }

                component.set('v.numberOfMembersToDisplay', numberOfMembersToDisplay);

                //console.log(numberOfMembersToDisplay);

            }else {
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

    getAllMembersByUser: function (component, pageSize,userId) {
       
        var action = component.get("c.getAllMembersByUserId");
        action.setParams({userId: userId });
        action.setCallback(this, function (response) {
            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var members = response.getReturnValue().data;
                members.forEach(member => {
                    if(member.organisation_Unit__r != null){
                        member.orgUnit = member.organisation_Unit__r.Name;
                    }
                });
                component.set('v.members', members);
                //component.set('v.member', members[0]);
                console.log(members[0]);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.members").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfMembersToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {

                    for (var i = 0; i < component.get('v.totalSize'); i++) {

                        numberOfMembersToDisplay.push(members[i]);

                    }
                } else {
                    for (var i = 0; i < pageSize; i++) {

                        numberOfMembersToDisplay.push(members[i]);

                    }
                }

                component.set('v.numberOfMembersToDisplay', numberOfMembersToDisplay);

                //console.log(numberOfMembersToDisplay);

            }else {
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
        var member = [JSON.parse(JSON.stringify(row))];
        console.log(member[0].Id)
        component.set('v.recordId',member[0].Id);
        var recordId = component.get('v.recordId');
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ShowMemberDetailsCmp',
            },
            state: {
                "c__Id": recordId,
                "c__userId": member[0].UserId__c,
                "c__member" : member[0]
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);
       var evt = $A.get("e.c:SPM_ShowDetailMemberEvt");
        evt.fire();
    }
})