({
    dragoverHandler: function(component, event, helper) {
        event.preventDefault();
        var dropZone = component.find("dropZone");
        $A.util.addClass(dropZone, 'active');
        console.log('over cmp '+component.get('v.statusTask'));
    },
    moveTaskInSource:function(component,event,helper){
        var taskMoved = event.getParam('task');
        console.log('current cmp '+component.get('v.statusTask') );
        console.log('task moved+++++++++++++++++++++++ '+JSON.stringify(taskMoved));
        //component.set('v.taskMoved',taskMoved);
        
    },
    dragLeaveHandler: function(component, event, helper) {
        var dropZone = component.find("dropZone");
        $A.util.removeClass(dropZone, 'active');
            console.log('current cmp '+component.get('v.statusTask') );
            console.log('--------task moved+++++ '+JSON.stringify(component.get('v.taskMoved') ));
            var tasks =  component.get('v.tasks');
            var taskMoved =  component.get('v.taskMoved');
            var tasksUpdated = tasks.filter(task => task.Id != taskMoved.Id);
            component.set('v.tasks', tasksUpdated);
            console.log('ici dans if');
        event.preventDefault();
        event.stopPropagation();
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
        }else if(component.get('v.statusTask')==='Tested'){
            task.Status = 'Tested';
        }else if(component.get('v.statusTask')==='Done'){
            task.Status = 'Done';
        }

        delete task.Account;
        delete task.assignMember;
        delete task.Cases;
        helper.updateTasks(component,[task]);
        console.log('ici ')
        
    },

    handleOnDragEnterDummy: function(component, event, helper) {
        event.preventDefault();
      },
})