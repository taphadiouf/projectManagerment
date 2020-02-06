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
        var isDragLeave = component.get('v.isDragLeave');
        if(isDragLeave===true){
            console.log('current cmp '+component.get('v.statusTask') );
            var taskMoved = JSON.parse(event.dataTransfer.getData('task'));
            var tasks =  component.get('v.tasks');
            var tasksUpdated = tasks.filter(task => task.Id != taskMoved.Id);
            component.set('v.tasks', tasksUpdated);
            component.set('v.isDragLeave',false);
        }
    },
    
    dropHandler: function(component, event, helper) {
        event.preventDefault();
        var dropZone = component.find("dropZone");
        $A.util.removeClass(dropZone, 'active');
        //var tasks = component.get('v.tasks');
        var task = JSON.parse(event.dataTransfer.getData('task'));
        console.log('data moved '+JSON.stringify(task));
        console.log('defaul cmp '+component.get('v.statusTask')+' '+ task.Id);
        if(component.get('v.statusTask')==='Not Started'){
            task.Status = 'Not Started Yet';
        }else if(component.get('v.statusTask')==='Started'){
            task.Status = 'In Progress';
        }else if(component.get('v.statusTask')==='Completed'){
            task.Status = 'Completed';
        }
        delete task.Account;
        delete task.assignMember;
        delete task.Cases;
        helper.updateTasks(component,[task]);
        console.log('ici ')
        
    },

    onDrop : function(component, event, helper) {
        
    }
})