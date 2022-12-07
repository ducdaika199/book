import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Avatar from '../../src/components/Avatar';

export default {
  title: 'Example/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = args => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: 'rounded',
  alt: 'Avatar Circular',
  size: 'md',
  className: 'bg-red-300',
};

export const Circular = Template.bind({});
Circular.args = {
  variant: 'circular',
  icon: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png',
  alt: 'Avatar Circular',
  size: 'md',
};
