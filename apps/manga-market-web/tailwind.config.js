const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      screens: {
        xsm: '320px',
        sm: '640px',
        md: '768px',
        x_md: '960px',
        lg: '1024px',
        xl: '1280px',
      },
     
    },
  },
  plugins: [],
};
