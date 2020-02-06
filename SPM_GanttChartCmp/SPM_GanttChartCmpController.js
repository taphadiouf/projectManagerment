({
     doInit: function (component, event, helper) {
  
        var id = component.get('v.recordId');

        var action = component.get("c.getAllTaskByProjectId");
		action.setParams({ projectId: id });
        action.setCallback(this, function (response) {

            var state = response.getState();

            if (component.isValid() && state === "SUCCESS") {
                var tasks = response.getReturnValue().data;
                //console.log('#L tasks', (JSON.stringify(tasks)));
 
                component.set('v.tasks', tasks);

            }

        });

        $A.enqueueAction(action);

    },
    
    showGantt : function(component, event, helper) {
        /*alert(component.get('v.recordId'));
    	let vfUrl = '/apex/Gantt_Chart?IdProject='+component.get('v.recordId');
        window.open(vfUrl);
        let vfUrl = '/apex/Gantt_Chart';
        window.open(vfUrl);*/
        /*$A.get("e.force:navigateToURL").setParams(
            {"url": "/apex/Gantt_Chart","IdProject": component.get('v.recordId')}).fire();*/
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/apex/Gantt_Chart",
            "IdProject": component.get('v.recordId')
        });
        urlEvent.fire();
        console.log('#L tasks', (JSON.stringify(component.get('v.tasks'))));
    }
    })