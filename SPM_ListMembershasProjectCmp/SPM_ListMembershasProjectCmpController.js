({

    doInit: function (component, event, helper) {
        var menu = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' },
            { label: 'Assign Task', name: 'assignTask' },
        ];
        component.set('v.columns', [
            { label: 'Member', fieldName: 'SPM_Members__r', type: 'name' },
            //{ label: 'Project', fieldName: 'AccountId', type: 'picklist' },
            { label: 'Role', fieldName: 'Type__c', type: 'picklist' },
            { label: 'Start Date', fieldName: 'StartDate', type: 'picklist' },
            { label: 'End Date', fieldName: 'End_Date__c', type: 'text' },
            { label: 'Status', fieldName: 'Status_Member__c', type: 'text' },
            {
                type: 'action',
                typeAttributes: { rowActions: menu },
            }
        ]);
        var pageSize = component.get("v.pageSize");
        var projectId = component.get("v.recordId");

        if (projectId === '') {
            helper.getAllMembersHasProjects(component, pageSize);
        } else {
            helper.getAllMemberByProjectId(component, pageSize, projectId);
        }

    },

    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'show_details':
                helper.showRowDetails(component, event, row)
                break;
            case 'delete':
                alert('Delete');
                helper.deleteMembersHasProject(component, row);
                break;
            case 'edit':
                helper.editMembersHasProject(component, row);
                break;
            case 'assignTask':
                helper.assignTask(component, row);
                break;
            default:
        }
    },
    openModalAddMember: function (component, event, helper) {
        component.set('v.isModal', true);
    },
    updatelist: function (component, event, helper) {
        var member = event.getParam('memberHasProject');
        var type = event.getParam('type');
        var numberOfMembersHasProjectToDisplay = component.get('v.numberOfMembersHasProjectToDisplay');
        var membersHasProject = component.get('v.membersHasProject');
        if(type === 'update'){
            var index = numberOfMembersHasProjectToDisplay.findIndex((memberHasProject) => memberHasProject.Id === member.Id);
            var index1 = membersHasProject.findIndex((memberHasProject) => memberHasProject.Id === member.Id);
            if(index >=0 && index1 >=0){
                console.log('index::: '+index+' index 1::: '+index1);
                numberOfMembersHasProjectToDisplay[index]=member;
                membersHasProject[index]=member;
            }
        }else{
            console.log('le nouveau membre' +member);
            membersHasProject.unshift(member);
            numberOfMembersHasProjectToDisplay.unshift(member);
        }
        component.set('v.numberOfMembersHasProjectToDisplay', numberOfMembersHasProjectToDisplay);
        component.set('v.membersHasProject', membersHasProject);
    }, 
})