import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import { getTheme, MKColor } from 'react-native-material-kit'
import Icon from 'react-native-vector-icons/EvilIcons'
import { connect } from 'react-redux'

import * as actions from 'src/actions'

const theme = getTheme()

const styles = StyleSheet.create({
  card: {
    marginTop: 20
  },
  title: {
    top: 20,
    left: 80,
    fontSize: 24
  },
  image: {
    height: 100
  },
  action: {
    backgroundColor: MKColor.Grey,
    color: '#FAFAFA'
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 0,
    color: '#FAFAFA',
    backgroundColor: 'rgba(255, 255, 255, 0)'
  }
})

const PeopleItem = ({ people, selectPerson }) => (
  <TouchableWithoutFeedback onPress={() => selectPerson(people)}>
    <View style={[theme.cardStyle, styles.card]}>
      <Image
        source={{ uri: 'https://unsplash.it/320/180' }}
        style={[theme.cardImageStyle, styles.image]}
      />
      <Icon name='user' size={100} style={styles.icon} />
      <Text style={[theme.cardTitleStyle, styles.title]}>{people.name}</Text>
      <Text style={[theme.cardActionStyle, styles.action]}>{people.address}</Text>
    </View>
  </TouchableWithoutFeedback>
)

const mapDispatchToProps = dispatch => ({
  selectPerson: (id) => dispatch(actions.selectPerson(id))
})

export default connect(
  null,
  mapDispatchToProps
)(PeopleItem)
