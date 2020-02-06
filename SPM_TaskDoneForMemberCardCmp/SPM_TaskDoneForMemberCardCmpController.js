({
    dragoverHandler: function(component, event, helper) {
        event.preventDefault();
        var dropZone = component.find("dropZone");
        $A.util.addClass(dropZone, 'active');
    },
    
    dragLeaveHandler: function(component, event, helper) {
        event.preventDefault();
        var dropZone = component.find("dropZone");
        $A.util.removeClass(dropZone, 'active');
    },
    
    dropHandler: function(component, event, helper) {
        event.preventDefault();
        var dropZone = component.find("dropZone");
        $A.util.removeClass(dropZone, 'active');
        var items = component.get('v.items');
        var item = event.dataTransfer.getData("task");
        items.push(item);
        component.set('v.items', items);
    
    },

    
})