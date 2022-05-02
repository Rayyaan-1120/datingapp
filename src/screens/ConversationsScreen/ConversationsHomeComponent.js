import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { useTheme } from 'dopenative'
import { TNStoriesTray } from '../../Core/truly-native'
import { IMConversationListView } from '../../Core/chat'
import dynamicStyles from './styles'

function ConversationsHomeComponent(props) {
  const {
    matches,
    onMatchUserItemPress,
    navigation,
    emptyStateConfig,
    audioVideoChatConfig,
  } = props
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const channels = useSelector(state => state.chat.channels ?? [])

  const inactiveConversations = useMemo(() => {
    const channelsParticipantsIDs = channels.flatMap(channel =>
      channel.participants.map(participant => participant.id),
    )

    return matches.filter(match => !channelsParticipantsIDs.includes(match.id))
  }, [matches, channels])

  const renderHeaderComponent = () => {
    return (
      <TNStoriesTray
        onStoryItemPress={onMatchUserItemPress}
        storyItemContainerStyle={styles.userImageContainer}
        data={inactiveConversations}
        displayLastName={false}
        showOnlineIndicator={true}
      />
    )
  }

  return (
    <View style={styles.container}>
      <IMConversationListView
        navigation={navigation}
        emptyStateConfig={emptyStateConfig}
        audioVideoChatConfig={audioVideoChatConfig}
        headerComponent={renderHeaderComponent}
      />
    </View>
  )
}

export default ConversationsHomeComponent
