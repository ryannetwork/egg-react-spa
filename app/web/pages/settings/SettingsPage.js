import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import Cookies from 'js-cookie'
import axios from 'axios'
import { withSnackbar } from 'notistack'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import LockIcon from '@material-ui/icons/Lock'
import PageContent from '../../components/PageContent'
import ProfileUpdateFormDialog from './ProfileUpdateFormDialog'
import PasswordChangeFormDialog from './PasswordChangeFormDialog'

const styles = theme => ({
  root: {
    marginBottom: 60
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  },
  faIcon: {
    fontSize: '1.25rem'
  }
})

class SettingsPage extends React.Component {
  state = {
    openProfileUpdateFormDialog: false,
    openPasswordChangeFormDialog: false
  }

  handleProfileUpdateActionClick = () => {
    this.setState({ openProfileUpdateFormDialog: true })
  }

  handlePasswordChangeActionClick = () => {
    this.setState({ openPasswordChangeFormDialog: true })
  }

  handleProfileUpdateFormDialogClose = (values) => {
    this.setState({ openProfileUpdateFormDialog: false })
    if (!values) return

    const { enqueueSnackbar } = this.props
    return axios.patch('/api/settings/profile', values, { headers: { 'Authorization': `Bearer ${Cookies.get('token')}` } })
      .then(res => enqueueSnackbar('Your profile has been updated!', { variant: 'success' }))
      .catch(err => enqueueSnackbar(err.response.data.error, { variant: 'error' }))
  }

  handlePasswordChangeFormDialogClose = (values) => {
    this.setState({ openPasswordChangeFormDialog: false })
    if (!values) return

    const { enqueueSnackbar } = this.props
    return axios.patch('/api/settings/password', values, { headers: { 'Authorization': `Bearer ${Cookies.get('token')}` } })
      .then(res => enqueueSnackbar('Your password has been updated!', { variant: 'success' }))
      .catch(err => enqueueSnackbar(err.response.data.error, { variant: 'error' }))
  }

  render () {
    const { classes } = this.props
    const { auth: { user } } = this.context
    const { openProfileUpdateFormDialog, openPasswordChangeFormDialog } = this.state
    return (
      <PageContent>
        <Typography variant="headline" gutterBottom>
          {'Personal Information'}
        </Typography>
        <Paper className={classes.paper}>
          <List dense>
            <ListItem dense divider>
              <ListItemText
                primary={'Name'}
                secondary={user && user.name}
              />
              <ListItemSecondaryAction>
                <Tooltip title={'Edit'}>
                  <IconButton aria-label="Edit" onClick={this.handleProfileUpdateActionClick}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem dense divider>
              <ListItemText
                primary={'Login Email'}
                secondary={user && user.email}
              />
            </ListItem>
            <ListItem dense>
              <ListItemText
                primary={'Password'}
                secondary="*********"
              />
              <ListItemSecondaryAction>
                <Tooltip title={'Change Password'}>
                  <IconButton aria-label="Change Password" onClick={this.handlePasswordChangeActionClick}>
                    <LockIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
        <ProfileUpdateFormDialog open={openProfileUpdateFormDialog} onClose={this.handleProfileUpdateFormDialogClose} />
        <PasswordChangeFormDialog open={openPasswordChangeFormDialog} onClose={this.handlePasswordChangeFormDialogClose} />
      </PageContent>
    )
  }
}

SettingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
}

SettingsPage.contextTypes = {
  auth: PropTypes.object.isRequired
}

export default compose(
  withSnackbar,
  withStyles(styles)
)(SettingsPage)
