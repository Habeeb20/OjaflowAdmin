
export const mockStats= {
  totalProducts: 2847,
  totalValue: 485920,
  lowStock: 23,
  outOfStock: 8,
};

export const mockInventoryData = [
  {
    id: "1",
    name: 'MacBook Pro 16"',
    sku: "MBP-16-001",
    category: "Electronics",
    quantity: 15,
    price: 2499,
    status: "In Stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    sku: "IP-15P-001",
    category: "Electronics",
    quantity: 3,
    price: 999,
    status: "Low Stock",
    lastUpdated: "2024-01-14",
  },
  {
    id: "3",
    name: "Office Chair Ergonomic",
    sku: "OC-ERG-001",
    category: "Furniture",
    quantity: 0,
    price: 299,
    status: "Out of Stock",
    lastUpdated: "2024-01-13",
  },
  {
    id: "4",
    name: "Wireless Headphones",
    sku: "WH-BT-001",
    category: "Electronics",
    quantity: 45,
    price: 199,
    status: "In Stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: "5",
    name: "Standing Desk",
    sku: "SD-ADJ-001",
    category: "Furniture",
    quantity: 8,
    price: 599,
    status: "Low Stock",
    lastUpdated: "2024-01-12",
  },
];

export const mockSalesData = [
  { month: "Jan", sales: 4000, inventory: 2400 },
  { month: "Feb", sales: 3000, inventory: 1398 },
  { month: "Mar", sales: 2000, inventory: 9800 },
  { month: "Apr", sales: 2780, inventory: 3908 },
  { month: "May", sales: 1890, inventory: 4800 },
  { month: "Jun", sales: 2390, inventory: 3800 },
];

export const mockCategoryData = [
  { name: "Electronics", value: 45, color: "#0088FE" },
  { name: "Furniture", value: 25, color: "#00C49F" },
  { name: "Clothing", value: 20, color: "#FFBB28" },
  { name: "Books", value: 10, color: "#FF8042" },
];

export const getStatusColor = () => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800";
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800";
    case "Out of Stock":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
