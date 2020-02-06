({
    doInit: function (component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        var model = myPageRef.state.c__model;
        var customerId = myPageRef.state.c__customerId;
        if (model === 'edit') {
            component.set('v.customerId', customerId);
            var recordId = myPageRef.state.c__Id;
            console.log('customerId---  ' + component.get('v.customerId'));
            component.set('v.recordId', recordId);
            if (recordId != null) {
                var action = component.get("c.getProjectsByCustomer");
                action.setParams({ customerId: customerId })
                action.setCallback(this, function (response) {
                    var state = response.getState();
                    if (state == "SUCCESS") {
                        var customResponse = response.getReturnValue();
                        if (customResponse.hasError == false) {
                            var projects = customResponse.data;
                            console.log('projects ' + JSON.stringify(projects));
                            projects.forEach(function (project) {
                                if (project.hasOwnProperty('Name')) {
                                    project.label = project.Name;
                                } else {
                                    project.label = '';
                                }
                                project.value = project.Id;

                            });
                            component.set('v.projects', projects);
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
                var action = component.get("c.getInvoiceById");
                action.setParams({ id: component.get('v.recordId') });
                action.setCallback(this, (response) => {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var customResponse = response.getReturnValue();
                        if (customResponse.hasError == false) {
                            console.log('edit data ' + customResponse.data.customer__c);
                            component.set('v.customerId', customResponse.data.customer__c);
                            component.set('v.invoice', customResponse.data);
                            component.set('v.invoiceLines', customResponse.invoiceLinesData);
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

        }

    },

    addInvoice: function (component, event, helper) {
        var invoiceLines = component.get("v.invoiceLines");
        var evt = $A.get('e.c:SPM_IsFormValidEvt');
        evt.fire();
        if (component.get('v.isValidFields') == true) {
            var invoice = component.get('v.invoice');
            console.log('invoice ' + JSON.stringify(invoice));
            var action = component.get("c.createInvoice");
            action.setParams({ invoice: invoice, invoiceLines: invoiceLines });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log('invoiceData  ###' + JSON.stringify(response.getReturnValue().invoiceData));
                    var customResponse = response.getReturnValue();
                    if (customResponse.hasError == false) {
                        invoice.End_Date__c = '',
                            invoice.paymentTerm__c = '',
                            invoice.Status_Member__c = '',
                            invoice.Status = '',
                            invoice.Type__c = '',
                            invoice.customer__c = '',
                            invoice.AccountId = '',
                            invoiceLines.SPM_Description__c = '',
                            invoiceLines.SPM_InvoiceLineType__c = '',
                            invoiceLines.Units__c = '',
                            invoiceLines.amount__c = '',
                            invoiceLines.StageName = '',
                            invoiceLines.TotalOpportunityQuantity = '',
                            invoiceLines.Duration__c = ''
                        component.set('v.invoice', invoice);
                        component.set('v.invoiceLines', invoiceLines);
                        helper.showToast('Success', 'Success', 'The record has been created successfully');
                        helper.addressable(component, event, helper);
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
            $A.enqueueAction(action);
        }
    },

    updateInvoices: function (component, event, helper) {
        var invoice = component.get('v.invoice');
        var invoiceLines = component.get('v.invoiceLines');
        console.log('invoice for updating' + JSON.stringify(invoice));
        var action = component.get("c.updateInvoice");
        action.setParams({ invoice: invoice, invoiceLines: invoiceLines });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('invoice updated ' + JSON.stringify(response.getReturnValue().data));
                console.log('invoiceLines updated ' + JSON.stringify(response.getReturnValue().invoiceLinesData));
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    helper.showToast('Success', 'Success', 'The record has been updated successfully');
                    helper.addressable(component, event, helper);
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
        $A.enqueueAction(action);

    },


    close: function (component, event, helper) {
        helper.addressable(component, event, helper);
    }
})