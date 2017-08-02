import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/EvilIcons'

import PeopleItem from './PeopleItem'
import PeopleDetail from './PeopleDetail'

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap'
  }
})

class PeopleList extends Component {
  static navigationOptions = {
    tabBarLabel: 'People',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name='user'
        size={50}
        style={{ color: tintColor }}
      />
    )
  }

  componentWillMount () {
  }

  renderInitialView = () => {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.dataSource = ds.cloneWithRows(this.props.people)

    if (this.props.detailView) {
      return <PeopleDetail />
    }

    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={rowData => <PeopleItem people={rowData} />}
      />
    )

  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderInitialView()}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  people: state.people,
  detailView: state.detailView
})

export default connect(
  mapStateToProps
)(PeopleList)
