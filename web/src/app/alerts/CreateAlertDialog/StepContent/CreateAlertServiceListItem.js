import React from 'react'
import { gql, useQuery } from '@apollo/client'
import p from 'prop-types'

import { ListItem, ListItemText, Typography } from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import AppLink from '../../../util/AppLink'

const serviceQuery = gql`
  query service($id: ID!) {
    service(id: $id) {
      id
      name
    }
  }
`

const useStyles = makeStyles({
  listItemText: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default function CreateAlertServiceListItem(props) {
  const { id, err } = props

  const classes = useStyles()

  const {
    data,
    loading,
    error: queryError,
  } = useQuery(serviceQuery, {
    variables: {
      id,
    },
  })

  const { service } = data || {}

  if (!data && loading) return 'Loading...'
  if (queryError) return 'Error fetching data.'

  const serviceURL = '/services/' + id + '/alerts'

  return (
    <ListItem key={id} divider>
      <ListItemText disableTypography className={classes.listItemText}>
        <span>
          <Typography>
            <AppLink to={serviceURL} newTab>
              {service.name}
            </AppLink>
          </Typography>
          <Typography color='error' variant='caption'>
            {err}
          </Typography>
        </span>

        <AppLink to={serviceURL} newTab>
          <OpenInNewIcon fontSize='small' />
        </AppLink>
      </ListItemText>
    </ListItem>
  )
}

CreateAlertServiceListItem.propTypes = {
  id: p.string.isRequired,
  err: p.string,
}
