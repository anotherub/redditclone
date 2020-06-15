import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import SingleComment from './SingleComment'
import { Button, Grid, Container } from '@material-ui/core'
import { postComment } from '../store/post'
import { useDispatch, useSelector } from 'react-redux'
import ReplyComment from './ReplyComment'

function RecursiveContainer({ postId, refreshFunction }) {
  const postStats = useSelector((state) => state.posts.eachPost[postId])
  const commentList = postStats.comments

  const [comment, setComment] = useState('')
  const dispatcher = useDispatch()
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    if (!comment.length) return alert('Comment can not be empty!')
    const result = await dispatcher(postComment({ postId, comment }))
    const {
      payload: { data, status }
    } = result
    if (status) {
      refreshFunction(data)
    }
    setComment('')
  }
  const handleInputChange = (event) => {
    setComment(event.target.value)
  }
  return (
    <Grid style={{ width: 'inherit' }}>
      <br />
      Replies:
      {console.log('comments are', commentList)}
      {commentList?.map(
        (comment, index) =>
          !comment.parentCommentId && (
            <>
              <SingleComment comment={comment} postId={postId} refreshFunction={refreshFunction} />
              <ReplyComment
                commentList={commentList}
                parentCommentId={comment._id}
                postId={postId}
                refreshFunction={refreshFunction}
              />
            </>
          )
      )}
      <form onSubmit={handleFormSubmit}>
        <div style={{ position: 'relative', margin: '10px 5px' }}>
          <TextField
            id='outlined-multiline-static'
            label="Comment what's on your mind!"
            multiline
            rows={2}
            defaultValue={comment}
            variant='outlined'
            placeholder='Enter your comment'
            onChange={handleInputChange}
            value={comment}
            style={{ width: '100%' }}
          ></TextField>
          <Button
            variant='contained'
            color='Primary'
            onClick={handleFormSubmit}
            style={{ position: 'absolute', bottom: '5px', right: '5px' }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Grid>
  )
}

export default RecursiveContainer
