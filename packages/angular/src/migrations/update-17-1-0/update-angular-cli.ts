import { formatFiles, Tree, updateJson } from '@nx/devkit';

export const angularCliVersion = '~17.0.0-rc.4';

export default async function (tree: Tree) {
  let shouldFormat = false;

  updateJson(tree, 'package.json', (json) => {
    if (json.devDependencies?.['@angular/cli']) {
      json.devDependencies['@angular/cli'] = angularCliVersion;
      shouldFormat = true;
    } else if (json.dependencies?.['@angular/cli']) {
      json.dependencies['@angular/cli'] = angularCliVersion;
      shouldFormat = true;
    }

    return json;
  });

  if (shouldFormat) {
    await formatFiles(tree);
  }
}