({

        doInit: function (component, event, helper) {
            helper.getAllProjects(component);
        },

        filtrer: function (component, event) {
            var project = component.get('v.project') 
                
            
            var evt = $A.get("e.c:SPM_FilterProjectRiskEvt");
            evt.setParams({'filtre': project});
            evt.fire();
            console.log('event registre')
        },

       
        navigToHome: function (component, event, helper) {
            var evt = $A.get("e.c:navigTo");
            evt.setParam("navigate", "home");
            evt.fire();
        },

        createNewProject: function (component, event, helper) {
            //component.set('v.sowProject',false);
            var evt = $A.get("e.c:SPM_NavigateToPageEvt");
            evt.setParam("page", 'NewProject');
            evt.fire();
        },
        navigToCloneProject: function (component, event, helper) {
            component.set("v.sowProject", false);
            component.set("v.createProject", false);
            var evt = $A.get("e.c:navigTo");
            evt.setParam("navigate", "cloneProject");
            evt.fire();
        }
    




    })