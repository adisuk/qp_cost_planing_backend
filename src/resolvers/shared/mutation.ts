// import {UserInputError} from 'apollo-server';
// import {capitalizeFirstLetter} from '../../services/util.service';
import {errorHandler} from "../../common/error.handler";

// /**
//  * Generic add data to database
//  * @param {Object} context - The context must be include prisma client object
//  * @param {string} tableName - Name of table that you want to insert data to
//  * @param {Object} whereAlreadyExit - Field name use for check the data is already exists or not, if this parameter is null or undefined will skip checking data
//  * @param {Object} input - Object of data that you want to insert into database
//  * @return {Promise<*|*>} - Object data after inserted to database
//  */
// export async function genericAdd(context: any, tableName: string, whereAlreadyExit: any, input: any) {
//     try {
//         if (whereAlreadyExit && Object.keys(whereAlreadyExit).length > 0) {
//             const data = await context.prisma[tableName].findUnique({
//                 where: {
//                     ...whereAlreadyExit,
//                 },
//             });
//
//             const key = Object.keys(whereAlreadyExit)[0];
//
//             if (data) {
//                 throw new UserInputError(`${capitalizeFirstLetter(key)}: ${input[key]} already exists.`);
//             }
//         }
//
//         return await context.prisma[tableName].create({
//             data: {
//                 ...input,
//                 createdById: context.currentUser.id,
//                 updatedById: context.currentUser.id,
//             },
//         });
//     } catch (e) {
//         throw errorHandler(e, input)
//     }
// }

/**
 * Generic update data to database
 * @param {Object} context - The context must be include prisma client object
 * @param {string} tableName - Name of table that you want to insert data to
 * @param {Object} where - Where condition before update
 * @param {Object} input - Object of data that you want to insert into database
 * @return {Promise<*|*>} - Object data after inserted to database
 */
export async function genericUpdate(context: any, tableName: string, where: any, input: any) {
  try {
    return await context.prisma[tableName].update({
      where: {
        ...where,
      },
      data: {
        ...input,
        updatedById: context.currentUser.id,
      },
    });
  } catch (e) {
    throw errorHandler(e, input)
  }
}

/**
 * Generic update status to deleted
 * @param {Object} context - The context must be include prisma client object
 * @param {string} tableName - Name of table that you want to insert data to
 * @param {string} id - Table id
 * @param {string} status - Optional status
 * @param {Boolean} realDelete - Set true when you want to actually delete data from database
 * @return {Promise<*|*>} - Object data after inserted to database
 */
export async function genericDelete(context: any, tableName: string, id: string, status = 'deleted', realDelete = false) {
  try {
    if (realDelete) {
      return await context.prisma[tableName].delete({
        where: {
          id: id,
        },
      });
    }

    return await context.prisma[tableName].update({
      where: {
        id: id,
      },
      data: {
        status: status,
        updatedById: context.currentUser.id,
      },
    });
  } catch (e) {
    throw errorHandler(e, {id: id})
  }
}

/**
 * Generic many update status to deleted
 * @param {Object} context - The context must be include prisma client object
 * @param {string} tableName - Name of table that you want to insert data to
 * @param {object} where - Delete condition
 * @param {Boolean} realDelete - Set true when you want to actually delete data from database
 * @return {Promise<*|*>} - Object data after inserted to database
 */
export async function genericDeleteMany(context: any, tableName: string, where: any, realDelete = false) {
  try {
    if (realDelete) {
      return await context.prisma[tableName].deleteMany({
        where: {
          ...where,
        },
      });
    }

    return await context.prisma[tableName].updateMany({
      where: {
        ...where,
      },
      data: {
        status: 'deleted',
        updatedById: context.currentUser.id,
      },
    });
  } catch (e) {
    throw errorHandler(e, where)
  }
}
