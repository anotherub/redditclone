import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import { Button, Grid, Card, CardContent, Typography } from '@material-ui/core'
import dayjs from 'dayjs'
import ReplyIcon from '@material-ui/icons/Reply'
import CloseIcon from '@material-ui/icons/Close'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded'
import { postComment, addCommentToStore } from '../store/post'
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded'
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
        <CardContent>
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

        <div style={{ marginLeft: '5px' }}>
          {openReply ? (
            <>
              <span onClick={handleOpenReply}>
                Close
                <ArrowDropUpRoundedIcon />
              </span>
              <form onSubmit={handleFormSubmit}>
                <div style={{ position: 'relative', margin: '2px 5px' }}>
                  <TextField
                    id='outlined-multiline-static'
                    label='Enter your reply'
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
            <div style={{ marginLeft: '10px' }} onClick={handleOpenReply}>
              Reply
              <ArrowDropDownRoundedIcon />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default SingleComment
