import convertUsdToVnd,{USD_TO_VND, formatVND} from './currency.js';

console.log(`Current exchange rate: 1 USD = ${USD_TO_VND} VND`);

const usd = 500;
const vndValue = convertUsdToVnd(usd)
console.log(`500 USD is equal to ${formatVND(vndValue)}`);

