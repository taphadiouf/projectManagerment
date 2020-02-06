({
    myAction : function(component, event, helper) {

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
     var program = component.get("v.program"),
        startDate = program.StartDate;
        if(startDate != '' && startDate < todayFormattedDate){
            component.set("v.startDateValidationError" , true);
        }else{
            component.set("v.startDateValidationError" , false);
        }
    },
    

    endDateUpdate : function(component, event, helper) {        
     var program = component.get("v.program"),
        startDate = program.StartDate,
        endDate = program.EndDate;
        if(endDate != '' && endDate <= startDate){
            component.set("v.endDateValidationError" , true);
        }else{
            component.set("v.endDateValidationError" , false);
        }}
    
})