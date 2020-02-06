({
    myAction : function(component, event, helper) {

    },
    doInit: function (component, event, helper) {
        var recordId = component.get('v.recordId');
        if (recordId != null) {
            var action = component.get("c.getWorkUnitById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.workUnit', customResponse.data);
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
    addWorkUnit: function (component, event, helper) {

        var evt = $A.get('e.c:SPM_IsFormValidEvt');
        evt.fire();
        if (component.get('v.isValidFields') == true) {
            var workUnit = component.get('v.workUnit');
            var action = component.get("c.createWorkUnit");
            action.setParams({ workUnit: workUnit });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log(response.getReturnValue().data);
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        workUnit.NumberOfContacts = '',
                            workUnit.HierarchyNumberOfContacts='',
                                workUnit.NumberOfConvertedLeads='',
                                    workUnit.HierarchyNumberOfConvertedLeads='',
                                        workUnit.NumberOfLeads='',
                                            workUnit.HierarchyNumberOfLeads='',
                                                workUnit.NumberSent='',
                                                    workUnit.HierarchyNumberSent='',
                                                        workUnit.TimeSheet__c='', 
                        component.set('v.workUnit', workUnit);
                        helper.showToast('Success', 'Success', 'The record has been created successfully');
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
        }
    },
    updateWorkUnit: function (component, event, helper) {
        var workUnits = [component.get('v.workUnit')];
        var action = component.get("c.updateWorkUnit");
        action.setParams({ workUnits: workUnits });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    helper.showToast('Success', 'Success', 'The record has been updated successfully');
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
    timeSheetChange: function (component, event) {
        var selectedOptionValue = component.get("v.timeSheetId");
        var workUnit = component.get('v.workUnit');
        workUnit.TimeSheet__c = selectedOptionValue;
        component.set('v.workUnit',workUnit);
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
    totalTheHours:function(component,event,helper){
        let workHours=event.get("v.workUnit");
        var totalHours=0;
        workHours.forEach(function(hour){
            totalHours=totalHours+hour;
        });
        component.set("v.workUnit.HierarchyNumberSent",totalHours);
    },
    isOpened:function(component,event,helper){
        component.set("v.isOpened",true);
        helper.openModal(component,event,helper);
    },
   
    
})