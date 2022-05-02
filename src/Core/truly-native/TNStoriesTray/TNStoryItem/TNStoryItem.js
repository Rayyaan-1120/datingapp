import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'dopenative'
import FastImage from 'react-native-fast-image'
import dynamicStyles from './styles'

const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'

function StoryItem(props) {
  const {
    item,
    index,
    onPress,
    containerStyle,
    imageStyle,
    imageContainerStyle,
    textStyle,
    activeOpacity,
    title,
    showOnlineIndicator,
    displayVerifiedBadge,
  } = props

  const refs = useRef()

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const lastName = item.lastName || ''
  return (
    <TouchableOpacity
      key={index}
      ref={refs}
      activeOpacity={activeOpacity}
      onPress={() => onPress(item, index, refs)}
      style={[styles.container, containerStyle]}>
      <View style={[styles.imageContainer, imageContainerStyle]}>
        <FastImage
          style={[styles.image, imageStyle]}
          source={{ uri: item.profilePictureURL || defaultAvatar }}
        />
        {showOnlineIndicator && <View style={styles.isOnlineIndicator} />}
      </View>
      {title && (
        <View style={styles.verifiedContainer}>
          <Text
            style={[
              styles.text,
              textStyle,
            ]}>{`${item.firstName} ${lastName}`}</Text>
          {displayVerifiedBadge &&
            item.isVerified &&
            (item.username !== 'My Story' || item.username !== 'Add Story') && (
              <FastImage
                style={styles.verifiedIcon}
                source={require('../../../../CoreAssets/verified.png')}
              />
            )}
        </View>
      )}
    </TouchableOpacity>
  )
}

StoryItem.propTypes = {
  onPress: PropTypes.func,
  imageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  item: PropTypes.object,
  index: PropTypes.number,
  activeOpacity: PropTypes.number,
  title: PropTypes.bool,
}

export default StoryItem
