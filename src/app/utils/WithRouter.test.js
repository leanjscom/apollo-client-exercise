import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import WithRouter from './WithRouter'

describe('<WithRouter />', () => {
  const DemoElem = () => <div>Hello World</div>

  const Elem = WithRouter(DemoElem)

  it('should render with default props', () => {
    const wrapper = shallow(<Elem />, { context: { router: { text: 'thatIstheRouter' } } })
    expect(shallowToJson(wrapper.dive())).toMatchSnapshot()
  })

  it('should get router with default props', () => {
    const wrapper = shallow(<Elem />, { context: { router: { text: 'thatIstheRouter' } } })
    expect(wrapper.prop('router')).toEqual({ text: 'thatIstheRouter' })
  })
})
