export function convertToUSD(amount, fromCurrency) {

    const exchangeRates = {
      "USD": 1,          // 1 USD = 1 USD
      "EUR": 0.84,       // 1 EUR = 0.84 USD
      "GBP": 0.72,       // 1 GBP = 0.72 USD
      "AUD": 1.31,       // 1 AUD = 1.31 USD
      "CAD": 1.25,       // 1 CAD = 1.25 USD
      "JPY": 109.54,     // 1 JPY = 109.54 USD
      "CNY": 6.45,       // 1 CNY = 6.45 USD
      "INR": 74.55,      // 1 INR = 74.55 USD
      "CHF": 0.92,       // 1 CHF = 0.92 USD
      "SGD": 1.36,       // 1 SGD = 1.36 USD
      "NZD": 1.42,       // 1 NZD = 1.42 USD
      "HKD": 7.77,       // 1 HKD = 7.77 USD
      "SEK": 8.61,       // 1 SEK = 8.61 USD
      "KRW": 1146.94,    // 1 KRW = 1146.94 USD
      "MXN": 20.09,      // 1 MXN = 20.09 USD
      "BRL": 5.42,       // 1 BRL = 5.42 USD
      "ZAR": 15.10,      // 1 ZAR = 15.10 USD
      "TRY": 10.03,      // 1 TRY = 10.03 USD
      "RUB": 74.21,      // 1 RUB = 74.21 USD
      "AED": 3.67,       // 1 AED = 3.67 USD
      "PLN": 3.85,       // 1 PLN = 3.85 USD
      "THB": 32.94       // 1 THB = 32.94 USD
    }

  if (exchangeRates.hasOwnProperty(fromCurrency)) {
    // Convert the amount to USD using the exchange rate
    const usdAmount = amount * exchangeRates[fromCurrency];
    return usdAmount;
} else {
    // If the currency is not supported, return an error message
    return null;
}
}