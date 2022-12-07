import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import RadioGroup from '../../src/components/RadioGroup';

export default {
  title: 'Example/RadioGroup',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = args => (
  <RadioGroup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  direction: 'col',
  children: (
    <React.Fragment>
      <RadioGroup.Radio value="red" label="Red" color="primary" />
      <RadioGroup.Radio value="blue" label="Blue" color="secondary" />
      <RadioGroup.Radio value="yellow" label="Yellow" />
    </React.Fragment>
  ),
};
