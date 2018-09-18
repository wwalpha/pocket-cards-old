import * as path from 'path';
import * as fs from 'fs';
const mergeGraphqlSchemas = require('merge-graphql-schemas');
const fileLoader = mergeGraphqlSchemas.fileLoader;
const mergeTypes = mergeGraphqlSchemas.mergeTypes;

const typesArray = fileLoader(path.join(__dirname, './types'), { extensions: ['.gql'] });

fs.writeFileSync(path.join(__dirname, 'schema.gql'), mergeTypes(typesArray, { all: true }));
