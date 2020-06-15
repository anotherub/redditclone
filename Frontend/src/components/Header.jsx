import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { getUsername } from '../libs/util'
import { signout } from '../store/login'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default function Header() {
  let history = useHistory()
  const dispatcher = useDispatch()
  const classes = useStyles()
  const handleLogout = async () => {
    await dispatcher(signout())
    // history.replace('/')
    window.location.reload()
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {getUsername()}
          </Typography>
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
