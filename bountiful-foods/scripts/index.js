const counter = document.querySelector('.fresh-drink-info p');

let exist = localStorage.getItem('drinks');
if (exist) {
  drinkList = JSON.parse(localStorage.getItem('drinks'));
  counter.textContent = drinkList.length;
} else {
  counter.textContent = 0;
}