import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import PublishTwoToneIcon from '@material-ui/icons/PublishTwoTone'
import { makeStyles } from '@material-ui/core/styles'

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
    color: 'black',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    color: '#303F9F'
  }
}))

function ReplyComment({ commentList, postId, refreshFunction, parentCommentId }) {
  const [childCommentCount, setChildCommentCount] = useState(0)
  const [showReplyComments, setShowReplyComments] = useState(false)
  const [expanded, setExpanded] = React.useState(true)
  const classes = useStyles()

  useEffect(() => {
    let commentNumber = 0
    if (commentList?.length) {
      commentList.map((comment) => {
        if (comment.parentCommentId == parentCommentId) {
          commentNumber++
        }
        setChildCommentCount(commentNumber)
      })
    }
  }, [commentList?.length])
  const handleChange = () => {
    setShowReplyComments(!showReplyComments)
    setExpanded(!expanded)
  }

  return (
    <div>
      {childCommentCount > 0 && (
        <div
          onClick={handleChange}
          style={{ fontSize: '14px', margin: '10px 10px', color: 'gray', display: 'flex', alignItems: 'center' }}
        >
          {expanded ? (
            <span>
              view {childCommentCount} more {childCommentCount.length > 1 ? 'replies' : 'reply'}
            </span>
          ) : (
            'Hide Replies'
          )}
          <PublishTwoToneIcon
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
          />
        </div>
      )}
      {showReplyComments &&
        commentList?.length &&
        commentList.map((comment, index) => (
          <>
            {comment.parentCommentId === parentCommentId && (
              <div style={{ marginLeft: '30px', width: '90%' }} className={classes.root}>
                <SingleComment comment={comment} postId={postId} refreshFunction={refreshFunction} />
                <ReplyComment
                  commentList={commentList}
                  postId={postId}
                  parentCommentId={comment._id}
                  refreshFunction={refreshFunction}
                />
              </div>
            )}
          </>
        ))}
    </div>
  )
}
export default ReplyComment
