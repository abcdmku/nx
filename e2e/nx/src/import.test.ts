import {
  checkFilesExist,
  cleanupProject,
  newProject,
  runCLI,
} from '@nx/e2e/utils';

describe('Nx Import', () => {
  let proj: string;
  beforeAll(
    () =>
      (proj = newProject({
        packages: ['@nx/vue'],
        unsetProjectNameAndRootFormat: false,
      }))
  );
  afterAll(() => cleanupProject());

  it('should be able to import a vite app', () => {
    const remote = 'https://github.com/FrozenPandaz/nx-examples.git';
    const ref = 'vue';
    const source = '.';
    const directory = 'projects/vue-app';
    runCLI(
      `import ${remote} ${directory} --ref ${ref} --source ${source} --no-interactive`
    );

    checkFilesExist(
      'projects/vue-app/.gitignore',
      'projects/vue-app/package.json',
      'projects/vue-app/index.html',
      'projects/vue-app/vite.config.ts',
      'projects/vue-app/e2e/tsconfig.json',
      'projects/vue-app/e2e/vue.spec.ts',
      'projects/vue-app/src/main.ts',
      'projects/vue-app/src/App.vue',
      'projects/vue-app/public/favicon.ico'
    );
    runCLI(`build created-vue-app`);
  });
});
