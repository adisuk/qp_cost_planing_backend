BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [qp$dev].[Prefix] (
    [id] NVARCHAR(1000) NOT NULL,
    [sequence] INT NOT NULL CONSTRAINT [Prefix_sequence_df] DEFAULT 0,
    [isChoose] BIT NOT NULL CONSTRAINT [Prefix_isChoose_df] DEFAULT 0,
    [nameTh] NVARCHAR(1000) NOT NULL,
    [nameShortTh] NVARCHAR(1000),
    [nameEn] NVARCHAR(1000),
    [nameShortEn] NVARCHAR(1000),
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Prefix_status_df] DEFAULT 'Enabled',
    [isDeleted] BIT NOT NULL CONSTRAINT [Prefix_isDeleted_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Prefix_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [createdById] NVARCHAR(1000),
    [updatedById] NVARCHAR(1000),
    CONSTRAINT [Prefix_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [qp$dev].[EventLog] (
    [id] NVARCHAR(1000) NOT NULL,
    [ipAddress] NVARCHAR(1000) NOT NULL,
    [logLevel] NVARCHAR(1000) NOT NULL,
    [method] NVARCHAR(1000) NOT NULL,
    [message] NVARCHAR(1000) NOT NULL,
    [errorCode] NVARCHAR(1000) NOT NULL,
    [accountId] NVARCHAR(1000),
    [payload] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [EventLog_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [EventLog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [qp$dev].[LoginLog] (
    [id] NVARCHAR(1000) NOT NULL,
    [loginDate] DATETIME2 NOT NULL CONSTRAINT [LoginLog_loginDate_df] DEFAULT CURRENT_TIMESTAMP,
    [expireDate] DATETIME2,
    [token] NVARCHAR(1000),
    [type] NVARCHAR(1000) NOT NULL CONSTRAINT [LoginLog_type_df] DEFAULT 'SignIn',
    [accountId] NVARCHAR(1000),
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [LoginLog_status_df] DEFAULT 'Passed',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [LoginLog_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [LoginLog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [qp$dev].[TransactionLog] (
    [id] NVARCHAR(1000) NOT NULL,
    [action] NVARCHAR(1000) NOT NULL,
    [method] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL CONSTRAINT [TransactionLog_type_df] DEFAULT 'Created',
    [accountId] NVARCHAR(1000),
    [payload] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [TransactionLog_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [TransactionLog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [qp$dev].[Menu] (
    [id] NVARCHAR(1000) NOT NULL,
    [code] NVARCHAR(1000) NOT NULL,
    [icon] NVARCHAR(1000) NOT NULL,
    [nameTh] NVARCHAR(1000) NOT NULL,
    [nameEn] NVARCHAR(1000),
    [route] NVARCHAR(1000),
    [sequence] INT NOT NULL CONSTRAINT [Menu_sequence_df] DEFAULT 0,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Menu_status_df] DEFAULT 'Enabled',
    [isDeleted] BIT NOT NULL CONSTRAINT [Menu_isDeleted_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Menu_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [createdById] NVARCHAR(1000),
    [updatedById] NVARCHAR(1000),
    CONSTRAINT [Menu_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Menu_code_key] UNIQUE NONCLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [qp$dev].[SubMenu] (
    [id] NVARCHAR(1000) NOT NULL,
    [code] NVARCHAR(1000) NOT NULL,
    [nameTh] NVARCHAR(1000) NOT NULL,
    [nameEn] NVARCHAR(1000),
    [route] NVARCHAR(1000),
    [sequence] INT NOT NULL CONSTRAINT [SubMenu_sequence_df] DEFAULT 0,
    [menuId] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [SubMenu_status_df] DEFAULT 'Enabled',
    [isDeleted] BIT NOT NULL CONSTRAINT [SubMenu_isDeleted_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [SubMenu_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [createdById] NVARCHAR(1000),
    [updatedById] NVARCHAR(1000),
    CONSTRAINT [SubMenu_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [SubMenu_code_key] UNIQUE NONCLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [qp$dev].[UnitMenu] (
    [id] NVARCHAR(1000) NOT NULL,
    [code] NVARCHAR(1000) NOT NULL,
    [nameTh] NVARCHAR(1000),
    [nameEn] NVARCHAR(1000),
    [route] NVARCHAR(1000),
    [sequence] INT NOT NULL CONSTRAINT [UnitMenu_sequence_df] DEFAULT 0,
    [subMenuId] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [UnitMenu_status_df] DEFAULT 'Enabled',
    [isDeleted] BIT NOT NULL CONSTRAINT [UnitMenu_isDeleted_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [UnitMenu_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [createdById] NVARCHAR(1000),
    [updatedById] NVARCHAR(1000),
    CONSTRAINT [UnitMenu_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UnitMenu_code_key] UNIQUE NONCLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [qp$dev].[Role] (
    [id] NVARCHAR(1000) NOT NULL,
    [nameTh] NVARCHAR(1000) NOT NULL,
    [nameEn] NVARCHAR(1000),
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Role_status_df] DEFAULT 'Enabled',
    [isRoot] BIT NOT NULL CONSTRAINT [Role_isRoot_df] DEFAULT 0,
    [isDeleted] BIT NOT NULL CONSTRAINT [Role_isDeleted_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Role_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [createdById] NVARCHAR(1000),
    [updatedById] NVARCHAR(1000),
    CONSTRAINT [Role_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [qp$dev].[Permission] (
    [id] NVARCHAR(1000) NOT NULL,
    [roleId] NVARCHAR(1000) NOT NULL,
    [unitMenuId] NVARCHAR(1000),
    [visible] BIT NOT NULL CONSTRAINT [Permission_visible_df] DEFAULT 1,
    [create] BIT NOT NULL CONSTRAINT [Permission_create_df] DEFAULT 0,
    [edit] BIT NOT NULL CONSTRAINT [Permission_edit_df] DEFAULT 0,
    [delete] BIT NOT NULL CONSTRAINT [Permission_delete_df] DEFAULT 0,
    [isDeleted] BIT NOT NULL CONSTRAINT [Permission_isDeleted_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Permission_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [createdById] NVARCHAR(1000),
    [updatedById] NVARCHAR(1000),
    CONSTRAINT [Permission_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [qp$dev].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [photo] NVARCHAR(1000),
    [roleId] NVARCHAR(1000) NOT NULL,
    [prefixId] NVARCHAR(1000),
    [name] NVARCHAR(1000) NOT NULL,
    [surname] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [accessFailedCount] INT NOT NULL CONSTRAINT [User_accessFailedCount_df] DEFAULT 0,
    [oneTimePassword] NVARCHAR(1000) NOT NULL CONSTRAINT [User_oneTimePassword_df] DEFAULT '',
    [oneTimePasswordReset] BIT NOT NULL CONSTRAINT [User_oneTimePasswordReset_df] DEFAULT 1,
    [resetKey] NVARCHAR(1000) NOT NULL CONSTRAINT [User_resetKey_df] DEFAULT '',
    [isRoot] BIT NOT NULL CONSTRAINT [User_isRoot_df] DEFAULT 0,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [User_status_df] DEFAULT 'Enabled',
    [isDeleted] BIT NOT NULL CONSTRAINT [User_isDeleted_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [createdById] NVARCHAR(1000),
    [updatedById] NVARCHAR(1000),
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [qp$dev].[UserResetLog] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [seq] INT NOT NULL CONSTRAINT [UserResetLog_seq_df] DEFAULT 0,
    [password] NVARCHAR(1000) NOT NULL CONSTRAINT [UserResetLog_password_df] DEFAULT '',
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [UserResetLog_status_df] DEFAULT 'Enabled',
    [isDeleted] BIT NOT NULL CONSTRAINT [UserResetLog_isDeleted_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [UserResetLog_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [createdById] NVARCHAR(1000),
    [updatedById] NVARCHAR(1000),
    CONSTRAINT [UserResetLog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [qp$dev].[Prefix] ADD CONSTRAINT [Prefix_createdById_fkey] FOREIGN KEY ([createdById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[Prefix] ADD CONSTRAINT [Prefix_updatedById_fkey] FOREIGN KEY ([updatedById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[EventLog] ADD CONSTRAINT [EventLog_accountId_fkey] FOREIGN KEY ([accountId]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[LoginLog] ADD CONSTRAINT [LoginLog_accountId_fkey] FOREIGN KEY ([accountId]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[TransactionLog] ADD CONSTRAINT [TransactionLog_accountId_fkey] FOREIGN KEY ([accountId]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[Menu] ADD CONSTRAINT [Menu_createdById_fkey] FOREIGN KEY ([createdById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[Menu] ADD CONSTRAINT [Menu_updatedById_fkey] FOREIGN KEY ([updatedById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[SubMenu] ADD CONSTRAINT [SubMenu_menuId_fkey] FOREIGN KEY ([menuId]) REFERENCES [qp$dev].[Menu]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[SubMenu] ADD CONSTRAINT [SubMenu_createdById_fkey] FOREIGN KEY ([createdById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[SubMenu] ADD CONSTRAINT [SubMenu_updatedById_fkey] FOREIGN KEY ([updatedById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[UnitMenu] ADD CONSTRAINT [UnitMenu_subMenuId_fkey] FOREIGN KEY ([subMenuId]) REFERENCES [qp$dev].[SubMenu]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [qp$dev].[UnitMenu] ADD CONSTRAINT [UnitMenu_createdById_fkey] FOREIGN KEY ([createdById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[UnitMenu] ADD CONSTRAINT [UnitMenu_updatedById_fkey] FOREIGN KEY ([updatedById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[Role] ADD CONSTRAINT [Role_createdById_fkey] FOREIGN KEY ([createdById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[Role] ADD CONSTRAINT [Role_updatedById_fkey] FOREIGN KEY ([updatedById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[Permission] ADD CONSTRAINT [Permission_unitMenuId_fkey] FOREIGN KEY ([unitMenuId]) REFERENCES [qp$dev].[UnitMenu]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [qp$dev].[Permission] ADD CONSTRAINT [Permission_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [qp$dev].[Role]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [qp$dev].[Permission] ADD CONSTRAINT [Permission_createdById_fkey] FOREIGN KEY ([createdById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[Permission] ADD CONSTRAINT [Permission_updatedById_fkey] FOREIGN KEY ([updatedById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[User] ADD CONSTRAINT [User_prefixId_fkey] FOREIGN KEY ([prefixId]) REFERENCES [qp$dev].[Prefix]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [qp$dev].[User] ADD CONSTRAINT [User_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [qp$dev].[Role]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [qp$dev].[User] ADD CONSTRAINT [User_createdById_fkey] FOREIGN KEY ([createdById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[User] ADD CONSTRAINT [User_updatedById_fkey] FOREIGN KEY ([updatedById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[UserResetLog] ADD CONSTRAINT [UserResetLog_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [qp$dev].[UserResetLog] ADD CONSTRAINT [UserResetLog_createdById_fkey] FOREIGN KEY ([createdById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [qp$dev].[UserResetLog] ADD CONSTRAINT [UserResetLog_updatedById_fkey] FOREIGN KEY ([updatedById]) REFERENCES [qp$dev].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
