import { remultExpress } from 'remult/remult-express';

import sqlite3 from 'sqlite3';
import { Sqlite3DataProvider } from 'remult/remult-sqlite3';
import { SqlDatabase, repo } from 'remult';
import { faker } from '@faker-js/faker';
import { Order, OrderDetails } from '../shared/model';

export const entities = [Order, OrderDetails];

export const api = remultExpress({
  entities,
  admin: true,

  // dataProvider: new SqlDatabase(
  //   // Note that on stackblitz, this database name is only saved per user on their own browser.
  //   // To store the database on stackblitz, change the name not to include a dot on the start.
  //   new Sqlite3DataProvider(new sqlite3.Database('.database.sqlite'))
  // ),

  initApi: async () => {
    if ((await repo(Order).count()) === 0) {
      for (let index = 0; index < 10; index++) {
        const order = await repo(Order).insert({
          customer: faker.company.name(),
        });

        await repo(Order)
          .relations(order)
          .details.insert(
            Array.from({ length: 5 }).map(() => ({
              orderId: order.id,
              product: faker.commerce.productName(),
              quantity: faker.number.int({ min: 1, max: 10 }),
            }))
          );
      }
    }
  },
});
