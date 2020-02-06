({
    doInit : function(component,event,helper){
      helper.getAllInvoiceLineTypes(component);
      helper.getAllInvoiceLineRates(component);
      

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
    vatChange : function(component, event, helper){
        var vat = event.getParam("value");
        var invoiceLines = component.get("v.invoiceLines");
        invoiceLines.forEach(invoiceLine =>{
            invoiceLine.TotalOpportunityQuantity = vat;
        });
        component.set('v.invoiceLines', invoiceLines);
    },
    taxChange : function(component, event, helper){
        var tax = event.getParam("value");
        var invoiceLines = component.get("v.invoiceLines");
        invoiceLines.forEach(invoiceLine =>{
            invoiceLine.Duration__c = tax;
        });
        component.set('v.invoiceLines', invoiceLines);
    },
    AddNewRow : function(component, event, helper){
        var addRowInList = component.get("v.invoiceLines");
        var contactObj = {
            'SPM_Description__c': '',
            'SPM_InvoiceLineType__c': '',
            'Units__c': '',
            'amount__c': '',
            'StageName': '',
            'TotalOpportunityQuantity': '',
            'Duration__c': ''
        };
        addRowInList.push(contactObj);
        component.set("v.invoiceLines",addRowInList);
    
    }, 
    removeRow : function(component, event, helper){
        var whichOne = event.target.getAttribute("id")
        var AllRowsList = component.get("v.invoiceLines");
        AllRowsList.splice(whichOne, 1);
        component.set("v.invoiceLines", AllRowsList);
    }
    
    
})