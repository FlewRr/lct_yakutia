import '../result.html';
import '../scss/result.scss';
import Chart from 'chart.js/auto';

const crl = document.getElementById('myCircl').getContext('2d');
const ctx = document.getElementById('myChart').getContext('2d');


new Chart(crl, {
  type: 'pie', // тип графика
  data: {
    labels: ['Янв', 'Фев', 'Март'],
    datasets: [{
      label: 'Продажи, grgr',
      data: [12, 19, 3,],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ], 
      borderColor: '#5428D3', // цвет границы
      borderWidth: 1, // ширина границы
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


new Chart(ctx, {
  type: 'bar', // тип графика
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
