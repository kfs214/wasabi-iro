export default {
  // Type check and Lint TypeScript files
  '**/*.ts': (filenames) => [
    'npx tsc --noEmit',
    `eslint --max-warnings=0 --fix ${filenames.join(' ')}`,
  ],

  // Lint JS files
  '**/*.*js': 'eslint --fix',

  // Prettify TS, JS, Markdown and JSON files
  '**/*.(ts|*js|json|md)': 'prettier --write',
};
