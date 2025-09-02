import React, { useState } from 'react'
// Importing icons for toggling password visibility
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

// Reusable Input component with support for password visibility toggle
const Input = ({ value, onChange, placeholder, label, type }) => {
  // State to manage visibility of password input
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility on eye icon click
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {/* Input label */}
      <label className='text-[13px] text-slate-800'>{label}</label>

      {/* Input container with custom styling from Tailwind (input-box class from index.css) */}
      <div className="input-box">
        {/* The actual input field */}
        <input 
          type={
            // If input is of type password, toggle between 'text' and 'password' based on state
            type === 'password' 
              ? showPassword ? 'text' : 'password'
              : type
          }
          placeholder={placeholder}
          className='w-full bg-transparent outline-none' // Make input blend with styled box
          value={value}
          onChange={(e) => onChange(e)} // Pass event to parent handler
        />

        {/* If this is a password input, show visibility toggle icon */}
        {type === "password" && (
          <>
            {showPassword ? (
              // Show "eye" icon when password is visible
              <FaRegEye 
                size={22}
                className='text-primary cursor-pointer'
                onClick={toggleShowPassword}
              />
            ) : (
              // Show "eye slash" icon when password is hidden
              <FaRegEyeSlash 
                size={22}
                className='text-slate-400 cursor-pointer'
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Input
