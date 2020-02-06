({
    
    doInit: function (component, event, helper) {
        var menu = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' },
        ];
            component.set('v.columns', [
            { label: 'Name', fieldName: 'Name', type: 'Text', initialWidth: '100%' },
            {
            type: 'action',
            typeAttributes: { rowActions: menu },
            }
        ]);
        var pageSize = component.get("v.pageSize");
        
        var action = component.get("c.getAllOrganisationUnits");
         
        action.setCallback(this, function (response) {
            
            var state = response.getState();
            
            if (component.isValid() && state === "SUCCESS") {
                
                var organisationUnits = response.getReturnValue();
                component.set('v.organisationUnits', organisationUnits);
                console.log(response.getReturnValue());
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.organisationUnits").length);
                
                component.set("v.start", 0);
                
                component.set("v.end", pageSize - 1);
                
                var numberOfOrganisationUnitToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {
                    
                    for (var i = 0; i < component.get('v.totalSize'); i++) {
                        
                        numberOfOrganisationUnitToDisplay.push(organisationUnits[i]);
                        
                    }
                }else{
                    for (var i = 0; i < pageSize; i++) {
                        
                        numberOfOrganisationUnitToDisplay.push(organisationUnits[i]);
                        
                    }
                }
                
                component.set('v.numberOfOrganisationUnitToDisplay', numberOfOrganisationUnitToDisplay);
                
                
                
            }
            else{
                console.log('error '+state);
            }
            
        });
        
        $A.enqueueAction(action);
        
    },
    
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'show_details':
                alert('Showing Details: ' + JSON.stringify(row));
                break;
            case 'delete':
                alert('Delete');
                helper.deleteOrganisationUnits(component, row);
                break;
            case 'edit':
                helper.editOrganisationUnits(component, row);
            default:
        }
        
    },
     openModalAddorganisationUnit:function(component,event,helper){
        component.set('v.isModal',true);
    },
    
    addOrgUnitToList: function(component, event,helper){
        var organisationUnit = event.getParam('orgUnits');
        console.log(organisationUnit[0]);
        var numberOfOrganisationUnitToDisplay = component.get('v.numberOfOrganisationUnitToDisplay');
        var organisationUnits = component.get('v.organisationUnits');
        organisationUnits.unshift(organisationUnit[0]);
        numberOfOrganisationUnitToDisplay.unshift(organisationUnit[0]);
        component.set('v.numberOfOrganisationUnitToDisplay',numberOfOrganisationUnitToDisplay);
        component.set('v.organisationUnits',organisationUnits);
    }
    
})