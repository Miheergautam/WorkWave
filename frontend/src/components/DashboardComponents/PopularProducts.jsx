import { Link } from "react-router-dom";

const popularProductsData = [
  {
    id: "3432",
    product_name: 'Macbook M1 Pro 14"',
    product_thumbnail: "https://source.unsplash.com/100x100?macbook",
    product_price: "$1499.00",
    product_stock: 341,
  },
  {
    id: "7633",
    product_name: "Samsung Galaxy Buds 2",
    product_thumbnail: "https://source.unsplash.com/100x100?earbuds",
    product_price: "$399.00",
    product_stock: 24,
  },
  {
    id: "6534",
    product_name: "Asus Zenbook Pro",
    product_thumbnail: "https://source.unsplash.com/100x100?laptop",
    product_price: "$899.00",
    product_stock: 56,
  },
  {
    id: "9234",
    product_name: "LG Flex Canvas",
    product_thumbnail: "https://source.unsplash.com/100x100?smartphone",
    product_price: "$499.00",
    product_stock: 98,
  },
  {
    id: "4314",
    product_name: "Apple Magic Touchpad",
    product_thumbnail: "https://source.unsplash.com/100x100?touchpad",
    product_price: "$699.00",
    product_stock: 0,
  },
  {
    id: "4342",
    product_name: "Nothing Earbuds One",
    product_thumbnail: "https://source.unsplash.com/100x100?earphone",
    product_price: "$399.00",
    product_stock: 453,
  },
];

export function PopularProducts() {
  return (
    <div className="w-[20rem] bg-neutral-900 p-4 rounded-sm border border-neutral-700">
      <strong className="text-neutral-200 font-medium">Popular Products</strong>
      <div className="mt-4 flex flex-col gap-3">
        {popularProductsData.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex items-start hover:no-underline"
          >
            <div className="w-10 h-10 min-w-[2.5rem] bg-neutral-600 rounded-sm">
              <img
                className="w-full h-full object-cover rounded-sm"
                src={product.product_thumbnail}
                alt={product.product_name}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-neutral-400">{product.product_name}</p>
              <span
                className={`'text-xs font-medium' ${
                  product.product_stock === 0
                    ? "text-red-400"
                    : product.product_stock > 50
                    ? "text-green-600"
                    : "text-orange-400"
                }`}
              >
                {product.product_stock === 0
                  ? "Out of Stock"
                  : product.product_stock + " in Stock"}
              </span>
            </div>
            <div className="text-xs text-neutral-200 pl-1.5">
              {product.product_price}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
