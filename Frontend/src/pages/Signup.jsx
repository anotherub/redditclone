import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useDispatch } from 'react-redux'
import { signup } from '../store/login'
const Copyright = () => {
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignUp() {
  // const router = useRouter()
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const classes = useStyles()
  const dispatcher = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = {
      firstName,
      lastName,
      username,
      password
    }
    const data = await dispatcher(signup(formData))
    const {
      payload: { status, message }
    } = data
    alert(message)
  }

  const handlerSignin = () => {
    // router.replace('/signin')
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                onChange={(event) => {
                  setFirstName(event.target.value)
                }}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                onChange={(event) => {
                  setLastName(event.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                onChange={(event) => {
                  setUsername(event.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify='center'>
            <Grid item>
              <Link style={{ textDecoration: 'none' }} to='/signin'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
