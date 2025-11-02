

// /* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */

// import React, { useState, useEffect } from "react";
// import {
//   Menu,
//   X,
//   Home,
//   Package,
//   ShoppingCart,
//   Users,
//   BarChart3,
//   Settings,
//   Bell,
//   Search,
//   ChevronDown,
//   Plus,
//   Download,
//   AlertTriangle,
//   TrendingUp,
//   TrendingDown,
//   DollarSign,
//   Package2,
//   Tag,
// } from "lucide-react";

// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useNotification } from "../../utils/NotificationSystem";
// import Loading from "../../utils/Loading";
// import Error from "../../utils/ErrorProps";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   ScatterChart,
//   Scatter,
//   ZAxis,
// } from "recharts";
// import { mockStats, mockSalesData, mockCategoryData, mockInventoryData } from "../../types/data";
// import Products from "./Products";
// import Category from "./Categories"
// import User from "./users";
// import AddProductCategory from "./AddProductCategory";
// import ProductsList from "./ProductsList";
// import ProductCategories from "./ProductCategories";
// import BrandsList from "./Store";
// import WarehousesList from "./WareHouses";
// import AvailableProducts from "./AvailableProducts";
// import WearHouseTransfer from "./WearHouseTransfer"
// import TagsList from "./TagList";
// const Dashboard = () => <div className="p-6">Hello Dashboard</div>;
// const Product = () => <div className="p-6"><Products /></div>
// const ProductAvailable = () => <div className="p-6"><AvailableProducts /></div>
// const Categories = () => <div className="p-6"><ProductCategories /></div>
// const ListUsers = () => <div className="p-6"><User/></div>
// const AddProduct = () => <div className="p-6"><AddProductCategory/></div>
// const ProductList = () => <div className="p-6"> <ProductsList /></div>
// const Stores = () => <div className="p-6"> <BrandsList/></div>
// const WareHouse = () => <div className="p-6"><WarehousesList /></div>
// const Inventory = () => <div className="p-6"><WearHouseTransfer/></div>;
// const Orders = () => <div className="p-6"><TagsList/></div>;
// const Customers = () => <div className="p-6">Hi Customers</div>;
// const Analytics = () => <div className="p-6">Hi Analytics</div>;
// const Setting = () => <div className="p-6">Settings Page</div>;

// const AdminDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { addNotification } = useNotification();
//   const [currentTime, setCurrentTime] = useState(new Date());

//   // New states for real data
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [totalWarehouses, setTotalWarehouses] = useState(0);
//   const [totalCategories, setTotalCategories] = useState(0);
//   const [totalBrands, setTotalBrands] = useState(0); // Assuming "total store" means brands
//   const [totalValue, setTotalValue] = useState(0);
//   const [lowStockCount, setLowStockCount] = useState(0);
//   const [outOfStockCount, setOutOfStockCount] = useState(0);
//   const [totalTags, setTotalTags] = useState(0);
//   const [categoryChartData, setCategoryChartData] = useState([]);
//   const [brandChartData, setBrandChartData] = useState([]);
//   const [tagChartData, setTagChartData] = useState([]);
//   const [stateChartData, setStateChartData] = useState([]);
//   const [topCategories, setTopCategories] = useState([]);
//   const [topBrands, setTopBrands] = useState([]);
//   const [topStates, setTopStates] = useState([]);

