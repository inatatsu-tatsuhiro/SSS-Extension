import React from 'react'
import { Story, Meta } from '@storybook/react'

import Component, { Props } from './index'
import Color from '../../utils/Color'

export default {
  title: 'Elements/Typography',
  component: Component,
} as Meta

const Template: Story<Props> = (args) => <Component {...args} />

export const Default = Template.bind({})
Default.args = {
  text: 'Typography',
  variant: 'h1',
}
export const Pink = Template.bind({})
Pink.args = {
  text: 'Typography',
  variant: 'h1',
  color: Color.pink,
}
export const Gray = Template.bind({})
Gray.args = {
  text: 'Typography',
  variant: 'h1',
  color: Color.grayscale,
}
export const Purple = Template.bind({})
Purple.args = {
  text: 'Typography',
  variant: 'h1',
  color: Color.purple,
}
export const Sky = Template.bind({})
Sky.args = {
  text: 'Typography',
  variant: 'h1',
  color: Color.sky,
}
