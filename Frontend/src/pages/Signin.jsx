import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { signin } from '../store/login'
import { useDispatch } from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import { Link, useHistory } from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © Umesh Bhat '}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignIn() {
  const [username, setUsername] = useState('umeshbhat')
  const [password, setPassword] = useState('umeshbhat')
  const [wrongCreds, setWrongCreds] = useState(false)
  const classes = useStyles()
  const dispatcher = useDispatch()
  const history = useHistory()

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    setWrongCreds(false)
    const formData = {
      username,
      password
    }
    const result = await dispatcher(signin(formData))
    const {
      data: { status = false, data }
    } = result.payload
    if (status === false) {
      setWrongCreds(true)
      setUsername('')
      setPassword('')
    } else {
      localStorage.setItem('isLoggedIn', 'true')
      history.replace('/')
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='username'
            name='username'
            autoComplete='username'
            autoFocus
            value={username}
            onChange={(event) => {
              setUsername(event.target.value)
            }}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={password}
            autoComplete='current-password'
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
          {wrongCreds && (
            <Alert severity='error' style={{ justifyContent: 'center', margin: 'auto auto' }}>
              Incorrect credentials.Please try again
            </Alert>
          )}
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2' style={{ textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link style={{ textDecoration: 'none' }} to='/signup'>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
