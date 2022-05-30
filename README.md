# qp_cost_planing_backend

prisma/schema.prisma
<pre>
generator client {
  provider = "prisma-client-js"
  output   = "./generated/client"
}

datasource db {
  provider = "sqlserver"
  url      = env("DATABASE_URL")
}
</pre>

prisma/schema.log.prisma
<pre>
generator client {
  provider = "prisma-client-js"
  output   = "./generated/client_log"
}

datasource db {
  provider = "sqlserver"
  url      = env("DATABASE_LOG_URL")
}
</pre>

How to migrate prisma client in the CLI
<pre>
prisma migrate dev --schema prisma/schema.prisma
prisma migrate dev --schema prisma/schema.log.prisma
</pre>

How to generate prisma client in the CLI
<pre>
prisma generate --schema prisma/schema.prisma
prisma generate --schema prisma/schema.log.prisma
</pre>

How to use difference prisma schema in the code
<pre>
import { PrismaClient as PrismaClient } from '../prisma/generated/client'
import { PrismaClient as PrismaClientLog } from '../prisma/generated/client_log'

const prismaClient = new PrismaClient()
const prismaClientLog = new PrismaClientLog()
</pre>
