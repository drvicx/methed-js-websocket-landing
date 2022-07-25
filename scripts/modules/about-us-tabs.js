//=Ищем в DOM все Кнопки класса "advantage__button"
const advantageButtons = document.querySelectorAll('.advantage__button');
//--DEBUG
//console.log(advantageButtons);


//=Ищем в DOM все li-элементы с содержимым Табов класса "advantage__item-content"
const advantageContentItems = document.querySelectorAll('.advantage__item-content');
//--DEBUG
//console.log(advantageContentItems);


//=Перебираем все элементы Кнопок в цикле
// - первый параметр forEach() метода - callback функция в которую передается текущий элемент цикла;
advantageButtons.forEach((button, ib) => {
    //--DEBUG
    //console.log(i);            // индекс кнопки в цикле
    //console.log(button);       // объект кнопки

    //..На каждую Кнопку вешаем обработчик события onClick
    //  при срабатывании которого (при клике) происходит обход всех 
    button.addEventListener('click', () => {
        advantageContentItems.forEach((item, ii) => {
			//--DEBUG:
			//	при клике на кнопку выводим ее Идентификатор и dom-Объект,
		    //  а также Идентификатор и dom-Объект, li-элемента
            // *особенность в том, что если у кнопки и у li-элемента/таба совпадают идентификаторы (id)
            // *это значит что Кнопка соответствует конкретному Табу по содержанию
            // !однако, этот способ очень косвенный и скорее всего он работает ТОЛЬКО
            // !когда последовательность расположения Кнопок совпадает с последовательностью Табов верстке
            // !т.е. если перемешать последовательность, то совпадение ID ничео значить не будет (проверить)
            //console.log(ib, button);
            //console.log(ii, item);

            //..Если id Кнопки и id Таба (li-элемента с содержимым) совпадают
            //  то добавляем к Кнопке класс-модификатор который делает ее активной (темно-синей)
            //  Если id Кнопки и id Таба не совпадают, тоогда удалям класс-модификатор делая их не активными
            if (ib === ii) {
                advantageButtons[ii].classList.add('advantage__button_active');
                advantageContentItems[ii].classList.add('advantage__item-content_active');
            } else {
                advantageButtons[ii].classList.remove('advantage__button_active');
                advantageContentItems[ii].classList.remove('advantage__item-content_active');
            }
        })
    })
});



//--DEBUG
//console.log(advantageButtons);
//console.log(advantageContentItems);


/*
<li class="advantage__item-content advantage__item-content_convenience advantage__item-content_active">Наш сервис обмена криптовалюты Crypto интуитивно понятен и удобен в использовании. С нами просто.</li>
<li class="advantage__item-content advantage__item-content_speed">У нас самая быстрая скорость по обмену криптовалюты по подобным сервисам в России</li>
<li class="advantage__item-content advantage__item-content_quality">Нашу платформу выбирают миллионы людей</li>
<li class="advantage__item-content advantage__item-content_security">Ваши пароли под надежной защитой. Нас невозможно взломать</li>
*/
