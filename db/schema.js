//table creation
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable('users-table',{
    id:int().primaryKey({autoIncrement:true}),
    text:text().notNull()
})