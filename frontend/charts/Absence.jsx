import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

// Initialize exporting and exportData modules
exporting(Highcharts);
exportData(Highcharts);

const Absence = () => {


    //absence chart
    const pieChartOptions = {
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        spacing: [0, 0, 0, 0],
        backgroundColor: '#fff',
        aspectRatio: 1,
      },
      title: {
        text: ''
      },
      plotOptions: {
        pie: {
          innerSize: '60%',
          dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          },
          showInLegend: false
        }
      },
      series: [{
        name: 'Absences',
        colorByPoint: true,
        data: [
          {
            name: 'Absences',
            y: 50,
            color: '#3176ed',
          }, {
            name: 'Absences non justifiées',
            y: 25,
            color: '#544fc5',
          },
          {
            name: 'Présences',
            y: 25,
            color :'#00de70',
          }, {
            name: 'Jours restans',
            y: 25,
            color: '#fcc93e',
          }
        ]
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
      },
      tooltip: {
        headerFormat: '', // Remove the title from the tooltip
        pointFormat: '<span style="font-weight:bold">{point.name}</span>: <b>{point.percentage:.1f}%</b><br/>',

      },
    };
    


  return (
    <HighchartsReact highcharts={Highcharts} options={pieChartOptions} containerProps={{ style: { width: '100%' } }}/>
  )
}

export default Absence