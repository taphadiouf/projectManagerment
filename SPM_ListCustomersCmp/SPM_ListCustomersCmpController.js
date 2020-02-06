({

    doInit: function (component, event, helper) {
        var menu = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' },
            { label: 'Assigne Project', name: 'assign_project' }
        ];
        component.set('v.columns', [
            { label: 'Name', fieldName: 'Name', type: 'name' },
            { label: 'Adress', fieldName: 'MailingCity', type: 'text' },
            { label: 'Contact', fieldName: 'Title', type: 'text' },
            { label: 'Contact_Person', fieldName: 'AssistantName', type: 'text' },
            { label: 'Note', fieldName: 'Department', type: 'text' },
            {
                type: 'action',
                typeAttributes: { rowActions: menu },
            }
        ]);
        var pageSize = component.get("v.pageSize");

        var action = component.get("c.getAllCustomers");

        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var customers = response.getReturnValue().data;
               component.set('v.customers', customers);
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.customers").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfCustomersToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {

                    for (var i = 0; i < component.get('v.totalSize'); i++) {

                        numberOfCustomersToDisplay.push(customers[i]);

                    }
                }else{
                    for (var i = 0; i < pageSize; i++) {

                        numberOfCustomersToDisplay.push(customers[i]);

                    }
                }

                component.set('v.numberOfCustomersToDisplay', numberOfCustomersToDisplay);


            }

        });

        $A.enqueueAction(action);

    },

    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'show_details':
                helper.showRowDetails(component,event,row);
                break;
            case 'delete':
                helper.deleteCustomers(component, row);
                break;
            case 'edit':
                helper.editCustomer(component, row);
                break;
            case 'assign_project':
                helper.openMoadalCustomerHProject(component,row);
                break;
            
            default:
        }
    },
   
    openModalNewCustomer:function(component,event,helper){
        component.set('v.isModal',true);
        component.set('v.recordId','');
    },

    addCustomerToList: function(component,event,helper){
        var customer = event.getParam('customer');
        var numberOfCustomersToDisplay = component.get('v.numberOfCustomersToDisplay');
        var customers = component.get('v.customers');
        customers.unshift(customer);
        numberOfCustomersToDisplay.unshift(customer);
        component.set('v.numberOfCustomersToDisplay',numberOfCustomersToDisplay);
        component.set('v.customers',customers);
    },
    displayCustomerFiltered: function (component, event, helper) {
        var filter = event.getParam('filter');
        var customers = component.get('v.customers');        
        console.log('filtered by ++++'+ filter.project)
        var dataTemp = customers.filter((customer) =>{ return (customer.AccountId.includes(filter.project))  });
                                  
        component.set('v.customersSelected', dataTemp);
        component.set("v.totalSize", component.get("v.customersSelected").length);

        var numberOfCustomerToDisplay = [];

        for (var i = 0; i < component.get("v.totalSize"); i++) {

            numberOfCustomerToDisplay.push(component.get("v.customersSelected")[i]);

        }
        component.set('v.numberOfCustomersToDisplay', numberOfCustomerToDisplay);
    }
})