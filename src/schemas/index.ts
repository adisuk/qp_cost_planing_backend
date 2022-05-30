import * as fs from "fs"
import * as path from "path"
import {gql} from "apollo-server"

/**
 * Automatic load all *.graphql file from schemas directory
 *
 * @return {Object}
 */
function getTypeDefs(): string {
  const dirname = path.join(__dirname);
  let graphQLSchemas = '';

  fs.readdirSync(dirname, {
    withFileTypes: true,
  }).forEach((file) => {
    // read sub directory
    if (file.isDirectory()) {
      fs.readdirSync(path.join(dirname, `${file.name}`), {
        withFileTypes: true,
      }).forEach((subDirFile) => {
        graphQLSchemas += fs.readFileSync(path.join(dirname, path.join(file.name, subDirFile.name)), 'utf-8').trim();
      });
    } else {
      // if (file.name !== 'user.ts') {
      const extension = path.extname(file.name);

      if (extension === '.graphql' || extension === '.gql') {
        // read file
        graphQLSchemas += fs.readFileSync(path.join(dirname, `${file.name}`), 'utf-8').trim();
      }
    }
  });
  return graphQLSchemas;
}

export const typeDefs = gql`${getTypeDefs()}`
