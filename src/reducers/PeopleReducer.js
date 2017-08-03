const initialState = {
  people: [],
  detailView: false,
  personSelected: null,
  name: '',
  phone: '',
  email: '',
  address: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INITIAL_FETCH':
      return {
        ...state,
        people: action.payload
      }
    case 'SELECTED_PERSON':
      return {
        ...state,
        detailView: true,
        personSelected: action.payload
      }
    case 'NONE_SELECTED':
      return {
        ...state,
        detailView: false,
        personSelected: null
      }
    case 'FORM_UPDATE':
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      }
    case 'NEW_CONTACT':
      return {
        ...state,
        name: '',
        phone: '',
        email: '',
        address: '',
      }
    case 'ADD_PERSON':
      return {
        ...state,
        ...action.newPerson
      }
    case 'DELETE_CONTACT':
      return {
        ...state,
        detailView: false,
        personSelected: null
      }
    default:
      return state
  }
}
