import { Input, Button, Typography } from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import BASE_URL from "../../base/BaseUrl";
import { useState } from "react";
import Logo1 from "../../assets/receipt/ag_logo.png";
// import { FaInstagram, FaPinterest, FaTwitter } from "react-icons/fa";
// import { TiSocialLinkedin, TiSocialYoutubeCircular } from "react-icons/ti";
// import { CgFacebook } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { FormLabel } from "@mui/material";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onResetPassword = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    try {
      const res = await axios.post(`${BASE_URL}/panel-send-password`, formData);
      if (res.data.code == "200") {
        toast.success("New Password Sent to your Email");
      } else {
        toast.error("Email not sent. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error("Error:", error);
    }
  };

  const inputClass =
    "w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border-green-500";
  const FormLabel = ({ children, required }) => (
    <label className="block text-sm font-semibold text-black mb-1">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
  return (
    <>
      <Toaster
        toastOptions={{
          success: { style: { background: "green" } },
          error: { style: { background: "red" } },
        }}
        position="top-right"
        reverseOrder={false}
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full">
          <div className="flex items-center justify-center mb-8">
            <img src={Logo1} alt="Company Logo" className="w-70 h-24 mx-auto" />
          </div>
          <Typography
            variant="h4"
            className="text-center font-bold mb-6 text-blue-gray-800"
          >
            Enter your email to reset your password.
          </Typography>
          <form onSubmit={onResetPassword} className="space-y-6">
            <div>
              <FormLabel required>Email</FormLabel>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div className="flex justify-center ">
              <button
                className=" text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
                type="submit"
              >
                {" "}
                Reset Password
              </button>
            </div>
          </form>
          <div className="text-end mt-4" onClick={() => navigate("/")}>
            <Link className="text-sm text-gray-700 hover:text-blue-600">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
