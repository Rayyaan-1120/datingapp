import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { useTheme } from 'dopenative'
import IMConversationView from '../IMConversationView'
import dynamicStyles from './styles'
import { TNEmptyStateView } from '../../truly-native'

const IMConversationList = memo(props => {
  const {
    onConversationPress,
    emptyStateConfig,
    conversations,
    loading,
    user,
    headerComponent,
  } = props
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const renderConversationView = ({ item }) => (
    <IMConversationView
      onChatItemPress={onConversationPress}
      item={item}
      user={user}
    />
  )

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{ marginTop: 15 }} size="small" />
      </View>
    )
  }

  return (
    <FlatList
      vertical={true}
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={conversations}
      renderItem={renderConversationView}
      keyExtractor={item => `${item.id}`}
      removeClippedSubviews={false}
      ListHeaderComponent={headerComponent}
      ListEmptyComponent={
        <View style={styles.emptyViewContainer}>
          <TNEmptyStateView emptyStateConfig={emptyStateConfig} />
        </View>
      }
    />
  )
})

IMConversationList.propTypes = {
  onConversationPress: PropTypes.func,
  conversations: PropTypes.array,
}

export default IMConversationList
