({
	openModal : function(component, event, helper) {
		component.set('v.isModalOpened',true);
	},
    closeModal: function(component, event, helper){
        component.set('v.isModalOpened',false);
    }
})