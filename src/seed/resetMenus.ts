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
    const tableNames = [{ tableName: 'permission' }, { tableName: 'unitMenu' }, { tableName: 'subMenu' }, { tableName: 'menu' }];
    for (const res of tableNames) {
        // @ts-ignore
        await prisma[res.tableName].deleteMany({});
    }
    await prisma.menu.create({
        data: {
            code: 'Customer',
            icon: 'Home',
            nameTh: 'ลูกค้า',
            nameEn: 'Customer',
            route: 'CustomerScreen',
            sequence: 1,
            subMenus: {
                create: {
                    code: 'CustomerHome',
                    nameTh: 'หน้าหลัก',
                    nameEn: 'Home',
                    route: 'CustomerScreen',
                    sequence: 1,
                    unitMenus: {
                        create: {
                            // code: 'CustomerHome',
                            nameTh: '',
                            nameEn: '',
                            route: '',
                            permissions: {
                                create: {
                                    role: { connect: { id: currentUser.role.id} },
                                    visible: true,
                                    create: true,
                                    edit: true,
                                    delete: true,
                                    createdBy: { connect: { id: currentUser.id } },
                                    updatedBy: { connect: { id: currentUser.id } },
                                }
                            },
                            createdBy: { connect: { id: currentUser.id } },
                            updatedBy: { connect: { id: currentUser.id } },
                        }
                    },
                    createdBy: { connect: { id: currentUser.id } },
                    updatedBy: { connect: { id: currentUser.id } },
                }
            },
            createdBy: { connect: { id: currentUser.id } },
            updatedBy: { connect: { id: currentUser.id } },
        },
    });
    await prisma.menu.create({
        data: {
            code: 'Sale',
            icon: 'Home',
            nameTh: 'การขาย',
            nameEn: 'Sale',
            route: 'SaleScreen',
            sequence: 1,
            subMenus: {
                create: {
                    code: 'SaleHome',
                    nameTh: 'หน้าหลัก',
                    nameEn: 'Home',
                    route: 'SaleScreen',
                    sequence: 1,
                    unitMenus: {
                        create: {
                            // code: 'SaleHome',
                            nameTh: '',
                            nameEn: '',
                            route: '',
                            permissions: {
                                create: {
                                    role: { connect: { id: currentUser.role.id} },
                                    visible: true,
                                    create: true,
                                    edit: true,
                                    delete: true,
                                    createdBy: { connect: { id: currentUser.id } },
                                    updatedBy: { connect: { id: currentUser.id } },
                                }
                            },
                            createdBy: { connect: { id: currentUser.id } },
                            updatedBy: { connect: { id: currentUser.id } },
                        }
                    },
                    createdBy: { connect: { id: currentUser.id } },
                    updatedBy: { connect: { id: currentUser.id } },
                }
            },
            createdBy: { connect: { id: currentUser.id } },
            updatedBy: { connect: { id: currentUser.id } },
        },
    });
    await prisma.menu.create({
        data: {
            code: 'Production',
            icon: 'Home',
            nameTh: 'การผลิต',
            nameEn: 'Production',
            route: 'ProductionScreen',
            sequence: 1,
            subMenus: {
                create: {
                    code: 'ProductionHome',
                    nameTh: 'หน้าหลัก',
                    nameEn: 'Home',
                    route: 'ProductionScreen',
                    sequence: 1,
                    unitMenus: {
                        create: {
                            // code: 'ProductionHome',
                            nameTh: '',
                            nameEn: '',
                            route: '',
                            permissions: {
                                create: {
                                    role: { connect: { id: currentUser.role.id} },
                                    visible: true,
                                    create: true,
                                    edit: true,
                                    delete: true,
                                    createdBy: { connect: { id: currentUser.id } },
                                    updatedBy: { connect: { id: currentUser.id } },
                                }
                            },
                            createdBy: { connect: { id: currentUser.id } },
                            updatedBy: { connect: { id: currentUser.id } },
                        }
                    },
                    createdBy: { connect: { id: currentUser.id } },
                    updatedBy: { connect: { id: currentUser.id } },
                }
            },
            createdBy: { connect: { id: currentUser.id } },
            updatedBy: { connect: { id: currentUser.id } },
        },
    });
    await prisma.menu.create({
        data: {
            code: 'Inventory',
            icon: 'Home',
            nameTh: 'คลังสินค้า',
            nameEn: 'Inventory',
            route: 'InventoryScreen',
            sequence: 1,
            subMenus: {
                create: {
                    code: 'InventoryHome',
                    nameTh: 'หน้าหลัก',
                    nameEn: 'Home',
                    route: 'InventoryScreen',
                    sequence: 1,
                    unitMenus: {
                        create: {
                            // code: 'InventoryHome',
                            nameTh: '',
                            nameEn: '',
                            route: '',
                            permissions: {
                                create: {
                                    role: { connect: { id: currentUser.role.id} },
                                    visible: true,
                                    create: true,
                                    edit: true,
                                    delete: true,
                                    createdBy: { connect: { id: currentUser.id } },
                                    updatedBy: { connect: { id: currentUser.id } },
                                }
                            },
                            createdBy: { connect: { id: currentUser.id } },
                            updatedBy: { connect: { id: currentUser.id } },
                        }
                    },
                    createdBy: { connect: { id: currentUser.id } },
                    updatedBy: { connect: { id: currentUser.id } },
                }
            },
            createdBy: { connect: { id: currentUser.id } },
            updatedBy: { connect: { id: currentUser.id } },
        },
    });
    await prisma.menu.create({
        data: {
            code: 'Accounting',
            icon: 'Home',
            nameTh: 'การบัญชี',
            nameEn: 'Accounting',
            route: 'AccountingScreen',
            sequence: 1,
            subMenus: {
                create: {
                    code: 'AccountingHome',
                    nameTh: 'หน้าหลัก',
                    nameEn: 'Home',
                    route: 'AccountingScreen',
                    sequence: 1,
                    unitMenus: {
                        create: {
                            // code: 'AccountingHome',
                            nameTh: '',
                            nameEn: '',
                            route: '',
                            permissions: {
                                create: {
                                    role: { connect: { id: currentUser.role.id} },
                                    visible: true,
                                    create: true,
                                    edit: true,
                                    delete: true,
                                    createdBy: { connect: { id: currentUser.id } },
                                    updatedBy: { connect: { id: currentUser.id } },
                                }
                            },
                            createdBy: { connect: { id: currentUser.id } },
                            updatedBy: { connect: { id: currentUser.id } },
                        }
                    },
                    createdBy: { connect: { id: currentUser.id } },
                    updatedBy: { connect: { id: currentUser.id } },
                }
            },
            createdBy: { connect: { id: currentUser.id } },
            updatedBy: { connect: { id: currentUser.id } },
        },
    });
    await prisma.menu.create({
        data: {
            code: 'System',
            icon: 'Home',
            nameTh: 'ข้อมูลระบบ',
            nameEn: 'System',
            route: 'SystemScreen',
            sequence: 1,
            subMenus: {
                create: [
                    {
                        code: 'SystemHome',
                        nameTh: 'หน้าหลัก',
                        nameEn: 'Home',
                        route: 'SystemScreen',
                        sequence: 1,
                        unitMenus: {
                            create: {
                                // code: 'SystemHome',
                                nameTh: '',
                                nameEn: '',
                                route: '',
                                permissions: {
                                    create: {
                                        role: { connect: { id: currentUser.role.id} },
                                        visible: true,
                                        create: true,
                                        edit: true,
                                        delete: true,
                                        createdBy: { connect: { id: currentUser.id } },
                                        updatedBy: { connect: { id: currentUser.id } },
                                    }
                                },
                                createdBy: { connect: { id: currentUser.id } },
                                updatedBy: { connect: { id: currentUser.id } },
                            }
                        },
                        createdBy: { connect: { id: currentUser.id } },
                        updatedBy: { connect: { id: currentUser.id } },
                    },
                    {
                        code: 'SystemMenu',
                        nameTh: 'เมนู',
                        nameEn: 'Menu',
                        route: 'MenuScreen',
                        sequence: 2,
                        unitMenus: {
                            create: [
                                {
                                    // code: '',
                                    nameTh: '',
                                    nameEn: '',
                                    route: '',
                                    permissions: {
                                        create: {
                                            role: { connect: { id: currentUser.role.id} },
                                            visible: true,
                                            create: true,
                                            edit: true,
                                            delete: true,
                                            createdBy: { connect: { id: currentUser.id } },
                                            updatedBy: { connect: { id: currentUser.id } },
                                        }
                                    },
                                    createdBy: { connect: { id: currentUser.id } },
                                    updatedBy: { connect: { id: currentUser.id } },
                                }
                            ]
                        },
                        createdBy: { connect: { id: currentUser.id } },
                        updatedBy: { connect: { id: currentUser.id } },
                    },
                    {
                        code: 'SystemRole',
                        nameTh: 'สิทธิ์การเข้าถึง',
                        nameEn: 'Role',
                        route: 'RoleScreen',
                        sequence: 3,
                        unitMenus: {
                            create: [
                                {
                                    // code: '',
                                    nameTh: '',
                                    nameEn: '',
                                    route: '',
                                    permissions: {
                                        create: {
                                            role: { connect: { id: currentUser.role.id} },
                                            visible: true,
                                            create: true,
                                            edit: true,
                                            delete: true,
                                            createdBy: { connect: { id: currentUser.id } },
                                            updatedBy: { connect: { id: currentUser.id } },
                                        }
                                    },
                                    createdBy: { connect: { id: currentUser.id } },
                                    updatedBy: { connect: { id: currentUser.id } },
                                }
                            ]
                        },
                        createdBy: { connect: { id: currentUser.id } },
                        updatedBy: { connect: { id: currentUser.id } },
                    },
                    {
                        code: 'SystemLog',
                        nameTh: 'บันทึกเหตุการณ์',
                        nameEn: 'Log',
                        route: '',
                        sequence: 4,
                        unitMenus: {
                            create: [
                                {
                                    code: 'SystemLogEventLog',
                                    nameTh: 'บันทึกเหตุการณ์',
                                    nameEn: 'Event Log',
                                    route: 'EventLogScreen',
                                    sequence: 1,
                                    permissions: {
                                        create: {
                                            role: { connect: { id: currentUser.role.id} },
                                            visible: true,
                                            create: true,
                                            edit: true,
                                            delete: true,
                                            createdBy: { connect: { id: currentUser.id } },
                                            updatedBy: { connect: { id: currentUser.id } },
                                        }
                                    },
                                    createdBy: { connect: { id: currentUser.id } },
                                    updatedBy: { connect: { id: currentUser.id } },
                                },
                                {
                                    code: 'SystemLogLoginLog',
                                    nameTh: 'บันทึกการเข้าสู่ระบบ',
                                    nameEn: 'Login Log',
                                    route: 'LoginLogScreen',
                                    sequence: 2,
                                    permissions: {
                                        create: {
                                            role: { connect: { id: currentUser.role.id} },
                                            visible: true,
                                            create: true,
                                            edit: true,
                                            delete: true,
                                            createdBy: { connect: { id: currentUser.id } },
                                            updatedBy: { connect: { id: currentUser.id } },
                                        }
                                    },
                                    createdBy: { connect: { id: currentUser.id } },
                                    updatedBy: { connect: { id: currentUser.id } },
                                },
                                {
                                    code: 'SystemLogTransactionLog',
                                    nameTh: 'บันทึกธุรกรรม',
                                    nameEn: 'Transaction Log',
                                    route: 'TransactionLogScreen',
                                    sequence: 3,
                                    permissions: {
                                        create: {
                                            role: { connect: { id: currentUser.role.id} },
                                            visible: true,
                                            create: true,
                                            edit: true,
                                            delete: true,
                                            createdBy: { connect: { id: currentUser.id } },
                                            updatedBy: { connect: { id: currentUser.id } },
                                        }
                                    },
                                    createdBy: { connect: { id: currentUser.id } },
                                    updatedBy: { connect: { id: currentUser.id } },
                                }
                            ]
                        },
                        createdBy: { connect: { id: currentUser.id } },
                        updatedBy: { connect: { id: currentUser.id } },
                    },
                    {
                        code: 'SystemUser',
                        nameTh: 'ผู้ใช้งาน',
                        nameEn: 'User',
                        route: '',
                        sequence: 5,
                        unitMenus: {
                            create: [
                                {
                                    code: 'SystemUserManage',
                                    nameTh: 'จัดการผู้ใช้งาน',
                                    nameEn: 'User Management',
                                    route: 'UserScreen',
                                    permissions: {
                                        create: {
                                            role: { connect: { id: currentUser.role.id} },
                                            visible: true,
                                            create: true,
                                            edit: true,
                                            delete: true,
                                            createdBy: { connect: { id: currentUser.id } },
                                            updatedBy: { connect: { id: currentUser.id } },
                                        }
                                    },
                                    createdBy: { connect: { id: currentUser.id } },
                                    updatedBy: { connect: { id: currentUser.id } },
                                }
                            ]
                        },
                        createdBy: { connect: { id: currentUser.id } },
                        updatedBy: { connect: { id: currentUser.id } },
                    },
                ]
            },
            createdBy: { connect: { id: currentUser.id } },
            updatedBy: { connect: { id: currentUser.id } },
        },
    });
    console.log('seed... resetMenus');
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
