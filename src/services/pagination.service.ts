import {PaginationResponder} from "../common/pagination.interface";

const PAGE_SIZE = 25;
const CURRENT_PAGE = 1;

/**
 * Reproduce pagination for Pagination Responder
 * @param nodes
 * @param totalItems
 * @param currentPage
 * @param pageSize
 */
const pagination = async (nodes: object[], totalItems: number, currentPage: number, pageSize: number): Promise<PaginationResponder> => {
    const skip = await calculationSkip(currentPage, pageSize);

    currentPage = currentPage || CURRENT_PAGE;
    pageSize = pageSize || PAGE_SIZE;

    return {
        nodes,
        pageInfo: {
            fromItem: totalItems === 0 ? 0 : currentPage === 1 ? 1 : skip + 1 > totalItems ? totalItems : skip + 1,
            toItem: skip + pageSize > totalItems ? totalItems : skip + pageSize,
            currentPage: currentPage,
            pageSizes: pageSize,
            totalItemsInPage: nodes.length,
            totalPage: await calculationTotalPage(totalItems, pageSize),
            totalItems: totalItems,
        },
    };
};

/**
 * Calculation skip pages
 * @param currentPage
 * @param pageSize
 */
const calculationSkip = async (currentPage: number, pageSize: number): Promise<number> => {
    return ((currentPage || CURRENT_PAGE) - 1) * (pageSize || CURRENT_PAGE);
};

/**
 * Calculation total pages
 * @param count
 * @param pageSize
 */
const calculationTotalPage = async (count: number, pageSize: number): Promise<number> => {
    return Math.ceil(count / (pageSize || PAGE_SIZE));
};

/**
 *
 * @param db - Prisma database
 * @param where
 * @param args
 */
export const getPagination = async (db: any, where: any, args: any): Promise<PaginationResponder> => {
    let whereData = {};
    let filter = {};

    if (args.filter) {
        filter = JSON.parse(args.filter);
    }

    if (args.filter) {
        whereData = {
            ...where,
            AND: [
                {
                    OR: [
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        ...filter,
                    ],
                },
            ],
        };
    }

    const total = await db.count({where: whereData});
    const data = await db.findMany({
        where: whereData,
        take: args.pageSize,
        skip: await calculationSkip(args.currentPage, args.pageSize),
        orderBy: {
            [args.orderBy.split('_')[0]]: args.orderBy.split('_')[1],
        },
    });

    return await pagination(data, total, args.currentPage, args.pageSize);
};
