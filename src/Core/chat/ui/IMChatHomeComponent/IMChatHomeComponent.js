import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'
import { SearchBarAlternate } from '../../..'
import { TNStoriesTray } from '../../../truly-native'
import dynamicStyles from './styles'
import { IMConversationListView } from '../..'

function IMChatHomeComponent(props) {
  const {
    friends,
    onSearchBarPress,
    onFriendItemPress,
    navigation,
    onSenderProfilePicturePress,
    onEmptyStatePress,
    searchBarplaceholderTitle,
    emptyStateConfig,
    followEnabled,
  } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()

  const styles = dynamicStyles(theme, appearance)

  const defaultEmptyStateConfig = {
    title: localized('No Conversations'),
    description: localized(
      'Add some friends and start chatting with them. Your conversations will show up here.',
    ),
    buttonName: localized('Add friends'),
    onPress: onEmptyStatePress,
  }

  return (
    <View style={styles.container}>
      <View style={styles.chatsChannelContainer}>
        <IMConversationListView
          navigation={navigation}
          emptyStateConfig={emptyStateConfig ?? defaultEmptyStateConfig}
          headerComponent={
            <>
              <View style={styles.searchBarContainer}>
                <SearchBarAlternate
                  onPress={onSearchBarPress}
                  placeholderTitle={
                    searchBarplaceholderTitle ?? localized('Search for friends')
                  }
                />
              </View>
              {friends && friends.length > 0 && (
                <TNStoriesTray
                  onStoryItemPress={onFriendItemPress}
                  storyItemContainerStyle={styles.userImageContainer}
                  data={friends}
                  displayVerifiedBadge={false}
                  displayLastName={false}
                  showOnlineIndicator={true}
                />
              )}
            </>
          }
        />
      </View>
    </View>
  )
}

IMChatHomeComponent.propTypes = {
  onSearchClear: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  onFriendAction: PropTypes.func,
  onSearchBarPress: PropTypes.func,
  channels: PropTypes.array,
}

export default IMChatHomeComponent
