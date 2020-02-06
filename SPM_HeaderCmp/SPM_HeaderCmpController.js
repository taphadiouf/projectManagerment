({
   
    displaySidebar: function () {
        console.log(1)
        var x = document.getElementById("sidebar");
        var y = document.getElementById("sc");
        if (x.style.display === "none") {
            x.style.display = "block";
            x.style.width = "20%";
            y.style.width = "80%";
        } else {
            x.style.display = "none";
            y.style.width = "100%";
        }
    },

   
   
    displayListOfMembers: function (component, event, helper) {
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListMembersCmp',
            },
            state: {
               
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);
       component.set('v.current', 'resource');

    },

    displayListOfAbsences: function (component, event, helper) {
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListAbsencesCmp',
            },
            state: {
               
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);
       component.set('v.current', 'resource');
    },

    
    displayListOfRisk: function (component, event, helper) {
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListRiskCmp',
            },
            state: {
               
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);
       component.set('v.current', 'risk');
    },

    displayListOfTasks: function (component, event, helper) {
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListTasksCmp',
            },
            state: {
               
            }
        };
        component.set('v.current', 'tasks');
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);
       
    },

    displayListOfExpenses : function (component, event, helper) {
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListExpenseCmp',
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

    displayListOfFinance : function (component, event, helper) {
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListInvoiceCmp',
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

    displayListOfActivities : function (component, event, helper) {
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListActivitiesCmp',
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

    summary : function (component, event, helper) {
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ProjectManagement',
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

    displayListOfproject: function (component, event, helper) {
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListProjectsCmp',
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