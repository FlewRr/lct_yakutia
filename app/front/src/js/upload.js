import '../upload.html';
import '../scss/upload.scss';

const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const dropZone = document.getElementById('dropZone');
const resolt = document.getElementById('resolt');

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.classList.remove('drag-over');
  const fileList = event.dataTransfer.files;

  if (fileList.length === 1) {
    const fileName = fileList[0].name;
    const fileSize = formatFileSize(fileList[0].size);

    fileInfo.innerHTML = `Имя файла: ${fileName}<br>Размер файла: ${fileSize}`;
    resolt.innerHTML = `<a class="result-class" href="./result.html">Результат</a>`;
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
    resolt.innerHTML = `<a class="result-class" href="/result.html">Результат</a>`;
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