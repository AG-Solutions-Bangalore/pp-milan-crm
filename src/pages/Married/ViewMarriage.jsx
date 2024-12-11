import React, { useEffect, useRef, useState } from "react";
import Page from "../../layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL, { ImagePath, NoImagePath } from "../../base/BaseUrl";
import ReactToPrint from "react-to-print";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import { Card } from "@material-tailwind/react";
import { IconCurrencyRupee, IconFriends } from "@tabler/icons-react";
import moment from "moment";
const ViewMarriage = () => {
  const { id } = useParams();
  const printRef = useRef(null);
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");

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

  return (
    <Page>
      <div className=" container mx-auto px-4 py-6">
        <Card
          ref={printRef}
          className="w-full shadow-2xl rounded-xl print:shadow-none print:rounded-none overflow-hidden"
        >
          <div className="bg-gradient-to-r from-red-100 to-red-50/10 text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="flex justify-center rounded-full">
                  {image ? (
                    <img
                      src={`${ImagePath}/${image}`}
                      alt="Profile"
                      className="h-20 w-20 md:h-32 md:w-32  rounded-full border-8 border-white/30"
                    />
                  ) : (
                    <img
                      src={NoImagePath}
                      alt="No image available"
                      className="h-20 w-20 md:h-32 md:w-32 rounded-full"
                    />
                  )}
                </div>

                <div className="text-center md:text-left">
                  <h1 className="text-xl md:text-3xl font-bold mb-2 text-pink-500">
                    {data.name}
                  </h1>
                  <h2 className="text-lg md:text-md font-semibold text-pink-400">
                    {data.profile_gender}
                  </h2>
                  <h2 className="text-lg md:text-md font-semibold text-pink-400">
                    {data.email}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary/10 p-5 print:rounded-none rounded-lg">
            <div className="bg-secondary/10 p-5 print:rounded-none rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-black/90">
                <User className="mr-3 h-6 w-6" /> Personal Information
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
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

                {/* <DetailRow label="Email" value={data.email} /> */}
              </div>
            </div>

            <div className="bg-secondary/10 p-5 print:rounded-none rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-black/90">
                <IconFriends className="mr-3 h-6 w-6 " /> Family Details
              </h2>
              <div className="grid md:grid-cols-5 gap-6">
                <DetailRow label="Education" value={data.profile_education} />
                <DetailRow label="Occupation" value={data.profile_occupation} />
                <DetailRow label="Whatsapp No" value={data.profile_whatsapp} />
                <DetailRow
                  label="Main Contact No"
                  value={data.profile_main_contact_num}
                />
                <DetailRow
                  label="Refrence Name"
                  value={data.profile_ref_contact_name}
                />
                <DetailRow
                  label="Refrence Mobile No"
                  value={data.profile_main_contact_num}
                />
                <DetailRow
                  label="Physical Disablity (if any)"
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

            <div className="bg-secondary/10 p-5 print:rounded-none rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-black/90">
                <IconCurrencyRupee className="mr-3 h-6 w-6" /> Payment Details
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
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
  <div className="flex items-start">
    {icon && <div>{icon}</div>}
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value || "Not Provided"}</p>
    </div>
  </div>
);

export default ViewMarriage;
