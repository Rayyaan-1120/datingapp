import React from 'react'
import { FlatList, View } from 'react-native'
import PropTypes from 'prop-types'
import { useTheme, useTranslations } from 'dopenative'
import { IMFriendItem } from '../..'
import { SearchBarAlternate } from '../../../..'
import dynamicStyles from './styles'
import { TNEmptyStateView, TNActivityIndicator } from '../../../../truly-native'

function IMFriendsListComponent(props) {
  const {
    containerStyle,
    onFriendAction,
    friendsData,
    onFriendItemPress,
    displayActions,
    isLoading,
    followEnabled,
    viewer,
    searchBar,
    onSearchBarPress,
    emptyStateConfig,
  } = props
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()

  const styles = dynamicStyles(theme, appearance)
  const renderItem = ({ item }) => (
    <IMFriendItem
      onFriendItemPress={onFriendItemPress}
      item={item}
      onFriendAction={onFriendAction}
      displayActions={displayActions && item.user.id != viewer.id}
      followEnabled={followEnabled}
    />
  )

  return (
    <View style={[styles.container, containerStyle]}>
      {searchBar && (
        <SearchBarAlternate
          onPress={onSearchBarPress}
          placeholderTitle={localized('Search for friends')}
        />
      )}
      {friendsData && friendsData.length > 0 && (
        <FlatList
          data={friendsData}
          renderItem={renderItem}
          keyExtractor={item => item.user.id}
        />
      )}
      {!friendsData ||
        (friendsData.length <= 0 && (
          <View style={styles.emptyViewContainer}>
            <TNEmptyStateView emptyStateConfig={emptyStateConfig} />
          </View>
        ))}
      {(isLoading || friendsData == null) && <TNActivityIndicator />}
    </View>
  )
}

IMFriendsListComponent.propTypes = {
  onCommentPress: PropTypes.func,
  onFriendItemPress: PropTypes.func,
  actionIcon: PropTypes.bool,
  searchBar: PropTypes.bool,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  friendsData: PropTypes.array,
  onSearchBarPress: PropTypes.func,
  searchData: PropTypes.array,
  onSearchTextChange: PropTypes.func,
  isSearchModalOpen: PropTypes.bool,
  onSearchModalClose: PropTypes.func,
  onSearchClear: PropTypes.func,
}

export default IMFriendsListComponent