//   const baseUrl = "https://api-ojaflow.taskflow.com.ng/api"; // Hardcoded base

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     const loadData = async () => {
//       try {
//         setIsLoading(true);

//         // Fetch products
//         const productsRes = await fetch(`${baseUrl}/salable/products`);
//         let prods = [];
//         if (productsRes.ok) {
//           const productsData = await productsRes.json();
//           prods = productsData.data || [];
//           setTotalProducts(prods.length);
//           const valueSum = prods.reduce((sum, p) => sum + parseFloat(p.selling_price || 0) * (p.stock || 0), 0);
//           setTotalValue(valueSum);
//           const low = prods.filter(p => p.is_low_stock).length;
//           setLowStockCount(low);
//           const out = prods.filter(p => (p.stock || 0) === 0).length;
//           setOutOfStockCount(out);

//           // Group for charts
//           const catCount = prods.reduce((acc, p) => {
//             const cat = p.category?.name || 'Unknown';
//             acc[cat] = (acc[cat] || 0) + 1;
//             return acc;
//           }, {});
//           setCategoryChartData(Object.entries(catCount).map(([name, value]) => ({ name, value })));

//           const brandCount = prods.reduce((acc, p) => {
//             const brand = p.brand?.name || 'Unknown';
//             acc[brand] = (acc[brand] || 0) + 1;
//             return acc;
//           }, {});
//           setBrandChartData(Object.entries(brandCount).map(([name, value]) => ({ name, value })));

//           const stateCount = prods.reduce((acc, p) => {
//             const state = p.state || 'Unknown';
//             acc[state] = (acc[state] || 0) + 1;
//             return acc;
//           }, {});
//           setStateChartData(Object.entries(stateCount).map(([name, value]) => ({ name, value })));

//           // Top ones for additional pies if needed
//           setTopCategories(Object.entries(catCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value })));
//           setTopBrands(Object.entries(brandCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value })));
//           setTopStates(Object.entries(stateCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value })));

//           const tagCount = prods.reduce((acc, p) => {
//             (p.tags || []).forEach(t => {
//               const tagName = typeof t === 'object' ? t.name : t;
//               acc[tagName] = (acc[tagName] || 0) + 1;
//             });
//             return acc;
//           }, {});
//           setTagChartData(Object.entries(tagCount).map(([name, value]) => ({ name, value })));
//         }

//         // Fetch warehouses
//         const warehousesRes = await fetch(`${baseUrl}/warehouses/list`);
//         if (warehousesRes.ok) {
//           const warehousesData = await warehousesRes.json();
//           setTotalWarehouses((warehousesData.data || []).length);
//         }

//         // Fetch categories (assuming an endpoint like /product-categories)
//         const categoriesRes = await fetch(`${baseUrl}/product-categories`); // Adjust if needed
//         if (categoriesRes.ok) {
//           const categoriesData = await categoriesRes.json();
//           setTotalCategories((categoriesData.data || []).length);
//         }

//         // Fetch brands
//         const brandsRes = await fetch(`${baseUrl}/brands`);
//         if (brandsRes.ok) {
//           const brandsData = await brandsRes.json();
//           setTotalBrands((brandsData.data || []).length);
//         }

//         // Fetch tags
//         const tagsRes = await fetch(`${baseUrl}/tags`);
//         if (tagsRes.ok) {
//           const tagsData = await tagsRes.json();
//           setTotalTags((tagsData.data || []).length);
//         }

//         await new Promise((resolve) => setTimeout(resolve, 1000));
//       } catch (err) {
//         setError("Failed to load dashboard data. Please try again.");
//         addNotification("Dashboard load failed", "error");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadData();
//     return () => clearInterval(timer);
//   }, []);

//   const sidebarItems = [
//     { id: "dashboard", label: "Dashboard", icon: Home, href: "/admin" },
//     { id: "Product", label: "Product", icon: Home, href: "/admin" },
//     { id: "ProductsAvailable", label: "Add Products", icon: Home, href: "/admin" },
//     { id: "Categories", label: "Categories", icon: Home, href: "/admin" },
//     { id: "ListUsers", label: "Users", icon: Home, href: "/admin" },
//     { id: "AddProduct", label: "Add Product category", icon: Home, href: "/admin" },
//     // { id: "ProductList", label: "ProductList", icon: Home, href: "/admin" },
//     { id: "Store", label: "BrandsList", icon: Home, href: "/admin" },
//     { id: "WareHouse", label: "WareHouses", icon: Home, href: "/admin" },
  
//     { id: "inventory", label: "Inventory", icon: Package, href: "/admin/inventory" },
//     { id: "orders", label: "Tags", icon: ShoppingCart, href: "/admin/orders" },
//     { id: "customers", label: "Customers", icon: Users, href: "/admin/customers" },
//     { id: "analytics", label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
//     { id: "setting", label: "Settings", icon: Settings, href: "/admin/settings" },
//   ];

//   const stats = [
//     {
//       title: "Total Products",
//       value: totalProducts.toLocaleString(),
//       trend: "+12% from last month",
//       icon: <Package className="w-5 h-5 md:w-6 md:h-6 text-white" />,
//       color: "bg-primary-500",
//     },
//     {
//       title: "Total Warehouses",
//       value: totalWarehouses.toLocaleString(),
//       trend: "+5% from last month",
//       icon: <Package2 className="w-5 h-5 md:w-6 md:h-6 text-white" />,
//       color: "bg-secondary-500",
//     },
//     {
//       title: "Total Categories",
//       value: totalCategories?.toLocaleString(),
//       trend: "+8% from last month",
//       icon: <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />,
//       color: "bg-info-500",
//     },
//     {
//       title: "Total Brands/Stores",
//       value: totalBrands.toLocaleString(),
//       trend: "+10% from last month",
//       icon: <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-white" />,
//       color: "bg-success-500",
//     },
//     {
//       title: "Total Value",
//       value: `$${totalValue.toLocaleString()}`,
//       trend: "+8% from last month",
//       icon: <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-white" />,
//       color: "bg-success-500",
//     },
//     {
//       title: "Low Stock Items",
//       value: lowStockCount.toString(),
//       icon: <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-white" />,
//       color: "bg-warning-500",
//     },
//     {
//       title: "Out of Stock",
//       value: outOfStockCount.toString(),
//       icon: <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-white" />,
//       color: "bg-error-500",
//     },
//     {
//       title: "Total Tags",
//       value: totalTags.toString(),
//       icon: <Tag className="w-5 h-5 md:w-6 md:h-6 text-white" />,
//       color: "bg-purple-500",
//     },
//   ];

//   const recentOrders = [
//     { id: "#ORD-001", customer: "John Doe", total: "$124.99", status: "active", date: "2h ago" },
//     { id: "#ORD-002", customer: "Jane Smith", total: "$89.50", status: "pending", date: "4h ago" },
//     { id: "#ORD-003", customer: "Mike Johnson", total: "$256.00", status: "active", date: "6h ago" },
//     { id: "#ORD-004", customer: "Sarah Wilson", total: "$45.75", status: "inactive", date: "8h ago" },
//   ];

//   const lowStockItems = [
//     { name: "iPhone 15 Pro", stock: 5, threshold: 20, category: "Electronics" },
//     { name: "MacBook Air M2", stock: 8, threshold: 15, category: "Computers" },
//     { name: "AirPods Pro", stock: 12, threshold: 25, category: "Audio" },
//     { name: "iPad Air", stock: 3, threshold: 10, category: "Tablets" },
//   ];

//   // Chart Data - Updated to real
//   const demandSupplyData = [
//     { month: "Jan", demand: 250, supply: 0 },
//     { month: "Feb", demand: 200, supply: 50 },
//     { month: "Mar", demand: 150, supply: 100 },
//     { month: "Apr", demand: 100, supply: 150 },
//     { month: "May", demand: 50, supply: 200 },
//     { month: "Jun", demand: 0, supply: 250 },
//   ];

//   const diminishingReturnsData = [
//     { input: 0, output: 0 },
//     { input: 1, output: 80 },
//     { input: 2, output: 150 },
//     { input: 3, output: 200 },
//     { input: 4, output: 230 },
//     { input: 5, output: 250 },
//     { input: 6, output: 260 },
//   ];

//   // Real pie colors (rainbow-ish)
//   const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#9333EA', '#6B46C1', '#EC4899', '#14B8A6'];

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   const getComponent = () => {
//     switch (activeTab) {
//       case "dashboard": return <Dashboard />;
//       case "Product": return <Product />;
//       case "ProductsAvailable": return <AvailableProducts/>
//       case "Categories": return <Categories />
//       case "inventory": return <Inventory />;
//       case "ListUsers" : return <ListUsers />
//       case "AddProduct" : return <AddProductCategory />
//       case "ProductList" : return <ProductsList />
//       case "Store" : return <BrandsList />
//       case "WareHouse" : return <WarehousesList />
//       case "orders": return <Orders />;
//       case "customers": return <Customers />;
//       case "analytics": return <Analytics />;
//       case "setting": return <Setting />;
//       default:
//         return (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">🚧</div>
//             <h3 className="text-lg font-semibold text-foreground dark:text-foreground-dark mb-2">
//               {sidebarItems.find((item) => item.id === activeTab)?.label} Page
//             </h3>
//             <p className="text-foreground-secondary dark:text-foreground-secondary-dark">
//               This section is under development.
//             </p>
//           </div>
//         );
//     }
//   };

//   if (isLoading) return <Loading />;
//   if (error) return <Error message={error} onRetry={() => { setError(null); setIsLoading(true); }} />;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-info-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-background-dark text-foreground dark:text-foreground-dark">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-r border-border/50 dark:border-border-dark/50 transform transition-all duration-500 ease-in-out ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 lg:shadow-glow-lg`}
//       >
//         <div className="flex items-center justify-between h-20 px-6 border-b border-border/50 dark:border-border-dark/50 bg-gradient-to-r from-primary-500 to-secondary-500">
//           <h1 className="text-2xl font-display font-bold text-white drop-shadow-md">
//             Ojaflow 
//           </h1>
//           <button
//             onClick={toggleSidebar}
//             className="lg:hidden p-2 rounded-full hover:bg-white/20 transition-all duration-300"
//           >
//             <X size={24} className="text-white" />
//           </button>
//         </div>

//         <nav className="mt-6 px-3 space-y-1">
//           {sidebarItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = activeTab === item.id;
//             return (
//               <a
//                 key={item.id}
//                 href={item.href}
//                 onClick={(e) => { e.preventDefault(); setActiveTab(item.id); }}
//                 className={`w-full flex items-center px-4 py-3 mb-1 text-sm font-medium rounded-xl transition-all duration-300 ${
//                   isActive
//                     ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg scale-105"
//                     : "text-foreground-secondary dark:text-foreground-secondary-dark hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:shadow-md"
//                 }`}
//               >
//                 <Icon size={20} className="mr-4" />
//                 {item.label}
//               </a>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Mobile sidebar overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/60 lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Main content */}
//       <div className="lg:ml-64">
//         {/* Top navigation */}
//         <header className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-border/50 dark:border-border-dark/50 shadow-md">
//           <div className="flex items-center justify-between h-20 px-6">
//             <div className="flex items-center">
//               <button
//                 onClick={toggleSidebar}
//                 className="lg:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-300"
//               >
//                 <Menu size={24} />
//               </button>

//               <div className="relative ml-4 hidden sm:block">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Search className="h-5 w-5 text-neutral-400" />
//                 </div>
//                 <input
//                   type="text"
//                   className="inventory-input pl-12 pr-4 py-2 w-80 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all duration-300"
//                   placeholder="Search products, orders..."
//                 />
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-300">
//                 <Bell size={24} className="text-foreground dark:text-foreground-dark" />
//                 <span className="absolute -top-1 -right-1 h-5 w-5 bg-error-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
//                   3
//                 </span>
//               </button>

//               <div className="flex items-center space-x-3 group">
//                 <img
//                   className="h-10 w-10 rounded-full ring-2 ring-primary-500 transition-all duration-300 group-hover:ring-4"
//                   src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                   alt="Admin avatar"
//                 />
//                 <div className="hidden sm:block">
//                   <div className="text-sm font-medium text-foreground dark:text-foreground-dark transition-all duration-300 group-hover:text-primary-500">
//                     User
//                   </div>
//                   <div className="text-xs text-foreground-secondary dark:text-foreground-secondary-dark">
//                   ojaflow.com
//                   </div>
//                 </div>
//                 <ChevronDown size={18} className="text-neutral-400 transition-all duration-300 group-hover:text-primary-500" />
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="p-6 sm:p-8">
//           {activeTab === "dashboard" && (
//             <div className="space-y-8">
//               {/* Hero Header */}
//               <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6 rounded-xl shadow-lg animate-fade-in">
//                 <h2 className="text-3xl font-display font-bold mb-2 drop-shadow-md">
//                   Welcome to Ojaflow Dashboard
//                 </h2>
//                 <p className="text-lg text-white/80">
//                   Manage your inventory with ease. Today is{" "}
//                   {currentTime.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}{" "}
//                   at {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
//                 </p>
//               </div>

//               {/* Stats Grid */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {stats.map((stat, index) => (
//                   <div key={index} className="inventory-card p-6 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-xl shadow-2xl hover:shadow-glow-lg transform hover:scale-105 transition-all duration-300">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="text-sm font-medium text-foreground-secondary dark:text-foreground-secondary-dark">
//                           {stat.title}
//                         </p>
//                         <p className="text-3xl font-bold text-foreground dark:text-foreground-dark mt-2">
//                           {stat.value}
//                         </p>
//                       </div>
//                       <div className={`${stat.color} p-3 rounded-full`}>
//                         {stat.icon}
//                       </div>
//                     </div>
//                     {stat.trend && (
//                       <div className="mt-4 flex items-center">
//                         <TrendingUp size={18} className="mr-2 text-success-500 animate-pulse" />
//                         <span className="text-sm font-medium text-success-500">{stat.trend}</span>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Charts Section */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Sales & Inventory Trend */}
//                 <div className="inventory-card bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-xl shadow-2xl p-6 h-96">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark">
//                       Sales & Inventory Trend
//                     </h3>
//                     <button className="text-sm text-primary-500 hover:text-primary-600">View Details</button>
//                   </div>
//                   <div className="h-72">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart data={mockSalesData}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                         <XAxis dataKey="month" stroke="#4B5563" />
//                         <YAxis stroke="#4B5563" />
//                         <Tooltip contentStyle={{ backgroundColor: "#1F2937", color: "#FFFFFF" }} />
//                         <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
//                         <Line type="monotone" dataKey="inventory" stroke="#10B981" strokeWidth={2} />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 {/* Demand and Supply Flow */}
//                 <div className="inventory-card bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-xl shadow-2xl p-6 h-96">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark">
//                       Demand & Supply Flow
//                     </h3>
//                     <button className="text-sm text-primary-500 hover:text-primary-600">View Details</button>
//                   </div>
//                   <div className="h-72">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart data={demandSupplyData}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                         <XAxis dataKey="month" stroke="#4B5563" />
//                         <YAxis stroke="#4B5563" />
//                         <Tooltip contentStyle={{ backgroundColor: "#1F2937", color: "#FFFFFF" }} />
//                         <Line type="monotone" dataKey="demand" stroke="#10B981" strokeWidth={2} />
//                         <Line type="monotone" dataKey="supply" stroke="#EF4444" strokeWidth={2} />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 {/* Category Distribution (Rainbow Pie) */}
//                 <div className="inventory-card bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-xl shadow-2xl p-6 h-96">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark">
//                       Category Distribution
//                     </h3>
//                   </div>
//                   <div className="h-72 flex items-center justify-center">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={categoryChartData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={40}
//                           outerRadius={80}
//                           paddingAngle={5}
//                           dataKey="value"
//                         >
//                           {categoryChartData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip contentStyle={{ backgroundColor: "#1F2937", color: "#FFFFFF" }} />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="mt-4 space-y-2">
//                     {categoryChartData.map((item, index) => (
//                       <div key={item.name} className="flex items-center justify-between text-sm">
//                         <div className="flex items-center">
//                           <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
//                           <span className="text-foreground-secondary dark:text-foreground-secondary-dark">{item.name}</span>
//                         </div>
//                         <span className="font-medium text-foreground dark:text-foreground-dark">{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Additional Real Charts: Brands, Tags, States */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Brands Distribution */}
//                 <div className="inventory-card bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-xl shadow-2xl p-6 h-96">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark">
//                       Brands with Most Products
//                     </h3>
//                   </div>
//                   <div className="h-72 flex items-center justify-center">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={brandChartData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={40}
//                           outerRadius={80}
//                           paddingAngle={5}
//                           dataKey="value"
//                         >
//                           {brandChartData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip contentStyle={{ backgroundColor: "#1F2937", color: "#FFFFFF" }} />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="mt-4 space-y-2">
//                     {brandChartData.map((item, index) => (
//                       <div key={item.name} className="flex items-center justify-between text-sm">
//                         <div className="flex items-center">
//                           <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
//                           <span className="text-foreground-secondary dark:text-foreground-secondary-dark">{item.name}</span>
//                         </div>
//                         <span className="font-medium text-foreground dark:text-foreground-dark">{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Tags Distribution */}
//                 <div className="inventory-card bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-xl shadow-2xl p-6 h-96">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark">
//                       Tags Distribution
//                     </h3>
//                   </div>
//                   <div className="h-72 flex items-center justify-center">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={tagChartData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={40}
//                           outerRadius={80}
//                           paddingAngle={5}
//                           dataKey="value"
//                         >
//                           {tagChartData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip contentStyle={{ backgroundColor: "#1F2937", color: "#FFFFFF" }} />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="mt-4 space-y-2">
//                     {tagChartData.map((item, index) => (
//                       <div key={item.name} className="flex items-center justify-between text-sm">
//                         <div className="flex items-center">
//                           <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
//                           <span className="text-foreground-secondary dark:text-foreground-secondary-dark">{item.name}</span>
//                         </div>
//                         <span className="font-medium text-foreground dark:text-foreground-dark">{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* States Distribution */}
//                 <div className="inventory-card bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-xl shadow-2xl p-6 h-96">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark">
//                       Products by State
//                     </h3>
//                   </div>
//                   <div className="h-72 flex items-center justify-center">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={stateChartData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={40}
//                           outerRadius={80}
//                           paddingAngle={5}
//                           dataKey="value"
//                         >
//                           {stateChartData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip contentStyle={{ backgroundColor: "#1F2937", color: "#FFFFFF" }} />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                   <div className="mt-4 space-y-2">
//                     {stateChartData.map((item, index) => (
//                       <div key={item.name} className="flex items-center justify-between text-sm">
//                         <div className="flex items-center">
//                           <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
//                           <span className="text-foreground-secondary dark:text-foreground-secondary-dark">{item.name}</span>
//                         </div>
//                         <span className="font-medium text-foreground dark:text-foreground-dark">{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Diminishing Returns and Recent Activity */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Diminishing Returns */}
//                 <div className="inventory-card bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-xl shadow-2xl p-6 h-96">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark">
//                       Diminishing Returns
//                     </h3>
//                     <button className="text-sm text-primary-500 hover:text-primary-600">View Details</button>
//                   </div>
//                   <div className="h-72">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <ScatterChart>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                         <XAxis dataKey="input" name="Input" unit="" stroke="#4B5563" />
//                         <YAxis dataKey="output" name="Output" unit="" stroke="#4B5563" />
//                         <ZAxis range={[64]} />
//                         <Tooltip contentStyle={{ backgroundColor: "#1F2937", color: "#FFFFFF" }} />
//                         <Scatter data={diminishingReturnsData} fill="#6B46C1" />
//                       </ScatterChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 {/* Recent Activity */}
//                 <div className="inventory-card bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-xl shadow-2xl p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-xl font-semibold text-foreground dark:text-foreground-dark">
//                       Recent Activity
//                     </h3>
//                     <button className="text-sm text-primary-500 hover:text-primary-600 hidden sm:inline">View All</button>
//                   </div>
//                   <div className="space-y-4">
//                     {mockInventoryData.slice(0, 5).map((item) => (
//                       <div
//                         key={item.id}
//                         className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-all duration-300"
//                       >
//                         <div className="flex items-center space-x-3">
//                           <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <Package className="w-5 h-5 text-primary-600 dark:text-primary-300" />
//                           </div>
//                           <div className="min-w-0 flex-1">
//                             <p className="font-medium text-foreground dark:text-foreground-dark truncate">{item.name}</p>
//                             <p className="text-sm text-foreground-secondary dark:text-foreground-secondary-dark">SKU: {item.sku}</p>
//                           </div>
//                         </div>
//                         <div className="text-right flex-shrink-0">
//                           <p className="font-medium text-foreground dark:text-foreground-dark">{item.quantity} units</p>
//                           <p className="text-sm text-foreground-secondary dark:text-foreground-secondary-dark hidden sm:block">{item.lastUpdated}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab !== "dashboard" && getComponent()}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Plus,
  Download,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package2,
  Tag,
  Eye,
  XCircle,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useNotification } from "../../utils/NotificationSystem";
import Loading from "../../utils/Loading";
import Error from "../../utils/ErrorProps";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { mockStats, mockSalesData, mockCategoryData, mockInventoryData } from "../../types/data";
import Products from "./Products";
import Category from "./Categories"
import User from "./users";
import AddProductCategory from "./AddProductCategory";
import ProductsList from "./ProductsList";
import ProductCategories from "./ProductCategories";
import BrandsList from "./Store";
import WareHousesList from "./WareHouses";
import AvailableProducts from "./AvailableProducts";
import WearHouseTransfer from "./WearHouseTransfer"
import TagsList from "./TagList";

const demandSupplyData = [
  { month: "Jan", demand: 250, supply: 0 },
  { month: "Feb", demand: 200, supply: 50 },
  { month: "Mar", demand: 150, supply: 100 },
  { month: "Apr", demand: 100, supply: 150 },
  { month: "May", demand: 50,  supply: 200 },
  { month: "Jun", demand: 0,   supply: 250 },
];

const diminishingReturnsData = [
  { input: 0, output: 0 },
  { input: 1, output: 80 },
  { input: 2, output: 150 },
  { input: 3, output: 200 },
  { input: 4, output: 230 },
  { input: 5, output: 250 },
  { input: 6, output: 260 },
];

const Dashboard = () => <div className="p-6">Hello Dashboard</div>;
const Product = () => <div className="p-6"><Products /></div>
const ProductAvailable = () => <div className="p-6"><AvailableProducts /></div>
const Categories = () => <div className="p-6"><ProductCategories /></div>
const ListUsers = () => <div className="p-6"><User/></div>
const AddProduct = () => <div className="p-6"><AddProductCategory/></div>
const ProductList = () => <div className="p-6"> <ProductsList /></div>
const Stores = () => <div className="p-6"> <BrandsList/></div>
const WareHouse = () => <div className="p-6"><WarehousesList /></div>
const Inventory = () => <div className="p-6"><WearHouseTransfer/></div>;
const Orders = () => <div className="p-6"><TagsList/></div>;
const Customers = () => <div className="p-6">Hi Customers</div>;
const Analytics = () => <div className="p-6">Hi Analytics</div>;
const Setting = () => <div className="p-6">Settings Page</div>;

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [currentTime, setCurrentTime] = useState(new Date());

  // REAL DATA STATES
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalWarehouses, setTotalWarehouses] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalBrands, setTotalBrands] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  const [totalTags, setTotalTags] = useState(0);
  const [categoryChartData, setCategoryChartData] = useState([]);
  const [brandChartData, setBrandChartData] = useState([]);
  const [tagChartData, setTagChartData] = useState([]);
  const [stateChartData, setStateChartData] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [topBrands, setTopBrands] = useState([]);
  const [topStates, setTopStates] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // NEW
  const [showAllProducts, setShowAllProducts] = useState(false); // MODAL

  const baseUrl = "https://api-ojaflow.taskflow.com.ng/api";

  // PERSIST TAB ON RELOAD
  useEffect(() => {
    const saved = localStorage.getItem("activeTab");
    if (saved && saved !== "dashboard") {
      setActiveTab(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const loadData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // Fetch products
        const productsRes = await fetch(`${baseUrl}/salable/products`, { headers });
        let prods = [];
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          prods = productsData.data || [];
          setAllProducts(prods);
          setTotalProducts(prods.length);
          const valueSum = prods.reduce((sum, p) => sum + parseFloat(p.selling_price || 0) * (p.stock || 0), 0);
          setTotalValue(valueSum);
          const low = prods.filter(p => p.is_low_stock).length;
          setLowStockCount(low);
          const out = prods.filter(p => (p.stock || 0) === 0).length;
          setOutOfStockCount(out);

          // Charts
          const catCount = prods.reduce((acc, p) => {
            const cat = p.category?.name || 'Unknown';
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
          }, {});
          setCategoryChartData(Object.entries(catCount).map(([name, value]) => ({ name, value })));

          const brandCount = prods.reduce((acc, p) => {
            const brand = p.brand?.name || 'Unknown';
            acc[brand] = (acc[brand] || 0) + 1;
            return acc;
          }, {});
          setBrandChartData(Object.entries(brandCount).map(([name, value]) => ({ name, value })));

          const stateCount = prods.reduce((acc, p) => {
            const state = p.state || 'Unknown';
            acc[state] = (acc[state] || 0) + 1;
            return acc;
          }, {});
          setStateChartData(Object.entries(stateCount).map(([name, value]) => ({ name, value })));

          const tagCount = prods.reduce((acc, p) => {
            (p.tags || []).forEach(t => {
              const tagName = typeof t === 'object' ? t.name : t;
              acc[tagName] = (acc[tagName] || 0) + 1;
            });
            return acc;
          }, {});
          setTagChartData(Object.entries(tagCount).map(([name, value]) => ({ name, value })));

          setTopCategories(Object.entries(catCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value })));
          setTopBrands(Object.entries(brandCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value })));
          setTopStates(Object.entries(stateCount).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value })));
        }

        // Other fetches
        const [warehousesRes, categoriesRes, brandsRes, tagsRes] = await Promise.all([
          fetch(`${baseUrl}/warehouses/list`, { headers }),
          fetch(`${baseUrl}/product-categories`, { headers }),
          fetch(`${baseUrl}/brands`, { headers }),
          fetch(`${baseUrl}/tags`, { headers }),
        ]);

        if (warehousesRes.ok) {
          const d = await warehousesRes.json();
          setTotalWarehouses((d.data || []).length);
        }
        if (categoriesRes.ok) {
          const d = await categoriesRes.json();
          setTotalCategories((d.data || []).length);
        }
        if (brandsRes.ok) {
          const d = await brandsRes.json();
          setTotalBrands((d.data || []).length);
        }
        if (tagsRes.ok) {
          const d = await tagsRes.json();
          setTotalTags((d.data || []).length);
        }
      } catch (err) {
        setError("Failed to load data.");
        addNotification("Load failed", "error");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
    return () => clearInterval(timer);
  }, []);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/admin" },
    { id: "Product", label: "Product", icon: Home, href: "/admin" },
    { id: "ProductsAvailable", label: "Add Products", icon: Home, href: "/admin" },
    { id: "Categories", label: "Categories", icon: Home, href: "/admin" },
    { id: "ListUsers", label: "Users", icon: Home, href: "/admin" },
    { id: "AddProduct", label: "Add Product category", icon: Home, href: "/admin" },
    { id: "Store", label: "BrandsList", icon: Home, href: "/admin" },
    { id: "WareHouse", label: "WareHouses", icon: Home, href: "/admin" },
    { id: "inventory", label: "Inventory", icon: Package, href: "/admin/inventory" },
    { id: "orders", label: "Tags", icon: ShoppingCart, href: "/admin/orders" },
    { id: "customers", label: "Customers", icon: Users, href: "/admin/customers" },
    { id: "analytics", label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    { id: "setting", label: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const stats = [
    { title: "Total Products", value: totalProducts.toLocaleString(), trend: "+12% from last month", icon: <Package className="w-5 h-5 md:w-6 md:h-6 text-white" />, color: "bg-primary-500" },
    { title: "Total Warehouses", value: totalWarehouses.toLocaleString(), trend: "+5% from last month", icon: <Package2 className="w-5 h-5 md:w-6 md:h-6 text-white" />, color: "bg-secondary-500" },
    { title: "Total Categories", value: totalCategories?.toLocaleString(), trend: "+8% from last month", icon: <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white" />, color: "bg-info-500" },
    { title: "Total Brands/Stores", value: totalBrands.toLocaleString(), trend: "+10% from last month", icon: <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-white" />, color: "bg-success-500" },
    { title: "Total Value", value: `$${totalValue.toLocaleString()}`, trend: "+8% from last month", icon: <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-white" />, color: "bg-success-500" },
    { title: "Low Stock Items", value: lowStockCount.toString(), icon: <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-white" />, color: "bg-warning-500" },
    { title: "Out of Stock", value: outOfStockCount.toString(), icon: <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-white" />, color: "bg-error-500" },
    { title: "Total Tags", value: totalTags.toString(), icon: <Tag className="w-5 h-5 md:w-6 md:h-6 text-white" />, color: "bg-purple-500" },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#9333EA', '#6B46C1', '#EC4899', '#14B8A6'];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const getComponent = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard />;
      case "Product": return <Product />;
      case "ProductsAvailable": return <AvailableProducts/>
      case "Categories": return <Categories />
      case "inventory": return <Inventory />;
      case "ListUsers" : return <ListUsers />
      case "AddProduct" : return <AddProductCategory />
      case "ProductList" : return <ProductsList />
      case "Store" : return <BrandsList />
      case "WareHouse" : return <WarehousesList />
      case "orders": return <Orders />;
      case "customers": return <Customers />;
      case "analytics": return <Analytics />;
      case "setting": return <Setting />;
      default: return <div className="text-center py-12"><h3>Under Development</h3></div>;
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} onRetry={() => { setError(null); setIsLoading(true); }} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-info-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-background-dark text-foreground dark:text-foreground-dark">
      {/* Sidebar & Header unchanged */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-r border-border/50 dark:border-border-dark/50 transform transition-all duration-500 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:shadow-glow-lg`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-border/50 dark:border-border-dark/50 bg-gradient-to-r from-primary-500 to-secondary-500">
          <h1 className="text-2xl font-display font-bold text-white drop-shadow-md">Ojaflow</h1>
          <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-full hover:bg-white/20"><X size={24} className="text-white" /></button>
        </div>
        <nav className="mt-6 px-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <a key={item.id} href={item.href} onClick={(e) => { e.preventDefault(); setActiveTab(item.id); }}
                className={`w-full flex items-center px-4 py-3 mb-1 text-sm font-medium rounded-xl transition-all duration-300 ${isActive ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg scale-105" : "text-foreground-secondary dark:text-foreground-secondary-dark hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:shadow-md"}`}>
                <Icon size={20} className="mr-4" />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      {isSidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={toggleSidebar} />}

      <div className="lg:ml-64">
        <header className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-border/50 dark:border-border-dark/50 shadow-md">
          <div className="flex items-center justify-between h-20 px-6">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/50"><Menu size={24} /></button>
              <div className="relative ml-4 hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-5 w-5 text-neutral-400" /></div>
                <input type="text" className="inventory-input pl-12 pr-4 py-2 w-80 rounded-xl focus:ring-2 focus:ring-primary-500" placeholder="Search products, orders..." />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800/50"><Bell size={24} className="text-foreground dark:text-foreground-dark" /><span className="absolute -top-1 -right-1 h-5 w-5 bg-error-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">3</span></button>
              <div className="flex items-center space-x-3 group">
                <img className="h-10 w-10 rounded-full ring-2 ring-primary-500 group-hover:ring-4" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=256&h=256&q=80" alt="Admin" />
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-foreground dark:text-foreground-dark group-hover:text-primary-500">User</div>
                  <div className="text-xs text-foreground-secondary dark:text-foreground-secondary-dark">ojaflow.com</div>
                </div>
                <ChevronDown size={18} className="text-neutral-400 group-hover:text-primary-500" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 sm:p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6 rounded-xl shadow-lg">
                <h2 className="text-3xl font-display font-bold mb-2 drop-shadow-md">Welcome to Ojaflow Dashboard</h2>
                <p className="text-lg text-white/80">
                  Today is {currentTime.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} at {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
                </p>
              </div>

              {/* STATS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="inventory-card p-6 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-medium text-foreground-secondary dark:text-foreground-secondary-dark">{stat.title}</p>
                        <p className="text-3xl font-bold text-foreground dark:text-foreground-dark mt-1">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-4 rounded-2xl shadow-glow`}>
                        {stat.icon}
                      </div>
                    </div>
                    {stat.trend && (
                      <div className="flex items-center mt-2">
                        <TrendingUp size={18} className="mr-2 text-success-500 animate-pulse" />
                        <span className="text-sm font-medium text-success-500">{stat.trend}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CHARTS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="inventory-card bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-500">
                  <h3 className="text-xl font-bold mb-4">Sales & Inventory</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={mockSalesData}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip contentStyle={{ background: "#1f2937", border: "none", borderRadius: "8px" }} />
                      <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} />
                      <Line type="monotone" dataKey="inventory" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="inventory-card bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-500">
                  <h3 className="text-xl font-bold mb-4">Demand & Supply</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={demandSupplyData}>
                      <CartesianGrid strokeDasharray="4 4" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip contentStyle={{ background: "#1f2937", borderRadius: "8px" }} />
                      <Line type="monotone" dataKey="demand" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="supply" stroke="#ef4444" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="inventory-card bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-500">
                  <h3 className="text-xl font-bold mb-4">Category Distribution</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={categoryChartData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={4} dataKey="value">
                        {categoryChartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-3 space-y-1">
                    {categoryChartData.slice(0, 4).map((c, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <div className="flex items-center"><div className="w-3 h-3 rounded-full mr-2" style={{ background: COLORS[i] }}></div><span>{c.name}</span></div>
                        <span className="font-bold">{c.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4 NEW CHARTS */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="inventory-card bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:shadow-3xl">
                  <h3 className="text-xl font-bold mb-4">Top Categories</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart><Pie data={topCategories} dataKey="value" outerRadius={70} innerRadius={30}>{topCategories.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie></PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="inventory-card bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:shadow-3xl">
                  <h3 className="text-xl font-bold mb-4">Top Brands</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart><Pie data={topBrands} dataKey="value" outerRadius={70} innerRadius={30}>{topBrands.map((_, i) => <Cell key={i} fill={COLORS[i + 2]} />)}</Pie></PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="inventory-card bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:shadow-3xl">
                  <h3 className="text-xl font-bold mb-4">Low Stock</h3>
                  <div className="text-5xl font-bold text-orange-500">{lowStockCount}</div>
                  <p className="text-sm mt-2 text-gray-600">Need restock</p>
                </div>
                <div className="inventory-card bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 hover:shadow-3xl">
                  <h3 className="text-xl font-bold mb-4">Out of Stock</h3>
                  <div className="text-5xl font-bold text-red-500">{outOfStockCount}</div>
                  <p className="text-sm mt-2 text-gray-600">Urgent</p>
                </div>
              </div>

              {/* RECENT ACTIVITY + SEE MORE */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="inventory-card bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Recent Products</h3>
                    {allProducts.length > 5 && (
                      <button onClick={() => setShowAllProducts(true)} className="text-primary-500 hover:text-primary-600 flex items-center gap-1 text-sm font-medium">
                        <Eye size={16} /> See All
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {allProducts.slice(0, 5).map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{p.name}</p>
                            <p className="text-xs text-gray-500">₦{p.selling_price} × {p.stock}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${p.stock > 10 ? 'bg-green-100 text-green-800' : p.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {p.stock} left
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diminishing Returns */}
                <div className="inventory-card bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Diminishing Returns</h3>
                  <ResponsiveContainer width="100%" height={280}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="input" />
                      <YAxis dataKey="output" />
                      <Tooltip />
                      <Scatter data={diminishingReturnsData} fill="#8b5cf6" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "dashboard" && getComponent()}
        </main>
      </div>

      {/* MODAL */}
      {showAllProducts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">All Products ({allProducts.length})</h2>
              <button onClick={() => setShowAllProducts(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <XCircle size={28} className="text-red-500" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProducts.map((p) => (
                <div key={p.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl hover:shadow-lg transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-lg">{p.name}</p>
                      <p className="text-xs text-gray-500">ID: {p.id}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><strong>Price:</strong> ₦{p.selling_price}</p>
                    <p><strong>Stock:</strong> {p.stock}</p>
                    <p><strong>Category:</strong> {p.category?.name || '—'}</p>
                    <p><strong>Brand:</strong> {p.brand?.name || '—'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;