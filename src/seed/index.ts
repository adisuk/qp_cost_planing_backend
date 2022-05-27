// A `main` function so that you can use async/await
async function main() {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient()
    //region clear data
    await prisma.permission.deleteMany({});
    await prisma.unitMenu.deleteMany({});
    await prisma.subMenu.deleteMany({});
    await prisma.menu.deleteMany({});
    await prisma.prefix.deleteMany({});
    await prisma.user.deleteMany({});
    //endregion

    //region create user
    const currentUser = await prisma.user.create({
        data: {
            role: {
                create: {
                    nameTh: 'ผู้ดูแลระบบขั้นสูง',
                    nameEn: 'Administrator',
                    isRoot: true,
                    status: 'Enabled',
                },
            },
            name: 'root',
            surname: '',
            username: 'root@qualityplus.co.th',
            isRoot: true,
            email: 'root@qualityplus.co.th',
            password: "$2a$10$WKL7OLp3J1J5SPw8daNaKeLqiJ9Ez/WsxcInDxJcfv8BAvSoTdG92", // "Secret42"
            status: 'Enabled',
        },
    });
    console.log('create... user');
    //endregion

    //region create prefix
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
    console.log('create... prefix');
    //endregion

    //region update prefix
    const prefix = await prisma.prefix.findFirst({});
    await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            prefix: { connect: {id: prefix?.id} }
        }
    })
    console.log('update... prefix to user root');
    //endregion

    console.log('seed... index');

    await prisma.$disconnect()
}

main()
    .catch((e) => {
        throw e
    })

