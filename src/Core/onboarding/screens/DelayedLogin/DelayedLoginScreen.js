import React from 'react'
import { useOnboardingConfig } from '../../hooks/useOnboardingConfig'
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen'

export default function DelayedLoginScreen(props) {
  const { config } = useOnboardingConfig()
  return (
    <WelcomeScreen
      navigation={props.navigation}
      title={config.onboardingConfig.delayedLoginTitle}
      caption={config.onboardingConfig.delayedLoginCaption}
      delayedMode={true}
    />
  )
}
