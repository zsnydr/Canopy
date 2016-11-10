export default function (state = null, action) {
  switch (action.type) {
    case 'UPDATE_LISTINGS':
      console.log('response from update listing', action.payload);
      return action.payload.data;
  }

  return state;
}
