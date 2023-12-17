import '../result.html';
import '../scss/result.scss';
import './result_sort';
import Chart from 'chart.js/auto';

const crl = document.getElementById('myCircl').getContext('2d');
const ctx = document.getElementById('myChart').getContext('2d');

const massPep = document.getElementById('mass-pep');

const belowThan30 = document.getElementById('lessThan30');
const MoreThan30 = document.getElementById('MoreThan30');
const MoreThan60 = document.getElementById('MoreThan60');


// ПРЕОБРАЗОВАНИЕ JSON

// const data = require('./prediction.json');

// const people = Object.entries(data).map(([key, value]) => ({
//   name: key,
//   percent: Math.round(value * 100)
// }));

// export default people;


// const pepCount = people.length;
// massPep.innerHTML = pepCount;

// const greaterThan60 = people.filter(person => person.percent > 60).length;
// const between31And60 = people.filter(person => person.percent >= 31 && person.percent <= 60).length;
// const lessThan30 = people.filter(person => person.percent <= 30).length;

// belowThan30.innerHTML = `${lessThan30} - Менее 30%`
// MoreThan30.innerHTML = `${between31And60} - Более 30%`
// MoreThan60.innerHTML = `${greaterThan60} - Более 60%`


// new Chart(crl, {
//   type: 'doughnut', // тип графика
//   data: {
//     labels: ['Больше 60%', 'Больше 30%', 'До 30%'],
//     datasets: [{
//       label: 'Колличество человек',
//       data: [greaterThan60, between31And60, lessThan30,],
//       backgroundColor: [
//         '#8F0B0B',
//         '#F38137',
//         '#61B124'
//       ], 
//       borderColor: '#000', // цвет границы
//       borderWidth: 1, // ширина границы
//     }]
//   },
//   options: {
//     cutout: '80%',
//     plugins: {
//       legend: {
//         display: false, // Скрыть легенду
//       }
//     }
//   }
// });

// const dataPoints = people.map(person => person.percent);

// // Определение оптимального количества бинов
// const binCount = Math.ceil(Math.sqrt(dataPoints.length));

// // Разбиение данных на бины
// const bins = Array.from({ length: binCount }, (_, index) => ({
//   min: (index / binCount) * 100,
//   max: ((index + 1) / binCount) * 100,
//   count: 0,
// }));

// // Подсчет количества сотрудников в каждом бине
// dataPoints.forEach(percent => {
//   const binIndex = bins.findIndex(bin => percent >= bin.min && percent < bin.max);
//   if (binIndex !== -1) {
//     bins[binIndex].count += 1;
//   }
// });

// // Создание гистограммы
// new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: bins.map(bin => `${bin.min.toFixed(0)}% - ${bin.max.toFixed(0)}%`),
//     datasets: [{
//       label: 'Распределение сотрудников по вероятности увольнения',
//       data: bins.map(bin => bin.count),
//       backgroundColor: '#372373D1',
//       borderColor: '#29255BD1',
//       borderWidth: 1,
//     }],
//   },
//   options: {
//     plugins: {
//       legend: {
//         labels: {
//             font: {
//               family: 'Jura',
//               size: 20,
//             }
//           }
//         },

//       tooltip: {
//           enabled: false,
//           bodyFontColor: '#FFF', // Цвет текста в подсказках
//           titleFontColor: '#FFF', // Цвет заголовка подсказки
//       }
//   },
//     scales: {
//       x: {
//         grid: {
//           color: '#7E7A7A',
//         },
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: '#7E7A7A',
//         },
//       },
//     },
//   },
// });

// export { people };
// export стоял перер всей функцией fetchData

let people = [];
let greaterThan60, between31And60, lessThan30;

export const fetchData = async () => {
  try {
    const response = await fetch('/json/prediction.json');
    const data = await response.json();

    console.log('Data from JSON:', data);

    people = Object.entries(data).map(([key, value]) => ({
      name: key,
      percent: Math.round(value * 100)
    }));

    const pepCount = people.length;
    massPep.innerHTML = pepCount;

    greaterThan60 = people.filter(person => person.percent > 60).length;
    between31And60 = people.filter(person => person.percent >= 31 && person.percent <= 60).length;
    lessThan30 = people.filter(person => person.percent <= 30).length;

    belowThan30.innerHTML = `${lessThan30} - Менее 30%`;
    MoreThan30.innerHTML = `${between31And60} - Более 30%`;
    MoreThan60.innerHTML = `${greaterThan60} - Более 60%`;

    drawCharts(); 

    return people;

  } catch (error) {
    console.error('Ошибка загрузки данных', error);
  }
};

export { people };

const drawCharts = () => {

  const dataPoints = people.map(person => person.percent);

  // Определение оптимального количества бинов
  const binCount = Math.ceil(Math.sqrt(dataPoints.length));

  // Разбиение данных на бины
  const bins = Array.from({ length: binCount }, (_, index) => ({
    min: (index / binCount) * 100,
    max: ((index + 1) / binCount) * 100,
    count: 0,
  }));

  // Подсчет количества сотрудников в каждом бине
  dataPoints.forEach(percent => {
    const binIndex = bins.findIndex(bin => percent >= bin.min && percent < bin.max);
    if (binIndex !== -1) {
      bins[binIndex].count += 1;
    }
  });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: bins.map(bin => `${bin.min.toFixed(0)}% - ${bin.max.toFixed(0)}%`),
      datasets: [{
        label: 'Распределение сотрудников по вероятности увольнения',
        data: bins.map(bin => bin.count),
        backgroundColor: '#372373D1',
        borderColor: '#29255BD1',
        borderWidth: 1,
      }],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            font: {
              family: 'Jura',
              size: 20,
            }
          }
        },

        tooltip: {
          enabled: false,
          bodyFontColor: '#FFF',
          titleFontColor: '#FFF', 
        }
      },
      scales: {
        x: {
          grid: {
            color: '#7E7A7A',
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#7E7A7A',
          },
        },
      },
    },
  });


  new Chart(crl, {
    type: 'doughnut',
    data: {
      labels: ['Больше 60%', 'Больше 30%', 'До 30%'],
      datasets: [{
        label: 'Колличество человек',
        data: [greaterThan60, between31And60, lessThan30],
        backgroundColor: [
          '#8F0B0B',
          '#F38137',
          '#61B124'
        ],
        borderColor: '#000', 
        borderWidth: 1, 
      }]
    },
    options: {
      cutout: '80%',
      plugins: {
        legend: {
          display: false,
        }
      }
    }
  });
};

fetchData();
