({

    doInit: function (component, event, helper) {
        var menu = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' },
        ];
        component.set('v.columns', [
            { label: 'Member', fieldName: 'ContactId', type: 'text' },
            { label: 'Type', fieldName: 'SuppliedPhone', type: 'picklist' },
            { label: 'Status', fieldName: 'Absence_Status__c', type: 'text' },
            { label: 'Start Date', fieldName: 'CreatedDate', type: 'date' },
            { label: 'End Date', fieldName: 'EndDate__c', type: 'date' },
            {
                type: 'action',
                typeAttributes: { rowActions: menu },
            }
        ]);
        var pageSize = component.get("v.pageSize");

        var action = component.get("c.getAllAbsences");

        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var absences = response.getReturnValue().data;
                //console.log('#L absences', (JSON.stringify(absences)));
                absences.forEach(absence => {
                    if(absence.hasOwnProperty('Contact')){
                        if(absence.Contact.hasOwnProperty('Name')){
                       		absence.ContactId = absence.Contact.Name;
                    		absence.Name = absence.Contact.Name;
                        }
                     }
                     
                });

                absences.forEach(absence => {
                    if(absence.hasOwnProperty('Absence_Status__c')){
                        absence.Absence_Status__c = absence.Absence_Status__c;

                     }
                     else {
                        absence.Absence_Status__c = '';
                     }
                     
                });

                
                component.set('v.absences', absences);
               	console.log( absences.length);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.absences").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfAbsencesToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {

                    for (var i = 0; i < component.get('v.totalSize'); i++) {

                        numberOfAbsencesToDisplay.push(absences[i]);

                    }
                } else {
                    for (var i = 0; i < pageSize; i++) {

                        numberOfAbsencesToDisplay.push(absences[i]);

                    }
                }
				
                component.set('v.numberOfAbsencesToDisplay', numberOfAbsencesToDisplay);
                    
				console.log('#L absence affiche', (JSON.stringify(component.get('v.numberOfAbsencesToDisplay'))));
                console.log(numberOfAbsencesToDisplay);

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
                alert('Delete');
                helper.deleteAbsence(component, row);
                break;
            case 'edit':
                helper.editAbsence(component, row);
            default:
        }
    },

    openModalAddAbsence: function (component, event, helper) {
        component.set('v.isModal', true);
    },

    addAbsenceTolist: function (component, event, helper) {
        var absence = event.getParam('absence');
        var numberOfAbsencesToDisplay = component.get('v.numberOfAbsencesToDisplay');
        var absences = component.get('v.absences');
        absences.unshift(absence);
        numberOfAbsencesToDisplay.unshift(absence);
        component.set('v.numberOfAbsencesToDisplay', numberOfAbsencesToDisplay);
        component.set('v.absences', absences);
    },

    getAbsencesFiltered: function (component, event, helper) {
        console.log('event handle')
        var filter = event.getParam('filter'),
            absences = component.get('v.absences');
        console.log('member ' + filter.member+ 'type '+filter.type)
        var dataTemp = absences.filter((absence) => {
            return (
                absence.SuppliedPhone.toLowerCase().includes(filter.type.toLowerCase()) &&
                absence.Contact.Id.includes(filter.member))
        });
        console.log('After filter ' + dataTemp)
        component.set('v.absencesSelected', dataTemp);
        component.set("v.totalSize", component.get("v.absencesSelected").length);
        var numberOfAbsencesToDisplay = [];
 
        for (var i = 0; i < component.get("v.totalSize"); i++) {

            numberOfAbsencesToDisplay.push(component.get("v.absencesSelected")[i]);

        }
        component.set('v.numberOfAbsencesToDisplay', numberOfAbsencesToDisplay);
    }

})