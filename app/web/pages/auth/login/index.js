import React from 'react'
import DocumentTitle from 'react-document-title'
import LoginPage from './LoginPage'
import withRoot from '../../withRoot'

function Login () {
  return (
    <React.Fragment>
      <DocumentTitle title={`Login | Egg-React SPA`} />
      <LoginPage />
    </React.Fragment>
  )
}

export default withRoot(Login)