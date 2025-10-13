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
import HeartParticleAnimation from "./HeartParticleAnimation";
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
    "w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#840c19] border-gray-300";

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
    <div className="min-h-screen flex flex-col md:flex-row bg-[#ffede6] relative overflow-hidden">
      <Toaster position="top-right" />
      <svg
        className="absolute top-0 left-0 w-full h-screen opacity-15"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Isometric Grid Pattern */}
        <pattern
          id="isometric"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0 15 L 15 0 L 30 15 L 15 30 Z"
            fill="none"
            stroke="#A41460"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#isometric)" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center z-0">
        <HeartParticleAnimation />
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center p-6 relative z-10">
        <img src={banner} alt="Wedding Theme" className="w-full object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="rounded-3xl p-10 w-full max-w-md border flex flex-col items-center justify-center">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img src={logo} alt="Logo" className="w-20 h-20" />
          </div>

          {/* Title */}
          <Typography
            variant="h5"
            className="text-center font-bold mb-6 text-[#840c19] tracking-wide"
          >
            Welcome Back! Please Login
          </Typography>

          {/* Formik Form */}
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="w-full space-y-5">
                {/* Username */}
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

                {/* Password */}
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

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#840c19] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 rounded-lg bg-[#840c19] hover:bg-[#a83245] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {loading ? "Checking..." : "Sign In"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <svg
        className="absolute bottom-0 left-0 w-full h-52 opacity-90"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern
          id="isometric"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 0 15 L 15 0 L 30 15 L 15 30 Z"
            fill="none"
            stroke="#A41460"
            strokeWidth="0.5"
            opacity="0.4"
          />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#isometric)" />

        <g>
          {Array.from({ length: 18 }).map((_, i) => {
            const xPercent = (i / 17) * 100;
            const yStart = Math.random() * 170;
            const size = 15;
            const durationY = Math.random() * 4 + 3;
            const durationX = Math.random() * 5 + 3;
            const rotateDuration = Math.random() * 6 + 3;
            const opacity = Math.random() * 0.3 + 0.2;

            const moveType = Math.floor(Math.random() * 3); 

            return (
              <g key={i} transform={`translate(0,0)`}>
                <rect
                  x={`${xPercent}%`}
                  y={yStart}
                  width={size}
                  height={size}
                  fill="#840c19"
                  opacity={opacity}
                >
                  {moveType === 0 && (
                    <animate
                      attributeName="y"
                      values={`${yStart};${yStart - 20};${
                        yStart + 10
                      };${yStart}`}
                      dur={`${durationY}s`}
                      repeatCount="indefinite"
                    />
                  )}
                  {moveType === 1 && (
                    <animate
                      attributeName="x"
                      values={`${xPercent}%;${xPercent - 5}%;${
                        xPercent + 5
                      }%;${xPercent}%`}
                      dur={`${durationX}s`}
                      repeatCount="indefinite"
                    />
                  )}
                  {moveType === 2 && (
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values={`0 ${xPercent}% ${
                        yStart + size / 2
                      }; 45 ${xPercent}% ${
                        yStart + size / 2
                      }; -30 ${xPercent}% ${
                        yStart + size / 2
                      }; 0 ${xPercent}% ${yStart + size / 2}`}
                      dur={`${rotateDuration}s`}
                      repeatCount="indefinite"
                    />
                  )}
                </rect>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default SignIn;
