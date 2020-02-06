({

    doInit: function (component, event, helper) {
        var menu = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' }
        ];
        component.set('v.columns', [
            { label: 'Name', fieldName: 'Name', type: 'name' },
            { label: 'Category', fieldName: 'Rating', type: 'picklist' },
            { label: 'Budget', fieldName: 'Project_Budget__c', type: 'currency',cellAttributes: { alignment: 'left' } },
            { label: 'Status', fieldName: 'Type', type: 'picklist' },
            {
                type: 'action',
                typeAttributes: { rowActions: menu },
            }
        ]);
        var pageSize = component.get("v.pageSize");
        var customerId = component.get("v.customerId");
        var programId = component.get("v.programId");
        if (customerId === '' && programId === '') {
            helper.getAllProject(component, pageSize);
        } else if(programId === ''){
            helper.getProjectsByCustomer(component, pageSize, customerId);
        } else{
            helper.getAllProjectsByProgram(component, pageSize, programId);
        }

    },

    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'show_details':
                helper.showRowDetails(component, event, row);
                break;
            case 'delete':
                helper.deleteProjects(component, row);
                break;
            case 'edit':
                helper.editProject(component, row);
            default:
        }
    },

    openModalNewProject: function (component, event, helper) {
        component.set('v.isModalNewProject', true);
    },

    addProjectToList: function (component, event, helper) {
        var project = event.getParam('project');
        var numberOfProjectsToDisplay = component.get('v.numberOfProjectsToDisplay');
        var projects = component.get('v.projects');
        projects.unshift(project);
        numberOfProjectsToDisplay.unshift(project);
        component.set('v.numberOfProjectsToDisplay', numberOfProjectsToDisplay);
        component.set('v.projects', projects);
    },

    displayProjectFiltered: function (component, event, helper) {
        console.log('event handle')
        var pageSize = component.get("v.pageSize");
        var filter = event.getParam('filtre');
        var projects = component.get('v.projects');
        var membersHasProject = component.get('v.membersHasProject');
        var createdById = component.get('v.createdById');
        console.log('projects ' + JSON.stringify(projects))
        console.log('createdById ' + createdById)
        var dataTemp = projects.filter((project) => {
            if (filter.mineOrAll === 'mine') {
                //project.CustomerId__c.toLowerCase().includes(filter.customer.toLowerCase()) ||
                return (
                    project.CreatedById.includes(createdById) &&
                    project.Type.toLowerCase().includes(filter.status.toLowerCase()) &&
                    project.Rating.toLowerCase().includes(filter.category.toLowerCase()) &&
                    project.Start_Date__c.includes(filter.startDate) &&
                    project.End_Date__c.includes(filter.endDate)
                    );
            } else {
                return (
                    project.Type.toLowerCase().includes(filter.status.toLowerCase()) &&
                    project.Rating.toLowerCase().includes(filter.category.toLowerCase()) &&
                    project.Start_Date__c.includes(filter.startDate) &&
                    project.End_Date__c.includes(filter.endDate)
                )}
        });
        if(filter.member != ''){
            var projectInMemberHProj = [];
            var membersHasProjectTmp = membersHasProject.filter(memberHasProject => 
                memberHasProject.SPM_Members__c.includes(filter.member)
            );
            membersHasProjectTmp.forEach(memberHasProjectTmp =>{
                projectInMemberHProj.push(memberHasProjectTmp.AccountId);
            })
            console.log('tab temporaire : '+projectInMemberHProj);
             dataTemp = dataTemp.filter(project => 
                projectInMemberHProj.find( idProjet => idProjet.includes(project.Id))
            )
        }
        component.set('v.projectsSelected', dataTemp);
        component.set("v.totalSize", component.get("v.projectsSelected").length);

        var numberOfProjectsToDisplay = [];

        for (var i = 0; i < component.get("v.totalSize"); i++) {

            numberOfProjectsToDisplay.push(component.get("v.projectsSelected")[i]);

        }
        component.set('v.numberOfProjectsToDisplay', numberOfProjectsToDisplay);
    },
    showSpinner: function(component, event, helper) {
        //component.set("v.Spinner", true); 
   },
    
    hideSpinner : function(component,event,helper){   
       component.set("v.Spinner", false);
    }
})