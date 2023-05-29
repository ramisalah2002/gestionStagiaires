import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

// Initialize exporting and exportData modules
exporting(Highcharts);
exportData(Highcharts);

const App = () => {
  const projectProgressOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Project Progress'
    },
    xAxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6']
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Progress (%)'
      }
    },
    series: [{
      name: 'Project Progress',
      data: [20, 40, 60, 80, 90, 100],
      // Set the width of the bars
      pointWidth: 30
    }],
    // Add exporting options
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            'downloadPNG',
            'downloadJPEG',
            'downloadPDF',
            'downloadSVG',
            'separator',
            'downloadCSV',
            'downloadXLS'
          ]
        }
      }
    }
  };

  const pieChartOptions = {
    chart: {
      type: 'pie',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      spacing: [0, 0, 0, 0],
      backgroundColor: '#fff',
      width: '500'
    },
    title: {
      text: ''
    },
    plotOptions: {
      pie: {
        innerSize: '60%',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Absences',
      colorByPoint: true,
      data: [{
        name: 'fait',
        y: 50
      }, {
        name: 'pas encore',
        y: 25
      }]
    }],
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
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
        }
      }
    }
  };

  return (
    <div style={{display :'flex'}}>
      <div>
        <h1>Project Progress</h1>
        <HighchartsReact highcharts={Highcharts} options={projectProgressOptions} />
      </div>
      <div>
        <h1>Absences</h1>
        <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
      </div>
    </div>
  );
};

export default App;
