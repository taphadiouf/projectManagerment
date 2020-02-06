({
    showRowDetails: function (component,event,row) {
        var invoice = [JSON.parse(JSON.stringify(row))];
        component.set('v.recordId',invoice[0].Id);
        var recordId = component.get('v.recordId');
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_InvoiceDetailsCmp',
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
    },

    editInvoice: function(component, event, row){
        var invoice = [JSON.parse(JSON.stringify(row))];
        component.set('v.recordId',invoice[0].Id);
        var customerId = invoice[0].customer__c;
        var recordId = component.get('v.recordId');
        var pageReference = {
            type: 'standard__component',

            attributes: {
                componentName: 'c__SPM_NewInvoiceCmp',
            },

            state: {
                "c__Id": recordId,
                "c__customerId": customerId,
                "c__model": 'edit',
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);
       $A.get('e.force:refreshView').fire();
       
    },

    deleteInvoices: function (component, row) {
        var action = component.get("c.deleteInvoice");
        action.setParams({ 'invoice': row });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                alert();
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    $A.get('e.force:refreshView').fire();
                } else {
                    for (var message in customResponse.messages) {
                        console.log(message);
                    }
                }
            }
            else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);

    }
   

    
    
})