# Podman Setup

- To build, pull image and run container:

```bash
podman compose up -d
```

# Prisma Setup

- npx prisma init
- Update the .env file with the correct database connection string. The format is as follows:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA_NAME"
```

- Create a table in the schema.prisma file. For example, to create a student table, add the following code to the schema.prisma file:

```prisma
model Student {
  id Int @id @default(autoincrement())
  name String
  email String @unique
  rollNo Int
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
}
```

- After defining the model, run the following command to create the migration and update the database schema:

```bash
npx prisma migrate dev --name create_student_table
```

- Note: If table already exists when migrating, use

```bash
npx prisma migrate reset
```

- To visualize the database table, use:

```bash
npx prisma studio
```

- Create prisma.js file and add the following code to initialize the Prisma Client:

```javascript
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { prismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
```

---

### Things to remember when importing prisma client on prisma.js

- PrismaClient not found error can be solved by importing `import {PrismaClient} from "../generated/prisma/client.js"`
- if `import { PrismaClient } from '@prisma/client';` is needed then we have to remove the `output   = "../src/generated/prisma"` from the `schema.prisma` file:
  ```
  generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
  moduleFormat = "esm"
  }
  ```
  And regenerate the prisma code:
  `npx prisma generate`

---
