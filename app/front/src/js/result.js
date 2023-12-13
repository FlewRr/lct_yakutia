import '../result.html';
import '../scss/result.scss';
import Chart from 'chart.js/auto';

const crl = document.getElementById('myCircl').getContext('2d');
const ctx = document.getElementById('myChart').getContext('2d');


new Chart(crl, {
  type: 'doughnut', // тип графика
  data: {
    labels: ['Янв', 'Фев', 'Март'],
    datasets: [{
      label: 'Продажи, grgr',
      data: [57, 40, 3,],
      backgroundColor: [
        '#8F0B0B',
        '#F38137',
        '#61B124'
      ], 
      borderColor: '#000', // цвет границы
      borderWidth: 1, // ширина границы
    }]
  },
  options: {
    cutout: '80%',
    plugins: {
      legend: {
        display: false, // Скрыть легенду
      }
    }
  }
});


new Chart(ctx, {
  type: 'line', // тип графика
  data: {
    labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
    datasets: [{
      label: 'Продажи, grgr',
      data: [30, 15, 39, 5, 20, 60, 89, 45, 67, 33, 12, 89, 56, 99],
      backgroundColor: '#4A4444', // цвет фона
      borderColor: '#5428D3', // цвет границы
      borderWidth: 3, // ширина границы
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
