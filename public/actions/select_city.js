import request from 'axios';

export default function selectCity(city) {
  const payload = request.get(`/api/cities/${city}`);
  console.log('done with get city call');
  return {
    type: 'CITY_SELECTED',
    payload
  };
}

