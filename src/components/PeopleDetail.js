import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Text,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { getTheme } from 'react-native-material-kit'

const theme = getTheme()

import * as actions from 'src/actions'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
    borderColor: '#eee',
    borderWidth: 0.5
  },
  title1: {
    top: 10,
    left: 80,
    fontSize: 24
  },
  title2: {
    top: 35,
    left: 82,
    fontSize: 18
  },
  image: {
    flex: 0,
    height: 100,
    width: width,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    left: 295,
    color: 'rgba(233, 166, 154, 0.8)',
    backgroundColor: 'transparent'
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 0,
    color: '#fff',
    backgroundColor: 'transparent'
  },
  textArea: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 10,
    width: 260
  },
  TextIcon: {
    color: '#26a69a'
  },
  actionArea: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  cardContentStyle: {
    color: '#a1a1a1',
    marginLeft: 10
  }
})

class PeopleDetail extends Component {
  handlePress = (link) => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link)
      } else {
        console.log('cant open this url' + link);
      }
    })
  }

  render () {
    const { personSelected } = this.props

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: 'https://unsplash.it/320/180'}}
          style={[theme.cardImageStyle, styles.image]}
        />
        <EvilIcon name='user' size={100} style={styles.icon} />
        <SimpleLineIcon
          name='close'
          size={30} style={styles.closeIcon}
          onPress={() => this.props.noneSelected()}
        />
        <Text style={[theme.cardTitleStyle, styles.title1]}>{personSelected.name}</Text>
        <Text style={[theme.cardTitleStyle, styles.title2]}>{personSelected.address}</Text>
        <View style={styles.textArea}>
          <MaterialIcon name='phone' size={24} style={styles.textIcon} />
          <Text style={styles.cardContentStyle}>{personSelected.phone}</Text>
        </View>
        <View style={styles.textArea}>
          <MaterialIcon name='email' size={24} style={styles.textIcon} />
          <Text style={styles.cardContentStyle}>{personSelected.email}</Text>
        </View>
        <View style={styles.textArea}>
          <MaterialIcon name='mode-edit' size={24} style={styles.textIcon} />
          <Text style={styles.cardContentStyle}>{personSelected.eyeColor}</Text>
        </View>
        <View style={styles.actionArea}>
          <TouchableOpacity onPress={() => this.handlePress(`tel:${personSelected.phone}`)}>
            <MaterialIcon name='phone' size={60} style={styles.textIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlePress(`sms:${personSelected.phone}`)}>
            <MaterialIcon name='message' size={60} style={styles.textIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlePress(`mailto:${personSelected.email}`)}>
            <MaterialIcon name='email' size={60} style={styles.textIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.actionArea}>
          <Text>Call</Text>
          <Text>Sms</Text>
          <Text>Emai</Text>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  personSelected: state.personSelected
})

const mapDispatchToProps = dispatch => ({
  noneSelected: () => dispatch(actions.nonePerson())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleDetail)
