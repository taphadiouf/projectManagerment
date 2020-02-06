({

    doInit: function (component, event, helper) {
        var menu = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' },
        ];
        component.set('v.columns', [
            { label: 'Project', fieldName: 'project', type: 'name' },
            { label: 'Member Has Project', fieldName: 'member', type: 'name' },
            { label: 'Amount', fieldName: 'amount__c', type: 'currency', cellAttributes: { alignment: 'left' } },
            { label: 'External Company', fieldName: 'SuppliedCompany', type: 'text' },
            { label: 'Payment Type', fieldName: 'Origin', type: 'picklist' },
            { label: 'Billable', fieldName: 'SuppliedName', type: 'text' },
            { label: 'Expense Type', fieldName: 'Type', type: 'picklist' },
            { label: 'Expense Date', fieldName: 'CreatedDate', type: 'text' },
            { label: 'Reimbursable', fieldName: 'SuppliedPhone', type: 'text' },
            {
                type: 'action',
                typeAttributes: { rowActions: menu },
            }
        ]);
        var pageSize = component.get("v.pageSize");
        var action = component.get("c.getAllExpenses");
        action.setCallback(this, function (response) {

            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var expenses = response.getReturnValue().data;
                expenses.forEach(expense => {
                    if (expense.hasOwnProperty('Account')) {
                        var acc = expense.Account;
                        if (acc.hasOwnProperty('Name')) {
                            expense['project'] = expense.Account.Name;
                        } 
                    }
                    if (expense.hasOwnProperty('Member_has_project__r')) {
                        var cont = expense.Member_has_project__r;
                        if (cont.hasOwnProperty('SPM_Members__r')) {
                            var contacte = cont.SPM_Members__r;
                            if (contacte.hasOwnProperty('Name')) {
                                expense['member'] = contacte.Name;
                            }
                        }
                    } 
                });

                component.set('v.expenses', expenses);
                console.log('expenses', JSON.stringify(expenses));
                component.set("v.totalSize", component.get("v.expenses").length);
                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);
                var numberOfExpenseToDisplay = expenses.slice(0, pageSize);
                component.set('v.numberOfExpenseToDisplay', numberOfExpenseToDisplay);

                //console.log(numberOfExpenseToDisplay);

            }

        });

        $A.enqueueAction(action);

    },

    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'show_details':
                helper.showRowDetails(component, event, row);
                break;
            case 'delete':
                helper.deleteExpense(component, row);
                break;
            case 'edit':
                helper.editExpense(component, row);
            default:
        }
    },

    openModalNewExpense: function (component, event, helper) {
        component.set('v.isModalOpened', true);
    },

    addExpenseToList: function (component, event, helper) {
        var expense = event.getParam('expense');
        console.log('test expense ' + JSON.stringify(expense));
        var numberOfExpenseToDisplay = component.get('v.numberOfExpenseToDisplay');
        var expenses = component.get('v.expenses');
        expenses.unshift(expense[0]);
        numberOfExpenseToDisplay.unshift(expense[0]);
        component.set('v.numberOfExpenseToDisplay', numberOfExpenseToDisplay);
        component.set('v.expenses', expenses);
        console.log('-----expenses ' + JSON.stringify(component.get('v.expenses')));
        $A.get('e.force:refreshView').fire();
    },

    displayExpenseFiltered: function (component, event, helper) {
        var filter = event.getParam('filter');
        var expenses = component.get('v.expenses');

        var dataTemp = expenses.filter((expense) => { return (expense.Member_has_project__c.includes(filter.membersHasProject)) && (expense.Type.includes(filter.expenseType)) && (expense.AccountId.includes(filter.project)) });

        component.set('v.expenseSelected', dataTemp);
        component.set("v.totalSize", component.get("v.expenseSelected").length);

        var numberOfExpenseToDisplay = [];

        for (var i = 0; i < component.get("v.totalSize"); i++) {

            numberOfExpenseToDisplay.push(component.get("v.expenseSelected")[i]);

        }
        component.set('v.numberOfExpenseToDisplay', numberOfExpenseToDisplay);
    }

})