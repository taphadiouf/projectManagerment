({
    myAction : function(component, event, helper) {

    },
    doInit : function(component,event,helper){
      
        helper.getAllMembers(component);

    },
    /* handleNewTimeSheetCreation: function(component, event, helper){
        var createdTimeSheets = event.getParam('timeSheet');
        var timeSheets = component.get('v.timeSheet');
        createdTimeSheets.forEach(function(timeSheet){
            timeSheet.label = timeSheet.Name;
            timeSheet.value = timeSheet.Id;
            timeSheets.push(timeSheet);
        });
        component.set('v.timeSheet',timeSheets)
    }, */
    verifyFields:function(component, event,helper){
        var isValidForm = component.find('isValideField').reduce((validSoFar,inputCmp)=>{
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        },true);
        if(isValidForm){
            component.set('v.isValidFields',true);
        }
            
    },
    memberChange: function(component, event, helper){
        var selectedOptionValue = component.get("v.memberId");
        var timeSheet = component.get('v.timeSheet');
        timeSheet.SPM_Members__c = selectedOptionValue; 
        //console.log(' ############# membre '+JSON.stringify(timeSheet));
        component.set('v.timeSheet',timeSheet);
    },
    openModal: function(component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpen", true);
     },
})