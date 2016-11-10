 const selectCity = function (city) {
  return {
    type: 'CITY_SELECTED',
    payload: city
  };
}

export default selectCity;
