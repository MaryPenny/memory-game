// Создаем массив карт (52 карты)  
var cards = ['0C', '0D', '0H', '0S', '2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S',
		 '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S',
		 '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', '9S',
		 'JC', 'JD', 'JH', 'JS', 'QC', 'QD', 'QH', 'QS', 'KC', 'KD', 'KH', 'KS',
		 'AC', 'AD', 'AH', 'AS'];

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

mix_cards = MixArray(mix_cards);

var game_cards = mix_cards.slice();
game_cards.length = 9; //укорачиваем массив карт

//Дублирование элементов массива
function DoubleArray(array) {	
	
	return array.concat(array);
}

game_cards = DoubleArray(game_cards);
var game_mix_cards = game_cards.slice();

game_mix_cards = MixArray(game_mix_cards);

describe('my test memory game', function() {
  it('Всего 52 карты', function() {
		assert.equal(cards.length, 52);
  });
  
  it('Первоначальный и перемешанный массив содержат одинаковые элементы', function(){
		expect(cards).to.include.members(mix_cards); // true
		expect(mix_cards).to.include.members(cards); // true
  });
  
  it('Элементы перемешаны', function(){
	    expect(cards).to.not.equal(mix_cards);
  });
  
    it('На игральном столе 18 карт', function() {
		assert.equal(game_cards.length, 18);
  });
  
    it('Карты перемешаны', function(){
	    expect(game_cards).to.not.equal(game_mix_cards);
  });
});



