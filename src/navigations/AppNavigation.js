import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from 'dopenative'
import { NavigationContainer } from '@react-navigation/native'
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
  IMBlockedUsersScreen,
} from '../Core/profile'
import { IMChatScreen } from '../Core/chat'
import ConversationsScreen from '../screens/ConversationsScreen/ConversationsScreen'
import SwipeScreen from '../screens/SwipeScreen/SwipeScreen'
import MyProfileScreen from '../screens/MyProfileScreen/MyProfileScreen'
import AddProfilePictureScreen from '../screens/AddProfilePictureScreen'
import {
  LoadScreen,
  LoginScreen,
  ResetPasswordScreen,
  SignupScreen,
  SmsAuthenticationScreen,
  WalkthroughScreen,
  WelcomeScreen,
} from '../Core/onboarding'
import { TNTouchableIcon } from '../Core/truly-native'

const Stack = createStackNavigator()

const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Sms" component={SmsAuthenticationScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}

const MyProfileStack = () => {
  const { theme, appearance } = useTheme()

  return (
    <Stack.Navigator
      initialRouteName="MyProfile"
      screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name="MyProfile"
        options={({ navigation }) => ({
          headerTitle: () => (
            <TNTouchableIcon
              imageStyle={{ tintColor: '#d1d7df' }}
              iconSource={theme.icons.fireIcon}
              onPress={() => navigation.navigate('Swipe')}
            />
          ),
          headerRight: () => (
            <TNTouchableIcon
              imageStyle={{ tintColor: '#d1d7df' }}
              iconSource={theme.icons.conversations}
              onPress={() => {
                //navigation.pop();
                navigation.navigate('Matches')
              }}
            />
          ),
          headerLeft: () => (
            <TNTouchableIcon
              imageStyle={{
                tintColor: theme.colors[appearance].primaryForeground,
              }}
              iconSource={theme.icons.userProfile}
            />
          ),
          headerStyle: {
            backgroundColor: theme.colors[appearance].primaryBackground,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.colors[appearance].primaryText,
        })}
        component={MyProfileScreen}
      />
      <Stack.Screen
        options={{ headerBackTitle: 'Back' }}
        name="AccountDetails"
        component={IMEditProfileScreen}
      />
      <Stack.Screen
        options={{ headerBackTitle: 'Back' }}
        name="Settings"
        component={IMUserSettingsScreen}
      />
      <Stack.Screen
        options={{ headerBackTitle: 'Back' }}
        name="ContactUs"
        component={IMContactUsScreen}
      />
      <Stack.Screen
        options={{ headerBackTitle: 'Back' }}
        name="BlockedUsers"
        component={IMBlockedUsersScreen}
      />
    </Stack.Navigator>
  )
}

const ConversationsStack = () => {
  return (
    <Stack.Navigator
      headerLayoutPreset="center"
      screenOptions={{ headerShown: false }}
      initialRouteName="Conversations">
      <Stack.Screen name="Conversations" component={ConversationsScreen} />
    </Stack.Navigator>
  )
}

const doNotShowHeaderOption = {
  headerShown: false,
}

const DrawerStack = () => {
  const { theme, appearance } = useTheme()
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleAlign: 'center', headerMode: 'float' }}
      initialRouteName="Swipe">
      <Stack.Screen
        options={({ navigation }) => ({
          headerTitle: () => (
            <TNTouchableIcon
              imageStyle={{
                tintColor: theme.colors[appearance].primaryForeground,
              }}
              iconSource={theme.icons.fireIcon}
              onPress={() => navigation.navigate('Swipe')}
            />
          ),
          headerRight: () => (
            <TNTouchableIcon
              imageStyle={{ tintColor: '#d1d7df' }}
              iconSource={theme.icons.conversations}
              onPress={() => navigation.navigate('Matches')}
            />
          ),
          headerLeft: () => (
            <TNTouchableIcon
              imageStyle={{ tintColor: '#d1d7df' }}
              iconSource={theme.icons.userProfile}
              onPress={() => navigation.navigate('MyProfileStack')}
            />
          ),
          headerStyle: {
            backgroundColor: theme.colors[appearance].primaryBackground,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.colors[appearance].primaryText,
        })}
        name="Swipe"
        component={SwipeScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerTitle: () => (
            <TNTouchableIcon
              imageStyle={{ tintColor: '#d1d7df' }}
              iconSource={theme.icons.fireIcon}
              onPress={() => navigation.navigate('Swipe')}
            />
          ),
          headerRight: () => (
            <TNTouchableIcon
              imageStyle={{
                tintColor: theme.colors[appearance].primaryForeground,
              }}
              iconSource={theme.icons.conversations}
              onPress={() => navigation.navigate('Matches')}
            />
          ),
          headerLeft: () => (
            <TNTouchableIcon
              imageStyle={{ tintColor: '#d1d7df' }}
              iconSource={theme.icons.userProfile}
              onPress={() => {
                //navigation.pop();
                navigation.navigate('MyProfileStack')
              }}
            />
          ),
          headerStyle: {
            backgroundColor: theme.colors[appearance].primaryBackground,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.colors[appearance].primaryText,
        })}
        name="Matches"
        component={ConversationsStack}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="MyProfileStack"
        component={MyProfileStack}
      />

      <Stack.Screen
        name="AddProfilePicture"
        component={AddProfilePictureScreen}
      />
      <Stack.Screen name="AccountDetails" component={IMEditProfileScreen} />
    </Stack.Navigator>
  )
}

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerMode: 'float' }}
      initialRouteName="NavStack">
      <Stack.Screen
        options={doNotShowHeaderOption}
        name="NavStack"
        component={DrawerStack}
      />
      <Stack.Screen
        options={{ headerBackTitle: 'Back' }}
        name="PersonalChat"
        component={IMChatScreen}
      />
    </Stack.Navigator>
  )
}

// Manifest of possible screens
const RootNavigator = () => {
  const currentUser = useSelector(state => state.auth.user)

  return (
    <Stack.Navigator
      screenOptions={{ animationEnabled: false, headerShown: false }}
      initialRouteName="LoadScreen">
      <Stack.Screen name="LoadScreen" component={LoadScreen} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Walkthrough"
        component={WalkthroughScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="LoginStack"
        component={LoginStack}
      />
      {!!currentUser.id && (
        <Stack.Screen
          options={{ headerShown: false }}
          name="MainStack"
          component={MainStackNavigator}
        />
      )}
    </Stack.Navigator>
  )
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

export { RootNavigator, AppNavigator }
