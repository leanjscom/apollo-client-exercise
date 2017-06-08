import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import {
  renderTextField,
  renderDatePickerField,
  renderTimePickerField,
  renderSelectField
} from '../../app/components/form/Fields'

const validate = (values) => {
  const errors = {}
  const requiredFields = ['title']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

const CourseForm = (
  { handleSubmit, pristine, reset, submitting, onSubmit, initialValues }
) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <Field name="title" component={renderTextField} label="Title" />
    </div>
    <div>
      <Field name="code" component={renderTextField} label="Code" />
    </div>
    <div>
      <Field name="type" component={renderSelectField} label="Type">
        <MenuItem value="fundamentals" primaryText="Fundamentals" />
        <MenuItem value="advanced" primaryText="Advanced" />
        <MenuItem value="bootcamp" primaryText="Bootcamp" />
      </Field>
    </div>
    <div>
      <Field name="city" component={renderSelectField} label="City">
        <MenuItem value="London" primaryText="London" />
        <MenuItem value="Amsterdam" primaryText="Amsterdam" />
        <MenuItem value="Berlin" primaryText="Berlin" />
      </Field>
    </div>
    <div>
      <Field name="description" component={renderTextField} label="Description" />
    </div>
    <div>
      <Field name="price" component={renderTextField} label="Price" />
    </div>
    <div>
      <Field name="discount_price" component={renderTextField} label="Discount price" />
    </div>
    <div>
      <Field name="currency" component={renderSelectField} label="Currency">
        <MenuItem value="gbp" primaryText="GBP" />
        <MenuItem value="eur" primaryText="EUR" />
      </Field>
    </div>
    <div>
      <Field name="start_date" component={renderDatePickerField} label="Start date" />
    </div>
    <div>
      <Field name="start_date" component={renderTimePickerField} label="Start time" />
    </div>
    <div>
      <Field name="end_date" component={renderDatePickerField} label="End date" />
    </div>
    <div>
      <Field name="end_date" component={renderTimePickerField} label="End time" />
    </div>
    <div>
      <Field name="max_attendees" component={renderTextField} label="Max attendees" />
    </div>
    <div>
      <RaisedButton type="submit" label="Submit" disabled={pristine || submitting} primary />
      {initialValues ? <RaisedButton label="Clear Values" onClick={reset} /> : ''}
    </div>
  </form>
)

CourseForm.propTypes = {
  ...propTypes
}

const withReduxForm = reduxForm({
  form: 'CourseForm',
  enableReinitialize: true,
  validate
})

export default withReduxForm(CourseForm)
