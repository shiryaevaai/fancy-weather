export function convertFromCelciusToFahrenheit(temperature) {
  return Math.round((temperature * 9 / 5) + 32);
}

export function convertFromFahrenheitToCelcius(temperature) {
  return Math.round((temperature - 32) * 5 / 9);
}