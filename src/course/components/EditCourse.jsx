import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import { graphql } from 'react-apollo'
import { Card, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { withRouter } from 'react-router'
import withWidth, { LARGE } from 'material-ui/utils/withWidth'
import DeleteForever from 'material-ui/svg-icons/action/delete-forever'
import { formatTime } from 'material-ui/TimePicker/timeUtils'
import compose from 'recompose/compose'

import mapDataToProps from '../../app/utils/apolloUtils'
import CourseForm from './CourseForm'
import COURSES_QUERY from '../graphql/Courses.graphql'
import COURSE_QUERY from '../graphql/Course.graphql'
import COURSE_UPDATE from '../graphql/UpdateCourse.graphql'
import withDialog from '../../app/components/notification/withDialog'
import withNotifier from '../../app/components/notification/withNotifier'
import { getErrorMessages } from '../../app/utils/graphQL'

const EditCourse = (props) => {
  const { loading, error } = props.data

  const save = (variables) => {
    props
      .mutate({ variables })
      .then(({ data }) => {
        if (props.width !== LARGE) {
          props.router.push('/courses')
        }
        props.notifier.open({ message: 'The course has been saved' })
      })
      .catch((err) => {
        const errorMessages = getErrorMessages(err)
        errorMessages.map((message) => {
          props.notifier.open({ message })
        })
      })
  }

  let content = null
  if (loading) {
    content = <p>Loading ...</p>
  } else if (error) {
    content = <p>{error.message}</p>
  } else {
    const course = props.data.course || {}
    content = (
      <CourseForm
        onSubmit={save}
        initialValues={props.initialValues}
      />
    )
  }

  return (
    <Card>
      <CardText>
        {content}
      </CardText>
    </Card>
  )
}

EditCourse.propTypes = {
  data: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired
}

EditCourse.defaultProps = {
  data: {}
}

const fetchCourse = graphql(COURSE_QUERY, {
  options: ({ params: { id } }) => ({ variables: { id } }),
  props: mapDataToProps('course', 'initialValues')
})

const updateCourse = graphql(COURSE_UPDATE, {
  options: {
    refetchQueries: [{ query: COURSES_QUERY }]
  }
})

export default compose(
  withNotifier,
  withRouter,
  withDialog,
  withWidth(),
  updateCourse,
  fetchCourse
)(EditCourse)
