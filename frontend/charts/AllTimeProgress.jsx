import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import './Charts.css';

// Initialize exporting and exportData modules
exporting(Highcharts);
exportData(Highcharts);

const AllTimeProgress = () => {

    //line chart
  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const splineChartOptions = {
    chart: {
      type: 'spline',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: categories,
      gridLineWidth: 0, // Hide x-axis grid lines
      lineWidth: 0, // Hide x-axis line
      plotLines: categories.map((category, index) => ({
        value: index, // Position the plot line between each category
        color: '#ccc', // Color of the vertical line
        width: 1, // Width of the vertical line
        zIndex: 3 // Set a higher z-index to make sure it's displayed above the series
      })),
      labels: {
        style: {
          fontWeight: '500', // Make the labels bolder
          fontSize: 14,
          color: "#727b88"
        }
      }
    },
    yAxis: {
      title: {
        text: 'Progrès (%)',
        enabled: false,
      },
      gridLineWidth: 0, // Hide y-axis grid lines
      lineWidth: 0, // Hide y-axis line
      labels: {
        format: '{value}%', // Format the labels as percentages
        style: {
          fontWeight: '600', // Make the labels bolder
          fontSize: 14,
          color: "#727b88"
        }
      }
    },
    plotOptions: {
      series: {
        showInLegend: false,
        lineWidth: 2, // Set the line width to 2px
        marker: {
          enabled: false, // Disable markers by default
          states: {
            hover: {
              enabled: true, // Enable markers on hover
              fillColor: '#000', // Marker color on hover
              lineWidth: 2, // Marker border width on hover
              lineColor: '#fff' // Marker border color on hover
            }
          }
        }
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color};fontWeight:bold">{series.name}</span>: <b>{point.y}%</b><br/>', // Format tooltip with percentage value
    },
    series: [
      {
        name: 'Conception',
        data: [5, 2, 6, 1, 5, 3],
        type: 'spline',
        color: '#2dad73', // Color for Conception line
        marker: {
          symbol: 'circle', // Rounded marker shape
          radius: 4 // Adjust the radius for marker size
        }
      },
      {
        name: 'Frontend',
        data: [0, 5, 1, 6, 4, 1],
        type: 'spline',
        color: '#fcc93e', // Color for Frontend line
        marker: {
          symbol: 'circle', // Rounded marker shape
          radius: 4 // Adjust the radius for marker size
        }
      },
      {
        name: 'Backend',
        data: [1, 7, 4, 5, 3, 6],
        type: 'spline',
        color: '#3077ed', // Color for Backend line
        marker: {
          symbol: 'circle', // Rounded marker shape
          radius: 4 // Adjust the radius for marker size
        }
      }
    ],
    lang: {
      decimalPoint: ',',
      thousandsSep: ' ',
      loading: 'Chargement...',
      noData: 'Aucune donnée à afficher',
      contextButtonTitle: 'Menu',
      downloadJPEG: 'Télécharger en JPEG',
      downloadPDF: 'Télécharger en PDF',
      downloadPNG: 'Télécharger en PNG',
      downloadSVG: 'Télécharger en SVG',
      printChart: 'Imprimer le graphique',
      resetZoom: 'Réinitialiser le zoom',
      resetZoomTitle: 'Réinitialiser le zoom à l\'échelle 1:1',
      thousandsSep: ' ',
      decimalPoint: ',',
      viewFullscreen: 'Afficher en plein écran'
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG', 'viewFullscreen']
        }
      }
    }
  };


  return (
    <HighchartsReact highcharts={Highcharts} options={splineChartOptions} containerProps={{ style: { width: '100%' } }}/>
  )
}

export default AllTimeProgress