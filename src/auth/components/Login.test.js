import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Login from './Login'

import getMuiTheme from 'material-ui/styles/getMuiTheme'

describe('<Login />', () => {
  it('should render with default props', () => {
    const handleSubmit = jest.fn()
    const handleChange = jest.fn()
    const props = {
      username: 'demo',
      password: '12345',
      router: {},
      handleSubmit,
      handleChange
    }

    const wrapper = shallow(<Login {...props} />, {
      context: {
        muiTheme: getMuiTheme()
      }
    })

    expect(shallowToJson(wrapper)).toMatchSnapshot()

    wrapper.find('Button').simulate('click')

    expect(handleSubmit).toBeCalled()

    wrapper.find('FormControl').at(0).simulate('change')

    expect(handleChange).toBeCalledWith('username')

    wrapper.find('FormControl').at(1).simulate('change')

    expect(handleChange).toBeCalledWith('password')
  })
})
