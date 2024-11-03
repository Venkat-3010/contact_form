import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import { toast } from "react-toastify";

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    checkbox: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.firstName) errors.firstName = "This field is required";
    if (!formData.lastName) errors.lastName = "This field is required";
    if (!formData.email) errors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Please enter a valid Email";
    if (!formData.queryType) errors.queryType = "Please select a query type";
    if (!formData.message) errors.message = "This field is required";
    if (!formData.checkbox) errors.checkbox = "To submit this form, please consent to being contacted";
    return errors;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const validateErrors = validateForm();
    if (Object.keys(validateErrors).length === 0) {
      setIsSubmitted(true);
      setErrors({});
    } else {
      setErrors(validateErrors);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      toast.success("Form submitted successfully");
    }
  }, [isSubmitted]);

  return (
    <div className="bg-green-100 h-screen flex justify-center items-center">
      <form
        className="bg-white shadow-md border-1 p-4 rounded-md w-1/2 min-w-[600px]"
        onSubmit={handlesubmit}
      >
        <legend>Contact Us</legend>
        <div className="flex justify-between align-center gap-2 mt-4">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="firstName" className="text-sm">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`border-2 border-grey outline-none p-2 rounded-md ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="lastName" className="text-sm">
              Last Name *
            </label>
            <input
              type="text"
              id="lasttName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`border-2 border-grey outline-none p-2 rounded-md ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="email" className="text-sm">
            Email Address*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`border-2 border-grey outline-none p-2 rounded-md ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="queryType" className="text-sm">
            Query Type*
          </label>
          <div className="flex justify-between gap-4">
            <label className="flex items-center gap-2 border-2 p-2 rounded-md w-full">
              <input
                type="radio"
                name="queryType"
                value="General Enquiry"
                checked={formData.queryType === "General Enquiry"}
                onChange={handleChange}
                className="cursor-pointer"
              />
              General Enquiry
            </label>
            <label className="flex items-center gap-2 border-2 p-2 rounded-md w-full">
              <input
                type="radio"
                name="queryType"
                value="Support Request"
                checked={formData.queryType === "Support Request"}
                onChange={handleChange}
                className="cursor-pointer"
              />
              Support Request
            </label>
          </div>
          {errors.queryType && (
            <p className="text-red-500 text-xs">{errors.queryType}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="message" className="text-sm">
            Message*
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            className={`border-2 border-grey outline-none p-2 rounded-md ${
              errors.message ? "border-red-500" : ""
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-xs">{errors.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 mt-4">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              checked={formData.checkbox}
              onChange={handleChange}
            />
            <label htmlFor="checkbox">
              I consent to being contacted bt the team *
            </label>
          </div>
          {errors.checkbox && (
            <p className="text-red-500 text-xs">{errors.checkbox}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-teal-700 text-white p-2 rounded-md mt-4 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
