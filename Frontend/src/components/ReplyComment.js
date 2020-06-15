import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment'

function ReplyComment({ commentList, postId, refreshFunction, parentCommentId }) {
  const [childCommentCount, setChildCommentCount] = useState(0)
  const [showReplyComments, setShowReplyComments] = useState(false)
  useEffect(() => {
    let commentNumber = 0
    commentList?.map((comment) => {
      if (comment.parentCommentId == parentCommentId) {
        commentNumber++
      }
      setChildCommentCount(commentNumber)
    })
  }, [])
  const renderReplyComment = (parentCommentId) => {
    commentList?.map((comment, index) => (
      <>
        {comment.parentCommentId === parentCommentId ? (
          <div style={{ marginLeft: '30px', width: '90%' }}>
            <SingleComment comment={comment} postId={postId} refreshFunction={refreshFunction} />
            <ReplyComment
              comment={comment}
              postId={postId}
              parentCommentId={comment._id}
              refreshFunction={refreshFunction}
            />
          </div>
        ) : null}
      </>
    ))
  }
  const handleChange = () => {
    console.log('show comments', !showReplyComments)
    setShowReplyComments(!showReplyComments)
  }

  return (
    <div>
      {childCommentCount > 0 && (
        <p onClick={handleChange} style={{ fontSize: '14px', margin: 0, color: 'gray' }}>
          {' '}
          view {childCommentCount} more comment(s){' '}
        </p>
      )}
      {showReplyComments &&
        commentList?.map((comment, index) => (
          <>
            {comment.parentCommentId === parentCommentId && (
              <div style={{ marginLeft: '30px', width: '90%' }}>
                <SingleComment comment={comment} postId={postId} refreshFunction={refreshFunction} />
                <ReplyComment
                  comment={commentList}
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
