
import people from './result';

document.addEventListener("DOMContentLoaded", () => {
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
  }

  function sortByPercentIncreasing() {
    peopleData = [...peopleData].sort((a, b) => a.percent - b.percent);
    renderPeople(peopleData);
  }

  // Добавляем слушатели для кнопок сортировки
  const setMethodButton = document.getElementById('setMethod');
  setMethodButton.addEventListener('click', sortByPercentDecreasing);

  const riseMethodButton = document.getElementById('riseMethod');
  riseMethodButton.addEventListener('click', sortByPercentIncreasing);

  // Инициализация отображения при загрузке
  renderPeople(peopleData);
});

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

