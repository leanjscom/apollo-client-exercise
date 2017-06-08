/* eslint react/prop-types: 0 */
/* eslint react/no-children-prop: 0 */

import React from 'react'
import TextField from 'material-ui/TextField'
import { RadioButtonGroup } from 'material-ui/RadioButton'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'

export const datify = (input) => {
  if (!input) {
    return null
  }

  const date = input instanceof Date ? input : new Date(input)
  if (isNaN(date)) {
    throw new Error(`Invalid date: ${input}`)
  }

  return date
}

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

export const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label} checked={!!input.value} onCheck={input.onChange} />
)

export const renderDatePickerField = ({ input, label }) => (
  <DatePicker
    floatingLabelText={label}
    value={datify(input.value)}
    onChange={(_, value) => {
      input.onChange(value)
    }}
  />
)

export const renderTimePickerField = ({ input, label }) => (
  <TimePicker
    floatingLabelText={label}
    value={datify(input.value)}
    onChange={(_, value) => {
      input.onChange(value)
    }}
  />
)

export const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
)

export const renderSelectField = (
  { input, label, meta: { touched, error }, children, ...custom }
) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
)
