





// import React, { useState } from 'react';
// import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, UserPlus, Info, ArrowLeft, ArrowRight } from 'lucide-react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { useNotification } from '../../utils/NotificationSystem';
// import Loading from '../../utils/Loading';
// import Error from '../../utils/ErrorProps';
// import { setAuth } from '../../store/slices/authSlice';
// import { RegisterFormData, states, businessSizes, businessTypes, industries, planTypes, InputFieldProps } from '../../types/types.jsx';
// import Navbar from '../../components/Navbar.jsx';

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { addNotification } = useNotification();
//   const [formData, setFormData] = useState({
//     role: 'user',
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     state: '',
//     business_name: '',
//     business_type: '',
//     website: '',
//     business_size: '',
//     industry: '',
//     platform: 'web',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [generalError, setGeneralError] = useState(null);

//   const validateStep = (step) => {
//     const newErrors = {};

//     if (step === 1) {
//       if (!formData.name.trim()) newErrors.name = 'Name is required';
//       if (!formData.email.trim()) {
//         newErrors.email = 'Email is required';
//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//         newErrors.email = 'Please enter a valid email address';
//       }
//       if (!formData.password) {
//         newErrors.password = 'Password is required';
//       } else if (formData.password.length < 8) {
//         newErrors.password = 'Password must be at least 8 characters';
//       } else if (
//         !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
//           formData.password
//         )
//       ) {
//         newErrors.password =
//           'Password must include uppercase, lowercase, number, and special character';
//       }
//       if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = 'Passwords do not match';
//       }
//       if (!formData.phone.trim()) {
//         newErrors.phone = 'Phone number is required';
//       } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
//         newErrors.phone = 'Please enter a valid phone number';
//       }
//     } else if (step === 2) {
//       if (formData.business_name && !formData.business_type) {
//         newErrors.business_type = 'Business type is required if business name is provided';
//       }
//       if (formData.website && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(formData.website)) {
//         newErrors.website = 'Please enter a valid URL (e.g., https://example.com)';
//       }
//     } else if (step === 3) {
//       if (!formData.platform) {
//         newErrors.platform = 'Please select a plan';
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (
//     e
//   ) => {
//     const { name, value } = e.target;
//     // console.log(`Input change: ${name}=${value}`); // Debug: Uncomment to track input changes
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const handleNext = () => {
//     if (validateStep(currentStep)) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const handleBack = () => {
//     setCurrentStep((prev) => prev - 1);
//   };

//   const handleSubmit = async () => {
//     if (!validateStep(3)) return;

//     setIsSubmitting(true);
//     setGeneralError(null);

//     try {
//       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           role: formData.role,
//           phone: formData.phone,
//           state: formData.state,
//           business_name: formData.business_name,
//           business_type: formData.business_type,
//           website: formData.website,
//           business_size: formData.business_size,
//           industry: formData.industry,
//           platform: formData.platform,
//         }),
//       });

//       const result = await response.json();

//     //   if (!response.ok) {
//     //     throw new Error(result.message || 'Registration failed');
//     //   }

//       dispatch(setAuth({
//         token: result.token,
//         user: result.user,
//       }));
//       addNotification('Account created successfully! Redirecting to dashboard...', 'success');
//       setTimeout(() => {
//         navigate('/business/dashboard');
//       }, 2000);
//     } catch (error) {
//       console.error(error);
//       setGeneralError(error.message || 'Network error. Please try again.');
//       addNotification('Registration failed. Please check your details.', 'error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleRetry = () => {
//     setGeneralError(null);
//   };

//   const InputField = ({
//     label,
//     name,
//     type = 'text',
//     value,
//     onChange,
//     error,
//     placeholder,
//     showToggle,
//     onToggle,
//     options,
//   }) => {
//     const inputId = `input-${name}`;
//     return (
//       <div className="space-y-1">
//         <label
//           htmlFor={inputId}
//           className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//         >
//           {label}
//         </label>
//         {options ? (
//           <select
//             id={inputId}
//             name={name}
//             value={value}
//             onChange={onChange}
//             disabled={isSubmitting}
//             autoComplete={name === 'state' ? 'address-level1' : 'off'}
//             className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
//               error ? 'border-red-500 focus:ring-red-500 animate-pulse' : ''
//             }`}
//           >
//             {options.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         ) : (
//           <div className="relative">
//             <input
//               id={inputId}
//               type={type}
//               name={name}
//               value={value}
//               onChange={onChange}
//               disabled={isSubmitting}
//               placeholder={placeholder}
//               autoComplete={
//                 name === 'name' ? 'name' :
//                 name === 'email' ? 'email' :
//                 name === 'password' ? 'new-password' :
//                 name === 'confirmPassword' ? 'new-password' :
//                 name === 'phone' ? 'tel' :
//                 name === 'website' ? 'url' :
//                 name === 'business_name' ? 'organization' :
//                 'off'
//               }
//               className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
//                 showToggle ? 'pr-10' : ''
//               } ${error ? 'border-red-500 focus:ring-red-500 animate-pulse' : ''}`}
//             />
//             {showToggle && type === 'password' && (
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-500 transition-colors duration-200"
//                 onClick={onToggle}
//                 disabled={isSubmitting}
//               >
//                 {name === 'password' && showPassword || name === 'confirmPassword' && showConfirmPassword ? (
//                   <EyeOff className="h-5 w-5" />
//                 ) : (
//                   <Eye className="h-5 w-5" />
//                 )}
//               </button>
//             )}
//           </div>
//         )}
//         {error && (
//           <p className="text-xs text-red-500 dark:text-red-400 flex items-center mt-1">
//             <AlertCircle className="w-4 h-4 mr-1" />
//             {error}
//           </p>
//         )}
//       </div>
//     );
//   };

//   if (isSubmitting) {
//     return <Loading />;
//   }

//   if (generalError) {
//     return <Error message={generalError} onRetry={handleRetry} />;
//   }

//   return (
//     <>
//     <Navbar/>
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
//         {/* Header */}
//         <div className="text-center mb-6">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full mb-4 shadow-lg shadow-blue-500/40 hover:scale-105 transition-transform duration-300">
//             <UserPlus className="w-8 h-8 text-white" strokeWidth={1.5} />
//           </div>
//           <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
//             Join Ojaflow
//           </h1>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             {currentStep === 1
//               ? 'Enter your personal details'
//               : currentStep === 2
//               ? 'Add your business info'
//               : 'Select your plan'}
//           </p>
//         </div>

//         {/* Progress Bar */}
//         <div className="mb-6">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
//               Step {currentStep} of 3
//             </span>
//             <span className="text-sm text-gray-600 dark:text-gray-400">
//               {Math.round((currentStep / 3) * 100)}% Complete
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${(currentStep / 3) * 100}%` }}
//             />
//           </div>
//         </div>

//         {/* Form */}
//         <form autoComplete="off" className="space-y-4">
//           {/* Step 1: Personal Information */}
//           {currentStep === 1 && (
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputField
//                   label="Full Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   error={errors.name}
//                   placeholder="Enter your full name"
//                 />
//                 <InputField
//                   label="Email Address"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   error={errors.email}
//                   placeholder="you@company.com"
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputField
//                   label="Password"
//                   name="password"
//                   type={showPassword ? 'text' : 'password'}
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   error={errors.password}
//                   placeholder="Create a strong password"
//                   showToggle
//                   onToggle={() => setShowPassword(!showPassword)}
//                 />
//                 <InputField
//                   label="Confirm Password"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   error={errors.confirmPassword}
//                   placeholder="Confirm your password"
//                   showToggle
//                   onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputField
//                   label="Phone Number"
//                   name="phone"
//                   type="tel"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   error={errors.phone}
//                   placeholder="+234 123 456 7890"
//                 />
//                 <InputField
//                   label="State"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleInputChange}
//                   error={errors.state}
//                   options={states}
//                 />
//               </div>
//               <div className="p-4 bg-blue-50/50 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/50 rounded-xl backdrop-blur-sm">
//                 <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center">
//                   <Info className="w-4 h-4 mr-2" />
//                   Password: 8+ characters, uppercase, lowercase, number, special character.
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Business Information */}
//           {currentStep === 2 && (
//             <div className="space-y-4">
//               <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/30 border border-indigo-200/50 dark:border-indigo-700/50 rounded-xl backdrop-blur-sm">
//                 <p className="text-sm text-indigo-700 dark:text-indigo-300 flex items-center">
//                   <Info className="w-4 h-4 mr-2" />
//                   Business info is optional but helps us tailor your experience.
//                 </p>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputField
//                   label="Business Name"
//                   name="business_name"
//                   value={formData.business_name}
//                   onChange={handleInputChange}
//                   error={errors.business_name}
//                   placeholder="Your business name"
//                 />
//                 <InputField
//                   label="Business Type"
//                   name="business_type"
//                   value={formData.business_type}
//                   onChange={handleInputChange}
//                   error={errors.business_type}
//                   options={businessTypes}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <InputField
//                   label="Website"
//                   name="website"
//                   type="url"
//                   value={formData.website}
//                   onChange={handleInputChange}
//                   error={errors.website}
//                   placeholder="https://your-website.com"
//                 />
//                 <InputField
//                   label="Business Size"
//                   name="business_size"
//                   value={formData.business_size}
//                   onChange={handleInputChange}
//                   error={errors.business_size}
//                   options={businessSizes}
//                 />
//               </div>
//               <div className="grid grid-cols-1 gap-4">
//                 <InputField
//                   label="Industry"
//                   name="industry"
//                   value={formData.industry}
//                   onChange={handleInputChange}
//                   error={errors.industry}
//                   options={industries}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Step 3: Plan Selection */}
//           {currentStep === 3 && (
//             <div className="space-y-4">
//               <div className="p-4 bg-blue-50/50 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/50 rounded-xl backdrop-blur-sm">
//                 <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center">
//                   <Info className="w-4 h-4 mr-2" />
//                   Select a plan to start. You can change it later.
//                 </p>
//               </div>
//               <div className="grid grid-cols-1 gap-4">
//                 <InputField
//                   label="Subscription Plan"
//                   name="platform"
//                   value={formData.platform}
//                   onChange={handleInputChange}
//                   error={errors.platform}
//                   options={planTypes}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-6">
//             {currentStep > 1 && (
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 disabled={isSubmitting}
//                 className="bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 transition-colors duration-300 flex items-center justify-center py-2 px-6 text-sm font-semibold rounded-xl shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//                 Back
//               </button>
//             )}
//             <button
//               type="button"
//               onClick={currentStep < 3 ? handleNext : handleSubmit}
//               disabled={isSubmitting}
//               className="flex-1 bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 py-2 text-base font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
//             >
//               {currentStep < 3 ? (
//                 <>
//                   Continue
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </>
//               ) : (
//                 <>
//                   <UserPlus className="w-5 h-5 mr-2" />
//                   Create Account
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Sign In Link */}
//           <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{' '}
//               <a
//                 href="/login"
//                 className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors duration-200"
//               >
//                 Sign In
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>

//       {/* Footer */}
//       <div className="absolute bottom-2 text-center text-xs text-gray-500 dark:text-gray-400">
//         © 2025 Ojaflow. Secured with end-to-end encryption.
//       </div>
//     </div>
//     </>
    
//   );
// };

// export default Register;








import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, UserPlus, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../utils/NotificationSystem';
import Loading from '../../utils/Loading';
import Error from '../../utils/ErrorProps';
import { setAuth } from '../../store/slices/authSlice';
import { states, businessSizes, businessTypes, industries, planTypes } from '../../types/types.jsx';
import Navbar from '../../components/Navbar.jsx';

const InputField = ({ label, name, type = 'text', value, onChange, error, placeholder, showToggle, onToggle, options, isSubmitting, showPassword, showConfirmPassword }) => {
  const inputId = `input-${name}`;
  return (
    <div className="space-y-1">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      {options ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={isSubmitting}
          autoComplete={name === 'state' ? 'address-level1' : 'off'}
          className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
            error ? 'border-red-500 focus:ring-red-500 animate-pulse' : ''
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            id={inputId}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={isSubmitting}
            placeholder={placeholder}
            autoComplete={
              name === 'name' ? 'name' :
              name === 'email' ? 'email' :
              name === 'password' ? 'new-password' :
              name === 'confirmPassword' ? 'new-password' :
              name === 'phone' ? 'tel' :
              name === 'website' ? 'url' :
              name === 'business_name' ? 'organization' :
              'off'
            }
            className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
              showToggle ? 'pr-10' : ''
            } ${error ? 'border-red-500 focus:ring-red-500 animate-pulse' : ''}`}
          />
          {showToggle && type === 'password' && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-500 transition-colors duration-200"
              onClick={onToggle}
              disabled={isSubmitting}
            >
              {name === 'password' && showPassword || name === 'confirmPassword' && showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      )}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 flex items-center mt-1">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    role: 'user',
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
    platform: 'web',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState(null);

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
          formData.password
        )
      ) {
        newErrors.password =
          'Password must include uppercase, lowercase, number, and special character';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    } else if (step === 2) {
      if (formData.business_name && !formData.business_type) {
        newErrors.business_type = 'Business type is required if business name is provided';
      }
      if (formData.website && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(formData.website)) {
        newErrors.website = 'Please enter a valid URL (e.g., https://example.com)';
      }
    } else if (step === 3) {
      if (!formData.platform) {
        newErrors.platform = 'Please select a plan';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e
  ) => {
    const { name, value } = e.target;
    // console.log(`Input change: ${name}=${value}`); // Debug: Uncomment to track input changes
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setGeneralError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          phone: formData.phone,
          state: formData.state,
          business_name: formData.business_name,
          business_type: formData.business_type,
          website: formData.website,
          business_size: formData.business_size,
          industry: formData.industry,
          platform: formData.platform,
        }),
      });

      const result = await response.json();

    //   if (!response.ok) {
    //     throw new Error(result.message || 'Registration failed');
    //   }

      dispatch(setAuth({
        token: result.token,
        user: result.user,
      }));
      addNotification('Account created successfully! Redirecting to dashboard...', 'success');
      setTimeout(() => {
        navigate('/business/dashboard');
      }, 2000);
    } catch (error) {
      console.error(error);
      setGeneralError(error.message || 'Network error. Please try again.');
      addNotification('Registration failed. Please check your details.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setGeneralError(null);
  };

  if (isSubmitting) {
    return <Loading />;
  }

  if (generalError) {
    return <Error message={generalError} onRetry={handleRetry} />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full mb-4 shadow-lg shadow-blue-500/40 hover:scale-105 transition-transform duration-300">
              <UserPlus className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
              Join Ojaflow
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentStep === 1
                ? 'Enter your personal details'
                : currentStep === 2
                ? 'Add your business info'
                : 'Select your plan'}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Step {currentStep} of 3
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round((currentStep / 3) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form autoComplete="off" className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    placeholder="Enter your full name"
                    isSubmitting={isSubmitting}
                  />
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="you@company.com"
                    isSubmitting={isSubmitting}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                    placeholder="Create a strong password"
                    showToggle={true}
                    onToggle={() => setShowPassword(!showPassword)}
                    isSubmitting={isSubmitting}
                    showPassword={showPassword}
                  />
                  <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={errors.confirmPassword}
                    placeholder="Confirm your password"
                    showToggle={true}
                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                    isSubmitting={isSubmitting}
                    showPassword={showConfirmPassword}
                    showConfirmPassword={showConfirmPassword}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="+234 123 456 7890"
                    isSubmitting={isSubmitting}
                  />
                  <InputField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    error={errors.state}
                    options={states}
                    isSubmitting={isSubmitting}
                  />
                </div>
                <div className="p-4 bg-blue-50/50 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/50 rounded-xl backdrop-blur-sm">
                  <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Password: 8+ characters, uppercase, lowercase, number, special character.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Business Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/30 border border-indigo-200/50 dark:border-indigo-700/50 rounded-xl backdrop-blur-sm">
                  <p className="text-sm text-indigo-700 dark:text-indigo-300 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Business info is optional but helps us tailor your experience.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Business Name"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleInputChange}
                    error={errors.business_name}
                    placeholder="Your business name"
                    isSubmitting={isSubmitting}
                  />
                  <InputField
                    label="Business Type"
                    name="business_type"
                    value={formData.business_type}
                    onChange={handleInputChange}
                    error={errors.business_type}
                    options={businessTypes}
                    isSubmitting={isSubmitting}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    error={errors.website}
                    placeholder="https://your-website.com"
                    isSubmitting={isSubmitting}
                  />
                  <InputField
                    label="Business Size"
                    name="business_size"
                    value={formData.business_size}
                    onChange={handleInputChange}
                    error={errors.business_size}
                    options={businessSizes}
                    isSubmitting={isSubmitting}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <InputField
                    label="Industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    error={errors.industry}
                    options={industries}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Plan Selection */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50/50 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/50 rounded-xl backdrop-blur-sm">
                  <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Select a plan to start. You can change it later.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <InputField
                    label="Subscription Plan"
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    error={errors.platform}
                    options={planTypes}
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="bg-gray-500 text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 transition-colors duration-300 flex items-center justify-center py-2 px-6 text-sm font-semibold rounded-xl shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 py-2 text-base font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
                onClick={currentStep < 3 ? handleNext : handleSubmit}
              >
                {currentStep < 3 ? (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Account
                  </>
                )}
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors duration-200"
                >
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="absolute bottom-2 text-center text-xs text-gray-500 dark:text-gray-400">
          © 2025 Ojaflow. Secured with end-to-end encryption.
        </div>
      </div>
    </>
  );
};

export default Register;