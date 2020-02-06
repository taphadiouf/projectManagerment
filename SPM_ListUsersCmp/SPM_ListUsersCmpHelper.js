({
    showRowDetails: function (component,event,row) {
        var user = [JSON.parse(JSON.stringify(row))];
        console.log(user[0].Id)
        component.set('v.recordId',user[0].Id);
        var recordId = component.get('v.recordId');
        console.log(recordId);
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_ShowUserDetailsCmp',
            },
            state: {
                "c__Id": recordId,
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);
       alert();

        
    }
})