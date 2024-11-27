const apiKey = "5ad5b797af334810b77f9a8d2d1b1b3b";
const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;

async function fetchExchangeRates() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Error in response from API");
    }
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("Error while fetching currency rates:", error);
  }
}

async function populateCurrencyOptions() {
  const rates = await fetchExchangeRates();
  const currencySelects = [
    document.getElementById("fromCurrency"),
    document.getElementById("toCurrency"),
  ];

  for (const select of currencySelects) {
    for (const currency in rates) {
      const option = document.createElement("option");
      option.value = currency;
      option.textContent = currency;
      select.appendChild(option);
    }
  }
}

function updateResult(newValue) {
  const resultElement = document.getElementById("result");
  resultElement.textContent = newValue;
  resultElement.style.opacity = 0;

  setTimeout(() => {
    resultElement.style.opacity = 1;
  }, 100);
}

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  fetchExchangeRates().then((rates) => {
    const result = ((amount * rates[toCurrency]) / rates[fromCurrency]).toFixed(
      2
    );
    updateResult(`${amount} ${fromCurrency} = ${result} ${toCurrency}`);
  });
}

document.getElementById("convert").addEventListener("click", convertCurrency);
populateCurrencyOptions();
