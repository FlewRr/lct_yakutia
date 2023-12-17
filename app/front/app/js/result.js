/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/result.js":
/*!**********************!*\
  !*** ./js/result.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _result_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../result.html */ "./result.html");
/* harmony import */ var _scss_result_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/result.scss */ "./scss/result.scss");
/* harmony import */ var _result_sort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./result_sort */ "./js/result_sort.js");
/* harmony import */ var _result_sort__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_result_sort__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var chart_js_auto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! chart.js/auto */ "../node_modules/chart.js/auto/auto.js");




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
belowThan30.innerHTML = `${lessThan30} - Менее 30%`;
MoreThan30.innerHTML = `${between31And60} - Более 30%`;
MoreThan60.innerHTML = `${greaterThan60} - Более 60%`;
new chart_js_auto__WEBPACK_IMPORTED_MODULE_3__["default"](crl, {
  type: 'doughnut',
  // тип графика
  data: {
    labels: ['Больше 60%', 'Больше 30%', 'До 30%'],
    datasets: [{
      label: 'Колличество человек',
      data: [greaterThan60, between31And60, lessThan30],
      backgroundColor: ['#8F0B0B', '#F38137', '#61B124'],
      borderColor: '#000',
      // цвет границы
      borderWidth: 1 // ширина границы
    }]
  },
  options: {
    cutout: '80%',
    plugins: {
      legend: {
        display: false // Скрыть легенду
      }
    }
  }
});
const dataPoints = people.map(person => person.percent);

// Определение оптимального количества бинов
const binCount = Math.ceil(Math.sqrt(dataPoints.length));

// Разбиение данных на бины
const bins = Array.from({
  length: binCount
}, (_, index) => ({
  min: index / binCount * 100,
  max: (index + 1) / binCount * 100,
  count: 0
}));

// Подсчет количества сотрудников в каждом бине
dataPoints.forEach(percent => {
  const binIndex = bins.findIndex(bin => percent >= bin.min && percent < bin.max);
  if (binIndex !== -1) {
    bins[binIndex].count += 1;
  }
});

// Создание гистограммы
new chart_js_auto__WEBPACK_IMPORTED_MODULE_3__["default"](ctx, {
  type: 'bar',
  data: {
    labels: bins.map(bin => `${bin.min.toFixed(0)}% - ${bin.max.toFixed(0)}%`),
    datasets: [{
      label: 'Распределение сотрудников по вероятности увольнения',
      data: bins.map(bin => bin.count),
      backgroundColor: '#372373D1',
      borderColor: '#29255BD1',
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'Jura',
            size: 20
          }
        }
      },
      tooltip: {
        enabled: false,
        bodyFontColor: '#FFF',
        // Цвет текста в подсказках
        titleFontColor: '#FFF' // Цвет заголовка подсказки
      }
    },
    scales: {
      x: {
        grid: {
          color: '#7E7A7A'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#7E7A7A'
        }
      }
    }
  }
});

//  КОД С СОРТ ДС

