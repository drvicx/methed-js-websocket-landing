//=Находим в DOM элемент содержащий список валют
const exchangeRatesList = document.querySelector('.exchange-rates__list');

//--DEBUG
//console.log(exchangeRates);

//=Создаем Сокет для постоянного подключения к тестовому Сервису
// который принимает подключения по протоколу WebSocket
// и транслирует курсы валют внутри созданного канала TCP-подключения (сокета)
// Веб-приложение Сервиса написано на NodeJS и размещено на облачном VPS Heroku
// url-сервиса: ws://web-socket-current.herokuapp.com
//
const socket = new WebSocket('ws://web-socket-current.herokuapp.com');


/**
 * =Функция которая ..
 * @param {*} wrapper - селектор html-элемента который будет использован для вывода данных в DOM;
 * @param {*} data - данные полученные из ответа WebSocket сервиса при наступлении события "message";
 */
const renderExchangeData = (wrapper, data) => {
    //..применяем деструктуризацию при которой из многих полей объекта
    //  данные сразу копируютс во многие переменные
    const { from, to, rate, change } = JSON.parse(data);

    //--DEBUG
    //console.log(from, to, rate, change);     //= CHF RUB 34.79 1 ..5 sec.. CHF RUB 34.79 1 ..

    //..создаем li-элемент который будет содержать данные о курсе
    //  <li class="exchange-rates__item exchange_rates__item_up">
    //      <span class="exchange-rates__currency">RUB/AUT</span>
    //      <span class="exchange-rates__value">25.59</span>
    //  </li>
    //  <li class="exchange-rates__item exchange_rates__item_down">
    //      <span class="exchange-rates__currency">AUD/CNY</span>
    //      <span class="exchange-rates__value">72.68</span>
    //  </li>
    //
    const listItem = document.createElement('li');

    listItem.classList.add(
        //..основной класс li-элемента
        'exchange-rates__item',
        //..класс-модификатор который устанавливается в зависимости от флага "change" направления изменения курса (-1, 1)
        //  используется синтакис тернарного оператора чтобы не писать "if, else"
        change === 1 ? 'exchange_rates__item_up' : 'exchange_rates__item_down'
    );
    //..добавляем данные (которые состоят из двух span-блоков которые необходимо создать и добавить к li-элементу)
    const currency = document.createElement('span');
    currency.classList.add('exchange-rates__currency');
    currency.textContent = `${from}/${to}`;

    const value = document.createElement('span');
    value.classList.add('exchange-rates__value');
    value.textContent = rate;

    //..добавляем span-элементы к li-элементу
    listItem.append(currency, value);
    //..добавляем собранный li-элемент к wrapper-элементу в который будут выводится новые li-элементы
    //wrapper.append(listItem);         // *новые записи добавляем в конец wrapper-элемента
    wrapper.prepend(listItem);          // *новые записи добавляем в начало wrapper-элемента

    //..очищаем wrapper от всех li-элементов
    //  чтобы он не стал в итоге бесконечным
    const maxItems = 4;

    if (wrapper.children.length > maxItems) {
        wrapper.children[maxItems].remove();
    }

    //--DEBUG
    //  добавляем данные и выводим html-элемент с данными
    //listItem.textContent = `${from} / ${to} : ${rate}`;
    //console.log(listItem);                                  //= <li class="exchange-rates__item exchange_rates__item_down">RUB  HKD : 49.51</li>
    console.log(`${from}/${to}: ${rate}`)    

}


//=С помощью обработчика события отлавливаем у Сокета событие "message"
// которое возникает когда через сокет передается новое сообщение с данными
// и вызываем при каждом событии функцию отрисовки данных в DOM-элемент на странице
socket.addEventListener('message', event => {
    //--DEBUG
    //console.log(event);                     // весь объект
    //console.log(event.data);                // только полезные данные (payload) из поля "data"
    //console.log(JSON.parse(event.data));    // конвертируем JSON-строку в JavaScript Объект;

    //..Вызываем функцию-парсер и передаем ей селектор html-элемента враппера и Объект с ответом
    renderExchangeData(exchangeRatesList, event.data);
});

//=С помощью обработчика события отлавливаем у Сокета событие типа "ошибка"
// т.е перехватываем ошибку если Сокет ее возвращает
socket.addEventListener('error', socketError => {
    console.log(socketError);
});
