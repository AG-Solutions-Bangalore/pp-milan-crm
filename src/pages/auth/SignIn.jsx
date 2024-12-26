import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import toast, { Toaster } from "react-hot-toast";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IconX } from "@tabler/icons-react";
import { IconArrowBadgeDown } from "@tabler/icons-react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import logo from "../../assets/receipt/ag_logo.png";
import { Slide } from "@mui/material";

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .max(6, "Password must be max 4 characters")
    .required("Password is required"),
});

const forgotPasswordValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const SignIn = () => {
  const [showForm, setShowForm] = useState(false);
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const navigate = useNavigate();
  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-300 border-red-200";

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    console.log(formData);
    try {
      const res = await axios.post(`${BASE_URL}/panel-login`, formData);
      console.log(res);

      if (res.status === 200) {
        const token = res.data.UserInfo?.token;

        localStorage.setItem("id", res.data.UserInfo.user.id);
        localStorage.setItem("username", res.data.UserInfo.user.name);
        localStorage.setItem(
          "user_type_id",
          res.data.UserInfo.user.profile_type
        );
        localStorage.setItem("email", res.data.UserInfo.user.email);
        localStorage.setItem(
          "profile_photo",
          res.data.UserInfo.user.profile_photo
        );

        if (token) {
          localStorage.setItem("token", token);
          navigate("/home");
          setLoading(false);
          setSubmitting(false);
        } else {
          toast.error("Login Failed, Token not received.");
          setLoading(false);
          setSubmitting(false);
        }
      } else {
        toast.error("Login Failed, Please check your credentials.");
        setLoading(false);
        setSubmitting(false);
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleForgotPasswordSubmit = async (values, { setSubmitting }) => {
    setLoading1(true);

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("username", values.username);
    console.log(formData);
    try {
      const res = await axios.post(`${BASE_URL}/panel-send-password`, formData);
      if (res.data.code == "200") {
        toast.success("New Password Sent to your Email");
        setLoading1(false);
      } else {
        toast.error("Email not sent. Please try again.");
        setLoading1(false);
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error("Error:", error);
      setLoading1(false);
    }
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const carouselData = [
    {
      image:
        "https://imgs.bharatmatrimony.com/bmimgs/homepage-revamp-images/ss-images/bichu-and-athira-aug-2023.jpg",
      title: "Anuj&Anjali",
      paragraph:
        "marriage, a legally and socially sanctioned union, usually between a man and a woman, that is regulated by laws, rules, customs, beliefs, and attitudes that prescribe the rights and duties of the partners and accords status to their offspring (if any).",
    },
    {
      image:
        "https://imgs.bharatmatrimony.com/bmimgs/homepage-revamp-images/ss-images/rohan-and-dhanyalakshmi-aug-2023.jpg?0",
      title: "Monaj&Janani",
      paragraph:
        "Frightening & Intense Scenes. There is a very intense and protracted argument between two parents. Overall, Marriage Story is a fairly intense film throughout and has several scenes of tension and distress.",
    },
    {
      image: "https://www.a2zkeralawedding.com/Assets/images/mobile_img.jpg",
      title: "Paramesh&Shalini",
      paragraph:
        "Content is going through the motions without complaints, but it does lack excitement and surprise. Happiness is more than security and reliability; it's big and little gestures that are appreciated, and quiet moments of reflection (in his presence or not) where I just feel full.",
    },
  ];

  const handle1 = () => {
    setShowForm(false);
    setShowForgotPasswordDialog(true);
  };
  const handle2 = () => {
    setShowForm(true);
    setShowForgotPasswordDialog(false);
  };
  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Background Image Section */}
      <div
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1141906552/photo/indian-hindu-couple-holding-each-other-hands-during-their-marriage-symbolising-love-and.jpg?s=612x612&w=0&k=20&c=brG8OkGBo5-tIABHlnGtVMu9X4lAC8ebpqGA2Xire6E=')",
        }}
      >
        <h6
          onClick={() => setShowForm(!showForm)}
          className="absolute right-20 top-10 flex items-center text-black py-1 px-4 border-dashed hover:border-b-2 hover:border-white hover:border-b-dashed cursor-pointer "
        >
          Login <IconArrowBadgeDown className="mt-1" />
        </h6>
      </div>
      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "384px",
            },
          },
        }}
        TransitionComponent={Slide}
        transitionDuration={500}
      >
        <div className="bg-white shadow-xl rounded-2xl p-6 max-w-sm w-full relative">
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
          >
            <IconX size={20} />
          </button>
          <div className="flex justify-center align-center">
            <img src={logo} alt="logo" className="w-[7rem] h-[7rem]" />
          </div>

          <Typography
            variant="h5"
            className="text-center font-bold mb-4 text-blue-gray-600"
          >
            Welcome back! Please Login
          </Typography>

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Enter Your Username <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="username"
                    className={inputClass}
                    onChange={(e) => {
                      console.log("Username changing to:", e.target.value);
                      setFieldValue("username", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className={inputClass}
                    onChange={(e) => {
                      console.log("Password changing to:", e.target.value);
                      setFieldValue("password", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Checking..." : "Sign In"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {/* </Formik> */}
          <div className="text-right mt-4">
            <Link
              className="text-sm text-gray-700 hover:text-blue-600"
              onClick={handle1}
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={showForgotPasswordDialog}
        onClose={() => setShowForgotPasswordDialog(false)}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "384px",
            },
          },
        }}
        TransitionComponent={Slide}
        transitionDuration={500}
      >
        <div className="bg-white shadow-xl rounded-2xl p-6 max-w-sm w-full relative h-[28rem]">
          <button
            onClick={() => setShowForgotPasswordDialog(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
          >
            <IconX size={20} />
          </button>

          <div className="flex justify-center align-center">
            <img src={logo} alt="logo" className="w-[7rem] h-[7rem]" />
          </div>
          <Typography
            variant="h5"
            className="text-center font-bold mb-4 text-blue-gray-600"
          >
            Forgot Password
          </Typography>
          <Formik
            initialValues={{ username: "", email: "" }}
            validationSchema={forgotPasswordValidationSchema}
            onSubmit={handleForgotPasswordSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Enter Your Username <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="username"
                    className={inputClass}
                    onChange={(e) => {
                      console.log("Username changing to:", e.target.value);
                      setFieldValue("username", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                {/* ..next */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-1">
                    Enter Your Email <span className="text-red-500">*</span>
                  </label>

                  <Field type="email" name="email" className={inputClass} />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                    onChange={(e) => {
                      console.log("Password changing to:", e.target.value);
                      setFieldValue("password", e.target.value);
                    }}
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md"
                    type="submit"
                    disabled={loading1}
                  >
                    {loading1 ? "Sending..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="text-right mt-4">
            <Link
              className="text-sm text-gray-700 hover:text-blue-600"
              onClick={handle2}
            >
              Sigin?
            </Link>
          </div>
        </div>
      </Dialog>

      {/* Carousel Section */}
      <div className="mt-10 px-6 flex justify-center">
        <div className="max-w-[70%] w-full">
          <Typography
            variant="h5"
            className="text-center font-bold mb-6 text-blue-gray-800"
          >
            Explore Features
          </Typography>
          <Carousel responsive={responsive} infinite={true} autoPlay={true}>
            {carouselData.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-lg text-center mx-2 my-2"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-60 object-cover mb-4 rounded-lg"
                />
                <Typography variant="h6" className="font-bold mb-2">
                  {item.title}
                </Typography>
                <p className="text-sm text-gray-600">{item.paragraph}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="bg-orange-800 text-white flex justify-center p-6 my-6">
        <h5 className="flex p-3">Your story is Waiting to Happen </h5>
        <h4 className="border-2 p-3 px-4">Get started</h4>
      </div>
    </div>
  );
};

export default SignIn;
