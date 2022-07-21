import { formatPhoneNumber } from '../utils/phoneFormatter.js';


//=Обработка клика по кнопке авторизации - открытие модального окана авторизации
const heroBtn = document.querySelector('.hero__btn');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

//..добавляем обработчик события onClick кнопке авторизации для ОТКРЫТИЯ оверлея и окна
//  т.к после нажатия на кнопку оверлей перекроет ее, нажать мы на нее уже не сможем,
//  поэтому используем не метод "toggle" для добавления класса, а метод "add"
heroBtn.addEventListener('click', () => {
    overlay.classList.add('overlay_open');
    modal.classList.add('modal_open');
});

//..добавляем обработчик события onClick на оверлей для ЗАКРЫТИЯ оверлея и окна
//  чтобы при клике на него закрывалось модальное окно
overlay.addEventListener('click', (event) => {
    //..получаем ссылку dom-объект по которому произошел клик
    //  если клик произошел по оверлею тогда закрывает его и модальное окно
    //  если клик произошел по модальному окну, то ничего не делаем
    const target = event.target;
    if (target === overlay || target.closest('.modal__close')) {
        overlay.classList.remove('overlay_open');
        modal.classList.remove('modal_open');
    }
});

//=Отправка данных формы на тестовый сервис авторизации
// 0. небольшой блок под кнопкой регистрации для вывода ответов от сервиса авторизации (для теста)
//    чето не получилось, поэтому сделал как в уроке
//const formResponseMsg = document.querySelector('.modal__debug-message');
//..как в уроке - вывод сообщения прямо в форму с перезаписью всего содержимого:
const modalTitle = document.querySelector('.modal__title');

// 1. находим форму в DOM..
//const form = document.querySelector('.modal__form');   //!BUG#1: неправильно указал селектор!
const form = document.querySelector('form');             //*FIX#1
// 2. добавляем обработчик на событие onSubmit..
form.addEventListener('submit', (event) => {
    // 3. отключаем стандартное поведение браузера (обработку клика по кнопке и т.п)
    event.preventDefault(); 

    // 4. сохраняем все введенные в форму данные в Объект
    //..версия из курса
    /*
    const data = {
        name: form.name.value,
        surname: form.surname.value,
        tel: form.phone.value,
    };
    */
    //..моя версия
    const data = {
        name: form.name.value.toUpperCase(),
        surname: form.surname.value.toUpperCase(),
        tel: formatPhoneNumber(form.phone.value),
    };

    // 5. теперь с помощью HTTP POST запроса можно отправлять данные из объекта в JSON нотации
    //    на тестовый сервис авторизации (auth_api_endpoint)
    //    auth_api_endpoint: https://api-form-order.herokuapp.com/api/order
    //    "fetch" возвращает промис, который мы можем обрабатывать..
    fetch('https://api-form-order.herokuapp.com/api/order', {
        method: 'post',
        body: JSON.stringify(data),
    })
    // 6. обрабатываем ответ от сервиса авторизации
    //    преобразуем JSON-ответ сервиса содержщий идентификатор созданной записи в JavaScript Оббъект
    //    "then" также возвращается промис..
        .then((response) => response.json()) 
    // 7. выводим поля JSON-ответа на форму в специальный блок
        .then((person) => {
            //..отсебятина (не получилось)
            //formResponseMsg.textContent = `#server: запись (${person.id}) успешно добавлена: ${person.name} ${person.surname}`;
            //..как в уроке
            modalTitle.textContent = `${person.name}, ваша заявка успешно принята, номер: ${person.id}`;
            //*FIX#2
            form.remove();
            setTimeout(() => {
                overlay.classList.remove('overlay_open');
                modal.classList.remove('modal_open');
            }, 4000)
        });

    // 8. уничтожаем объект с формрой регистрации и через 3 секунды закрываем оверлей
    //    ..что-то у меня при клике на форме повторно выводятся данные в Title
    //!BUG#2: удаление формы и установка таймера закрытия должно быть внутри обработки промиса ".then(person)"!
    //form.remove();
    //setTimeout(() => {
    //    overlay.classList.remove('overlay_open');
    //    modal.classList.remove('modal_open');
    //}, 4000)

    // 6. выводим объект с данными формы в консоль
    console.log(formData);
});
