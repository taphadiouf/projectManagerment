({

    deleteCustomers: function (component, row) {
        var action = component.get("c.deleteCustomer");
        var customer = [JSON.parse(JSON.stringify(row))];
        action.setParams({ customers: customer });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    var customers = component.get('v.numberOfCustomersToDisplay');
                    var customersAfterDelete = customers.filter(cust => cust.Id != customer[0].Id);
                    component.set('v.numberOfCustomersToDisplay', customersAfterDelete);

                    /*var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "The record has been deleted successfully.",
                        "type": "Success"
                    });
                    toastEvent.fire();*/
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

    },

    showRowDetails: function (component, event, row) {
        var customer = [JSON.parse(JSON.stringify(row))];
        console.log(customer[0].Id)
        component.set('v.recordId', customer[0].Id);
        var recordId = component.get('v.recordId');
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__ShowCustomerDetailsCmp',
            },
            state: {
                "c__Id": recordId,
                "c__customerId": customer[0].Id
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
        var pageReference = component.get("v.pageReference");
        event.preventDefault();
        navService.navigate(pageReference);

    },


    editCustomer: function (component, row) {
        var customer = JSON.parse(JSON.stringify(row));
        component.set('v.isModal', true);
        component.set('v.recordId', customer.Id);
        var action = component.get("c.getCustomerById");
        action.setParams({ id: customer.Id });
        action.setCallback(this, (response) => {
            var state = response.getState();
            if (state === "SUCCESS") {
                var customResponse = response.getReturnValue();
                if (customResponse.hasError == false) {
                    console.log(customResponse.data);
                    component.set('v.customer', customResponse.data);
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
    },

    arrayRemove: function (arr, value) {

        return arr.filter(function (ele) {
            return ele != value;
        });

    },

    openMoadalCustomerHProject: function (component, row) {
        var customer = JSON.parse(JSON.stringify(row));
        component.set('v.isModalCustomerHProject', true);
        component.set('v.recordId', customer.Id);
    }

})