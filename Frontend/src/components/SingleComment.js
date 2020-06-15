import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import { Button, Grid, Card, CardContent, Typography } from '@material-ui/core'
import dayjs from 'dayjs'
import ReplyIcon from '@material-ui/icons/Reply'
import CloseIcon from '@material-ui/icons/Close'
import { postComment, addCommentToStore } from '../store/post'
function SingleComment({ comment, refreshFunction, postId }) {
  const [commentReply, setCommentReply] = useState('')
  const [openReply, setOpenReply] = useState(false)
  const dispatcher = useDispatch()

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    if (!commentReply.length) return alert('comment can not be empty!')
    const formData = { parentCommentId: comment._id, comment: commentReply, postId: comment.parentPostId }
    const result = await dispatcher(postComment(formData))
    const {
      payload: { data, status }
    } = result
    if (status) {
      refreshFunction(data)
      setCommentReply('')
    }
  }
  const handleInputChange = (event) => {
    setCommentReply(event.target.value)
  }
  const handleOpenReply = () => {
    setOpenReply(!openReply)
  }

  return (
    <div style={{ marginLeft: '5px' }}>
      <hr />

      <Card>
        <CardContent onClick={handleOpenReply}>
          <Typography color='primary' variant='h6'>
            {comment.username}
          </Typography>

          <Typography variant='body1' component='p'>
            {comment.comment}
          </Typography>
          <Typography variant='body2' component='p'>
            {dayjs(comment.time).format('h:mm:ss A')}
          </Typography>
        </CardContent>
        {openReply ? (
          <>
            <span onClick={handleOpenReply} style={{ float: 'right', display: 'flex' }}>
              <CloseIcon />
            </span>
            <form onSubmit={handleFormSubmit}>
              <div style={{ position: 'relative', marginleft: '30px' }}>
                <TextField
                  id='outlined-multiline-static'
                  label='Reply back'
                  multiline
                  rows={2}
                  defaultValue={commentReply}
                  variant='outlined'
                  placeholder='Be polite online!'
                  onChange={handleInputChange}
                  value={commentReply}
                  style={{ width: '100%' }}
                ></TextField>
                <Button
                  variant='contained'
                  color='Primary'
                  onClick={handleFormSubmit}
                  style={{ position: 'absolute', bottom: '5px', right: '5px' }}
                >
                  Reply
                </Button>
              </div>
            </form>
          </>
        ) : (
          <span onClick={handleOpenReply} style={{ float: 'right', display: 'flex' }}>
            <ReplyIcon />
          </span>
        )}
      </Card>
    </div>
  )
}

export default SingleComment
