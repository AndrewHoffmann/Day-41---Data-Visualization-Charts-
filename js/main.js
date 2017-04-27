//alert('test') // use in every js, makes sure no errors, will load when ok

$(document).ready(function() {

	var ctx = document.getElementById("myChart");

	

// random color function, will take 6 of the var letters/numbers and generate colors
	function getRandomColor() {
	    var letters = '0123456789ABCDEF';
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}

//calling the data from the NFL API and selecting which data to display
	$.ajax({
	   url: `http://www.NflArrest.com/api/v1/team`,
	   success: (res)=>{
	   	let data = res.reduce((obj,item)=>{
	   		obj.teams.push(item.Team_name);
	   		obj.arrests.push(item.arrest_count);
	   		obj.colors.push(getRandomColor());
	   		return obj;
	   	},{
	   		teams:[],
	   		arrests:[],
	   		colors:[],
	   	})
	   	makeChart(data);
	   }
	});

// making the chart
	function makeChart(data) {
		const myDoughnutChart = new Chart(ctx,{
		    type: 'doughnut',
		    data: { 
			    labels: data.teams,
			    datasets: [
		        {
		        	data: data.arrests,
		            backgroundColor: data.colors, // if didn't have random color function, would go heres
					hoverBorderColor: "#00D300",
				}]
	    	},
		    options: {
	        	responsive: false
	    	}
		});
		Chart.defaults.global.defaultFontColor = "#FFFFFF"; // changes label color
	}

});