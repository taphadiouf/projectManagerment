({
    doInit: function (component, event, helper) {
        var menu = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' },
            { label: 'Add Project', name: 'newProject' }
        ];
        component.set('v.columns', [
            { label: 'Name', fieldName: 'Name', type: 'name' },
            { label: 'Start Date', fieldName: 'StartDate', type: 'Date' },
            { label: 'End Date', fieldName: 'EndDate', type: 'Date' },
            {
                type: 'action',
                typeAttributes: { rowActions: menu },
            }
        ]);
        var pageSize = component.get("v.pageSize");

        var action = component.get("c.getAllPrograms");

        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var programs = response.getReturnValue().data;
               component.set('v.programs', programs);
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.programs").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfProgramsToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {

                    for (var i = 0; i < component.get('v.totalSize'); i++) {

                        numberOfProgramsToDisplay.push(programs[i]);

                    }
                }else{
                    for (var i = 0; i < pageSize; i++) {

                        numberOfProgramsToDisplay.push(programs[i]);

                    }
                }

                component.set('v.numberOfProgramsToDisplay', numberOfProgramsToDisplay);


            }

        });

        $A.enqueueAction(action);

    },

    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'show_details':
                helper.showDetail(component, event, row);
                break;
            case 'delete':
                helper.deletePrograms(component, row);
                break;
            case 'edit':
                helper.editProgram(component, row);
                break;
            case 'newProject':
                helper.newProject(component, row);
                break;
            default:
        }
    },
   
    openModalNewProgram:function(component,event,helper){
        component.set('v.isModal',true);
    },
})