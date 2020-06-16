import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import { Button, Grid } from '@material-ui/core'
import { postQuestion, getAllQuestions } from '../store/post'
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))

function NewPost() {
  const [post, setPost] = useState('')
  const classes = useStyles()
  const dispatcher = useDispatch()

  const { id } = useSelector((state) => state.login)

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    if (!post.length) return alert('Post can not be empty!')
    const formData = { post }
    await dispatcher(postQuestion(formData))
    // await dispatcher(getAllQuestions())
    setPost('')
  }
  const handleInputChange = (event) => {
    setPost(event.target.value)
  }
  return (
    <Container style={{ width: 'inherit' }}>
      <Grid>
        <Grid conatiner item direction='column'>
          <form className={classes.root} Validate autoComplete='off'>
            <div style={{ position: 'relative' }}>
              <TextField
                id='outlined-multiline-static'
                label={`Post what's on your mind!`}
                multiline
                rows={6}
                defaultValue={post}
                variant='outlined'
                placeholder='Enter your post'
                onChange={handleInputChange}
                value={post}
                style={{ width: '100%' }}
              ></TextField>
              <Button
                variant='contained'
                color='Primary'
                onClick={handleFormSubmit}
                style={{ position: 'absolute', bottom: '12px', right: '0px' }}
              >
                Submit
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}

export default NewPost