const sortButton = document.querySelector('.sort-button');
const sortMethods = document.querySelector('.sort-methods');
const sortArrow = document.querySelector('.sort-arrow');
const sortType = document.getElementById('sortType');
sortButton.addEventListener('click', event => {
  event.stopPropagation();
  sortMethods.classList.add('sort-methods-before');
  sortArrow.classList.add('sort-arrow-click');
});
document.addEventListener('click', event => {
  if (!sortMethods.contains(event.target)) {
    sortMethods.classList.remove('sort-methods-before');
    sortArrow.classList.remove('sort-arrow-click');
  }
});
document.addEventListener("DOMContentLoaded", async () => {
  const personScroll = document.querySelector('.person-scroll');
  let peopleData = [...people]; // Создаем копию массива для избежания мутаций оригинального массива
  let html = '';
  function renderPeople(data) {
    html = '';
    data.forEach(man => {
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

/***/ }),

/***/ "./js/result_sort.js":
/*!***************************!*\
  !*** ./js/result_sort.js ***!
  \***************************/
/***/ (() => {


// import { fetchData, people } from './result';

// const sortButton = document.querySelector('.sort-button');
// const sortMethods = document.querySelector('.sort-methods');
// const sortArrow = document.querySelector('.sort-arrow');
// const sortType = document.getElementById('sortType');

// import people from './result.js';

// sortButton.addEventListener('click', (event) => {
//   event.stopPropagation();

//   sortMethods.classList.add('sort-methods-before');
//   sortArrow.classList.add('sort-arrow-click');
// })

// document.addEventListener('click', (event) => {
//   if (!sortMethods.contains(event.target)) {
//     sortMethods.classList.remove('sort-methods-before');
//     sortArrow.classList.remove('sort-arrow-click');
//   }
// })

// document.addEventListener("DOMContentLoaded", async () => {

//     const personScroll = document.querySelector('.person-scroll');
//     let peopleData = [...people]; // Создаем копию массива для избежания мутаций оригинального массива
//     let html = '';

//     function renderPeople(data) {
//       html = '';

//       data.forEach((man) => {
//         const barWidth = `${man.percent}%`;
//         const barColour = `${threatColour(man.percent)}`;

//         html += `
//           <div class="person">
//             <div class="fio-and-bar">
//               <span class="person-name">${man.name}</span>
//               <div class="bar-holder">
//                 <div class="bar" style="width: ${barWidth}; background: ${barColour};"></div>
//               </div>
//             </div>
//             <div class="person-percent">
//               <div class="percent-holder">
//                 <p>${man.percent}%<br>${threatLevel(man.percent)}</p>
//               </div>
//             </div>
//           </div>
//         `;
//       });

//       personScroll.innerHTML = html;
//     }

//     function sortByPercentDecreasing() {
//       peopleData = [...peopleData].sort((a, b) => b.percent - a.percent);
//       renderPeople(peopleData);
//       sortType.innerHTML = 'По убыванию';
//     }

//     function sortByPercentIncreasing() {
//       peopleData = [...peopleData].sort((a, b) => a.percent - b.percent);
//       renderPeople(peopleData);
//       sortType.innerHTML = 'По возрастанию';
//     }

//     // Добавляем слушатели для кнопок сортировки
//     const setMethodButton = document.getElementById('setMethod');
//     setMethodButton.addEventListener('click', () => {
//       sortByPercentDecreasing();
//       sortMethods.classList.remove('sort-methods-before');
//       sortArrow.classList.remove('sort-arrow-click');
//     });

//     const riseMethodButton = document.getElementById('riseMethod');
//     riseMethodButton.addEventListener('click', () => {
//       sortByPercentIncreasing();
//       sortMethods.classList.remove('sort-methods-before');
//       sortArrow.classList.remove('sort-arrow-click');
//     });

//     // Инициализация отображения при загрузке
//     renderPeople(peopleData);

//     function threatLevel(percent_lvl) {
//       if (percent_lvl >= 60) {
//         return 'Расчет';
//       } else if (percent_lvl >= 30) {
//         return 'Средний';
//       } else {
//         return 'Норма';
//       }
//     }

//     function threatColour(percent_lvl_2) {
//       if (percent_lvl_2 >= 60) {
//         return 'linear-gradient(90deg, #BE1414 0%, #8A0909 100%)';
//       } else if (percent_lvl_2 >= 30) {
//         return 'linear-gradient(90deg, rgba(255, 153, 0, 0.74) 0%, rgba(255, 61, 0, 0.74) 99.93%)';
//       } else {
//         return 'linear-gradient(90deg, #7ADE2D 0%, #5AA521 100%)';
//       }
//     }

// });

/***/ }),

/***/ "./result.html":
/*!*********************!*\
  !*** ./result.html ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  \r\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\r\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\r\n  <link href=\"https://fonts.googleapis.com/css2?family=Jura&display=swap\" rel=\"stylesheet\">\r\n\r\n  <title>Document</title>\r\n</head>\r\n<body>\r\n\r\n  \r\n  <div id=\"data-container\" \r\n  data-mydata=\"{'73': 0.5817312672602384, '74': 0.8996248648216517}\"></div>\r\n\r\n  <div class=\"container\">\r\n\r\n    <h1>Статистика</h1>\r\n\r\n    <div class=\"result-grid\">\r\n\r\n      <div class=\"item1 grid-block\">\r\n\r\n        <div class=\"sorting\">\r\n\r\n          <div class=\"sort-button\">\r\n            <span class=\"sort-type\" id=\"sortType\">Выберите тип</span>\r\n            <div class=\"sort-arrow\">\r\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"14\" viewBox=\"0 0 24 14\" fill=\"none\">\r\n                <path d=\"M10.9393 13.0934C11.5251 13.6792 12.4749 13.6792 13.0607 13.0934L22.6066 3.54751C23.1924 2.96172 23.1924 2.01197 22.6066 1.42619C22.0208 0.840399 21.0711 0.840399 20.4853 1.42619L12 9.91147L3.51472 1.42619C2.92893 0.840399 1.97919 0.840399 1.3934 1.42619C0.807613 2.01197 0.807613 2.96172 1.3934 3.54751L10.9393 13.0934ZM10.5 11V12.0328H13.5V11L10.5 11Z\" fill=\"white\"/>\r\n              </svg>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"sort-methods\">\r\n            <p id=\"setMethod\">По убыванию</p>\r\n            <p id=\"riseMethod\">По возрастанию</p>\r\n          </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"person-scroll\">\r\n\r\n          <div class=\"person\">\r\n\r\n            <div class=\"fio-and-bar\">\r\n              \r\n              <span class=\"person-name\">Иванов Иван Иванович</span>\r\n              <div class=\"bar-holder\">\r\n                <div class=\"bar\">\r\n                  \r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n\r\n            <div class=\"person-percent\">\r\n              <div class=\"percent-holder\">\r\n                <p> 53% <br> Внимание</p>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n\r\n          <div class=\"person\">\r\n\r\n            <div class=\"fio-and-bar\">\r\n              \r\n              <span class=\"person-name\">Иванов Иван Иванович</span>\r\n              <div class=\"bar-holder\">\r\n                <div class=\"bar\">\r\n                  \r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n\r\n            <div class=\"person-percent\">\r\n              <p> 53% <br> Внимание</p>\r\n            </div>\r\n\r\n            <!-- <div class=\"person-item\" data-name=\"Иванов Иван Иванович\" data-percentage=\"20\">Иванов Иван Иванович - 20%</div> -->\r\n          </div>\r\n\r\n        </div>\r\n\r\n      </div>\r\n\r\n      <div class=\"item2 grid-block\">\r\n\r\n        <div class=\"myCircl-holder\">\r\n          <canvas id=\"myCircl\"></canvas>\r\n          <div class=\"chelick-holder\">\r\n            <p id=\"mass-pep\"></p>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"myCircl-stat\">\r\n          <div class=\"cirxl-stat-holder\">\r\n            <p id=\"lessThan30\"></p>\r\n          </div>\r\n          <div class=\"cirxl-stat-holder\">\r\n            <p id=\"MoreThan30\"></p>\r\n          </div>\r\n          <div class=\"cirxl-stat-holder\">\r\n            <p id=\"MoreThan60\"></p>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n\r\n      <div class=\"item3 grid-block\">\r\n        <div class=\"myChart-holder\">\r\n          <canvas id=\"myChart\"></canvas>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n\r\n  </div>\r\n</body>\r\n</html>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./scss/result.scss":
/*!**************************!*\
  !*** ./scss/result.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"result": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_chart_js_auto_auto_js"], () => (__webpack_require__("./js/result.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=result.js.map