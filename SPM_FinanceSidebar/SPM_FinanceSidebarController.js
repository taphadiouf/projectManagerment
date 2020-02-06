({

    doInit: function (component, event, helper) {
        helper.getAllProject(component);
        
    },

    filtrer: function (component, event) {
          var  project = component.get('v.project');
             
         

        var filter = {
            'project': project
            
           
        };
        var evt = $A.get("e.c:SPM_FilterInvoiceEvt");
            evt.setParams({'filter': filter});
            evt.fire();
    }
})