({
    getAllProjectByCustomer : function(component, customerId) {
         var action = component.get("c.getProjectsByCustomer");
         action.setParams({customerId : customerId})
         action.setCallback(this, function(response) {
             
             var state = response.getState();
             if (state === "SUCCESS") {
                 var customResponse=response.getReturnValue();
                 if(customResponse.hasError ==false){
                   let projects=customResponse.data;
                   console.log('projects ' +JSON.stringify(projects));
                   projects.forEach(function(project){
                        if (project.hasOwnProperty('Name')) {
                            project.label=project.Name;
                        } else {
                            project.label='';
                        }
                        project.value=project.Id; 
                         
                     });
                     component.set("v.projects",projects);
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
    getAllCustomers : function(component) {
         var action = component.get("c.getAllCustomers");
         action.setCallback(this, function(response) {
             
             var state = response.getState();
             if (state === "SUCCESS") {
                 var customResponse=response.getReturnValue();
                 if(customResponse.hasError ==false){
                   let customers=customResponse.data;
                   console.log('customers ' +JSON.stringify(customers));
                   customers.forEach(function(customer){
                        if (customer.hasOwnProperty('Name')) {
                            customer.label=customer.Name;
                        } else {
                            customer.label='';
                        }
                        customer.value=customer.Id; 
                         
                     });
                     component.set("v.customer",customers);
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
     getAllPaymentTypes : function(component) {
         var action = component.get("c.getAllPaymentTypes");
         action.setCallback(this, function(response) {
             var state = response.getState();
             if (state === "SUCCESS") {
                 var customResponse=response.getReturnValue();
                 if(customResponse.hasError ==false){
                   let paymentTypes=customResponse.data;
                   paymentTypes.forEach(function(paymentType){
                     paymentType.value=paymentType.paymentTypeValue__c;
                     paymentType.label=paymentType.Name;
                     });
                     component.set("v.paymentTypes",paymentTypes);
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
     getAllInvoiceTypes : function(component) {
         var action = component.get("c.getAllInvoiceTypes");
         action.setCallback(this, function(response) {
             var state = response.getState();
             if (state === "SUCCESS") {
                 var customResponse=response.getReturnValue();
                 if(customResponse.hasError ==false){
                   let invoiceTypes=customResponse.data;
                   invoiceTypes.forEach(function(invoiceType){
                    invoiceType.value=invoiceType.invoiceTypeValue__c;
                    invoiceType.label=invoiceType.Name;
                     });
                     component.set("v.invoiceTypes",invoiceTypes);
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
     getAllInvoiceStatus : function(component) {
         var action = component.get("c.getAllInvoiceStatus");
         action.setCallback(this, function(response) {
             var state = response.getState();
             if (state === "SUCCESS") {
                 var customResponse=response.getReturnValue();
                 if(customResponse.hasError ==false){
                   let invoiceStatus=customResponse.data;
                   invoiceStatus.forEach(function(invoiceStatu){
                    invoiceStatu.value=invoiceStatu.invoiceStatusValue__c;
                    invoiceStatu.label=invoiceStatu.Name;
                     });
                     component.set("v.invoiceStatus",invoiceStatus);
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