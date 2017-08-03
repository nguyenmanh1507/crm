import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'
import {
  MKTextField,
  MKColor,
  MKButton
} from 'react-native-material-kit'
import { connect } from 'react-redux'

import * as actions from 'src/actions'

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center'
  },
  fieldStyles: {
    height: 40,
    color: MKColor.Orange
  },
  addButton: {
    marginTop: 20
  }
})

const AddButton = MKButton.coloredButton()
  .withText('Add')
  .build()

class AddPerson extends Component {
  static navigationOptions = {
    tabBarLabel: 'Add person',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name='plus'
        size={70}
        style={[{color: tintColor}, styles.icon]}
      />
    )
  }

  createNewContact = () => {
    const {
      name,
      phone,
      email,
      address
    } = this.props

    this.props.createNewContact({ name, phone, email, address })
    this.props.navigation.navigate('PeopleList')
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.form}>
          <Text>Add a new contact</Text>
          <MKTextField
            textInputStyle={styles.fieldStyles}
            placeholder='Name'
            tintColor={MKColor.Teal}
            value={this.props.name}
            onChangeText={value => this.props.formUpdate({ prop: 'name', value })}
          />
          <MKTextField
            textInputStyle={styles.fieldStyles}
            placeholder='Phone'
            tintColor={MKColor.Teal}
            value={this.props.phone}
            onChangeText={value => this.props.formUpdate({ prop: 'phone', value })}
          />
          <MKTextField
            textInputStyle={styles.fieldStyles}
            placeholder='Email'
            tintColor={MKColor.Teal}
            value={this.props.email}
            onChangeText={value => this.props.formUpdate({ prop: 'email', value })}
          />
          <MKTextField
            textInputStyle={styles.fieldStyles}
            placeholder='Address'
            tintColor={MKColor.Teal}
            value={this.props.address}
            onChangeText={value => this.props.formUpdate({ prop: 'address', value })}

          />
          <View style={styles.addButton}>
            <AddButton onPress={this.createNewContact} />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  name: state.name,
  phone: state.phone,
  email: state.email,
  address: state.address,
})

const mapDispatchToProps = dispatch => ({
  createNewContact: ({ name, phone, email, address }) => dispatch(actions.createNewContact({ name, phone, email, address })),
  formUpdate: ({ prop, value }) => dispatch(actions.formUpdate({ prop, value }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPerson)
