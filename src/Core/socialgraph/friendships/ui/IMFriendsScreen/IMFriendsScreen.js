import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
} from 'react'
import { ReactReduxContext, useSelector } from 'react-redux'
import { useTheme, useTranslations } from 'dopenative'
import { TNTouchableIcon } from '../../../../truly-native'
import { FriendshipConstants, IMFriendsListComponent } from '../..'
import { FriendshipAPITracker } from '../../api'

const IMFriendsScreen = props => {
  const { store } = useContext(ReactReduxContext)
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()

  const { route } = props
  let showDrawerMenuButton = route.params.showDrawerMenuButton
  let headerTitle = route.params.friendsScreenTitle || localized('Friends')
  const followEnabled = props.route.params.followEnabled

  const [isLoading, setIsLoading] = useState(false)
  const [willBlur, setWillBlur] = useState(false)

  const friendships = useSelector(state => state.friends.friendships)
  const currentUser = useSelector(state => state.auth.user)

  const friendshipTracker = useRef(null)
  const willBlurSubscription = useRef(null)
  const didFocusSubscription = useRef(
    props.navigation.addListener('focus', payload => {
      setWillBlur(false)
    }),
  )

  useLayoutEffect(() => {
    const colorSet = theme.colors[appearance]
    props.navigation.setOptions({
      headerTitle: headerTitle,
      headerLeft: () =>
        showDrawerMenuButton && (
          <TNTouchableIcon
            imageStyle={{ tintColor: colorSet.primaryText }}
            iconSource={theme.icons.menuHamburger}
            onPress={openDrawer}
          />
        ),
      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
      },
      headerTintColor: colorSet.primaryText,
    })
  }, [])

  useEffect(() => {
    friendshipTracker.current = new FriendshipAPITracker(
      store,
      currentUser.id || currentUser.userID,
      followEnabled,
      followEnabled,
      followEnabled,
    )
    friendshipTracker.current.subscribeIfNeeded()
  }, [currentUser?.id])

  useEffect(() => {
    willBlurSubscription.current = props.navigation.addListener(
      'blur',
      payload => {
        setWillBlur(true)
      },
    )
    return () => {
      willBlurSubscription.current && willBlurSubscription.current()
      didFocusSubscription.current && didFocusSubscription.current()
    }
  }, [])

  useEffect(() => {
    if (willBlur) {
      friendshipTracker.current.unsubscribe()
    }
  }, [willBlur])

  const openDrawer = () => {
    props.navigation.openDrawer()
  }

  const onSearchButtonPress = async () => {
    props.navigation.navigate('UserSearchScreen', {
      followEnabled: followEnabled,
    })
  }

  const onFriendAction = (item, index) => {
    if (isLoading || (item.user && item.user.id == currentUser.id)) {
      return
    }
    switch (item.type) {
      case FriendshipConstants.FriendshipType.none:
        onAddFriend(item, index)
        break
      case FriendshipConstants.FriendshipType.reciprocal:
        onUnfriend(item, index)
        break
      case FriendshipConstants.FriendshipType.inbound:
        onAccept(item, index)
        break
      case FriendshipConstants.FriendshipType.outbound:
        onCancel(item, index)
        break
    }
  }

  const onUnfriend = (item, index) => {
    setIsLoading(true)
    friendshipTracker.current.unfriend(currentUser, item.user, respone => {
      setIsLoading(false)
    })
  }

  const onAddFriend = (item, index) => {
    friendshipTracker.current.addFriendRequest(
      currentUser,
      item.user,
      response => {},
    )
  }

  const onCancel = (item, index) => {
    setIsLoading(true)
    friendshipTracker.current.cancelFriendRequest(
      currentUser,
      item.user,
      response => {
        setIsLoading(false)
      },
    )
  }

  const onAccept = (item, index) => {
    setIsLoading(true)
    friendshipTracker.current.addFriendRequest(
      currentUser,
      item.user,
      response => {
        setIsLoading(false)
      },
    )
  }

  const onFriendItemPress = friendship => {
    if (friendship.user && friendship.user.id == currentUser.id) {
      return
    }
    props.navigation.push('FriendsProfile', {
      user: friendship.user,
      lastScreenTitle: 'Friends',
    })
  }

  const onEmptyStatePress = () => {
    onSearchButtonPress()
  }

  const emptyStateConfig = {
    title: localized('No Friends'),
    description: localized(
      'Make some friend requests and have your friends accept them. All your friends will show up here.',
    ),
    buttonName: localized('Find friends'),
    onPress: onEmptyStatePress,
  }

  return (
    <IMFriendsListComponent
      friendsData={friendships}
      searchBar={true}
      onSearchBarPress={onSearchButtonPress}
      onFriendItemPress={onFriendItemPress}
      onFriendAction={onFriendAction}
      isLoading={isLoading}
      followEnabled={followEnabled}
      emptyStateConfig={emptyStateConfig}
    />
  )
}

export default IMFriendsScreen
