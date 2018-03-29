// Component imports
import actionTypes from '../actionTypes'
import { createApiAction, createTimeoutAction } from '../actionCreators'





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

// WHEN ENDPOINT IS READY:
// Turn this to a normal createApiAction, remove timeout, and uncomment remaining params.
export const deleteForumThread = () => createTimeoutAction({
  actionType: actionTypes.DELETE_FORUM_THREAD,
  // url: `/api/threads/${id}`,
  // method: 'delete',
  timeout: 750,
  fail: true,
  onError: 'Thread delection failed.\nThis feature is still being built!',
})

// WHEN ENDPOINT IS READY:
// Turn this to a normal createApiAction, remove timeout, and uncomment remaining params.
export const deleteThreadComment = () => createTimeoutAction({
  actionType: actionTypes.DELETE_THREAD_COMMENT,
  // url: `/api/threads/${threadId}/comments/${commentId}`,
  // method: 'delete',
  timeout: 750,
  fail: true,
  onError: 'Thread delection failed.\nThis feature is still being built!',
})

export const getForumThread = threadId => createApiAction({
  actionType: actionTypes.GET_FORUM_THREAD,
  url: `/api/threads/${threadId}`,
  onError: 'Failed to load thread.\nPlease refresh the page in a few moments and try again.',
})

export const getForumThreads = page => createApiAction({
  actionType: actionTypes.GET_FORUM_THREADS,
  url: '/api/threads',
  params: {
    page: page || '1',
  },
  onError: 'Failed to load the forums.\nPlease refresh the page in a few moments and try again.',
})

export const getThreadComments = (threadId, page) => createApiAction({
  actionType: actionTypes.GET_THREAD_COMMENTS,
  url: `/api/threads/${threadId}/comments`,
  params: {
    page,
  },
  onError: 'Failed to load thread comments.\nPlease refresh the page in a few moments and try again.',
})
