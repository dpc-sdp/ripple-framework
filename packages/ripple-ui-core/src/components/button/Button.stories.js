import MyButton from './index.vue'
// import iconNamesRaw from 'virtual:svg-icons-names'

// Build a list of icon names
let iconNames = ['download', 'home']
// Add an empty icon name at the start of the array so that it can be unset by the user
iconNames.unshift('')

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: MyButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    theme: {
      control: { type: null },
      options: ['primary', 'secondary', 'tertiary']
    },
    iconName: {
      control: { type: 'select' },
      options: iconNames
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right']
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'large']
    }
  }
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<my-button v-bind="args" />'
})

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  label: 'Button',
  theme: 'primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Primary.args,
  theme: 'secondary'
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  ...Primary.args,
  theme: 'tertiary'
}

const MixedTemplate = () => ({
  components: { MyButton },
  template:
    '<my-button label="Home" iconName="home" /> <my-button label="Home" iconName="home" /> <my-button label="Download" iconName="download" theme="secondary" />'
})

export const MultipleButtons = MixedTemplate.bind({})
