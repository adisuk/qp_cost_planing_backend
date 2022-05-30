// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
const prismaClient = require('../prisma/generated/client');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const prisma = new prismaClient.PrismaClient()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
async function main() {
  const currentUser = await prisma.user.findFirst({
    where: {isRoot: true,},
    include: {role: true}
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
