// Component imports
import actionTypes from '../actionTypes'
import { createApiAction } from '../actionCreators'





export const createGroup = group => createApiAction({
  actionType: actionTypes.CREATE_GROUP,
  url: '/api/groups',
  method: 'post',
  data: {
    data: {
      type: 'groups',
      attributes: group,
    },
  },
  onError: 'Failed to create group.\nPlease try again in a few moments.',
})





export const getGroup = groupId => createApiAction({
  actionType: actionTypes.GET_GROUP,
  url: `/api/groups/${groupId}`,
  onError: 'Failed to load group.\nPlease try again in a few moments.',
})





export const getJoinRequests = groupId => createApiAction({
  actionType: actionTypes.GET_JOIN_REQUESTS,
  url: `/api/groups/${groupId}/join-requests`,
  onError: 'Failed to get join requests.\nPlease try again in a few moments.',
})





export const handleJoinRequest = (groupId, userId, status) => createApiAction({
  actionType: actionTypes.HANDLE_JOIN_REQUESTS,
  url: `/api/groups/${groupId}/join-requests/${userId}`,
  method: 'put',
  data: {
    data: {
      type: 'join-requests',
      attributes: { status },
    },
  },
  onError: `Failed to ${status === 'accepted' ? 'accept' : 'reject'} user.\nPlease try again in a few moments.`,
})





export const removeGroupMember = (groupId, userId) => createApiAction({
  actionType: actionTypes.LEAVE_GROUP,
  url: `/api/groups/${groupId}/members/${userId}`,
  method: 'delete',
  onError: 'Failed to remove user.\nPlease try again in a few moments.',
})





export const requestToJoinGroup = groupId => createApiAction({
  actionType: actionTypes.LEAVE_GROUP,
  url: `/api/groups/${groupId}/join-requests`,
  method: 'post',
  onError: 'Failed to request group memebership.\nPlease try again in a few moments.',
})





export const searchForGroups = ({ lat, lng }, options) => createApiAction({
  actionType: actionTypes.SEARCH_FOR_GROUPS,
  url: '/api/groups',
  params: {
    lat,
    lng,
    limit: 10,
    ...options,
  },
  onError: 'Group search failed.\nPlease try again in a few moments.',
})





export const updateGroup = (groupId, updates) => createApiAction({
  actionType: actionTypes.UPDATE_GROUP,
  url: `/api/groups/${groupId}`,
  method: 'put',
  data: {
    data: {
      type: 'groups',
      attributes: updates,
    },
  },
  onError: 'Failed to update group.\nPlease try again in a few moments.',
})
