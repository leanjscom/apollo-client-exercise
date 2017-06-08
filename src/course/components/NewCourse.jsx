import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { Card, CardText } from 'material-ui/Card'
import { withRouter } from 'react-router'
import compose from 'recompose/compose'

import CourseForm from './CourseForm'
import CREATE_COURSE from '../graphql/CreateCourse.graphql'
import COURSES_QUERY from '../graphql/Courses.graphql'
import { getErrorMessages } from '../../app/utils/graphQL'
import withNotifier from '../../app/components/notification/withNotifier'

const NewCourse = ({ mutate, notifier, router }) => {
  const save = (variables) => {
    mutate({ variables })
      .then(({ data }) => {
        router.push('/courses')
        notifier.open({ message: 'The course has been created' })
      })
      .catch((error) => {
        const errorMessages = getErrorMessages(error)
        errorMessages.map((message) => {
          notifier.open({ message })
        })
      })
  }

  return (
    <Card>
      <CardText>
        <CourseForm onSubmit={save} />
      </CardText>
    </Card>
  )
}

NewCourse.propTypes = {
  mutate: PropTypes.func.isRequired
}

const createCourse = graphql(CREATE_COURSE, {
  options: {
    refetchQueries: [{ query: COURSES_QUERY }]
  }
})

export default compose(
  withRouter, withNotifier, createCourse
)(NewCourse)
