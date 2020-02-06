({

    doInit: function (component, event, helper) {
        
        
        var menu = [
            { label: 'Show details', name: 'show_details' },
        ];
        component.set('v.columns', [
            { label: 'First Name', fieldName: 'FirstName', type: 'text' },
            { label: 'LAst Name', fieldName: 'LastName', type: 'text' },
            { label: 'Email', fieldName: 'Username', type: 'text' },
            { label: 'Role', fieldName: 'UserRoleId', type: 'text' },
            { label: 'Profile', fieldName: 'ProfileId', type: 'text' },
            {
                type: 'action',
                typeAttributes: { rowActions: menu },
            }
        ]);
        var pageSize = component.get("v.pageSize");

        var action = component.get("c.getAllUsers");

        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var users = response.getReturnValue().data;
                console.log(users[1].Profile)
                //console.log('users',(JSON.stringify(users)));
                users.forEach(user => {
                    if (user.Profile != null) {
                        user.ProfileId = user.Profile.Name;
                    }
                    if (user.UserRole != null) {
                        user.UserRoleId = user.UserRole.Name;
                    }
                });
                component.set('v.users', users);
                console.log(response.getReturnValue().data);
                //console.log(response.getReturnValue().apexPages);
                component.set("v.totalSize", component.get("v.users").length);

                component.set("v.start", 0);

                component.set("v.end", pageSize - 1);

                var numberOfUsersToDisplay = [];
                if (component.get('v.totalSize') < pageSize) {

                    for (var i = 0; i < component.get('v.totalSize'); i++) {

                        numberOfUsersToDisplay.push(users[i]);

                    }
                } else {
                    for (var i = 0; i < pageSize; i++) {

                        numberOfUsersToDisplay.push(users[i]);

                    }
                }

                component.set('v.numberOfUsersToDisplay', numberOfUsersToDisplay);

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
            default:
        }
    }
})