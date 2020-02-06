({
    showToast: function( title,type, message ){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
			"message": message,
			"type": type
        });
        toastEvent.fire();
    }, 
    addressable: function(component, event, helper){
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListInvoiceCmp',
            },
            state: {
              //  "c__model": 'go list',
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
        var pageReference = component.get("v.pageReference");
        event.preventDefault();
        navService.navigate(pageReference);
        $A.get('e.force:refreshView').fire();
    }
})