// @ts-ignore
const prismaClient = require('@prisma/client');

// @ts-ignore
const prisma = new prismaClient.PrismaClient()

// @ts-ignore
async function main() {
    const currentUser = await prisma.user.findFirst({
        where: { isRoot: true, },
        include: { role: true }
    });

    // create multiple period
    await prisma.prefix.deleteMany({});
    await prisma.prefix.createMany({
        data: [
            {
                nameTh: 'นาย',
                createdById: currentUser.id,
                updatedById: currentUser.id,
            },
            {
                nameTh: 'นาง',
                createdById: currentUser.id,
                updatedById: currentUser.id,
            },
            {
                nameTh: 'นางสาว',
                createdById: currentUser.id,
                updatedById: currentUser.id,
            },
        ],
    });

    console.log('seed... master');
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
