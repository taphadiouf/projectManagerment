({
     getAllInvoiceLineTypes : function(component) {
         var action = component.get("c.getAllInvoiceLineType");
         action.setCallback(this, function(response) {
             var state = response.getState();
             if (state === "SUCCESS") {
                 var customResponse=response.getReturnValue();
                 if(customResponse.hasError ==false){
                   let invoiceLineTypes=customResponse.data;
                   invoiceLineTypes.forEach(function(invoiceLineType){
                    invoiceLineType.value=invoiceLineType.invoiceLineTypeValue__c;
                    invoiceLineType.label=invoiceLineType.Name;
                     });
                     component.set("v.invoiceLineTypes",invoiceLineTypes);
                 } else {
                     console.log(customResponse.message);
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
     },
     getAllInvoiceLineRates : function(component) {
         var action = component.get("c.getAllInvoiceLineRate");
         action.setCallback(this, function(response) {
             var state = response.getState();
             if (state === "SUCCESS") {
                 var customResponse=response.getReturnValue();
                 if(customResponse.hasError ==false){
                   let invoiceLineRates=customResponse.data;
                   invoiceLineRates.forEach(function(invoiceLineRate){
                    invoiceLineRate.value=invoiceLineRate.invoiceLineRateValue__c;
                    invoiceLineRate.label=invoiceLineRate.Name;
                     });
                     component.set("v.invoiceLineRates",invoiceLineRates);
                 } else {
                     console.log(customResponse.message);
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