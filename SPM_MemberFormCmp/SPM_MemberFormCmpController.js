({
	myAction : function(component, event, helper) {
		
	},
    doInit : function(component,event,helper){
        //find all users
        helper.getAllUsers(component);
        //find all Organisation units
        helper.getAllOrganisationUnits(component);
        //find all SPM_GenderCs
        helper.getAllGenders(component);
        //find all ContratCs
        helper.getAllContrats(component);
        //helper.showToast(component);
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

    /*call dateUpdate function on onchange event on date field*/ 
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
     var member = component.get("v.member"),
        startDate = member.Birthdate;
        if(startDate != '' && startDate < todayFormattedDate){
            component.set("v.startDateValidationError" , true);
        }else{
            component.set("v.startDateValidationError" , false);
        }
    },

    endDateUpdate : function(component, event, helper) {
        
     var member = component.get("v.member"),
        startDate = member.Birthdate,
        endDate = member.EndDate__c;
        if(endDate != '' && endDate <= startDate){
            component.set("v.endDateValidationError" , true);
        }else{
            component.set("v.endDateValidationError" , false);
        }
    }
})