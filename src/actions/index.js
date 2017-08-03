import firebase from 'firebase'

export const selectPerson = (people) => ({
  type: 'SELECTED_PERSON',
  payload: people
})

export const nonePerson = () => ({
  type: 'NONE_SELECTED',
})

export const formUpdate = ({ prop, value }) => ({
  type: 'FORM_UPDATE',
  payload: { prop, value }
})

export const createNewContact = ({ name, phone, email, address }) => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/people`)
      .push({ name, phone, email, address })
      .then(() => {
        dispatch({ type: 'NEW_CONTACT' })
      })
  }
}

export const delelteContact = (uid) => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/people/$(uid)`)
      .remove()
      .then(() => dispatch({ type: 'DELETE_CONTACT' }))
  }
}

export const loadInitialContacts = () => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/people`)
      .on('value', snapshot => {
        dispatch({ type: 'INITIAL_FETCH', payload: snapshot.val() })
      })
  }
}
