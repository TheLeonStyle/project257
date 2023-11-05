// Глобальные переменные
const burger = document.querySelector('.header__burger');
const popup = document.querySelector('.popup');

function onClickBurger() {
  burger.addEventListener('click', function () {
    popup.classList.toggle('active'); // Показывает/скрывает popup
    burger.classList.toggle('active'); // Показывает/скрывает крестик burger'a
  });
}
onClickBurger();

function moveHeaderElements() {
  // Получаем элементы
  const popupWrapper = document.querySelector('.popup__wrapper');
  const headerWrapper = document.querySelector('.header__wrapper');
  const headerNav = document.querySelector('.header__nav');

  // Перемещаем элемент headerNav по умолчанию
  if (1124.98 > window.innerWidth) {
    popupWrapper.appendChild(headerNav); // Если размер окна меньше 1124px, тогда элемент headerNav перемещается в popupWrapper
  } else {
    headerWrapper.insertBefore(headerNav, headerWrapper.firstChild); // Если размер окна больше 1124px, тогда элемент headerNav перемещается в headerWrapper
  }

  // Перемещаем элемент headerNav при изменений окна
  window.addEventListener('resize', function (event) {
    if (1124.98 > event.srcElement.innerWidth) {
      popupWrapper.appendChild(headerNav); // Если размер окна меньше 1124px, тогда элемент headerNav перемещается в popupWrapper
    } else {
      headerWrapper.insertBefore(headerNav, headerWrapper.firstChild); // Если размер окна больше 1124px, тогда элемент headerNav перемещается в headerWrapper
    }
  });

  const headerRight = document.querySelector('.header__right');
  const headerBurger = document.querySelector('.header__burger');

  // Перемещаем элемент headerRight по умолчанию
  if (768.98 > window.innerWidth) {
    popupWrapper.appendChild(headerRight); // Если размер окна меньше 768px, тогда элемент headerRight перемещается в popupWrapper
  } else {
    headerWrapper.insertBefore(headerRight, headerBurger); // Если размер окна больше 768px, тогда элемент headerRight перемещается в headerWrapper
  }

  // Перемещаем элемент headerNav при изменений окна
  window.addEventListener('resize', function (event) {
    if (768.98 > window.innerWidth) {
      popupWrapper.appendChild(headerRight); // Если размер окна меньше 768px, тогда элемент headerRight перемещается в popupWrapper
    } else {
      headerWrapper.insertBefore(headerRight, headerBurger); // Если размер окна больше 768px, тогда элемент headerRight перемещается в headerWrapper
    }
  });
}
moveHeaderElements();

function onClickHeaderButtons() {
  const headerButtons = document.querySelectorAll('.header__button');

  // При клике на кнопку навигаций скрывает burger и popup
  headerButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      popup.classList.remove('active'); // Скрывает popup
      burger.classList.remove('active'); // Скрывает крестик burger'a
    });
  });
}
onClickHeaderButtons();

function ticker() {
  const ticker = document.querySelector('.ticker');
  const windowWidth = window.innerWidth;
  const tickerTitle = document.querySelector('.ticker__title');

  const maxTitles = Math.floor(windowWidth / tickerTitle.offsetWidth);

  for (let i = 0; i < maxTitles + 2; i++) {
    const title = document.createElement('p');
    title.className = 'ticker__title';
    title.textContent = tickerTitle.innerHTML; // Замените на свой текст
    ticker.appendChild(title);
  }
}
ticker();

function scrollHeaderBg() {
  // Получаем элементы
  const header = document.querySelector('.header');
  const introTitle = document.querySelector('.intro__title');

  // При скроле на introTitle.offsetTop пикселей вниз, добавляем/скрываем фон
  if (window.scrollY >= introTitle.offsetTop - header.clientHeight) {
    header.classList.add('bg'); // Добавляем класс bg
  } else if (window.scrollY <= introTitle.offsetTop - header.clientHeight) {
    header.classList.remove('bg'); // Удаляем класс bg
  }

  if (768.98 < window.innerWidth) {
    window.addEventListener('scroll', scrollHeaderBg);
  }
}
scrollHeaderBg();
window.addEventListener('scroll', scrollHeaderBg);

function renderGallery() {
  fetch('./gallery.json')
    .then((res) => res.json())
    .then((json) => getObj(json));

  function getObj(json) {
    json.forEach((obj) => {
      render(obj.id, obj.title, obj.subtitle, obj.price.discount, obj.price.strike);
    });
  }

  function render(id, title, subtitle, discount, strike) {
    const element = `
				<div class="gallery__item">
					<a href="#no-scroll" class="gallery__link">
						<div class="gallery__image gallery__image-0${id}"></div>
					</a>
					<div class="gallery__title">${title}</div>
					<div class="gallery__subtitle">${subtitle}</div>
					<div class="gallery__price">${discount} р. <strike>${strike} р.</strike></div>
					<a href="#no-scroll" class="gallery__button">Подробнее</a>
				</div>
			`;

    const galleryItems = document.querySelector('.gallery__items');
    galleryItems.insertAdjacentHTML('beforeend', element);
  }
}
renderGallery();
// function getTopPopup() {
//   // Получаем элементы
//   const headerContainer = document.querySelector('.header__container');
//   const popup = document.querySelector('.popup');

//   popup.style.top = `${headerContainer.clientHeight}px`; // Значение top по умолчанию
//   console.log(headerContainer.clientHeight);

//   // Значение top при изменений окна браузера
//   window.addEventListener('resize', function () {
//     popup.style.top = `${headerContainer.clientHeight}px`;
//   });
// }
// getTopPopup();
