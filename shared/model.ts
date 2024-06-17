import { Entity, Fields, Relations } from 'remult';

@Entity('Orders', {
  allowApiCrud: true,
})
export class Order {
  @Fields.autoIncrement()
  id = 0;
  @Fields.string()
  customer = '';
  @Relations.toMany(() => OrderDetails, 'orderId')
  details?: OrderDetails[];
}
@Entity('OrderDetails', {
  allowApiCrud: true,
})
export class OrderDetails {
  @Fields.autoIncrement()
  id = 0;
  @Fields.integer()
  orderId = 0;
  @Fields.string()
  product = '';
  @Fields.integer()
  quantity = 0;
}
