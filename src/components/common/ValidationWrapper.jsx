// import axios from "axios";
// import CryptoJS from "crypto-js";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import BASE_URL from "../../base/BaseUrl";
// import toast from "react-hot-toast";

// const secretKey = import.meta.env.VITE_SECRET_KEY;
// const validationKey = import.meta.env.VITE_SECRET_VALIDATION;

// const ValidationWrapper = ({ children }) => {
//   const [status, setStatus] = useState("pending");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const handleLogout = async () => {
//     localStorage.clear();
//   };
//   useEffect(() => {
//     const validateEnvironment = async () => {
//       try {
//         const statusRes = await axios.get(`${BASE_URL}/panel-check-status`);

//         if (statusRes?.data?.success !== "ok") {
//           throw new Error("Panel status check failed");
//         }

//         const dotenvRes = await axios.get(`${BASE_URL}/panel-fetch-dotenv`);
//         const dynamicValidationKey = dotenvRes?.data?.hashKey;

//         if (!dynamicValidationKey) {
//           throw new Error("Validation key missing from response");
//         }

//         const computedHash = validationKey
//           ? CryptoJS.MD5(validationKey).toString()
//           : "";

//         if (!secretKey || computedHash !== dynamicValidationKey) {
//           throw new Error("Unauthorized environment file detected");
//         }

//         setStatus("valid");
//         if (location.pathname == "/maintenance") {
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("❌ Validation Error:", error.message);
//         if (status != "valid") {
//           handleLogout();
//         }
//         toast.error("Environment validation failed. Redirecting...");
//         setStatus("invalid");
//         if (location.pathname !== "/maintenance") {
//           navigate("/maintenance");
//         }
//       }
//     };

//     validateEnvironment();
//   }, [navigate]);

//   return children;
// };

// export default ValidationWrapper;
import axios from "axios";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import toast from "react-hot-toast";

const secretKey = import.meta.env.VITE_SECRET_KEY;
const validationKey = import.meta.env.VITE_SECRET_VALIDATION;

const ValidationWrapper = ({ children }) => {
  const [status, setStatus] = useState("pending");

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const validateEnvironment = async () => {
      try {
        // Fetch both API responses in parallel
        const [statusRes, dotenvRes] = await Promise.all([
          axios.get(`${BASE_URL}/panel-check-status`),
          axios.get(`${BASE_URL}/panel-fetch-dotenv`),
        ]);

        const statusSuccess = statusRes?.data?.success == "ok";
        const dynamicValidationKey = dotenvRes?.data?.hashKey;

        if (!statusSuccess || !dynamicValidationKey) {
          throw new Error("Validation failed due to missing or incorrect data");
        }

        const computedHash = validationKey
          ? CryptoJS.MD5(validationKey).toString()
          : "";

        if (!secretKey || computedHash !== dynamicValidationKey) {
          throw new Error("Unauthorized environment file detected");
        }

        setStatus("valid");
        if (location.pathname == "/maintenance") {
          navigate("/");
        }
      } catch (error) {
        console.error("❌ Validation Error:", error.message);
        if (status !== "valid") {
          handleLogout();
        }
        toast.error("Environment validation failed. Redirecting...");
        setStatus("invalid");
        if (location.pathname !== "/maintenance") {
          navigate("/maintenance");
        }
      }
    };

    validateEnvironment();
  }, [navigate]);

  return children;
};

export default ValidationWrapper;
