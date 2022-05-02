import React, { useCallback, useLayoutEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/core'
import { useTheme, useTranslations } from 'dopenative'
import { setUserData } from '../../../onboarding/redux/auth'
import { userAPIManager } from '../../../api'
import IMFormComponent from '../IMFormComponent/IMFormComponent'

export default function IMUserSettingsScreen(props) {
  let screenTitle = props.route.params.screenTitle || localized('Settings')

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const currentUser = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const form = props.route.params.form
  const initialValuesDict = currentUser.settings || {}

  // const [form] = useState(props.form);
  const [alteredFormDict, setAlteredFormDict] = useState({})

  useLayoutEffect(() => {
    const colorSet = theme.colors[appearance]
    props.navigation.setOptions({
      headerTitle: screenTitle,
      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
      },
      headerTintColor: colorSet.primaryText,
    })
  }, [])

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

  const onFormSubmit = () => {
    var newSettings = currentUser.settings || {}

    form.sections.forEach(section => {
      section.fields.forEach(field => {
        const newValue = alteredFormDict[field.key]
        if (newValue != null) {
          newSettings[field.key] = alteredFormDict[field.key]
        }
      })
    })

    let newUser = { ...currentUser, settings: newSettings }
    userAPIManager.updateUserData(currentUser.id, newUser)
    dispatch(setUserData({ user: newUser }))
    props.navigation.goBack()
  }

  const onFormChange = alteredFormDict => {
    setAlteredFormDict(alteredFormDict)
  }

  const onFormButtonPress = buttonField => {
    onFormSubmit()
  }

  return (
    <IMFormComponent
      form={form}
      initialValuesDict={initialValuesDict}
      onFormChange={onFormChange}
      navigation={props.navigation}
      onFormButtonPress={onFormButtonPress}
    />
  )
}
