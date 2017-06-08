import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'

import { renderTextField, renderDatePickerField } from '../../app/components/form/Fields'

const VoucherForm = (
  { handleSubmit, pristine, reset, submitting, onSubmit, initialValues }
) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <Field name="code" component={renderTextField} label="Code" />
    </div>
    <div>
      <Field name="course_code" component={renderTextField} label="Course code" />
    </div>
    <div>
      <Field name="discount_percentage" component={renderTextField} label="Discount persentage" />
    </div>
    <div>
      <Field name="expiration_date" component={renderDatePickerField} label="Expiration date" />
    </div>
    <div>
      <Field name="redemptions" component={renderTextField} label="Redemptions" />
    </div>
    <div>
      <Field name="description" component={renderTextField} label="description" />
    </div>
    <div>
      <Field name="max_redemptions" component={renderTextField} label="Max redemptions" />
    </div>
    <div>
      <RaisedButton type="submit" label="Submit" disabled={pristine || submitting} primary />
      {initialValues ? <RaisedButton label="Clear Values" onClick={reset} /> : ''}
    </div>
  </form>
)

VoucherForm.propTypes = {
  ...propTypes
}

const withReduxForm = reduxForm({
  form: 'VoucherForm',
  enableReinitialize: true
})

export default withReduxForm(VoucherForm)
