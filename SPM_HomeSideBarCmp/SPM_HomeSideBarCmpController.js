({
    displayCustomer : function(component,event,helper) {
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListCustomersCmp',
            },
            state: {
               
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);
    },

    displayOrgUnit: function(component,event,helper) {
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListOrganisationUnitCmp',
            },
            state: {
               
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);
    },
    
    displayProgram: function(component,event,helper) {
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListProgramsCmp',
            },
            state: {
               
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);
    },
})