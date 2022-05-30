import * as fs from "fs"
import * as path from "path"

/**
 * Automatic get all mutation, query, relation and subscription
 *
 * @param {string} directoryName - Subdirectory name in resolvers
 * @return {string[]}
 */
function getFilesPath(directoryName: string): string[] {
  const dirname = path.join(__dirname);
  const filesPath: string[] = [];

  fs.readdirSync(path.join(dirname, directoryName), {
    withFileTypes: true,
  }).forEach((file) => {
    const filePath = path.join(dirname, path.join(directoryName, file.name));

    if (file.isDirectory()) {
      fs.readdirSync(filePath, {withFileTypes: true}).forEach((subDirFile) => {
        const subDirFilePath = path.join(dirname, path.join(directoryName, path.join(file.name, subDirFile.name)));

        if (subDirFile.isDirectory()) {
          fs.readdirSync(path.join(dirname, path.join(directoryName, path.join(file.name, subDirFile.name))), {
            withFileTypes: true,
          }).forEach((subOfSubDirFile) => {
            const subOfSubDirFilePath = path.join(dirname,
              `${directoryName}/${file.name}/${subDirFile.name}/${subOfSubDirFile.name}`,
            );

            filesPath.push(subOfSubDirFilePath.replace(dirname, '.'));
          });
        } else {
          const fileExtension = path.extname(subDirFilePath.replace(dirname, '.'));

          if (fileExtension === '.ts' || fileExtension === '.js') {
            filesPath.push(subDirFilePath.replace(dirname, '.'));
          }
        }
      });
    } else {
      const fileExtension = path.extname(filePath.replace(dirname, '.'));

      if (fileExtension === '.ts' || fileExtension === '.js') {
        filesPath.push(filePath.replace(dirname, '.'));
      }
    }
  });

  return filesPath;
}

export const getResolvers = async () => {
  let queryProperty = {};
  let mutationProperty = {};

  for (const query of getFilesPath('query')) {
    const path = await import(query)

    await Object.keys(path).forEach((property) => {
      queryProperty = {
        ...queryProperty,
        ...path[property],
      };
    });
  }

  for (const mutation of getFilesPath('mutation')) {
    const path = await import(mutation)

    await Object.keys(path).forEach((property) => {
      mutationProperty = {
        ...mutationProperty,
        ...path[property],
      };
    });
  }

  let resolvers = {
    Query: {...queryProperty},
    Mutation: {...mutationProperty},
  };

  // for (const subscription of getFilesPath('subscription')) {
  //     const path = await import(subscription)
  //
  //     resolvers = {
  //         ...resolvers,
  //         ...path,
  //     };
  // }

  for (const relation of getFilesPath('relation')) {
    const path = await import(relation)

    resolvers = {
      ...resolvers,
      ...path,
    };
  }
  return resolvers;
}
