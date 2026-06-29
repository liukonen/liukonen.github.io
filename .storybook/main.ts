import type { StorybookConfig } from '@storybook/preact-vite';

// const config: StorybookConfig = {
//   "stories": [
//     "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
//   ],
//   "addons": [],
//   "framework": "@storybook/preact-vite"
// };
// export default config;


// .storybook/main.js
export default {
  stories: ["../src/stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "storybook-design-token" // Drops the automatic token tab into your dashboard
  ],
  framework: {
    name: "@storybook/preact-vite",
    options: {}
  }
};