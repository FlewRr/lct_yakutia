/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./upload.html":
/*!*********************!*\
  !*** ./upload.html ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\r\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\r\n  <link href=\"https://fonts.googleapis.com/css2?family=Jura&display=swap\" rel=\"stylesheet\">\r\n  <title>Document</title>\r\n</head>\r\n<body>\r\n  <div class=\"container\">\r\n\r\n    <!-- <form action=\"/upload\" method=\"post\" enctype=\"multipart/form-data\"> -->\r\n      <div class=\"upload-flex\">\r\n\r\n        <h1>Загрузите данные</h1>\r\n\r\n          <div class=\"drop-zone\" id=\"dropZone\">\r\n            <p>Загрузите файл в формате csv</p>\r\n              <label for=\"fileInput\">\r\n                Загрузить\r\n              </label> \r\n            <input type=\"file\" name=\"file\" accept=\".csv\" id=\"fileInput\">\r\n          </div>\r\n\r\n          <div class=\"download\">\r\n            <div class=\"fileInfo-holder\">\r\n              <p id=\"fileInfo\"></p>\r\n            </div>\r\n            <div class=\"result-class-holder\" id=\"resolt\">\r\n              <!-- <button type=\"submit\" class=\"result-class\" href=\"/result\">\r\n                Результат\r\n              </button> -->\r\n            </div>\r\n          </div>\r\n\r\n      </div>\r\n    <!-- </form> -->\r\n\r\n  </div>\r\n</body>\r\n</html>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./scss/upload.scss":
/*!**************************!*\
  !*** ./scss/upload.scss ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/upload.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _upload_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../upload.html */ "./upload.html");
/* harmony import */ var _scss_upload_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/upload.scss */ "./scss/upload.scss");


const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const dropZone = document.getElementById('dropZone');
const resolt = document.getElementById('resolt');
dropZone.addEventListener('dragover', event => {
  event.preventDefault();
  dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});
dropZone.addEventListener('drop', event => {
  event.preventDefault();
  dropZone.classList.remove('drag-over');
  const fileList = event.dataTransfer.files;
  if (fileList.length === 1) {
    const fileName = fileList[0].name;
    const fileSize = formatFileSize(fileList[0].size);
    fileInfo.innerHTML = `Имя файла: ${fileName}<br>Размер файла: ${fileSize}`;
    resolt.innerHTML = `<button type="submit" class="result-class">Результат</button>`;
  } else {
    fileInfo.innerHTML = 'Загрузите только один файл за раз.';
  }
});
fileInput.addEventListener('change', () => {
  const fileList = fileInput.files;
  if (fileList.length === 1) {
    const fileName = fileList[0].name;
    const fileSize = formatFileSize(fileList[0].size);
    fileInfo.innerHTML = `Имя файла: ${fileName}<br>Размер файла: ${fileSize}`;
    resolt.innerHTML = `<button type="submit" class="result-class">Результат</button>`;

    // <button type="submit" class="result-class" href="/result.html">Результат</button>
  } else {
    fileInfo.innerHTML = 'Загрузите только один файл за раз.';
  }
});
function formatFileSize(size) {
  if (size >= 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  } else if (size >= 1024) {
    return (size / 1024).toFixed(2) + ' KB';
  } else {
    return size + ' bytes';
  }
}
})();

/******/ })()
;
//# sourceMappingURL=upload.js.map