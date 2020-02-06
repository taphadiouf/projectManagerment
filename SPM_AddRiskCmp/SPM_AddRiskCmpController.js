({ 
       addRisk: function (component, event, helper) {
        var evt = $A.get('e.c:SPM_IsFormRiskValidEvt');
        evt.fire();
        if (component.get('v.isValidFields') === true) {
            var risk = component.get('v.risk');
            if(component.get('v.projectId')){
                risk.AccountId = component.get('v.projectId');
            }
              
            risk.Duration__c = component.get('v.duration');
            risk.Maitrise__c = component.get('v.maitrise');
            risk.amount__c = component.get('v.amount');
            console.log('risk ---- '+typeof risk.Duration__c +'++++++++'+risk.Duration__c);
            component.set('v.risk',risk);
            var action = component.get("c.createRisk");
            action.setParams({risk: risk });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log('values', JSON.stringify(response.getReturnValue()));
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        var newRiskEvt = component.getEvent("SPM_RiskEvt");                  
                        newRiskEvt.setParam('risk',customResponse.data[0]);
                        newRiskEvt.fire();
                        
                        risk.Name = '',
                        risk.Type = '',
                        risk.DeliveryInstallationStatus__c = '',
                        risk.NextStep = '',
                        risk.Probability = '',
                        risk.AccountId='',
                        risk.Duration__c=2,
                        risk.amount__c=2,
                        risk.Maitrise__c=2    
                        
                        component.set('v.risk', risk);
                        helper.showToast('Success', 'Success', 'The record has been created successfully');
                        $A.get("e.force:refreshView").fire();
                        } else {
                        /*helper.showToast('Error', 'error', customResponse.messages);*/
                        for (var message in customResponse.messages) {
                            console.log(message);
                        }
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
            component.set("v.isModal", false);
            $A.enqueueAction(action);
        }
    },
    
    updateRisks: function (component, event, helper) {
        var risk = [component.get('v.risk')];
        var action = component.get("c.updateRisk");
        action.setParams({risk: risk });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    helper.showToast('Success', 'Success', 'The record has been updated successfully');
                    $A.get("e.force:refreshView").fire();
                } else {
                    helper.showToast('Error', 'error', customResponse.messages);
                    for (var message in customResponse.messages) {
                        console.log(message);
                    }
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
        component.set("v.isModal", false);
        $A.enqueueAction(action);
    },
    
    doInit: function (component, event, helper) {
        var recordId = component.get('v.recordId');
        if (recordId != null) {
            var action = component.get("c.getRiskById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.risk', customResponse.data);
                    } else {
                        for (var message in customResponse.messages) {
                            console.log(message);
                        }
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
},
    /*openModalMember: function (component, evt) {
        var evt = $A.get("e.c:SPM_RiskSEvt");
        evt.setParam("isModal","true");
        evt.fire();
        
    },
*/
    closeModal: function (component, event, helper) {
        component.set('v.isModal', false);
    }
    
})