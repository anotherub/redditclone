import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { getPostById, likePost, unlikePost, deletePost } from '../store/post'

import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined'
import ThumbDownTwoToneIcon from '@material-ui/icons/ThumbDownTwoTone'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import { getUsername } from '../libs/util'

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

export default function Post({ content }) {
  const dispatch = useDispatch()
  const postStats = useSelector((state) => state.posts.eachPost[content._id])
  const [disableButton, setDisableButton] = useState(false)
  const [hidePost, setHidePost] = useState(false)
  useEffect(() => {
    const getPostData = async () => {
      dispatch(getPostById(content._id))
    }
    getPostData()
  }, [content._id])
  const classes = useStyles()
  // console.log('contene is ', content)
  const handleLikeButton = async () => {
    setDisableButton(true)
    await dispatch(likePost(content._id))
    setDisableButton(false)
  }
  const handleUnikeButton = async () => {
    setDisableButton(true)
    await dispatch(unlikePost(content._id))
    setDisableButton(false)
  }
  const handleDeleteButton = async () => {
    setDisableButton(true)
    const result = await dispatch(deletePost(content._id))
    setDisableButton(false)
    if (result?.payload?.data?.deletedCount == 1) {
      let element = document.getElementById(content._id)
      element.parentNode.removeChild(element)
    }
  }

  return (
    <Card id={content._id} className={classes.root} style={{ margin: '20px 0', width: '100%' }}>
      <CardContent>
        <Typography color='primary' variant='h5'>
          {content.username}
        </Typography>

        <Typography variant='body1' component='p'>
          {content.post}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant='body2' component='p'>
          {dayjs(content.time).format('h:mm:ss A')}
        </Typography>
        <Button size='small' onClick={handleLikeButton} disabled={disableButton}>
          {postStats?.isPostLiked === 'true' ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
          {postStats?.totalLikes || 0}
        </Button>
        <Button size='small' onClick={handleUnikeButton} disabled={disableButton}>
          {postStats?.isPostLiked === 'false' ? <ThumbDownAltIcon /> : <ThumbDownAltOutlinedIcon />}

          {postStats?.totalDislikes || 0}
        </Button>
        <Button>
          <ChatBubbleOutlineIcon />
          {postStats?.totalComments || 0}
        </Button>
        <Button
          style={{ visibility: getUsername() === content.username ? 'visible' : 'hidden' }}
          onClick={handleDeleteButton}
        >
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  )
}
