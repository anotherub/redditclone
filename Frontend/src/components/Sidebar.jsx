import React, { Fragment } from 'react'
import {
  Hidden,
  Drawer,
  Divider,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  CssBaseline,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Box
} from '@material-ui/core'
import SearchSharpIcon from '@material-ui/icons/SearchSharp'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
// import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import PageviewIcon from '@material-ui/icons/Pageview'
import {
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons'
import clsx from 'clsx'

const Sidebar = ({ classes, container, toggles, mobileOpen, minibarOpen }) => {
  const theme = useTheme()
  const handleSearchClick = () => {
    alert('handle clicked')
  }

  const navItems = (
    <Fragment>
      {/** COde commented for later building an expanding accordion sidebar menu */}
      {/* <ExpansionPanel className={classes.fullSpanNoPadding}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
            <MailIcon /> <Typography variant="h6">Support</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List className={classes.fullSpanNoPadding}>
            {[ 'Patient Search', 'Patient Details' ].map((text, index) => (
              <ListItem
                button
                key={text}
                className={classes.fullSpanNoPadding}
                style={{ paddingBottom: '5px', paddingTop: '5px' }}
              >
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}

      <List>
        {[
          {
            text: 'Patient Search',
            icon: <SearchSharpIcon style={{ color: 'darkslategray' }} />,
            clickHandler: handleSearchClick,
            authView: 'NAV-patient_search'
          }
          // { text: 'User Management', icon: <AccountBoxIcon />, clickHandler: null }
        ].map(({ text, icon, clickHandler, authView }) => (
          <ListItem button onClick={clickHandler}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Fragment>
  )

  return (
    <nav aria-label='Sidebar Navigation'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      {/** Mobile Sidebar */}
      <Hidden smUp implementation='css'>
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={toggles.mobileSidebar}
          classes={{ paper: classes.drawerOpen }}
          ModalProps={{
            keepMounted: true // Better minibarOpen performance on mobile.
          }}
        >
          <div>
            <div className={classes.toolbar}>
              <img
                alt='mscripts Logo'
                src='/mscripts-logo.png'
                width='130rem'
                height='auto'
                style={{ marginLeft: '2.5rem' }}
              />
            </div>
            <Divider />
            {navItems}
          </div>
        </Drawer>
      </Hidden>

      <Hidden xsDown implementation='css'>
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: minibarOpen,
            [classes.drawerClose]: !minibarOpen
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: minibarOpen,
              [classes.drawerClose]: !minibarOpen
            })
          }}
        >
          <div className={classes.toolbar}>
            <img
              alt='mscripts Logo'
              src='/mscripts-logo.png'
              width='130rem'
              height='auto'
              style={{ marginLeft: '1.8rem' }}
            />
            <IconButton onClick={toggles.minibar} aria-label='minibar'>
              <ChevronLeftIcon style={{ color: 'darkslategray' }} />
            </IconButton>
          </div>
          <Divider />
          {navItems}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default Sidebar
