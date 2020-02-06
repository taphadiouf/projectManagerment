({
	myAction : function(component, event, helper) {
		
	},
    doInit : function(component,event,helper){
        //find all users
        
        //helper.getAllProjects(component);
        //find all SPM_GenderCs
        ///helper.getAllMembersWithoutProject(component);
        //find all SPM_GenderCs
       helper.getAllTypes(component);
        //find all ContratCs
        //helper.getAllStatus(component);
		//helper.showToast(component);
		//helper.getAllValidFor(component);
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

     /*memberChange: function (component, event) {
        var selectedOptionValue = event.getParam("value");
        var absence = component.get('v.absence');
        absence.ContactId = selectedOptionValue;
        component.set('v.absence',absence);
    },
    projectChange: function (component, event, helper) {
        var selectedOptionValue = event.getParam("value");
        var absence = component.get('v.absence');
        absence.AccountId = selectedOptionValue;
        component.set('v.absence',absence);
       // helper.getAllMembers(component,selectedOptionValue);
    },*/

    typeChange: function (component, event) {
        var selectedOptionValue = event.getParam("value");
        var absence = component.get('v.absence');
        absence.SuppliedPhone= selectedOptionValue;
        component.set('v.absence',absence);
    },
    /*statusChange: function (component, event) {
        var selectedOptionValue = event.getParam("value");
        var absence = component.get('v.absence');
        absence.SuppliedCompany = selectedOptionValue;
        component.set('v.absence',absence);
	},

	validForChange: function (component, event) {
        var selectedOptionValue = event.getParam("value");
        var absence = component.get('v.absence');
        absence.SuppliedName = selectedOptionValue;
        component.set('v.absence',absence);
	},*/
	
    openModel: function(component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpen", true);
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
                var absence = component.get("v.absence"),
                    startDate = absence.CreatedDate;
                if(startDate != '' && startDate < todayFormattedDate){
                    component.set("v.startDateValidationError" , true);
                }else{
                    component.set("v.startDateValidationError" , false);
                }
                
            },
            endDateUpdate : function(component, event, helper) {
        
            var absence = component.get("v.absence"),
            startDate = absence.CreatedDate,
            endDate = absence.EndDate__c;
            if(endDate != '' && endDate <= startDate){
            component.set("v.endDateValidationError" , true);
            }else{
            component.set("v.endDateValidationError" , false);
            }}
})