export default function (state = null, action) {
  switch (action.type) {
    case 'VEIW_APPLICATION':
      console.log('APPLICATION ACTION: ', action.payload);
      return action.payload;
    case 'FORM_APPLICATION':
      console.log('APPLICATION ACTION: ', action.payload);
      return action.payload;
  }
  return state;
}
