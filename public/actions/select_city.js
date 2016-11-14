import request from 'axios';

export default function selectCity(city) {
  const payload = request.get(`/api/cities/${city}`);
  return {
    type: 'CITY_SELECTED',
    payload
  };
}

