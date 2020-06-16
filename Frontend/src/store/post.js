import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { post, get, del } from '../libs/requests'

const initialState = { posts: [], arePostLoaded: false, eachPost: {} }

export const postQuestion = createAsyncThunk('postStore/postQuestion', async (formData, { rejectWithValue }) => {
  try {
    const { data } = await post('/api/v1/user/posts/post', formData)
    return data
  } catch (err) {
    const { response } = err
    if (!response) {
      throw err
    }
    return rejectWithValue(response.data)
  }
})
export const deletePost = createAsyncThunk('postStore/deletePost', async (id, { rejectWithValue }) => {
  try {
    const { data } = await del(`/api/v1/user/posts/${id}/delete`, id)
    return { data, id }
  } catch (err) {
    const { response } = err
    if (!response) {
      throw err
    }
    return rejectWithValue(response.data)
  }
})
export const likePost = createAsyncThunk('postStore/likePost', async (id, { rejectWithValue }) => {
  try {
    const data = await post(`/api/v1/user/posts/${id}/like`)
    return data
  } catch (err) {
    const { response } = err
    if (!response) {
      throw err
    }
    return rejectWithValue(response.data)
  }
})
export const unlikePost = createAsyncThunk('postStore/unlikePost', async (id, { rejectWithValue }) => {
  try {
    const { data } = await del(`/api/v1/user/posts/${id}/unlike`)
    return data
  } catch (err) {
    const { response } = err
    if (!response) {
      throw err
    }
    return rejectWithValue(response.data)
  }
})
export const getAllQuestions = createAsyncThunk('postStore/getAllQuestion', async (_, { rejectWithValue }) => {
  try {
    const { data } = await get('/api/v1/user/posts/getall')
    return data
  } catch (err) {
    const { response } = err
    if (!response) {
      throw err
    }
    return rejectWithValue(response.data)
  }
})

export const getPostById = createAsyncThunk('postStore/getPostById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await get(`/api/v1/user/posts/${id}/get`)
    return data
  } catch (err) {
    const { response } = err
    if (!response) {
      throw err
    }
    return rejectWithValue(response.data)
  }
})
export const postComment = createAsyncThunk(
  'postStore/postComment',
  async ({ postId, comment, parentCommentId }, { rejectWithValue }) => {
    try {
      const { data } = await post(`/api/v1/user/posts/${postId}/comment`, { comment, parentCommentId })
      return data
    } catch (err) {
      const { response } = err
      if (!response) {
        throw err
      }
      return rejectWithValue(response.data)
    }
  }
)
const Post = createSlice({
  name: 'PostStore',
  initialState,

  reducers: {
    testAction: (state, { payload }) => {
      console.log(`${Date.now()} - TEST ACTION: `, payload.msg)
    },
    addCommentToStore: (state, { payload }) => {
      state.eachPost[payload.parentPostId].comments.push(payload)
    }
  },

  extraReducers: (builder) => {
    builder.addCase(postQuestion.fulfilled, (state, { payload }) => {
      const { data } = payload
      state.posts.unshift(data)
      // state.eachPost[data._id] = data
    })

    builder.addCase(postQuestion.rejected, (state, action) => {
      console.log('posted unsuccessfully', action)
    })
    builder.addCase(getPostById.fulfilled, (state, { payload }) => {
      const { result } = payload
      // console.log('result of each is ', result)
      state.eachPost[result._id] = result
      let flag = null,
        type = null
      for (let i = 0; i < result.likes.length; i++) {
        if (localStorage.getItem('username') === result.likes[i].username) {
          flag = 1
          type = result.likes[i].like.toString()
          break
        }
      }
      if (flag == 1) {
        state.eachPost[result._id].isPostLiked = type
      } else {
        state.eachPost[result._id].isPostLiked = false
      }
    })

    builder.addCase(getPostById.rejected, (state, action) => {
      console.log('loading failed', action)
    })
    builder.addCase(likePost.fulfilled, (state, { payload }) => {
      const {
        data: { status, data }
      } = payload

      if (status) {
        const {
          data: { data }
        } = payload

        if (state.eachPost[data.parentPostId].isPostLiked === 'false') {
          state.eachPost[data.parentPostId].totalDislikes--
        }
        state.eachPost[data.parentPostId].totalLikes++

        state.eachPost[data.parentPostId].isPostLiked = 'true'
      } else {
        state.eachPost[data.parentPostId].totalLikes--
        state.eachPost[data.parentPostId].isPostLiked = null
      }
    })

    builder.addCase(likePost.rejected, (state, action) => {})
    builder.addCase(unlikePost.fulfilled, (state, { payload }) => {
      const { status, data } = payload
      if (status) {
        if (state.eachPost[data.parentPostId].isPostLiked === 'true') {
          state.eachPost[data.parentPostId].totalLikes--
        }
        state.eachPost[data.parentPostId].totalDislikes++
        state.eachPost[data.parentPostId].isPostLiked = 'false'
      } else {
        state.eachPost[data.parentPostId].totalDislikes--
        state.eachPost[data.parentPostId].isPostLiked = null
      }
    })

    builder.addCase(unlikePost.rejected, (state, action) => {})
    builder.addCase(getAllQuestions.fulfilled, (state, { payload }) => {
      const { data } = payload
      state.posts = data
      state.arePostLoaded = true
    })

    builder.addCase(getAllQuestions.rejected, (state, action) => {})
    builder.addCase(
      deletePost.fulfilled,
      (
        state,
        {
          payload: {
            data: { data },
            id
          }
        }
      ) => {
        console.log('deletes ', data, id)
        if (data?.deletedCount == 1) {
          state.posts.splice(
            state.posts.findIndex((post) => {
              return post.id === id
            }),
            1
          )
        }
      }
    )

    builder.addCase(postComment.rejected, (state, action) => {})
    builder.addCase(postComment.fulfilled, (state, { payload }) => {
      console.log('commented successfully', payload)
    })

    builder.addCase(deletePost.rejected, (state, action) => {
      console.log('Server error occured in deleting the post', action)
    })
  }
})

export const { testAction, addCommentToStore } = Post.actions

export default Post.reducer
