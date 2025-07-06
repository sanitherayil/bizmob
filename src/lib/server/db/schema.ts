import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';


export const company = sqliteTable('company', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  token:text('tocken').notNull().unique(),
  mobile:text('mobile').notNull().unique(),
  email: text('email'),
  address:text('address'),
  condactPerson:text('condact_person'),
  cpMobile:text('cp_mobile'),
  gstNo:text('gst_No'),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP').notNull(),
});


export const login = sqliteTable('login',{
  id: integer('id').primaryKey({ autoIncrement: true }),
  companyId: integer('company_id').notNull().unique(),
  passcode:text('passcode').notNull(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP').notNull(),
})


