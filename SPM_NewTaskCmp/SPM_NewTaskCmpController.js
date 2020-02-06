({
    myAction : function(component, event, helper) {

    },
    addTask: function (component, event, helper) {
        console.log('icciiiiiii')
        /* var evt = $A.get('e.c:SPM_IsFormValidEvt');
        evt.fire(); */
        console.log('icciiiiiii------')
        //if (component.get('v.isValidFields') == true) {
            console.log('icciiiiiuuuuuuii')
            var task = component.get('v.task');
            if(component.get('v.projectId') != ''){
                task.AccountId = component.get('v.projectId');
                console.log('ici+++++++++')
                if(component.get('v.statusTask')==='Not Started'){
                    task.Status = 'Not Started Yet';
                }else if(component.get('v.statusTask')==='Started'){
                    task.Status = 'In Progress';
                }else if(component.get('v.statusTask')==='Tested'){
                    task.Status = 'Tested';
                }else if(component.get('v.statusTask')==='Done'){
                    task.Status = 'Done';
                }
            }
            console.log('task :::: '+task);
            var action = component.get("c.createTask");
            action.setParams({ task: task });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log(response.getReturnValue().data);
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        var evt = $A.get('e.c:SPM_TaskCreatedEvt');
                            evt.setParams({ 'newTask': customResponse.data[0],'isUpdate':false });
                            evt.fire();
                        task.Name= '',
                        task.AccountId='',
                        task.Description='',
                        task.StartDate__c='',
                        task.EndDate__c='',
                        task.ProductCode='',
                        task.Quantity='',
                        task.Billable_Hours__c='',
                        task.Logged_Hours__c='',
                        // task.Campaign__c='',
                        task.Status='',
                        component.set('v.task', task);
                        helper.showToast('Success', 'Success', 'The record has been created successfully');
                        $A.get('e.force:refreshView').fire();
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
       // }
    },


    /*openModalMember : function(component,evt){
        var evt = $A.get("e.c:SPM_MemberEvt");
        evt.setParam("isModal","true");
        evt.fire();
    }*/

    /*openModalMember: function (component, evt) {
        var modal = component.get("v.isModal");
        modal = true;
        component.set('v.isModal', modal);
    },*/

    doInit: function (component, event, helper) {
        var recordId = component.get('v.recordId');
        if (recordId != null) {
            var action = component.get("c.getTaskById");
            action.setParams({ id: recordId });
            action.setCallback(this, (response) => {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        console.log(customResponse.data);
                        component.set('v.task', customResponse.data);
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

    updateTasks : function (component, event, helper) {
        var task = component.get('v.task');
        if(task.hasOwnProperty('Account')){
            delete task.Account;
        }
        if(task.hasOwnProperty('assignMember')){
            delete task.assignMember;
        }
        if(task.hasOwnProperty('Cases')){
            delete task.Cases;
        }
        if(task.hasOwnProperty('numberActivityChecked')){
            delete task.numberActivityChecked;
        }
        var tasks = [task];
        console.log('task to update '+JSON.stringify(tasks))
        var action = component.get("c.updateTask");
        action.setParams({ tasks: tasks });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue().data);
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    helper.showToast('Success', 'Success', 'The record has been updated successfully');
                    
                     var evt = $A.get('e.c:SPM_TaskCreatedEvt');
                            evt.setParams({ 'taskUpdate': customResponse.data[0],'isUpdate':true });
                            evt.fire(); 
                    component.set('v.task',customResponse.data[0]);
                    $A.get('e.force:refreshView').fire();
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

    openModal: function (component, event, helper) {
        component.set('v.isModalOpened', true);
    },
    closeModal: function (component, event, helper) {
        component.set('v.isModal', false);
    },

    

})