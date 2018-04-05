// Component imports
import actionTypes from '../actionTypes'
import { createApiAction } from '../actionCreators'





export const createForumThread = thread => createApiAction({
  actionType: actionTypes.CREATE_FORUM_THREAD,
  url: '/api/threads',
  method: 'post',
  data: {
    data: {
      type: 'threads',
      attributes: thread,
    },
  },
  onError: 'Thread post failed.\nPlease try again in a few moments.',
})





export const createThreadComment = (threadId, comment) => createApiAction({
  actionType: actionTypes.CREATE_THREAD_COMMENT,
  url: `/api/threads/${threadId}/comments`,
  method: 'post',
  data: {
    data: {
      type: 'thread-comments',
      attributes: {
        comment,
      },
    },
  },
  onError: 'Comment post failed.\nPlease try again in a few moments.',
})





export const deleteForumThread = threadId => createApiAction({
  actionType: actionTypes.DELETE_FORUM_THREAD,
  url: `/api/threads/${threadId}`,
  method: 'delete',
  timeout: 750,
  fail: true,
  onError: 'Thread deletion failed.\nPlease try again in a few moments.',
})





export const deleteThreadComment = (threadId, commentId) => createApiAction({
  actionType: actionTypes.DELETE_THREAD_COMMENT,
  url: `/api/threads/${threadId}/comments/${commentId}`,
  method: 'delete',
  onError: 'Comment deletion failed.\nPlease try again in a few moments.',
})





export const getForumThread = threadId => createApiAction({
  actionType: actionTypes.GET_FORUM_THREAD,
  url: `/api/threads/${threadId}`,
  onError: 'Failed to load thread.\nPlease try again in a few moments.',
})





export const getForumThreads = page => createApiAction({
  actionType: actionTypes.GET_FORUM_THREADS,
  url: '/api/threads',
  params: {
    page: page || '1',
  },
  onError: 'Failed to load the forums.\nPlease try again in a few moments.',
})





export const getThreadComments = (threadId, page) => createApiAction({
  actionType: actionTypes.GET_THREAD_COMMENTS,
  url: `/api/threads/${threadId}/comments`,
  params: {
    page,
  },
  onError: 'Failed to load thread comments.\nPlease try again in a few moments.',
})
