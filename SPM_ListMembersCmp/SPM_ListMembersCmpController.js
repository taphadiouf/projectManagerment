({

    doInit: function (component, event, helper) {
        var menu = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' },
        ];
        var pageSize = component.get("v.pageSize");
        var orgUnitId = component.get('v.orgUnitId');
        var userId = component.get('v.userId');

        if (orgUnitId === '' && userId == '') {
            component.set('v.columns', [
                { label: 'Name', fieldName: 'Name', type: 'name' },
                { label: 'Gender', fieldName: 'LeadSource', type: 'picklist' },
                { label: 'Contract Type', fieldName: 'Level__c', type: 'picklist' },
                { label: 'Organisation Unit', fieldName: 'organisation_Unit__c',
                type:"url", sortable: true, typeAttributes: {label: { fieldName: 'orgUnit' },target:'_blank'}},
                {
                    type: 'action',
                    typeAttributes: { rowActions: menu },
                }
            ]);
            helper.getAllMember(component, pageSize);
        } else if (userId == '') {
            component.set('v.columns', [
                { label: 'Name', fieldName: 'Name', type: 'name' },
                { label: 'Gender', fieldName: 'LeadSource', type: 'picklist' },
                { label: 'Contract Type', fieldName: 'Level__c', type: 'picklist' },
                {
                    type: 'action',
                    typeAttributes: { rowActions: menu },
                }
            ]);
            helper.getAllMembersByOrUnit(component, pageSize, orgUnitId);
        } else if (orgUnitId == '') {
            component.set('v.columns', [
                { label: 'Organisation Unit', fieldName: 'orgUnit', type: 'text' },
                { label: 'Start Date', fieldName: 'Birthdate', type: 'date' },
                { label: 'End Date', fieldName: 'EndDate__c', type: 'date' },
                {
                    type: 'action',
                    typeAttributes: { rowActions: menu },
                }
            ]);
            helper.getAllMembersByUser(component, pageSize, userId);
        } else {
            //throw ne
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
                alert('Delete');
                helper.deleteMember(component, row);
                break;
            case 'edit':
                helper.editMember(component, row);
            default:
        }
    },
    openModalAddMember: function (component, event, helper) {
        component.set('v.recordId', '');
        component.set('v.isModal', true);
        console.log('userId '+component.get('v.userId'))
    },

    addMemberTolist: function (component, event, helper) {
        var member = event.getParam('member');
        var numberOfMembersToDisplay = component.get('v.numberOfMembersToDisplay');
        var members = component.get('v.members');
        members.unshift(member);
        numberOfMembersToDisplay.unshift(member);
        component.set('v.numberOfMembersToDisplay', numberOfMembersToDisplay);
        component.set('v.members', members);
    },

    getMemberFilteredByProject : function(component,event, helper){
        console.log('event handle')
        var projectId = event.getParam('projectId'),
            membersHasProject = component.get('v.membersHasProject'),
            members = component.get('v.members');
        var membersHasProjectTmp = membersHasProject.filter(memberHasProject => 
            memberHasProject.AccountId.includes(projectId)
            );
            console.log('member has proj : '+JSON.stringify(membersHasProjectTmp));
        var membersHasProjectId = [];
        membersHasProjectTmp.forEach(memberHasProjectTmp =>{
            membersHasProjectId.push(memberHasProjectTmp.SPM_Members__c);
        })
        console.log('tab temporaire : '+membersHasProjectId);
        var membersFiltered = members.filter(member => 
            membersHasProjectId.find( idmember => idmember.includes(member.Id))
        );
        console.log('after filter '+membersFiltered)
        component.set('v.membersSelected', membersFiltered);
        component.set("v.totalSize", component.get("v.membersSelected").length);

        var numberOfMembersToDisplay = [];

        for (var i = 0; i < component.get("v.totalSize"); i++) {

            numberOfMembersToDisplay.push(component.get("v.membersSelected")[i]);

        }
        component.set('v.numberOfMembersToDisplay', numberOfMembersToDisplay);
    },
    // this function automatic call by aura:waiting event  
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for display loading spinner 
         //component.set("v.Spinner", true); 
    },
     
  // this function automatic call by aura:doneWaiting event 
     hideSpinner : function(component,event,helper){
      // make Spinner attribute to false for hide loading spinner    
        component.set("v.Spinner", false);
     }
})