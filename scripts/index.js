console.log('Index page loaded');

//=При клике на элемент вертикального меню справа-вверху
// должен добавляться/удаляться класс "header__navigation_open"
// у элемента навигации "header__navigation"
// реализуя таким образом Открытие/Закрытие Меню
const headerNavButton = document.querySelector('.header__nav-btn');
const headerNavigation = document.querySelector('.header__navigation');

//..добавляем обработчик события onClick кнопке/меню
headerNavButton.addEventListener('click', () => {
    headerNavigation.classList.toggle('header__navigation_open');
});
