import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '../../src/components/Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Submit',
  variant: 'outlined',
  size: 'medium',
  disabled: false,
};
