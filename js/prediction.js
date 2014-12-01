function submitForm(){
	var x  = document.getElementById("predict_form");

	var clump_thick  = document.getElementById("clump_thick").value,
	cell_size = document.getElementById("cell_size").value,
	cell_shape = document.getElementById("cell_shape").value,
	marg_adh = document.getElementById("marg_adh").value,
	ep_cell_size = document.getElementById("ep_cell_size").value,
	bare_nuclei = document.getElementById("bare_nuclei").value,
	bl_chrom = document.getElementById("bl_chrom").value,
	norm_nuclei = document.getElementById("norm_nuclei").value,
	mitoses = document.getElementById("mitoses").value;

	var predict_result = predictDiagnosis(clump_thick,cell_size,cell_shape, marg_adh,ep_cell_size,bare_nuclei,bl_chrom,norm_nuclei,mitoses);	
	document.getElementById("predict_result").innerHTML = predict_result;

}

function predictDiagnosis (clump_thick,cell_size,cell_shape, marg_adh,ep_cell_size,bare_nuclei,bl_chrom,norm_nuclei,mitoses){
	var diagnosis;
	if (cell_size < 2.5){
		if (norm_nuclei < 3.5){
			if (bare_nuclei<4){
				diagnosis = 'Benign';
			}
			else {
				if (clump_thick<3.5){
					diagnosis='Benign';
				}
				else{
					diagnosis = 'Malignant';
				}
			}
		}
		else {
			diagnosis = 'Malignant';
		}
	}
	//if cell size >= 2.5
	else {
		if (cell_shape < 2.5){
			if (bare_nuclei ==1 || bare_nuclei == 3 || bare_nuclei == 5){
				diagnosis = 'Benign'
			}
			else {
				diagnosis = 'Malignant'
			}
		}
		else {
			if (bare_nuclei<=8 && bare_nuclei!=6){
				if (norm_nuclei <8.5){
					if (clump_thick < 8.5){
						if (marg_adh < 2.5){
							diagnosis = 'Benign';
						}
						else{
							diagnosis = 'Malignant';
						}
					}
					else {
						diagnosis = 'Malignant';
					}
				}
				else{
					diagnosis = 'Malignant';
				}
			}
			else{
				diagnosis = 'Malignant'
			}
		}
	}
    document.getElementById('clumpthickness2').style.display = 'block';
    document.getElementById('clumpthickness2').style.visibility = "visible";
    // Set up the chart
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'clumpthickness2',
            type: 'column',
            margin: 75,
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 0,
                depth: 25,
                viewDistance: 10
            }
        },
        xAxis: {
            title:{
                text: 'ClumpThickness'
            },
            categories: [1,2,3,4,5,6,7,8,9,10]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of patients'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        title: {
            text: 'Stats based on ClumpThickness'
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
     series: [{
     name: 'Benign',
     data: [136,46,92,67,83,15,1,4,0,0]
     }, {
     name: 'Malignant',
     data: [3,4,12,12,45,18,22,40,14,69]
     }]
    });

    document.getElementById('clumpthickness1').style.display = 'block';
    document.getElementById('clumpthickness1').style.visibility = "visible";
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'clumpthickness1',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Percentage Split',
            align: 'center',
            verticalAlign: 'middle',
            y: 50
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Clump Size',
            innerSize: '50%',
            data: [
                ['Benign<br>Class 2',   444],
                ['Malignant<br>Class 4',       239]
            ]
        }]
    });

    document.getElementById('csizeu1').style.display = 'block';
    document.getElementById('csizeu1').style.visibility = "visible";
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'csizeu1',
            type: 'column'
        },
        title: {
            text: 'Stats based on CellSizeUniformity'
        },
        xAxis: {
            title:{
                text: 'CellSizeUniformity'
            },
            categories: [1,2,3,4,5,6,7,8,9,10]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of patients'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -70,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black, 0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: 'Benign',
            data: [369,37,27,8,0,0,1,1,9,0]
        }, {
            name: 'Malignant',
            data: [4,8,25,30,30,25,18,27,5,67]
        }]
    });
    document.getElementById('cshapeu1').style.display = 'block';
    document.getElementById('cshapeu1').style.visibility = "visible";
    // Set up the chart
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'cshapeu1',
            type: 'column',
            margin: 75,
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 0,
                depth: 25,
                viewDistance: 10
            }
        },
        xAxis: {
            title:{
                text: 'CellShapeUniformity'
            },
            categories: [1,2,3,4,5,6,7,8,9,10]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of patients'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        title: {
            text: 'Stats based on ClumpThickness'
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
        series: [{
            name: 'Benign',
            data: [344,51,30,12,2,2,2,1,0,0]
        }, {
            name: 'Malignant',
            data: [2,7,23,31,30,27,28,26,7,58]
        }]
    });

    document.getElementById('ma1').style.display = 'block';
    document.getElementById('ma1').style.visibility = "visible";
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'ma1',
            type: 'column'
        },
        title: {
            text: 'Stats based on Marginal Adhesion'
        },
        xAxis: {
            title:{
                text: 'MarginalAdhesion'
            },
            categories: [1,2,3,4,5,6,7,8,9,10]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of patients'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -70,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black, 0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: 'Benign',
            data: [363, 37,31,5,4,3,0,0,0,1]
        }, {
            name: 'Malignant',
            data: [30,21, 27, 28, 19,18,13,25,4,54]
        }]
    });

    document.getElementById('bn1').style.display = 'block';
    document.getElementById('bn1').style.visibility = "visible";
    // Set up the chart
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'bn1',
            type: 'column',
            margin: 75,
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 0,
                depth: 25,
                viewDistance: 10
            }
        },
        xAxis: {
            title:{
                text: 'BareNuclei'
            },
            categories: [1,2,3,4,5,6,7,8,9,10]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of patients'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        title: {
            text: 'Stats based on BareNuclei'
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
        series: [{
            name: 'Benign',
            data: [387,21,14,6,10,0,1,2,0,3]
        }, {
            name: 'Malignant',
            data: [15,9,14,13,20,4,7,19,9,129]
        }]
    });

    document.getElementById('nn1').style.display = 'block';
    document.getElementById('nn1').style.visibility = "visible";
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'nn1',
            type: 'column'
        },
        title: {
            text: 'Stats based on NormalNucleoli'
        },
        xAxis: {
            title:{
                text: 'NormalNucleoli'
            },
            categories: [1,2,3,4,5,6,7,8,9,10]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of patients'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -70,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black, 0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: 'Benign',
            data: [391,30,11,1,2,4,2,3,0,0]
        }, {
            name: 'Malignant',
            data: [41,6,31,17,17,18,14,20,15,60]
        }]
    });

    return diagnosis;
}