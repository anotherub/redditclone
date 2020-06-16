import React, { useEffect, useState } from 'react'

import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { getPostById, likePost, unlikePost, deletePost, addCommentToStore } from '../store/post'

import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined'
import ThumbDownTwoToneIcon from '@material-ui/icons/ThumbDownTwoTone'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import DeleteIcon from '@material-ui/icons/Delete'
import { getUsername } from '../libs/util'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import RecursiveContainer from './RecursiveContainer'
const useStyles = makeStyles((theme) => ({
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
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    // transform: 'rotate(180deg)'
  }
}))

export default function Post({ content }) {
  const dispatch = useDispatch()

  const [disableButton, setDisableButton] = useState(false)
  const [hidePost, setHidePost] = useState(false)
  const [expanded, setExpanded] = React.useState(false)

  const postStats = useSelector((state) => state.posts.eachPost[content._id])

  useEffect(() => {
    const getPostData = async () => {
      dispatch(getPostById(content._id))
    }
    getPostData()
  }, [])

  const updateFunction = (doc) => {
    console.log('refresh function called', doc)
    dispatch(addCommentToStore(doc))
  }
  const classes = useStyles()
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
      setHidePost(true)
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <Grid container direction='column'>
      <Card
        id={content._id}
        className={classes.root}
        style={{ margin: '20px 0', width: '100%', display: hidePost ? 'none' : 'block' }}
      >
        <Grid item>
          <CardContent style={{ backgroundColor: '#E8E8E8' }}>
            <Typography color='primary' variant='h6'>
              {content.username}
            </Typography>

            <Typography variant='body2' component='p'>
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
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
            >
              {/* <ExpandMoreIcon /> */}
              <ChatBubbleOutlineIcon />
              {postStats?.totalComments || 0}
            </IconButton>
            <Button
              style={{ visibility: getUsername() === content.username ? 'visible' : 'hidden' }}
              onClick={handleDeleteButton}
              disabled={disableButton}
            >
              <DeleteIcon />
            </Button>
          </CardActions>
        </Grid>
        <Grid item>
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <hr width={2} />
            <RecursiveContainer
              postId={content._id}
              refreshFunction={updateFunction}
              commentList={postStats?.comments}
            />
          </Collapse>
        </Grid>
      </Card>
    </Grid>
  )
}
