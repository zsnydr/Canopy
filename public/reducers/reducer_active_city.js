export default function (state = null, action) {
  switch (action.type) {
    case 'CITY_SELECTED':
      return action.payload.data;
  }
  return state;
}
