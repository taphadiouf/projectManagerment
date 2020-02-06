({
	chartJsChart : function(component){
        var action = component.get("c.getExpensesByProject");
        //component.set('v.recordId','0011t000017GJnVAAW');
        action.setParam('projectId', component.get('v.recordId'));
        action.setCallback(this, function(response){
            if(response.getState() === 'SUCCESS' && response.getReturnValue()){
                 var responseServeur = response.getReturnValue();
                console.log('expenseslist******'+JSON.stringify(responseServeur.data));
                if(!responseServeur.hasError){
                	this.createGraph(component,responseServeur.data );
                }
            }
        });    
       $A.enqueueAction(action); 
    },    
    createGraph : function(cmp, data) {
        var temp = Array(), labels = Array();
        var totalExpenses = 0, projectBudget = 0;
        for(var i=0; i<data.length; i++){
            if(data[i].amount__c != undefined)
            totalExpenses += data[i].amount__c;
            if(projectBudget === 0)
            	projectBudget = data[i].Account.Project_Budget__c;
            temp.push(data[i].amount__c);
            if(data[i].Member_has_project__r != undefined)
            	labels.push(data[i].Member_has_project__r.SPM_Members__r.Name);
            else
                labels.push('');
        } 
        console.log('totalExpenses' +totalExpenses);


        var dataMap = {"chartLabels": Object.values(labels),
                       "chartData": Object.values(temp)
                      };
        console.log('##########################');
        console.log('dataMap '+ dataMap.chartLabels);
        console.log('dataMap '+ dataMap.chartData);

        var el = cmp.find('barChart').getElement();
        var ctx = el.getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataMap.chartLabels,
                datasets: [
                    {
                        label: "Project Expenses",
                        backgroundColor: "rgb(55, 67, 233)",
                        data: dataMap.chartData
                    }
                ]
            }
        });
        this.chartJsPie(totalExpenses, projectBudget);
    },
    chartJsPie : function(totalExpenses, projectBudget){
        var difference = projectBudget-totalExpenses, colors, labels = ["Total Expenses"];
        if(difference >= 0){
            colors = ["rgb(14, 167, 255)", "rgb(255, 174, 0)"];
            labels.push("Remaining");
        }
        else{
            colors = ["rgb(14, 167, 255)", "rgb(255, 0, 0)"];
            labels.push("Surplus");
            difference *= -1;
        }
        new Chart(document.getElementById("doughnut-chart"), {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Population (millions)",
                        backgroundColor: colors,
                        data: [totalExpenses,difference]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Project Budget evaluation'
                }
            }
        });
       // $A.get('e.force:refreshView').fire();
    }
     
})