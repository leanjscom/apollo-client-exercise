import { configure, setAddon } from '@kadira/storybook'
import './index.css'
import IntlAddon from 'react-storybook-addon-intl'
import infoAddon from '@kadira/react-storybook-addon-info'
import withPropsCombinations from 'react-storybook-addon-props-combinations'
setAddon(IntlAddon)
setAddon(infoAddon)
setAddon(withPropsCombinations)

const req = require.context('../src/', true, /\.story\.(js|jsx)$/)

function loadStories () {
  req.keys().forEach(req)
}

configure(loadStories, module)
