({
    doInit : function(component,event,helper){
        

        //find all status
        helper.getAllStatus(component);
        //find all Types
        helper.getAllTypes(component);
        //find all projects
        helper.getAllProjects(component);   
    },
    projectChange: function (component, event) {
        var selectedOptionValue = event.getParam("value");
        var risk = component.get('v.risk');
        risk.AccountId = selectedOptionValue;
        component.set('v.risk',risk);	
    },
    statusChange: function (component, event) {
        var selectedOptionValue = event.getParam("value");
        var risk = component.get('v.risk');
        risk.DeliveryInstallationStatus__c = selectedOptionValue;
        component.set('v.risk',risk);
    },
    typeChange: function (component, event) {
        var selectedOptionValue = event.getParam("value");
        var risk = component.get('v.risk');
        risk.Type = selectedOptionValue;
        component.set('v.risk',risk);
    },
    
    verifyFields:function(component, event,helper){
        var isValidForm = component.find('isValideField').reduce((validSoFar,inputCmp)=>{
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        },true);
        if(isValidForm){
            component.set('v.isValidFields',true);
        }
            
        }
})