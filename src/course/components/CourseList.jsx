import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { List, ListItem } from 'material-ui/List'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import { pinkA200 } from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'
import { withRouter } from 'react-router'
import { throttle } from 'lodash'
import compose from 'recompose/compose'

import MasterDetail from '../../app/components/MasterDetail'
import { fetchMoreParams } from '../../app/utils/apolloUtils'
import { coursesQueryVariables } from '../queries'
import ScrollNotifier from '../../app/components/notification/ScrollNotifier'
import COURSES_QUERY from '../graphql/Courses.graphql'
import NewFloatingButton from '../../app/components/navigations/NewFloatingButton'

const CourseList = ({ router, ...props }) => {
  const showCourseDetail = ({ id }) => {
    router.push(`/courses/${id}`)
  }

  const { loading, error, courses = {} } = props.data
  let master

  if (loading) {
    master = <p>Loading ...</p>
  } else if (error) {
    master = <p>{error.message}</p>
  } else {
    const courseEdges = courses.edges || []
    const listItems = courseEdges.map(({ node }, index) => (
      <ListItem
        onClick={() => showCourseDetail(node)}
        key={node.id}
        style={{ color: 'black' }}
        primaryText={node.title}
        secondaryText={
          `${node.code} - ${node.type} | ${new Date(node.start_date).toLocaleString()}`
        }
        leftIcon={<ActionGrade color={pinkA200} />}
      />
    ))

    master = (
      <ScrollNotifier
        className="view"
        onScrollAtTheBottom={() => {
          if (courses.pageInfo.hasNextPage && !loading) {
            props.loadMoreEntries()
          }
        }}
      >
        <List>
          {listItems}
          <NewFloatingButton onClick={() => router.push('/courses/new')} />
        </List>
      </ScrollNotifier>
    )
  }

  return <MasterDetail master={master} detail={props.children} />
}

CourseList.propTypes = {
  data: PropTypes.object.isRequired,
  loadMoreEntries: PropTypes.func.isRequired,
  children: PropTypes.object,
  params: PropTypes.object.isRequired
}

CourseList.defaultProps = {
  data: {},
  children: null
}

const fetchCourses = graphql(COURSES_QUERY, {
  options: () => ({ ...coursesQueryVariables }),
  props ({ data }) {
    const { courses, fetchMore } = data

    return {
      data,
      loadMoreEntries: throttle(() =>
        fetchMore(
          fetchMoreParams({
            query: COURSES_QUERY,
            name: 'courses',
            data: courses
          })
        ))
    }
  }
})

export default compose(withRouter, fetchCourses)(CourseList)
