({
    doInit : function(component, event, helper) {
        var recordId = component.get('v.recordId'),
            project = component.get('v.project');
        console.log(' doInit program id'+ project.Program__c);    
        if (recordId != null) {
            var action = component.get("c.getProjectById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        //console.log(customResponse.data);
                        component.set('v.project', customResponse.data);
                        component.set('v.projectManagementId',
                                 customResponse.dataMemberHasProject.SPM_Members__c
                                 );
                        console.log('test --- '+customResponse.dataMemberHasProject.SPM_Members__c)
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

    addProject: function (component, event, helper) {

        var evt = $A.get('e.c:SPM_IsValidProjectFormEvt');
        evt.fire();
        if (component.get('v.isValidFields') == true) {
        var project = component.get('v.project');
        if(component.get('v.programId') != ''){
            project.Program__c = component.get('v.programId');
        }
        var projectManagementId = component.get('v.projectManagementId');
        console.log('Id du membre selectionner'+projectManagementId)
        var action = component.get("c.createProject");
        action.setParams({ project: project , projectManagementId: projectManagementId});
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    project.Name ='';
                    project.Start_Date__c='';
                    project.End_Date__c='';
                    project.Description='';
                    project.Project_Budget__c='';
                    project.NaicsDesc='';
                    project.Type='';
                    project.Program__c='';
                    project.Rating='';
                    project.ParentId='';
                    component.set('v.project',project);
                    var evt = component.getEvent('SPM_NewProjectCreatedEvt');
                    evt.setParams({'project': project});
                    evt.fire();
                    helper.showToast('Success', 'Success', 'The record has been created successfully');
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
        component.set("v.isModal", false);
        $A.enqueueAction(action);
        }
    },

    cloneProject : function(component, event ,helper){

    },

    updateProjects: function (component, event, helper) {
        var projects = [component.get('v.project')];
        var projectManagementId = component.get('v.projectManagementId');
        var action = component.get("c.updateProject");
        action.setParams({ projects: projects });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
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
        component.set("v.isModal", false);
        $A.enqueueAction(action);
    },

    closeModal: function (component, event, helper) {
        component.set('v.isModal', false);
    }
})