import React from 'react'
import { shallow, mount } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import ConnectedMain, { Main } from './Main'

describe('<Main />', () => {
  it('should render with default props', () => {
    const logoutUser = jest.fn()
    const props = {
      width: 3
    }

    const wrapper = shallow(<ConnectedMain {...props} />)

    expect(shallowToJson(wrapper)).toMatchSnapshot()

    wrapper.find('Main').simulate('click')
  })

  describe('Testing Methods', () => {
    let wrapper

    beforeEach(() => {
      const props = {
        width: 3
      }

      wrapper = shallow(<Main {...props} />)
      wrapper.instance().setState = jest.fn()
    })

    it('should mount and map connect connected component', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot()
    })

    it('should check #closeNav()', () => {
      wrapper.instance().toggleNav()

      expect(wrapper.instance().setState).toBeCalledWith({ nav: { open: true } })
    })

    it('should check #closeNav()', () => {
      wrapper.instance().closeNav()

      expect(wrapper.instance().setState).toBeCalledWith({ nav: { open: false } })
    })
  })
})
