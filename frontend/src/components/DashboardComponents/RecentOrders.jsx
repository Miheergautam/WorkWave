const recentOrderData = [
	{
	  id: '1',
	  product_id: '4324',
	  customer_id: '23143',
	  customer_name: 'Shirley A. Lape',
	  order_date: '2022-05-17T03:24:00',
	  order_total: '$435.50',
	  current_order_status: 'PLACED',
	  shipment_address: 'Cottage Grove, OR 97424'
	},
	{
	  id: '7',
	  product_id: '7453',
	  customer_id: '96453',
	  customer_name: 'Ryan Carroll',
	  order_date: '2022-05-14T05:24:00',
	  order_total: '$96.35',
	  current_order_status: 'CONFIRMED',
	  shipment_address: 'Los Angeles, CA 90017'
	},
	{
	  id: '2',
	  product_id: '5434',
	  customer_id: '65345',
	  customer_name: 'Mason Nash',
	  order_date: '2022-05-17T07:14:00',
	  order_total: '$836.44',
	  current_order_status: 'SHIPPED',
	  shipment_address: 'Westminster, CA 92683'
	},
	{
	  id: '3',
	  product_id: '9854',
	  customer_id: '87832',
	  customer_name: 'Luke Parkin',
	  order_date: '2022-05-16T12:40:00',
	  order_total: '$334.50',
	  current_order_status: 'SHIPPED',
	  shipment_address: 'San Mateo, CA 94403'
	},
	{
	  id: '4',
	  product_id: '8763',
	  customer_id: '09832',
	  customer_name: 'Anthony Fry',
	  order_date: '2022-05-14T03:24:00',
	  order_total: '$876.00',
	  current_order_status: 'OUT_FOR_DELIVERY',
	  shipment_address: 'San Mateo, CA 94403'
	},
	{
	  id: '5',
	  product_id: '5627',
	  customer_id: '97632',
	  customer_name: 'Ryan Carroll',
	  order_date: '2022-05-14T05:24:00',
	  order_total: '$96.35',
	  current_order_status: 'DELIVERED',
	  shipment_address: 'Los Angeles, CA 90017'
	}
  ];
  
  import { Link } from "react-router-dom";
  import { getOrderStatus } from "../../lib/utils";
  
  export function RecentOrders() {
	return (
	  <div className="bg-neutral-900 px-4 py-3 rounded-sm flex-1 border border-neutral-700">
		<strong className="text-neutral-200 font-medium">Recent Orders</strong>
		<div className="mt-3">
		  <table className="w-full text-neutral-200 rounded-sm overflow-hidden border">
			<thead className="bg-neutral-700">
			  <tr>
				<td className="py-2 px-4 text-center">ID</td>
				<td className="py-2 px-4 text-center">Product ID</td>
				<td className="py-2 px-4 text-center">Customer ID</td>
				<td className="py-2 px-4 text-center">Order Date</td>
				<td className="py-2 px-4 text-center">Order Total</td>
				<td className="py-2 px-4 text-center">Shipping Address</td>
				<td className="py-2 px-4 text-center">Order Status</td>
			  </tr>
			</thead>
			<tbody>
			  {recentOrderData.map((order) => (
				<tr key={order.id} className="border-b border-neutral-800">
				  <td className="py-2 pl-2 text-center">
					<Link to={`/order/${order.id}`} className="text-indigo-400 hover:underline">
					  #{order.id}
					</Link>
				  </td>
				  <td className="py-2 pl-2 text-center">
					<Link
					  to={`/product/${order.product_id}`}
					  className="text-indigo-400 hover:underline"
					>
					  {order.product_id}
					</Link>
				  </td>
				  <td className="py-2 pl-2 text-center">
					<Link
					  to={`/customer/${order.customer_id}`}
					  className="text-indigo-400 hover:underline"
					>
					  {order.customer_id}
					</Link>
				  </td>
				  <td className="py-2 pl-2 text-center">
					{new Date(order.order_date).toLocaleDateString()}
				  </td>
				  <td className="py-2 pl-2 text-center">{order.order_total}</td>
				  <td className="py-2 pl-2 text-center">{order.shipment_address}</td>
				  <td className="py-2 pl-2 text-center">
					{getOrderStatus(order.current_order_status)}
				  </td>
				</tr>
			  ))}
			</tbody>
		  </table>
		</div>
	  </div>
	);
  }
  