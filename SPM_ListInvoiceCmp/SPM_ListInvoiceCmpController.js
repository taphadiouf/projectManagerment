({

    doInit: function (component, event, helper) {
        var myPageRef = component.get("v.pageReference");
        var model = myPageRef.state.c__model;
        if (model === 'back') {}
        var menu = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' }
          
        ];
        component.set('v.columns', [
            { label: 'Project', fieldName: 'project', type: 'name' },
            { label: 'Customer', fieldName: 'customer', type: 'name' },
            { label: 'Invoice Date', fieldName: 'End_Date__c', type: 'date' },
            { label: 'Payment Term', fieldName: 'paymentTerm__c', type: 'number' , cellAttributes: { alignment: 'left' } },
            { label: 'Payment Type', fieldName: 'Status_Member__c', type: 'picklist' },
            { label: 'Status', fieldName: 'Status', type: 'picklist' },
            { label: 'Type', fieldName: 'Type__c', type: 'picklist' },
            {
                type: 'action',
                typeAttributes: { rowActions: menu },
            }
        ]);
        var pageSize = component.get("v.pageSize");

        var action = component.get("c.getAllInvoices");

        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var invoices = response.getReturnValue().data;
                invoices.forEach(invoice =>{
                    invoice.Name = invoice.Account.Name;
                    invoice.project = invoice.Account.Name;
                    invoice.customer = invoice.customer__r.Name;
                });
               component.set('v.invoices', invoices);
                console.log('invoicess   '+JSON.stringify(response.getReturnValue().data));
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.invoices").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfInvoicesToDisplay = invoices.slice(0, pageSize);
                component.set('v.numberOfInvoicesToDisplay', numberOfInvoicesToDisplay);

                //console.log(numberOfInvoicesToDisplay);
            }

        });

        $A.enqueueAction(action);

    },

    addInvoice: function(component, event, helper){
        var recordId = "";
        var pageReference = {
            type: 'standard__component',
            attributes: {
                componentName: 'c__SPM_NewInvoiceCmp',
            },
            state: {
                "c__model": 'new',
            }
        };
        component.set("v.pageReference", pageReference);
        var navService = component.find("navService");
       var pageReference = component.get("v.pageReference");
       event.preventDefault();
       navService.navigate(pageReference);

    },

    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'show_details':
                helper.showRowDetails(component,event,row);
                break;
            case 'delete':
                helper.deleteInvoices(component, row);
                break;
            case 'edit':
                helper.editInvoice(component,event, row);
        
            default:
        }
    },
    displayInvoiceFiltered: function (component, event, helper) {
        var filter = event.getParam('filter');
        var invoices = component.get('v.invoices');        
        
        var dataTemp = invoices.filter((invoice) =>{ return (invoice.AccountId.includes(filter.project))  });
                                  
        component.set('v.invoiceSelected', dataTemp);
        component.set("v.totalSize", component.get("v.invoiceSelected").length);

        var numberOfInvoiceToDisplay = [];

        for (var i = 0; i < component.get("v.totalSize"); i++) {

            numberOfInvoiceToDisplay.push(component.get("v.invoiceSelected")[i]);

        }
        component.set('v.numberOfInvoicesToDisplay', numberOfInvoiceToDisplay);
    }
   
   

   /* addProjectToList: function(component, event,helper){
        var project = event.getParam('project');
        var numberOfInvoicesToDisplay = component.get('v.numberOfInvoicesToDisplay');
        var projects = component.get('v.projects');
        projects.unshift(project);
        numberOfInvoicesToDisplay.unshift(project);
        component.set('v.numberOfInvoicesToDisplay',numberOfInvoicesToDisplay);
        component.set('v.projects',projects);
    }*/
})