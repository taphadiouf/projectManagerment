({
    helperMethod : function() {

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
     showToast: function( title,type, message ){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
			"message": message,
			"type": type
        });
        toastEvent.fire();
    },
    getAllTimeSheets : function(component) {
        var action = component.get("c.getAllTimeSheets");
        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse=response.getReturnValue();
                if(customResponse.hasError ==false){
                  var maList = component.get("v.timeSheets");
                  let timeSheets=customResponse.data;
                  timeSheets.forEach(function(timeSheet){
                        maList.push({'value':timeSheet.Id,'label':timeSheet.Id});
                    });
                    component.set("v.timeSheets",timeSheets);
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
})