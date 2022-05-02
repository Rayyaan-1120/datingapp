import React, { useContext } from 'react'
import { useTheme, useTranslations } from 'dopenative'

const regexForNames = /^[a-zA-Z]{2,25}$/
const regexForPhoneNumber = /\d{9}$/
const regexForAge = /[0-9]/g

export const ConfigContext = React.createContext({})

export const ConfigProvider = ({ children }) => {
  const { theme } = useTheme()
  const { localized } = useTranslations()
  const config = {
    isSMSAuthEnabled: true,
    appIdentifier: 'rn-dating-android',
    facebookIdentifier: '511213930565643',
    
    webClientId:
      '525472070731-mg8m3q8v9vp1port7nkbq9le65hp917t.apps.googleusercontent.com',
    onboardingConfig: {
      welcomeTitle: localized('Find your soul mate'),
      welcomeCaption: localized(
        'Match and chat with people you like from your area.',
      ),
      walkthroughScreens: [
        {
          icon: require('../../assets/images/fire-icon.png'),
          title: 'Get a Date',
          description: localized(
            'Swipe right to get a match with people you like from your area.',
          ),
        },
        {
          icon: require('../../assets/images/chat.png'),
          title: 'Private Messages',
          description: localized('Chat privately with people you match.'),
        },
        {
          icon: require('../../assets/images/instagram.png'),
          title: 'Send Photos & Videos',
          description: localized(
            'Have fun with your matches by sending photos and videos to each other.',
          ),
        },
        {
          icon: require('../../assets/images/notification.png'),
          title: 'Get Notified',
          description: localized(
            'Receive notifications when you get new messages and matches.',
          ),
        },
      ],
    },
    tosLink: 'https://www.instamobile.io/eula-instachatty/',
    isUsernameFieldEnabled: false,
    smsSignupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: localized('Username'),
        type: 'default',
        editable: true,
        regex: regexForNames,
        key: 'username',
        placeholder: 'Username',
      },
    ],
    signupFields: [
      {
        displayName: localized('First Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: localized('Last Name'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: localized('Username'),
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'username',
        placeholder: 'Username',
      },
      {
        displayName: localized('E-mail Address'),
        type: 'email-address',
        editable: true,
        regex: regexForNames,
        key: 'email',
        placeholder: 'E-mail Address',
        autoCapitalize: 'none',
      },
      {
        displayName: localized('Password'),
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'password',
        placeholder: 'Password',
        autoCapitalize: 'none',
      },
    ],
    privacyPolicyLink: 'https://www.instamobile.io/privacy-policy/',
    editProfileFields: {
      sections: [
        {
          title: localized('PUBLIC PROFILE'),
          fields: [
            {
              displayName: localized('First Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'firstName',
              placeholder: 'Your first name',
            },
            {
              displayName: localized('Last Name'),
              type: 'text',
              editable: true,
              regex: regexForNames,
              key: 'lastName',
              placeholder: 'Your last name',
            },
            {
              displayName: localized('Age'),
              type: 'text',
              editable: true,
              regex: regexForAge,
              key: 'age',
              placeholder: 'Your age',
            },
            {
              displayName: localized('Bio'),
              type: 'text',
              editable: true,
              key: 'bio',
              placeholder: 'Your bio',
            },
            {
              displayName: localized('School'),
              type: 'text',
              editable: true,
              key: 'school',
              placeholder: 'Your bio',
            },
          ],
        },
        {
          title: localized('PRIVATE DETAILS'),
          fields: [
            {
              displayName: localized('E-mail Address'),
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your email address',
            },
            {
              displayName: localized('Phone Number'),
              type: 'text',
              editable: true,
              regex: regexForPhoneNumber,
              key: 'phone',
              placeholder: 'Your phone number',
            },
          ],
        },
      ],
    },
    userSettingsFields: {
      sections: [
        {
          title: localized('DISCOVERY'),
          fields: [
            {
              displayName: localized('Show Me on Instadating'),
              type: 'switch',
              editable: true,
              key: 'show_me',
              value: true,
            },
            {
              displayName: localized('Distance Radius'),
              type: 'select',
              options: ['5', '10', '15', '25', '50', '100', 'unlimited'],
              displayOptions: [
                '5 miles',
                '10 miles',
                '15 miles',
                '25 miles',
                '50 miles',
                '100 miles',
                'Unlimited',
              ],
              editable: true,
              key: 'distance_radius',
              value: 'Unlimited',
            },
            {
              displayName: localized('Gender'),
              type: 'select',
              options: ['female', 'male', 'none'],
              displayOptions: ['Female', 'Male', 'None'],
              editable: true,
              key: 'gender',
              value: 'None',
            },
            {
              displayName: localized('Gender Preference'),
              type: 'select',
              options: ['female', 'male', 'all'],
              displayOptions: ['Female', 'Male', 'All'],
              editable: true,
              key: 'gender_preference',
              value: 'All',
            },
          ],
        },
        {
          title: localized('PUSH NOTIFICATIONS'),
          fields: [
            {
              displayName: localized('New matches'),
              type: 'switch',
              editable: true,
              key: 'push_new_matches_enabled',
              value: true,
            },
            {
              displayName: localized('Messages'),
              type: 'switch',
              editable: true,
              key: 'push_new_messages_enabled',
              value: true,
            },
            {
              displayName: localized('Super Likes'),
              type: 'switch',
              editable: true,
              key: 'push_super_likes_enabled',
              value: true,
            },
            {
              displayName: localized('Top Picks'),
              type: 'switch',
              editable: true,
              key: 'push_top_picks_enabled',
              value: true,
            },
          ],
        },
        {
          title: '',
          fields: [
            {
              displayName: localized('Save'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    contactUsFields: {
      sections: [
        {
          title: localized('CONTACT'),
          fields: [
            {
              displayName: localized('Address'),
              type: 'text',
              editable: false,
              key: 'push_notifications_enabled',
              value: '142 Steiner Street, San Francisco, CA, 94115',
            },
            {
              displayName: localized('E-mail us'),
              value: 'florian@instamobile.io',
              type: 'text',
              editable: false,
              key: 'email',
              placeholder: 'Your email address',
            },
          ],
        },
        {
          title: '',
          fields: [
            {
              displayName: localized('Call Us'),
              type: 'button',
              key: 'savebutton',
            },
          ],
        },
      ],
    },
    dailySwipeLimit: 10,
    subscriptionSlideContents: [
      {
        title: localized('Go VIP'),
        description: localized(
          'When you subscribe, you get unlimited daily swipes, undo actions, VIP badge and more.',
        ),
        src: require('../../assets/images/fencing.png'),
      },
      {
        title: localized('Undo Actions'),
        description: localized('Get undo swipe actions when you subscribe.'),
        src: require('../../assets/images/vip_1.png'),
      },
      {
        title: localized('Vip Badge'),
        description: localized(
          'Stand out with vip badge amongst other swipes when you subscribe',
        ),
        src: require('../../assets/images/vip_2.png'),
      },
      {
        title: localized('Enjoy Unlimited Access'),
        description: localized(
          'Get unlimited app access and more features to come.',
        ),
        src: require('../../assets/images/vip-pass.png'),
      },
    ],
    contactUsPhoneNumber: '+16504859694',
    IAP_SHARED_SECRET: '699db7fcf10c4922bf148caf334c89c6',
    IAP_SKUS: Platform.select({
      ios: [
        'com.instaswipey.FreeTrial.InstaswipeyAutoRenewableSubscriptionByMonth',
        'com.instaswipey.FreeTrial.InstaswipeyAutoRenewableSubscriptionByYear',
      ],
      android: ['annual_vip_subscription', 'monthly_vip_subscription'],
    }),
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = () => useContext(ConfigContext)
