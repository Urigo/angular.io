import { graphql, introspectionQuery } from 'graphql';
import { buildSchemaFromTypeDefinitions } from 'graphql-tools';
import { FileResult, Transform, TransformedOptions, getTemplateGenerator } from 'graphql-code-generator';
import * as fs from 'fs';

import { typeDefinitions } from './app/graphql-typesdef';

const OUT = "./app/graphql-types.d.ts";

Promise.all([
  graphql(buildSchemaFromTypeDefinitions(typeDefinitions), introspectionQuery).then(res => res.data),
  getTemplateGenerator('typescript'),
]).then(([introspection, template]) => (<TransformedOptions>{
  introspection: introspection,
  documents: [],
  template: template,
  outPath: OUT,
  isDev: false,
  noSchema: false,
  noDocuments: true,
}))
.then(Transform)
.then((files: FileResult[]) => {
  files.forEach((fileResult: FileResult) => {
    fs.writeFileSync(fileResult.path, fileResult.content);
  });
  return files;
}).then(() => {
  console.log('Type Generation done.');
  process.exit(0);
}).catch((err) => {
  if (typeof err === 'object') {
    console.log(err);
  }

  console.error('Error: ' + err);
  process.exit(1);
});
