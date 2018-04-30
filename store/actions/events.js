// Component Imports
import actionTypes from '../actionTypes'
import { createApiAction } from '../actionCreators'





export const createGroupEvent = (groupId, attributes) => createApiAction({
  actionType: actionTypes.CREATE_GROUP_EVENT,
  url: `/api/groups/${groupId}/events`,
  method: 'post',
  data: {
    data: {
      type: 'events',
      attributes,
    },
  },
  onError: 'Failed to create group.\nPlease try again in a few moments.',
})





export const updateGroupEvent = (groupId, eventId, attributes) => createApiAction({
  actionType: actionTypes.UPDATE_GROUP_EVENT,
  url: `/api/groups/${groupId}/events/${eventId}`,
  method: 'put',
  data: {
    data: {
      type: 'events',
      attributes,
    },
  },
  onError: 'Failed to update group.\nPlease try again in a few moments.',
})





export const getGroupEvent = (groupId, eventId) => createApiAction({
  actionType: actionTypes.GET_GROUP_EVENT,
  url: `/api/groups/${groupId}/events/${eventId}`,
  onError: 'Failed to get event.\nPlease try again in a few moments.',
})





export const getGroupEventGames = (groupId, eventId) => createApiAction({
  actionType: actionTypes.GET_GROUP_EVENT_GAMES,
  url: `/api/groups/${groupId}/events/${eventId}/games`,
  onError: 'failed to get event games.\nPlease try again in a few moments.',
})





export const getGroupEvents = groupId => createApiAction({
  actionType: actionTypes.GET_GROUP_EVENTS,
  url: `/api/groups/${groupId}/events`,
  onError: 'Failed to get events.\nPlease try again in a few moments.',
})





export const deleteGroupEvent = (groupId, eventId) => createApiAction({
  actionType: actionTypes.DELETE_GROUP_EVENT,
  url: `/api/groups/${groupId}/events/${eventId}`,
  method: 'delete',
  onSuccess: () => ({
    eventId,
    groupId,
  }),
  onError: 'Failed to get events.\nPlease try again in a few moments.',
})
