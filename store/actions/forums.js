// Component imports
import actionTypes from '../actionTypes'
import createAction, { createTimeoutAction } from '../actionCreators'





export const createForumThread = thread => createAction({
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

export const createThreadComment = (threadId, comment) => createAction({
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
// Turn this to a normal createAction, remove timeout, and uncomment remaining params.
export const deleteForumThread = () => createTimeoutAction({
  actionType: actionTypes.DELETE_FORUM_THREAD,
  // url: `/api/threads/${id}`,
  // method: 'delete',
  timeout: 750,
  onError: 'Thread deletion failed.\nPlease try again in a few moments, or attempt to refresh the page.',
})

// WHEN ENDPOINT IS READY:
// Turn this to a normal createAction, remove timeout, and uncomment remaining params.
export const deleteThreadComment = () => createTimeoutAction({
  actionType: actionTypes.DELETE_THREAD_COMMENT,
  // url: `/api/threads/${threadId}/comments/${commentId}`,
  // method: 'delete',
  timeout: 750,
  onError: 'Comment deletion failed.\nPlease try again in a few moments, or attempt to refresh the page.',
})

export const getForumThread = threadId => createAction({
  actionType: actionTypes.GET_FORUM_THREAD,
  url: `/api/threads/${threadId}`,
  onError: 'Failed to load thread.\nPlease refresh the page in a few moments and try again.',
})

export const getForumThreads = page => createAction({
  actionType: actionTypes.GET_FORUM_THREADS,
  url: '/api/threads',
  params: {
    page: page || '1',
  },
  onError: 'Failed to load the forums.\nPlease refresh the page in a few moments and try again.',
})

export const getThreadComments = (threadId, page) => createAction({
  actionType: actionTypes.GET_THREAD_COMMENTS,
  url: `/api/threads/${threadId}/comments`,
  params: {
    page,
    limit: 5,
  },
  onError: 'Failed to load thread comments.\nPlease refresh the page in a few moments and try again.',
})
