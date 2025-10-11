import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import logo from "../../assets/receipt/ag_logo.png";
import banner from "../../assets/receipt/banner.png";
const validationSchema = Yup.object({
  username: Yup.string()
    .min(10, "Mobile No must be at least 10 digits")
    .required("Mobile No is required"),
  password: Yup.string()
    .max(6, "Password must be max 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputClass =
    "w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300";

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);

    try {
      const res = await axios.post(`${BASE_URL}/panel-login`, formData);
      if (res.data.code === 200) {
        const token = res.data.UserInfo?.token;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("id", res.data.UserInfo.user.id);
          localStorage.setItem("username", res.data.UserInfo.user.name);
          localStorage.setItem(
            "profile_mobile",
            res.data.UserInfo.user.profile_mobile
          );
          localStorage.setItem(
            "user_type_id",
            res.data.UserInfo.user.profile_type
          );
          localStorage.setItem("email", res.data.UserInfo.user.email);
          localStorage.setItem(
            "profile_photo",
            res.data.UserInfo.user.profile_photo
          );
          toast.success("Login successful!");
          navigate("/home");
        } else {
          toast.error("Login failed — token not received.");
        }
      } else {
        toast.error(res.data.msg || "Invalid credentials.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Toaster position="top-right" />
      <div className="w-full md:w-1/2 bg-pink-100 flex items-center justify-center p-6">
        <img src={banner} alt="Wedding Theme" className="w-full object-cover" />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Logo" className="w-20 h-20" />
          </div>

          <Typography
            variant="h5"
            className="text-center font-bold mb-4 text-gray-700"
          >
            Welcome Back! Please Login
          </Typography>

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className={inputClass}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-full text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
                  >
                    {loading ? "Checking..." : "Sign In"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
