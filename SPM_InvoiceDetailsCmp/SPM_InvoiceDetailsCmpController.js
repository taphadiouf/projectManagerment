({
    doInit: function (component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        var id = myPageRef.state.c__Id;
        component.set("v.recordId", id);
        helper.showDetail(component);

    },
    downloadDocument: function (component, event, helper)
    {
        let vfUrl = '/apex/SPM_Show_Detail?invoice=' + JSON.stringify(component.get('v.invoice'))+'&invoiceLines='+JSON.stringify(component.get('v.invoiceLines'))+'&total='+component.get('v.total');
        window.open(vfUrl,'_blank ');      
    },

    goBack: function(component, event, helper){
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ListInvoiceCmp',
            },
            state: {
                "c__model": 'back',
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);
    }
})