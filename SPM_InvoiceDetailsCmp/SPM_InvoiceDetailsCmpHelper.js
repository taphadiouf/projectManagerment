({
    showDetail: function(component){
        var recordId = component.get('v.recordId');
        var action = component.get("c.getInvoiceById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log('invoice'+customResponse.data);
                        component.set('v.invoice', customResponse.data);
                        let invoiceLines = customResponse.invoiceLinesData;
                        let amount = 0;
                        component.set('v.invoiceLines', invoiceLines);
                        invoiceLines.forEach(function(invoiceLine){
                            
                            amount += invoiceLine.Units__c * invoiceLine.amount__c;
                        });
                        component.set('v.total', amount);
                        
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