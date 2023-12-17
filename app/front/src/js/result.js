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

const container = document.getElementById('data-container');
const rawData = container.getAttribute('data-mydata');

// const data = JSON.parse(rawData);
const data = rawData ? eval(`(${rawData})`) : {}; 

console.log(data);

const people = Object.entries(data).map(([key, value]) => ({
  name: key,
  percent: Math.round(value * 100)
}));


const pepCount = people.length;
massPep.innerHTML = pepCount;

const greaterThan60 = people.filter(person => person.percent > 60).length;
const between31And60 = people.filter(person => person.percent >= 31 && person.percent <= 60).length;
const lessThan30 = people.filter(person => person.percent <= 30).length;

belowThan30.innerHTML = `${lessThan30} - Менее 30%`
MoreThan30.innerHTML = `${between31And60} - Более 30%`
MoreThan60.innerHTML = `${greaterThan60} - Более 60%`


new Chart(crl, {
  type: 'doughnut', // тип графика
  data: {
    labels: ['Больше 60%', 'Больше 30%', 'До 30%'],
    datasets: [{
      label: 'Колличество человек',
      data: [greaterThan60, between31And60, lessThan30,],
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

// Создание гистограммы
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
          bodyFontColor: '#FFF', // Цвет текста в подсказках
          titleFontColor: '#FFF', // Цвет заголовка подсказки
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

//  КОД С СОРТ ДС

const sortButton = document.querySelector('.sort-button');
const sortMethods = document.querySelector('.sort-methods');
const sortArrow = document.querySelector('.sort-arrow');
const sortType = document.getElementById('sortType');


sortButton.addEventListener('click', (event) => {
  event.stopPropagation();

  sortMethods.classList.add('sort-methods-before');
  sortArrow.classList.add('sort-arrow-click');
})

document.addEventListener('click', (event) => {
  if (!sortMethods.contains(event.target)) {
    sortMethods.classList.remove('sort-methods-before');
    sortArrow.classList.remove('sort-arrow-click');
  }
})



document.addEventListener("DOMContentLoaded", async () => {

    const personScroll = document.querySelector('.person-scroll');
    let peopleData = [...people]; // Создаем копию массива для избежания мутаций оригинального массива
    let html = '';

    function renderPeople(data) {
      html = '';
  
      data.forEach((man) => {
        const barWidth = `${man.percent}%`;
        const barColour = `${threatColour(man.percent)}`;
  
        html += `
          <div class="person">
            <div class="fio-and-bar">
              <span class="person-name">${man.name}</span>
              <div class="bar-holder">
                <div class="bar" style="width: ${barWidth}; background: ${barColour};"></div>
              </div>
            </div>
            <div class="person-percent">
              <div class="percent-holder">
                <p>${man.percent}%<br>${threatLevel(man.percent)}</p>
              </div>
            </div>
          </div>
        `;
      });
  
      personScroll.innerHTML = html;
    }
  
    function sortByPercentDecreasing() {
      peopleData = [...peopleData].sort((a, b) => b.percent - a.percent);
      renderPeople(peopleData);
      sortType.innerHTML = 'По убыванию';
    }
  
    function sortByPercentIncreasing() {
      peopleData = [...peopleData].sort((a, b) => a.percent - b.percent);
      renderPeople(peopleData);
      sortType.innerHTML = 'По возрастанию';
    }
  
    // Добавляем слушатели для кнопок сортировки
    const setMethodButton = document.getElementById('setMethod');
    setMethodButton.addEventListener('click', () => {
      sortByPercentDecreasing();
      sortMethods.classList.remove('sort-methods-before');
      sortArrow.classList.remove('sort-arrow-click');
    });
  
  
    const riseMethodButton = document.getElementById('riseMethod');
    riseMethodButton.addEventListener('click', () => {
      sortByPercentIncreasing();
      sortMethods.classList.remove('sort-methods-before');
      sortArrow.classList.remove('sort-arrow-click');
    });
  
    // Инициализация отображения при загрузке
    renderPeople(peopleData);

    function threatLevel(percent_lvl) {
      if (percent_lvl >= 60) {
        return 'Расчет';
      } else if (percent_lvl >= 30) {
        return 'Средний';
      } else {
        return 'Норма';
      }
    }
    
    function threatColour(percent_lvl_2) {
      if (percent_lvl_2 >= 60) {
        return 'linear-gradient(90deg, #BE1414 0%, #8A0909 100%)';
      } else if (percent_lvl_2 >= 30) {
        return 'linear-gradient(90deg, rgba(255, 153, 0, 0.74) 0%, rgba(255, 61, 0, 0.74) 99.93%)';
      } else {
        return 'linear-gradient(90deg, #7ADE2D 0%, #5AA521 100%)';
      }
    }
  
});



// export { people };
// export стоял перер всей функцией fetchData


// let people = [];
// let greaterThan60, between31And60, lessThan30;

// export const fetchData = async () => {
//   try {
//     const response = await fetch('json/prediction.json');
//     const data = await response.json();

//     console.log('Data from JSON:', data);

//     people = Object.entries(data).map(([key, value]) => ({
//       name: key,
//       percent: Math.round(value * 100)
//     }));

//     const pepCount = people.length;
//     massPep.innerHTML = pepCount;

//     greaterThan60 = people.filter(person => person.percent > 60).length;
//     between31And60 = people.filter(person => person.percent >= 31 && person.percent <= 60).length;
//     lessThan30 = people.filter(person => person.percent <= 30).length;

//     belowThan30.innerHTML = `${lessThan30} - Менее 30%`;
//     MoreThan30.innerHTML = `${between31And60} - Более 30%`;
//     MoreThan60.innerHTML = `${greaterThan60} - Более 60%`;

//     drawCharts(); 

//     return people;

//   } catch (error) {
//     console.error('Ошибка загрузки данных', error);
//   }
// };

// export { people };

// const drawCharts = () => {

//   const dataPoints = people.map(person => person.percent);

//   // Определение оптимального количества бинов
//   const binCount = Math.ceil(Math.sqrt(dataPoints.length));

//   // Разбиение данных на бины
//   const bins = Array.from({ length: binCount }, (_, index) => ({
//     min: (index / binCount) * 100,
//     max: ((index + 1) / binCount) * 100,
//     count: 0,
//   }));

//   // Подсчет количества сотрудников в каждом бине
//   dataPoints.forEach(percent => {
//     const binIndex = bins.findIndex(bin => percent >= bin.min && percent < bin.max);
//     if (binIndex !== -1) {
//       bins[binIndex].count += 1;
//     }
//   });

//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: bins.map(bin => `${bin.min.toFixed(0)}% - ${bin.max.toFixed(0)}%`),
//       datasets: [{
//         label: 'Распределение сотрудников по вероятности увольнения',
//         data: bins.map(bin => bin.count),
//         backgroundColor: '#372373D1',
//         borderColor: '#29255BD1',
//         borderWidth: 1,
//       }],
//     },
//     options: {
//       plugins: {
//         legend: {
//           labels: {
//             font: {
//               family: 'Jura',
//               size: 20,
//             }
//           }
//         },

//         tooltip: {
//           enabled: false,
//           bodyFontColor: '#FFF',
//           titleFontColor: '#FFF', 
//         }
//       },
//       scales: {
//         x: {
//           grid: {
//             color: '#7E7A7A',
//           },
//         },
//         y: {
//           beginAtZero: true,
//           grid: {
//             color: '#7E7A7A',
//           },
//         },
//       },
//     },
//   });


//   new Chart(crl, {
//     type: 'doughnut',
//     data: {
//       labels: ['Больше 60%', 'Больше 30%', 'До 30%'],
//       datasets: [{
//         label: 'Колличество человек',
//         data: [greaterThan60, between31And60, lessThan30],
//         backgroundColor: [
//           '#8F0B0B',
//           '#F38137',
//           '#61B124'
//         ],
//         borderColor: '#000', 
//         borderWidth: 1, 
//       }]
//     },
//     options: {
//       cutout: '80%',
//       plugins: {
//         legend: {
//           display: false,
//         }
//       }
//     }
//   });
// };

// fetchData();
