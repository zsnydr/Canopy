export default function selectCity(city) {
  console.log(city);
  return {
    type: 'CITY_SELECTED',
    payload: city
  };
};
