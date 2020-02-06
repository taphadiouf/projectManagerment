({

    // Your renderer method overrides go here

    render: function (component, helper) {
        console.log("---entry in render---");
        var ret = this.superRender();
        console.log('################  ret' + ret);
        console.log('##################### comp ' + component.get("v.tasks"));
        return ret;
    },
    afterRender: function (component, helper) {
        this.superAfterRender();
        console.log('##################### comp   after' + component.get("v.tasks"));
       // helper.getTaskByMemberId(component, event, helper);
    },
    rerender : function(component, helper) {
        this.superRerender();
        // Write your custom code here. 
        onsole.log("---entry in rerender---");
        onsole.log('##################### comp   rerendre child' + component.get("v.tasks"));
     }

})