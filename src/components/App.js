import React, { Component } from 'react'
import { View } from 'react-native'
import firebase from 'firebase'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk'

import Login from './Login'
import Loader from './Loader'
import Navigation from './Navigation'
import reducers from '../reducers/PeopleReducer'

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(Thunk)
)

export default class CRM extends Component {
  state = {
    loggedIn: null
  }

  componentWillMount () {
    firebase.initializeApp({
      apiKey: 'AIzaSyC8cRLS2iyS9tVx_6tH9R5Y6JySUqbEQzE',
      authDomain: 'crmapp-3e370.firebaseapp.com',
      databaseURL: 'https://crmapp-3e370.firebaseio.com',
      projectId: 'crmapp-3e370',
      storageBucket: 'crmapp-3e370.appspot.com',
      messagingSenderId: '333178734862'
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderInitialView = () => {
    switch (this.state.loggedIn) {
      case true:
        return <Navigation />
      case false:
        return <Login />
      default:
        return <Loader />
    }
  }

  render () {
    return (
      <Provider store={store}>
        <View style={{paddingTop: 40, flex: 1}}>
          {this.renderInitialView()}
        </View>
      </Provider>
    )
  }
}
