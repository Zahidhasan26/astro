
const API_KEY = "live_bAKiOJp3jqFc7pCBlMGvJS63K5IzYXWhzpurje8rTCUsea118Cvc5HN6aVW2Ju6q";
const BASE_URL = "https://api.weatherbit.io/v2.0/current";

export async function fetchWeather(cities) {
  const promises = cities.map(city =>
    fetch(`${BASE_URL}?city=${city}&key=${API_KEY}`).then(res => res.json())
  );
  const results = await Promise.all(promises);
  return results.map(result => result.data[0]);
}
