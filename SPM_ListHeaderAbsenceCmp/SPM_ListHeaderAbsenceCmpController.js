({

    searchKeyChange: function (component, event) {

        var searchKey = component.get("v.searchKey"),
            objects = component.get('v.objects');
        console.log(searchKey);
        var dataTemp = objects.filter(object => object.Name.toLowerCase().includes(searchKey.toLowerCase()));
        if ($A.util.isEmpty(searchKey)) {
            component.set('v.objetsSelected', objects);
        } else {
            component.set('v.objetsSelected', dataTemp);
        }
        component.set("v.totalSize", component.get("v.objetsSelected").length);

        var numberOfLinesToDisplay = [];

        for (var i = 0; i < component.get("v.totalSize"); i++) {

            numberOfLinesToDisplay.push(component.get("v.objetsSelected")[i]);

        }
        component.set('v.numberOfLinesToDisplay', numberOfLinesToDisplay);
    },

    onSelectChange: function (component, event, helper) {

        var selected = component.find("records").get("v.value");

        var numberOfLinesToDisplay = [];

        var objects = component.get("v.objects");
        if (objects.length < selected) {

            for (var i = 0; i < objects.length; i++) {

                numberOfLinesToDisplay.push(objects[i]);

            }
        }else{
            for (var i = 0; i < selected; i++) {

                numberOfLinesToDisplay.push(objects[i]);

            }
        }

        component.set('v.numberOfLinesToDisplay', numberOfLinesToDisplay);

    },

    openModalNewAbsence: function (component, evt) {
        component.set('v.isModalNewAbsence', true);
    },

})