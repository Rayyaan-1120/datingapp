import { firebase } from '../../Core/api/firebase/config'
import functions from '@react-native-firebase/functions'
import { getUnixTimeStamp } from '../../Core/helpers/timeFormat'

const db = firebase.firestore()

const usersRef = firebase.firestore().collection('users')

const matchesRef = firebase.firestore().collection('matches')
const swipesRef = db.collection('user_swipes')
const recommendationsRef = firebase
  .firestore()
  .collection('dating_recommendations')

const swipeCountRef = firebase.firestore().collection('swipe_counts')
const datingRecRef = firebase.firestore().collection('dating_recommendations')

const onCollectionUpdate = (querySnapshot, callback) => {
  const data = []
  querySnapshot?.forEach(doc => {
    const temp = doc.data()
    temp.id = doc.id
    data.push(temp)
  })
  return callback(data, usersRef)
}

export const subscribeMatches = (userId, callback) => {
  return matchesRef
    .doc(userId)
    .collection('my_matches')
    .onSnapshot(querySnapshot => onCollectionUpdate(querySnapshot, callback))
}

export const subscribeComputingStatus = (userId, callback) => {
  return recommendationsRef.doc(userId).onSnapshot(querySnapshot => {
    if (querySnapshot?.metadata?.fromCache === true) {
      return {}
    }
    const data = querySnapshot.data()

    if (data?.isComputingRecommendation !== undefined) {
      callback?.({ isComputingRecommendation: data?.isComputingRecommendation })
    }
  })
}

export const undoSwipe = (swipedUserToUndo, authorUserID) => {
  const swipedUserId = swipedUserToUndo.id || swipedUserToUndo.userID
  const batch = db.batch()
  const mydatingRecRef = datingRecRef.doc(authorUserID)
  const myRecRef = mydatingRecRef.collection('recommendations')
  const dislikesTypeRef = swipesRef
    .doc(authorUserID)
    .collection('dislikes')
    .doc(swipedUserId)
  const likesTypeRef = swipesRef
    .doc(authorUserID)
    .collection('likes')
    .doc(swipedUserId)

  batch.set(myRecRef.doc(swipedUserId), swipedUserToUndo)

  batch.delete(dislikesTypeRef)
  batch.delete(likesTypeRef)

  batch.commit().catch(error => {
    console.warn(error)
  })
}

export const addSwipe = async (fromUser, toUser, type) => {
  const batch = db.batch()
  const mydatingRecRef = datingRecRef.doc(fromUser.id)
  const myRecRef = mydatingRecRef.collection('recommendations').doc(toUser.id)

  const instance = functions().httpsCallable('addUserSwipe')
  const timestamp = getUnixTimeStamp()

  batch.delete(myRecRef)

  batch.commit()

  try {
    const res = await instance({
      authorID: fromUser.id,
      swipedProfileID: toUser.id,
      type: type,
      created_at: timestamp,
      createdAt: timestamp,
    })

    return res?.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const triggerComputeRecommendationsIfNeeded = async user => {
  let didTrigger = false
  try {
    if (user?.currentRecommendationSize) {
      return didTrigger
    }
    didTrigger = true
    // trigger compute recommendations in firebase functions
    await usersRef.doc(user.id).update({ hasComputedRcommendations: false })

    return didTrigger
  } catch (error) {
    console.warn(error)
  }
}

export const fetchRecommendations = async user => {
  try {
    const mydatingRecRef = datingRecRef
      .doc(user.id)
      .collection('recommendations')
      .limit(15)

    const snapshot = await mydatingRecRef.get({
      source: 'server',
    })

    return snapshot.docs.map(doc => doc.data())
  } catch (error) {
    console.warn(error)
    return null
  }
}

export const getUserSwipeCount = async userID => {
  try {
    const swipeCount = await swipeCountRef.doc(userID).get()

    if (swipeCount.data()) {
      return swipeCount.data()
    }
  } catch (error) {
    console.log(error)
    return
  }
}

export const updateUserSwipeCount = (userID, count) => {
  const data = {
    authorID: userID,
    count: count,
  }

  if (count === 1) {
    data.createdAt = getUnixTimeStamp()
  }

  try {
    swipeCountRef.doc(userID).set(data, { merge: true })
  } catch (error) {
    console.log(error)
  }
}
