// src/stories/Dropdown.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Dropdown, { DropdownProps } from '../components/Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    label: { control: 'text' },
    labelVisibility: { control: 'select', options: ['Visible', 'Hidden'] },
    status: { control: 'select', options: ['Unfilled', 'Filled', 'Disabled', 'Error'] },
    labelIconVisibility: { control: 'select', options: ['Visible', 'Hidden'] },
    leftIconVisibility: { control: 'select', options: ['Visible', 'Hidden'] },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
    text: { control: 'text' },
    type: { control: 'select', options: ['SingleNoIcon', 'SingleRadio', 'Multi'] },
    activeItemIndex: { control: 'number' },
    items: { control: 'object' },
    onSelect: { action: 'selected' },
  },
} as Meta;

const Template: StoryFn<DropdownProps> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Dropdown Title',
  labelVisibility: 'Visible',
  status: 'Unfilled',
  labelIconVisibility: 'Visible',
  leftIconVisibility: 'Visible',
  helperText: 'Helper Text',
  required: false,
  text: 'Select Option',
  type: 'SingleNoIcon',
  activeItemIndex: 0,
  items: ['Option 1', 'Option 2', 'Option 3'],
};
