({
    
    doInit: function (component, event, helper) {
        var menu = [
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' },
        ];
            component.set('v.columns', [
            { label: 'Title', fieldName: 'Name', type: 'Name' },
            { label: 'Impact', fieldName: 'NextStep', type: 'Text',initialWidth: 100 },
            { label: 'Type', fieldName: 'Type', type: 'Picklist',initialWidth: 300 },
            { label: 'Status', fieldName: 'DeliveryInstallationStatus__c', type: 'Picklist',initialWidth: 100 },
            { label: 'Criticite', fieldName: 'Criticite__c', type: 'number',initialWidth: 100 ,cellAttributes: { alignment: 'left' } },
            {
            type: 'action',
            typeAttributes: { rowActions: menu },
            }
        ]);
        var pageSize = component.get("v.pageSize");
        var projectId = component.get("v.recordId");
        if(projectId === ''){
            helper.getAllRisk(component,pageSize);
        }else{
            helper.getAllRiskByProject(component,pageSize,projectId);
        }
        
    },
    
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'delete':
                
                helper.deleteRisk(component, row);
                break;
            case 'edit':
                helper.editRisk(component, row);
            default:
        }
    },
    openModalAddRisk:function(component,event,helper){
        component.set('v.isModal',true);
    },
    
    addRiskToList: function(component, event,helper){
        var risk = event.getParam('risk');
        var numberOfRiskToDisplay = component.get('v.numberOfRiskToDisplay');
        var risks = component.get('v.risks');
        risks.unshift(risk);
        console.log(risk);
        numberOfRiskToDisplay.unshift(risk);
        component.set('v.numberOfRiskToDisplay',numberOfRiskToDisplay);
        component.set('v.risks',risks);
        $A.get('e.c:SPM_NewRiskCreatedEvt').fire();
    },
    displayProjectFiltered: function (component, event, helper) {
        console.log('event handle')
        var pageSize = component.get("v.pageSize");
        var filter = event.getParam('filtre');
        var risks = component.get('v.risks');
        console.log('fgbhjkhsyy'+filter);
        
        var dataTemp = risks.filter((risk) =>risk.AccountId.includes(filter) );
                                  
        component.set('v.risksSelected', dataTemp);
        component.set("v.totalSize", component.get("v.risksSelected").length);

        var numberOfProjectsToDisplay = [];

        for (var i = 0; i < component.get("v.totalSize"); i++) {

            numberOfProjectsToDisplay.push(component.get("v.risksSelected")[i]);

        }
        component.set('v.numberOfRiskToDisplay', numberOfProjectsToDisplay);
        console.log
    },
      
})