const svgLoader = require('vite-svg-loader')
const contentLoader = require('@originjs/vite-plugin-content').default

const vitePlugins = [
  contentLoader(),
  svgLoader({
    defaultImport: 'raw',
    svgoConfig: {
      multipass: true,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {}
          }
        },
        {
          name: 'removeAttrs',
          params: {
            attrs: '(fill|stroke)'
          }
        },
        {
          name: 'removeAttributesBySelector',
          params: {
            selector: '[style*=fill:#]',
            attributes: 'style'
          }
        },
        {
          name: 'removeStyleElement',
          active: true
        }
      ]
    }
  })
]
module.exports = {
  stories: [
    '../tokens/**/*.stories.mdx',
    '../src/components/**/*.stories.@(mdx|js|jsx|ts|tsx)',
    './stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  staticDirs: ['./assets'],
  features: {
    interactionsDebugger: true,
    buildStoriesJson: true
  },
  core: {
    builder: '@storybook/builder-vite'
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-jest',
    '@storybook/addon-a11y',
    '@storybook/addon-cssresources',
    'storybook-addon-pseudo-states',
    'storybook-addon-designs'
  ],

  async viteFinal(config, { configType }) {
    // customize the Vite config here
    config.plugins.push(...vitePlugins)
    return config
  }
}
