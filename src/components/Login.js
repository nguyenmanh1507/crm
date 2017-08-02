/* global setTimeout */

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'
import firebase from 'firebase'

import Loader from './Loader'

const LoginButton = MKButton.coloredButton()
  .withText('Login')
  .build()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    paddingBottom: 10,
    width: 200,
  },
  fieldStyles: {
    height: 40,
    color: MKColor.Orange,
    width: 200
  },
  loginButtonArea: {
    marginTop: 20
  },
  errorMessage: {
    marginTop: 15,
    color: MKColor.Red,
    textAlign: 'center'
  }
})

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  onButtonPress = () => {
    const { email, password } = this.state
    this.setState({ error: '', loading: true })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onAuthSuccess)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onAuthSuccess)
          .catch(this.onAuthFailed)
      })
  }

  onAuthSuccess = () => {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    })
  }

  onAuthFailed = () => {
    this.setState({
      error: 'Authenication failed',
      loading: false
    })
  }

  renderLoaderOrLogin = () => {
    if (this.state.loading) {
      return <Loader />
    }

    return <LoginButton onPress={this.onButtonPress} />
  }

  render () {
    const {
      form,
      fieldStyles,
      loginButtonArea,
      errorMessage,
      container
    } = styles

    return (
      <View style={container}>
        <View style={form}>
          <Text>Login or create account</Text>
          <MKTextField
            text={this.state.email}
            onTextChange={email => this.setState({ email })}
            textInputStyle={fieldStyles}
            placeholder='Email...'
            tintColor={MKColor.Teal}
          />
          <MKTextField
            text={this.state.password}
            onTextChange={password => this.setState({ password })}
            textInputStyle={fieldStyles}
            placeholder='Password'
            tintColor={MKColor.Teal}
            password
          />
          <Text style={errorMessage}>
            {this.state.error}
          </Text>
          <View style={loginButtonArea}>
            {this.renderLoaderOrLogin()}
          </View>
        </View>
      </View>
    )
  }
}
