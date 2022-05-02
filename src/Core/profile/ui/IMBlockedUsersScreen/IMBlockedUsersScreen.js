import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTheme, useTranslations } from 'dopenative'
import IMBlockedUsersComponent from '../components/IMBlockedUsersComponent/IMBlockedUsersComponent'
import { reportingManager } from '../../../user-reporting/index'

const IMBlockedUsersScreen = props => {
  const navigation = props.navigation

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()

  const [blockedUsers, setBlockedUsers] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const currentUser = useSelector(state => state.auth.user)

  useEffect(() => {
    const unsubscribe = reportingManager.hydrateAllReportedUsers(
      currentUser.id,
      users => {
        setBlockedUsers(users)
        setIsLoading(false)
      },
    )
    return () => {
      unsubscribe()
    }
  }, [currentUser?.id])

  const onUserUnblock = userID => {
    setIsLoading(true)
    reportingManager.unblockUser(
      currentUser.id,
      userID,
      response => {
        if (response) {
          setIsLoading(response)
        }
      },
      error => {
        console.error(error)
      },
    )
  }

  useLayoutEffect(() => {
    const colorSet = theme.colors[appearance]
    navigation.setOptions({
      headerTitle: localized('Blocked Users'),
      headerStyle: {
        backgroundColor: colorSet.primaryBackground,
        borderBottomColor: colorSet.hairline,
      },
      headerTintColor: colorSet.primaryText,
    })
  }, [])

  const emptyStateConfig = {
    title: localized('No Blocked Users'),
    description: localized(
      "You haven't blocked nor reported anyone yet. The users that you block or report will show up here.",
    ),
  }

  return (
    <IMBlockedUsersComponent
      blockedUsers={blockedUsers}
      onUserUnblock={onUserUnblock}
      isLoading={isLoading}
      emptyStateConfig={emptyStateConfig}
    />
  )
}

export default IMBlockedUsersScreen
