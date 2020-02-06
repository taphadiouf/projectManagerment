({
    doInit : function(component,event,helper){
      helper.getAllCustomers(component);
      helper.getAllPaymentTypes(component);
      helper.getAllInvoiceTypes(component);
      helper.getAllInvoiceStatus(component);
    },
    verifyFields:function(component, event,helper){
        var isValidForm = component.find('isValideField').reduce((validSoFar,inputCmp)=>{
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        },true);
        if(isValidForm){
            component.set('v.isValidFields',true);
        }
            
    },
    customerChange: function(component, event, helper){
        var customerId = event.getParam("value");
        helper.getAllProjectByCustomer(component, customerId);
    
    
    },
            startDateUpdate : function(component, event, helper) {
                
                var today = new Date();        
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();
                // if date is less then 10, then append 0 before date   
                if(dd < 10){
                    dd = '0' + dd;
                } 
                // if month is less then 10, then append 0 before date    
                if(mm < 10){
                    mm = '0' + mm;
                }
                
                var todayFormattedDate = yyyy+'-'+mm+'-'+dd;
                var invoice = component.get("v.invoice"),
                    startDate = invoice.End_Date__c;
                if(startDate != '' && startDate < todayFormattedDate){
                    component.set("v.startDateValidationError" , true);
                }else{
                    component.set("v.startDateValidationError" , false);
                }
                
            }
   
    
})