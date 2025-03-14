## For database
1. npm install prism -D      
2. npx prisma init --datasource-provider sqlite
    # Output

        ✔ Your Prisma schema was created at prisma/schema.prisma
        You can now open it in your favorite editor.

        warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

        Next steps:
        1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
        2. Run npx prisma db pull to turn your database schema into a Prisma schema.
        3. Run npx prisma generate to generate the Prisma Client. You can then start querying your database.
        4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

        More information in our documentation:
        https://pris.ly/d/getting-started

3. to migrate use npx prisma migrate dev --name <label>
