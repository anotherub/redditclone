import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOtherUsers } from '../store/users'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const useStyles = makeStyles({
  root: {
    maxWidth: 300
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

function ListAllUsers() {
  const UserInfo = ({ info }) => {
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography color='primary' variant='h6' component='h2'>
            {info.username}
          </Typography>
          <Typography className={classes.pos} color='textSecondary'></Typography>
          <Typography variant='body2' component='p'>
            {`${info.firstName} ${info.lastName}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '5px' }}> Add to friends</span>
            <PersonAddIcon />
          </Button>
        </CardActions>
      </Card>
    )
  }
  const classes = useStyles()
  const users = useSelector((state) => state.users)
  const dispatcher = useDispatch()

  useEffect(() => {
    dispatcher(getOtherUsers())
  }, [users?.OtherUsers])

  return (
    <Grid container direction='column' spacing={1}>
      <Grid item>
        <div>People you might know</div>
      </Grid>
      {users?.otherUsers?.map((user) => (
        <Grid item>
          <UserInfo info={user} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ListAllUsers
