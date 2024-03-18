const currencyElementOne = document.getElementById("currency-one");
const currencyElementTwo = document.getElementById("currency-two");
const amountElementOne = document.getElementById("amount-one");
const amountElementTwo = document.getElementById("amount-two");
const rateElement = document.getElementById("rate");
const convert = document.getElementById("convert");
const swap = document.getElementById("swap");

async function calculate() {
    const fromCurrency = currencyElementOne.value;
    const toCurrency = currencyElementTwo.value;
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        if (data && data.rates && data.rates[toCurrency]) {
            const rate = data.rates[toCurrency];
            rateElement.innerText = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
            const convertedAmount = (amountElementOne.value * rate).toFixed(2);
            amountElementTwo.value = convertedAmount;
        }
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
    }
}

convert.addEventListener("click", calculate);

swap.addEventListener("click", () => {
    const temp = currencyElementOne.value;
    currencyElementOne.value = currencyElementTwo.value;
    currencyElementTwo.value = temp;
    calculate();
});

calculate();
