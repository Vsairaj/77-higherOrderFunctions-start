import cart from './cart.json';
import currencyRates from './currencyRates.json';
import Row from './Row';
import { renderRows, renderTotals } from './view';

const currencyPicker = 
document.querySelector("select[name='currency-picker']");

const itemsRows = 
document.querySelector("div[class='item-rows']");

for (const property in currencyRates) {
    currencyPicker.innerHTML += `<option>${property}</option>`
  }
  
const refresh =()  => {
renderRows(cart);
renderTotals(cart);
}

refresh();

currencyPicker.addEventListener('change', (event) =>
{
    const currencyPicked = event.target.value;
    updateCurrency(currencyPicked)
})

const findConversionRate = (currencyPicker) => currencyRates[`${currencyPicker}`];

const updateCurrency = (currencyPicker, fn) => {
    //render rows with currency changed
    console.log(findConversionRate(currencyPicker));
    var revisedCart = cart.map((elem) => 
     {
        return {'id':elem.id,
      'product': elem.product, 
      'cost': (elem.cost*findConversionRate(currencyPicker)),
      'quantity': elem.quantity}
    });

    return fn(revisedCart);
}

updateCurrency(currencyPicker, renderTotals);