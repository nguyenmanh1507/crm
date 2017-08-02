export const selectPerson = (people) => ({
  type: 'SELECTED_PERSON',
  payload: people
})

export const nonePerson = () => ({
  type: 'NONE_SELECTED',
})
