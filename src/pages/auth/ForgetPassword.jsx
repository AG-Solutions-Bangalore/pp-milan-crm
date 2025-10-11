import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import logo from "../../assets/receipt/ag_logo.png";

const forgotPasswordValidationSchema = Yup.object({
  username: Yup.string()
    .min(10, "Mobile No must be at least 10 digits")
    .required("Mobile No is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const inputClass =
    "w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300";

  const handleForgotPasswordSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("username", values.username);

    try {
      const res = await axios.post(`${BASE_URL}/panel-send-password`, formData);
      if (res.data.code === "200") {
        toast.success("New password sent to your email!");
      } else {
        toast.error("Email not sent. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster position="top-right" />
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-20 h-20" />
        </div>

        <Typography
          variant="h5"
          className="text-center font-bold mb-4 text-gray-700"
        >
          Forgot Password
        </Typography>

        <Formik
          initialValues={{ username: "", email: "" }}
          validationSchema={forgotPasswordValidationSchema}
          onSubmit={handleForgotPasswordSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile No <span className="text-red-500">*</span>
                </label>
                <Field
                  type="text"
                  name="username"
                  className={inputClass}
                  onChange={(e) => setFieldValue("username", e.target.value)}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  className={inputClass}
                  onChange={(e) => setFieldValue("email", e.target.value)}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all"
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
