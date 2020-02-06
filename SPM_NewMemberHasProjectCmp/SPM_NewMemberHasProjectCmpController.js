({
    addMemberHasProject: function (component, event, helper) {

        var evt = $A.get('e.c:SPM_IsFormValidEvt');
        evt.fire();
        if (component.get('v.isValidFields') == true) {
            var membersHasProject = component.get('v.membersHasProject');
            if(component.get('v.projectId')){
                membersHasProject.AccountId = component.get('v.projectId');
                console.log('id project in if +++++ '+component.get('v.projectId') );
            }
            component.set('v.membersHasProject',membersHasProject)
            console.log('membersHasProject '+JSON.stringify(membersHasProject) );
            var action = component.get("c.createMembersHasProject");
            action.setParams({ memberHasProject: membersHasProject });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log(response.getReturnValue().data);
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        if(customResponse.data[0].hasOwnProperty('SPM_Members__r')){
                            if(customResponse.data[0].SPM_Members__r.hasOwnProperty('Name')){
                                customResponse.data[0].SPM_Members__r = customResponse.data[0].SPM_Members__r.Name;
                            }
                        }
                        var evt = component.getEvent('SPM_NewMembersHasProjectCreatedEvt');
                            evt.setParams({ 'memberHasProject': customResponse.data[0] });
                            evt.fire();
                        helper.showToast('Success', 'Success', 'The record has been created successfully');
                        membersHasProject.SPM_Members__c = '';
                        membersHasProject.AccountId = '',
                        membersHasProject.Type__c = '',
                        membersHasProject.StartDate = '',
                        membersHasProject.End_Date__c = '',
                        membersHasProject.CustomerSignedTitle = ''
                        component.set('v.membersHasProject', membersHasProject);
                        $A.get("e.force:refreshView").fire();
                        } else {
                        helper.showToast('Error', 'error', customResponse.messages);
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
            component.set("v.isModalMembersHasProject", false);
            $A.enqueueAction(action);
        }
    },



    openModalMemberHasProject: function (component, evt) {
        component.set('v.isModalMembersHasProject', true);
    },

    doInit: function (component, event, helper) {
        var recordId = component.get('v.recordId');
        if (recordId != null) {
            var action = component.get("c.getMembersHasProjectById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.membersHasProject', customResponse.data);
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
    },

    updateMemberHasProject: function (component, event, helper) {
            var membersHasProject = [component.get('v.membersHasProject')];
            console.log('membersHasProject '+JSON.stringify(membersHasProject) );
            var action = component.get("c.updateMembersHasProject");
            action.setParams({ membersHasProject: membersHasProject });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log(response.getReturnValue().data);
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        if(customResponse.data[0].hasOwnProperty('SPM_Members__r')){
                            if(customResponse.data[0].SPM_Members__r.hasOwnProperty('Name')){
                                customResponse.data[0].SPM_Members__r = customResponse.data[0].SPM_Members__r.Name;
                            }
                        }
                        var evt = component.getEvent('SPM_NewMembersHasProjectCreatedEvt');
                            evt.setParams({ 'memberHasProject': customResponse.data[0],'type': 'update' });
                            evt.fire();
                            var membersHasProject = component.get('v.membersHasProject');
                            membersHasProject.SPM_Members__c = '';
                            membersHasProject.AccountId = '',
                            membersHasProject.Type__c = '',
                            membersHasProject.StartDate = '',
                            membersHasProject.End_Date__c = '',
                            membersHasProject.CustomerSignedTitle = ''
                            component.set('v.membersHasProject', membersHasProject);
                            component.set('v.recordId', '');
                        helper.showToast('Success', 'Success', 'The record has been updated successfully');
                        $A.get('e.force:refreshView').fire();
                    } else {
                        helper.showToast('Error', 'error', customResponse.messages);
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
            component.set("v.isModalMembersHasProject", false);
            $A.enqueueAction(action);
        
    },

    openModal: function (component, event, helper) {
        component.set('v.isModalMembersHasProjectOpened', true);
    },
    closeModal: function (component, event, helper) {
        component.set('v.isModalMembersHasProject', false);
    }
})