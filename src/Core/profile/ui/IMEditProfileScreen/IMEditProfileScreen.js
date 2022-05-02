import React, { useLayoutEffect, useCallback, useState } from 'react'
import { BackHandler, Alert, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme, useTranslations } from 'dopenative'
import TextButton from 'react-native-button'
import { useFocusEffect } from '@react-navigation/core'
import { userAPIManager } from '../../../api'
import IMFormComponent from '../IMFormComponent/IMFormComponent'
import { setUserData } from '../../../onboarding/redux/auth'
import {
  ErrorCode,
  localizedErrorMessage,
} from '../../../onboarding/utils/ErrorCode'
import { authManager } from '../../../onboarding/utils/api'
import dynamicStyles from './styles'

export default function IMEditProfileScreen(props) {
  const { theme, appearance } = useTheme()
  const { localized } = useTranslations()

  let screenTitle = props.route.params.screenTitle

  const currentUser = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const styles = dynamicStyles(theme, appearance)

  const form = props.route.params.form
  const onComplete = props.route.params.onComplete

  const [alteredFormDict, setAlteredFormDict] = useState({})

  useLayoutEffect(() => {
    const colorSet = theme.colors[appearance]
    props.navigation.setOptions({
      headerTitle: screenTitle,
      headerRight: () => (
        <TextButton style={{ marginRight: 12 }} onPress={onFormSubmit}>
          {localized('Done')}
        </TextButton>
      ),
      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
      },
      headerTintColor: colorSet.primaryText,
    })
  }, [alteredFormDict])

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackButtonPressAndroid,
      )
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackButtonPressAndroid,
        )
      }
    }, []),
  )

  const onBackButtonPressAndroid = () => {
    props.navigation.goBack()
    return true
  }

  const isInvalid = (value, regex) => {
    const regexResult = regex.test(value)

    if (value.length > 0 && !regexResult) {
      return true
    }
    if (value.length > 0 && regexResult) {
      return false
    }
  }

  const onFormSubmit = () => {
    var newUser = { ...currentUser }
    var allFieldsAreValid = true

    form.sections.forEach(section => {
      section.fields.forEach(field => {
        const newValue = alteredFormDict[field.key]?.trim()
        if (newValue != null) {
          if (field.regex && isInvalid(newValue, field.regex)) {
            allFieldsAreValid = false
          } else {
            newUser[field.key] = alteredFormDict[field.key]?.trim()
          }
        }
      })
    })

    if (allFieldsAreValid) {
      userAPIManager.updateUserData(currentUser.id, newUser)
      dispatch(setUserData({ user: newUser }))
      props.navigation.goBack()
      if (onComplete) {
        onComplete()
      }
    } else {
      alert(
        localized(
          'An error occurred while trying to update your account. Please make sure all fields are valid.',
        ),
      )
    }
  }

  const onFormChange = alteredFormDict => {
    setAlteredFormDict(alteredFormDict)
  }

  const onDeletePrompt = () => {
    Alert.alert(
      localized('Confirmation'),
      localized(
        'Are you sure you want to remove your account? This will delete all your data and the action is not reversible.',
      ),
      [
        {
          text: localized('Cancel'),
        },
        {
          text: localized('Yes'),
          onPress: onDeleteAccount,
        },
      ],
      {
        cancelable: false,
      },
    )
  }

  const onDeleteAccount = () => {
    authManager.deleteUser(currentUser?.id, response => {
      if (response.success) {
        Alert.alert(
          localized('Success'),
          localized('Successfully deleted account'),
        )
        props.navigation.reset({
          index: 0,
          routes: [
            {
              name: 'LoadScreen',
            },
          ],
        })

        return
      }
      if (response.error === ErrorCode.requiresRecentLogin) {
        Alert.alert(
          localized(localized('Error')),
          localized(localizedErrorMessage(response.error, localized)),
        )
        return
      }
      Alert.alert(
        localized(localized('Error')),
        localized(localized('We were not able to delete your account')),
      )
    })
  }

  return (
    <View style={styles.container}>
      <IMFormComponent
        form={form}
        initialValuesDict={currentUser}
        onFormChange={onFormChange}
        navigation={props.navigation}
      />
      <TextButton style={styles.deleteButton} onPress={onDeletePrompt}>
        {localized('Delete Account')}
      </TextButton>
    </View>
  )
}
