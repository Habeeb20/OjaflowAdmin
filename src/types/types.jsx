
export const RegisterFormData = {
  role: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  state: '',
  business_name: '',
  business_type: '',
  website: '',
  business_size: '',
  industry: '',
};

export const LoginFormData = {
  email: '',
  password: ''
};

export const businessSizes = [
  { value: '', label: 'Select business size' },
  { value: 'sole-proprietor', label: 'Sole Proprietor (1)' },
  { value: 'small', label: 'Small (2-10 employees)' },
  { value: 'medium', label: 'Medium (11-50 employees)' },
  { value: 'large', label: 'Large (51-200 employees)' },
  { value: 'enterprise', label: 'Enterprise (200+ employees)' },
];

export const industries = [
  { value: '', label: 'Select industry' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'aviation', label: 'Aviation & Aerospace' },
  { value: 'biotechnology', label: 'Biotechnology' },
  { value: 'construction', label: 'Construction' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'consumer_goods', label: 'Consumer Goods' },
  { value: 'defense', label: 'Defense & Military' },
  { value: 'education', label: 'Education' },
  { value: 'energy', label: 'Energy & Utilities' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'environmental', label: 'Environmental Services' },
  { value: 'fashion', label: 'Fashion & Apparel' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'food_beverage', label: 'Food & Beverage' },
  { value: 'government', label: 'Government' },
  { value: 'healthcare', label: 'Healthcare & Medical' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'human_resources', label: 'Human Resources' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'legal', label: 'Legal Services' },
  { value: 'logistics', label: 'Logistics & Supply Chain' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'marketing', label: 'Marketing & Advertising' },
  { value: 'media', label: 'Media & Publishing' },
  { value: 'mining', label: 'Mining & Metals' },
  { value: 'non_profit', label: 'Non-Profit / NGO' },
  { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'retail', label: 'Retail & Ecommerce' },
  { value: 'science_research', label: 'Science & Research' },
  { value: 'security', label: 'Security & Investigations' },
  { value: 'software', label: 'Software & IT Services' },
  { value: 'sports', label: 'Sports & Recreation' },
  { value: 'telecommunications', label: 'Telecommunications' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'waste_management', label: 'Waste Management' },
  { value: 'wholesale', label: 'Wholesale & Distribution' },
  { value: 'other', label: 'Other' },
];

export const planTypes = [
  { value: '', label: 'Select plan' },
  { value: 'starter', label: 'Starter - NGN 10000/month' },
  { value: 'professional', label: 'Professional - NGN 15000/month' },
  { value: 'enterprise', label: 'Enterprise - NGN 35000/month' },
];

export const states = [
  { value: '', label: 'Select state' },
  { value: 'abia', label: 'Abia' },
  { value: 'adamawa', label: 'Adamawa' },
  { value: 'akwa-ibom', label: 'Akwa Ibom' },
  { value: 'anambra', label: 'Anambra' },
  { value: 'bauchi', label: 'Bauchi' },
  { value: 'bayelsa', label: 'Bayelsa' },
  { value: 'benue', label: 'Benue' },
  { value: 'borno', label: 'Borno' },
  { value: 'cross-river', label: 'Cross River' },
  { value: 'delta', label: 'Delta' },
  { value: 'ebonyi', label: 'Ebonyi' },
  { value: 'edo', label: 'Edo' },
  { value: 'ekiti', label: 'Ekiti' },
  { value: 'enugu', label: 'Enugu' },
  { value: 'fct', label: 'Federal Capital Territory' },
  { value: 'gombe', label: 'Gombe' },
  { value: 'imo', label: 'Imo' },
  { value: 'jigawa', label: 'Jigawa' },
  { value: 'kaduna', label: 'Kaduna' },
  { value: 'kano', label: 'Kano' },
  { value: 'katsina', label: 'Katsina' },
  { value: 'kebbi', label: 'Kebbi' },
  { value: 'kogi', label: 'Kogi' },
  { value: 'kwara', label: 'Kwara' },
  { value: 'lagos', label: 'Lagos' },
  { value: 'nasarawa', label: 'Nasarawa' },
  { value: 'niger', label: 'Niger' },
  { value: 'ogun', label: 'Ogun' },
  { value: 'ondo', label: 'Ondo' },
  { value: 'osun', label: 'Osun' },
  { value: 'oyo', label: 'Oyo' },
  { value: 'plateau', label: 'Plateau' },
  { value: 'rivers', label: 'Rivers' },
  { value: 'sokoto', label: 'Sokoto' },
  { value: 'taraba', label: 'Taraba' },
  { value: 'yobe', label: 'Yobe' },
  { value: 'zamfara', label: 'Zamfara' },
];

export const businessTypes = [
  { value: "", label: "Select business type" },
  { value: "limited_liability", label: "Limited Liability Company (LLC)" },
  { value: "corporation", label: "Corporation" },
  { value: "partnership", label: "Partnership" },
  { value: "sole_proprietorship", label: "Sole Proprietorship" },
  { value: "non_profit", label: "Non-Profit Organization" },
  { value: "other", label: "Other" },
];

export const Option = {
  value: '',
  label: '',
};

export const InputFieldProps = {
  label: '',
  name: '',
  type: 'text',
  value: '',
  onChange: () => {},
  error: '',
  placeholder: '',
  showToggle: false,
  onToggle: () => {},
  options: [],
};

// business dashboard
export const InventoryItem = {
  id: '',
  name: '',
  sku: '',
  category: '',
  quantity: 0,
  price: 0,
  status: "In Stock",
  lastUpdated: '',
};

export const DashboardStats = {
  totalProducts: 0,
  totalValue: 0,
  lowStock: 0,
  outOfStock: 0,
};

export const NavItem = {
  id: '',
  name: '',
};