import React, { useEffect, useRef, useState } from "react";
import Page from "../layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL, { ImagePath, NoImagePath } from "../base/BaseUrl";
import ReactToPrint from "react-to-print";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import { Card } from "@material-tailwind/react";
import {
  IconCalendar,
  IconCurrencyRupee,
  IconExclamationCircle,
  IconFriends,
  IconMail,
  IconPhone,
  IconPrinter,
} from "@tabler/icons-react";
import moment from "moment";
import images from "../assets/receipt/top.jpg";
const printStyles = `
@media print {




  /* Print content with 20px margin */
  .print-content {
    margin: 40px !important; /* Apply 20px margin to the printed content */

    }
    .print-none{
    display:none
    }
    .print-p{
    padding:10px !important;
    }



}
`;

const Testing = () => {
  const { id } = useParams();
  const printRef = useRef(null);
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const tableRef = useRef(null);

  const getTemplateData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/panel-fetch-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data?.user) {
        setData(res.data.user);
        setImage(res.data.user.profile_photo);
      } else {
        throw new Error("User data is missing");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      toast.error("Failed to load user data");
    }
  };
  useEffect(() => {
    getTemplateData();
  }, [id]);
  if (!id) {
    return (
      <Page>
        <div>No ID provided</div>
      </Page>
    );
  }
  const mergeRefs =
    (...refs) =>
    (node) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      });
    };

  useEffect(() => {
    // Add print styles to document head
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = printStyles;
    document.head.appendChild(styleSheet);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);
  const datas = {
    name: "John Doe",
    profile_gender: "Male",
    email: "johndoe@example.com",
    phone: "+1 (234) 567-890",
    address: "123 Main St, Springfield, IL",
    birthday: "January 1, 1990",
  };
  return (
    <Page>
      <div
        className=" container mx-auto px-4 py-6"
        ref={mergeRefs(printRef, tableRef)}
      >
        <Card
          ref={printRef}
          className="w-full shadow-2xl rounded-xl print:shadow-none print:rounded-none overflow-hidden "
        >
          <div
            className="text-black p-6 "
            // style={{
            //   backgroundImage: `url(${images})`, // Replace with your background image URL
            //   backgroundSize: "cover",
            //   backgroundPosition: "center",
            // }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Left: Name Section */}
              <div className="flex flex-col items-center  md:w-1/3 text-black">
                <div className="flex justify-center ">
                  <div className="flex justify-center rounded-full">
                    {image ? (
                      <img
                        src={`${ImagePath}/${image}`}
                        alt="Profile"
                        className="h-20 w-20 md:h-32 md:w-32 rounded-full border-8 border-black/30"
                      />
                    ) : (
                      <img
                        src={NoImagePath}
                        alt="No image available"
                        className="h-20 w-20 md:h-32 md:w-32 rounded-full"
                      />
                    )}
                  </div>
                  <h1 className="text-4xl md:text-3xl font-bold mb-2 ">
                    {datas.name}
                  </h1>
                </div>

                {/* Center: Image Section */}
              </div>

              {/* Right: Contact Information Section */}
              <div className="flex flex-col items-start md:items-start md:w-1/3 text-black space-y-4 ">
                {/* Phone */}
                <div className="flex items-center space-x-2">
                  <IconPhone className="text-pink-400 text-xl" />
                  {/* <span className="text-lg">{datas.phone}</span> */}
                  Male
                </div>
                <div className="flex items-center space-x-2">
                  <IconPhone className="text-pink-400 text-xl" />
                  <span className="text-lg"> 13-03-24</span>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-2">
                  <IconExclamationCircle className="text-pink-400 text-xl" />
                  <span className="text-lg ">02.37</span>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-2">
                  <IconMail className="text-pink-400 text-xl" />
                  <span className="text-lg">b/go</span>
                </div>

                {/* Birthday */}
                {/* <div className="flex items-center space-x-2">
                  <IconCalendar className="text-pink-400 text-xl" />
                  <span className="text-lg">{datas.birthday}</span>
                </div> */}
                <div className="text-black print-none space-x-4">
                  <ReactToPrint
                    trigger={() => (
                      <button
                        variant="text"
                        className="print-none flex items-center space-x-2 bg-white bg-opacity-50 hover:bg-opacity-70 rounded px-4 py-2 shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <IconPrinter className="text-lg" />
                        <span className="text-lg font-semibold">Print</span>
                      </button>
                    )}
                    content={() => printRef.current}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg shadow-md bg-gray-100">
            {/* Personal Information Section */}
            <h2 className="text-xl font-semibold my-4 flex items-center text-gray-800 px-6">
              <User className="mr-3 h-6 w-6 text-indigo-600" /> Personal
              Information
            </h2>
            <div className="bg-[#FFF8E6] p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                <DetailRow
                  label="Date Of Birth"
                  value={moment(data.profile_date_of_birth).format(
                    "DD-MM-YYYY"
                  )}
                />
                <DetailRow
                  label="Time Of Birth"
                  value={data.profile_time_of_birth}
                />
                <DetailRow
                  label="Community"
                  value={data.profile_comunity_name}
                />
                <DetailRow label="Gotra" value={data.profile_gotra} />
              </div>
            </div>
            <h2 className="text-xl font-semibold my-4 flex items-center text-gray-800 px-6">
              <IconFriends className="mr-3 h-6 w-6 text-green-600" /> Family
              Details
            </h2>
            {/* Family Details Section */}
            <div className="bg-[#FFF8E6] p-6 rounded-lg shadow-sm mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                <DetailRow label="Education" value={data.profile_education} />
                <DetailRow label="Occupation" value={data.profile_occupation} />
                <DetailRow label="Whatsapp No" value={data.profile_whatsapp} />
                <DetailRow
                  label="Main Contact No"
                  value={data.profile_main_contact_num}
                />
                <DetailRow
                  label="Reference Name"
                  value={data.profile_ref_contact_name}
                />
                <DetailRow
                  label="Reference Mobile No"
                  value={data.profile_ref_contact_num}
                />
                <DetailRow
                  label="Physical Disability (if any)"
                  value={data.profile_physical_disablity}
                />
                <DetailRow
                  label="Have you married before?"
                  value={data.profile_have_married_before}
                />
                <DetailRow
                  label="Working City"
                  value={data.profile_working_city}
                />
                <DetailRow
                  label="Village, City"
                  value={data.profile_village_city}
                />
                <DetailRow
                  label="Address"
                  value={data.profile_permanent_address}
                />
                <DetailRow label="Important Note" value={data.profile_note} />
                <DetailRow label="Admin Note" value={data.profile_admin_note} />
              </div>
            </div>
            <h2 className="text-xl font-semibold my-4 flex items-center text-gray-800 px-6">
              <IconCurrencyRupee className="mr-3 h-6 w-6 text-yellow-500" />{" "}
              Payment Details
            </h2>
            {/* Payment Details Section */}
            <div className="bg-[#FFF8E6] p-6 rounded-lg shadow-sm mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                <DetailRow label="Payment Amount" value={data.payment_amount} />
                <DetailRow label="Payment Type" value={data.payment_type} />
                <DetailRow label="Payment Status" value={data.payment_status} />
                <DetailRow label="Payment Trans" value={data.payment_trans} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-start text-gray-700">
    {icon && <div>{icon}</div>}
    <div>
      <p className="text-sm text-gray-500 font-thin">{label}</p>
      <p className="text-sm font-bold text-[#b71c1c]">
        {value || "Not Provided"}
      </p>
    </div>
  </div>
);

export default Testing;
