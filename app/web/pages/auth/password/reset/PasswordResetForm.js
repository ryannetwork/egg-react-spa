import React from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import axios from 'axios'
import compose from 'recompose/compose'
import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  wrapper: {
    position: 'relative',
    marginTop: theme.spacing.unit * 3
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  button: {
    margin: `${theme.spacing.unit}px 0`
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  }
})

function PasswordResetForm (props) {
  const { classes, match, location, onSubmitSuccess, onSubmitFailure } = props
  const { t } = useTranslation()
  const email = qs.parse(location.search).email

  return (
    <Formik
      initialValues={{
        email: email,
        token: match.params.token,
        password: '',
        password_confirmation: ''
      }}
      validate={values => {
        const errors = {}
        if (!values.password) {
          errors.password = 'Required.'
        }
        if (!values.password_confirmation) {
          errors.password_confirmation = 'Required.'
        }
        return errors
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          axios.post('/api/password/reset', values)
            .then(res => actions.resetForm() || onSubmitSuccess(res))
            .catch(err => actions.resetForm() || onSubmitFailure(err))
        }, 500)
      }}
      render={({ submitForm, isSubmitting, values, setFieldValue }) => (
        <Form className={classes.form}>
          <Field name="email" type="email" component={TextField} label={t('email')} margin="normal" fullWidth disabled />
          <Field name="password" type="password" component={TextField} label={t('password')} margin="normal" fullWidth />
          <Field name="password_confirmation" type="password" component={TextField} label={t('confirm_password')} margin="normal" fullWidth />
          <Field name="token" type="hidden" component="input" />
          <div className={classes.wrapper}>
            <Button type="submit" variant="contained" size='large' color="primary" fullWidth className={classes.button} disabled={isSubmitting}>
              {t('reset_password')}
            </Button>
            {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </Form>
      )}
    />
  )
}

PasswordResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onSubmitSuccess: PropTypes.func,
  onSubmitFailure: PropTypes.func
}

export default compose(
  withRouter,
  withStyles(styles)
)(PasswordResetForm)
