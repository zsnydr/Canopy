export default function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_LISTINGS':
      return action.payload;
  }

  return state;
}
