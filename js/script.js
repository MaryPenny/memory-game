
var rows = 3;	//количество рядов
var columns = 6;	//количество колонок
var card_id = 0; //у каждой карты будет свой id
var attempt = 0;	//количество попыток открыть карту
var card_name = ""; //хранит имя открытой карты
var c_id = 0; //хранит id открытой карты
var result = 0; //счет игры

var sound_start = new Audio('sounds/start.mp3');
sound_start.play();

// Создаем массив карт (52 карты)
var cards = ['0C', '0D', '0H', '0S', '2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S',
			 '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S',
			 '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', '9S',
			 'JC', 'JD', 'JH', 'JS', 'QC', 'QD', 'QH', 'QS', 'KC', 'KD', 'KH', 'KS',
			 'AC', 'AD', 'AH', 'AS'];

//Создаем независимый массив для перемешаных карт
var mix_cards = cards.slice();
			 
// Перемешиваем массив в произвольном порядке
// Math.random() возвращает случайное число между 0 (включительно) и 1 (не включая 1)
// Math.floor возвращает наибольшее целое число, которое меньше или равно данному числу.
function MixArray(array) {
	for (var i = array.length - 1; i > 0; i--)	//перебор массива с последнего эл-та
		{
			var j = Math.floor(Math.random() * (i + 1)); //выбираем произвольный эл-т массива j
			var temp = array[i]; // текущи эл-т массива записываем в переменную temp
			array[i] = array[j]; // меняем местами текущий элемент i и новый j
			array[j] = temp; //вместо эл-та j устанавливаем эл-т i 
		}
		
	return array; //возвращаем перемешанный массив
}

mix_cards = MixArray(cards);	//перемешиваем массив карт
mix_cards.length = 9; //укорачиваем массив карт

//Дублирование элементов массива
function DoubleArray(array) {	
	
	return array.concat(array);
}

mix_cards = DoubleArray(mix_cards); //продублируем карты в массиве карт
mix_cards = MixArray(mix_cards);	//еще раз перемешаем массив карт

//Строим таблицу (карточный стол)
var table = document.getElementById('table');
for (var i = 0; i < rows; i++) {
	var tr = document.createElement('tr'); //создаем ряд

	//Заполняем ряды колонками:
	for (var j = 0; j < columns; j++) {
		var td = document.createElement('td'); //создаем колонку
		td.id = card_id;
		td.innerHTML = "<img src = 'img/Cards/" + mix_cards[card_id] + ".png' class='pic' data-tid='Card-flipped'/>";
		td.firstElementChild.classList.add("front"); 
		card_id ++;

		tr.appendChild(td); 
	}

	table.appendChild(tr); 
}

//Первые 5 секунд карты лежат рубашкой вниз, потом переворачиваются рубашкой вверх

function BackCards() {
	var front_cards = document.getElementsByTagName("td");
	for (card_id = 0; card_id < front_cards.length; card_id++) {
		front_cards[card_id].innerHTML = "<img src='img/Cards/rubashka.gif' class='pic' data-tid='Card'>";
		front_cards[card_id].classList.add("back");		
	}
}

 setTimeout(function(){

     BackCards();

},5000);

//Изначально сумма очков = 0
var sum = document.getElementById("sum-points");
sum.innerText = 0;

//Добавим событие "клик" на каждую карту
var inputs = document.getElementsByTagName("td");

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("click", OpenCard);
}

//Удаление пары карт
function DeleteCards(id1, id2) {
	var cards_dell = document.getElementsByTagName("td");
	
	setTimeout(function() 
					{
						cards_dell[id1].innerHTML = "";
						cards_dell[id1].classList.remove(cards_dell[id1].className);
						cards_dell[id1].classList.add("del");
						cards_dell[id2].innerHTML = "";
						cards_dell[id2].classList.remove(cards_dell[id2].className);
						cards_dell[id2].classList.add("del");
						attempt = 0;
						
						var back_cards = document.getElementsByClassName("back");
						result = result + (back_cards.length/2) * 42;
						sum.innerText = result;
						
						if (back_cards.length === 0) {
							window.location.href = "victory.html?id=" + result;	//передаем в параметр количество заработанных очков
						}
	    			}, 2000);
}

//Закрываем карты, если они не парные
function CloseCards(id1, id2) {
	var cards_close = document.getElementsByTagName("td");
	setTimeout(function() 
				{
					cards_close[id1].innerHTML = "<img src='img/Cards/rubashka.gif' class='pic' data-tid='Card'>";
					cards_close[id1].classList.remove(cards_close[id1].className);
					cards_close[id1].classList.add("back");
					cards_close[id2].innerHTML = "<img src='img/Cards/rubashka.gif' class='pic' data-tid='Card'>";
					cards_close[id2].classList.remove(cards_close[id2].className);
					cards_close[id2].classList.add("back");
					attempt = 0;
					
					var dell_cards = document.getElementsByClassName("del");
					result = result - (dell_cards.length/2) * 42;
					sum.innerText = result;

				}, 2000);

}

//Открываем карту
function OpenCard() {
	if ((this.className == "back") && (attempt < 2)) {	//если класс не "back" и количество попыток < 2
		
		this.classList.remove(this.className); //переворачиваем карту и присваиваем класс "front"
	    this.classList.add("front");
		this.innerHTML = "<img src = 'img/Cards/" + mix_cards[this.id] + ".png' class='pic' data-tid='Card-flipped'/>";
		
		if (attempt === 0) {	//если первая попытка
			card_name = mix_cards[this.id];	//сохраняем первую открытую карту
			c_id = this.id; //сохраняем id открытой карты
			attempt++;
		}
		else {	//если вторая попытка
			
			if (card_name == mix_cards[this.id]) {	//если карты совпадают, удаляем пару
				DeleteCards(c_id, this.id);
			}
			else {
				CloseCards(c_id, this.id);	//иначе - закрываем карты
			}
		attempt++;
		}
		
	}
}







	


