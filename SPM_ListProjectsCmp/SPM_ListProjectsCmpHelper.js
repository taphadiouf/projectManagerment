({
    
    deleteProjects: function (component, row) {
        var action = component.get("c.deleteProject");
        var project = JSON.parse(JSON.stringify(row));
        //console.log('project deleted '+JSON.stringify(projet))
        action.setParams({ project: project });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var projects = component.get('v.numberOfProjectsToDisplay');
                    var projectsAfterDelete = projects.filter(projet => projet.Id != project.Id);
                    component.set('v.numberOfProjectsToDisplay', projectsAfterDelete);
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

    showRowDetails: function (component,event,row) {
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

    editProject: function(component, row){
        var project = JSON.parse(JSON.stringify(row));
        component.set('v.isModalNewProject',true);
        component.set('v.recordId',project.Id);
        var action = component.get("c.getProjectById");
            action.setParams({ id: project.Id });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
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
    },

    assignMembers: function(component, row){
        var project = JSON.parse(JSON.stringify(row));
        component.set('v.isModal',true);
        component.set('v.recordId',project.Id);
        component.set('v.project',project);  
    },

    getAllProject :function(component,pageSize){
        var action = component.get("c.getAllProjects");

        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var projects = response.getReturnValue().data;
               component.set('v.projects', projects);
               component.set('v.membersHasProject', response.getReturnValue().membersHasProject);
               component.set('v.createdById', response.getReturnValue().createdById);
                console.log(response.getReturnValue().data);
                console.log('membersHasProject '+response.getReturnValue().membersHasProject);
                component.set("v.totalSize", component.get("v.projects").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfProjectsToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {

                    for (var i = 0; i < component.get('v.totalSize'); i++) {

                        numberOfProjectsToDisplay.push(projects[i]);

                    }
                }else{
                    for (var i = 0; i < pageSize; i++) {

                        numberOfProjectsToDisplay.push(projects[i]);

                    }
                }

                component.set('v.numberOfProjectsToDisplay', numberOfProjectsToDisplay);

                //console.log(numberOfProjectsToDisplay);

            }

        });

        $A.enqueueAction(action);
    },

    getProjectsByCustomer: function(component, pageSize, customerId){
        var action = component.get("c.getProjectsByCustomer");
        action.setParams({customerId : customerId})
        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var projects = response.getReturnValue().data;
               component.set('v.projects', projects);
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.projects").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfProjectsToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {

                    for (var i = 0; i < component.get('v.totalSize'); i++) {

                        numberOfProjectsToDisplay.push(projects[i]);

                    }
                }else{
                    for (var i = 0; i < pageSize; i++) {

                        numberOfProjectsToDisplay.push(projects[i]);

                    }
                }

                component.set('v.numberOfProjectsToDisplay', numberOfProjectsToDisplay);

                //console.log(numberOfProjectsToDisplay);

            }

        });

        $A.enqueueAction(action);
    },
    
    getAllProjectsByProgram: function(component, pageSize, programId){
        var action = component.get("c.getProjectsByProgram");
        action.setParams({programId : programId})
        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var projects = response.getReturnValue().data;
               component.set('v.projects', projects);
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.projects").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfProjectsToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {

                    for (var i = 0; i < component.get('v.totalSize'); i++) {

                        numberOfProjectsToDisplay.push(projects[i]);

                    }
                }else{
                    for (var i = 0; i < pageSize; i++) {

                        numberOfProjectsToDisplay.push(projects[i]);

                    }
                }

                component.set('v.numberOfProjectsToDisplay', numberOfProjectsToDisplay);

                //console.log(numberOfProjectsToDisplay);

            }

        });

        $A.enqueueAction(action);
    }
})