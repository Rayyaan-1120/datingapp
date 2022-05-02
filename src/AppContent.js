import React from 'react'
import { StatusBar } from 'react-native'
import { OnboardingConfigProvider } from './Core/onboarding/hooks/useOnboardingConfig'
import { AppNavigator } from './navigations/AppNavigation'
import { useConfig } from './config'
import { ProfileConfigProvider } from './Core/profile/hooks/useProfileConfig'
import IAPManagerWrapped from './Core/inAppPurchase/IAPManagerWrapped'
import { IAPConfigProvider } from './Core/inAppPurchase/hooks/useIAPConfig'

const MainNavigator = AppNavigator

export default AppContent = () => {
  const config = useConfig()

  return (
    <ProfileConfigProvider config={config}>
      <OnboardingConfigProvider config={config}>
        <IAPConfigProvider config={config}>
          <IAPManagerWrapped>
            <StatusBar />
            <MainNavigator />
          </IAPManagerWrapped>
        </IAPConfigProvider>
      </OnboardingConfigProvider>
    </ProfileConfigProvider>
  )
}
