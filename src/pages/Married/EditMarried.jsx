import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import BASE_URL, { ImagePath, NoImagePath } from "../../base/BaseUrl";
import {
  IconCurrencyRupee,
  IconInfoCircle,
  IconPhone,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import { ButtonGroup, Button, IconButton } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SelectInput from "../../components/common/SelectInput";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import moment from "moment";

const validationSchema = Yup.object({
  profile_permanent_address: Yup.string().required("Address is required"),
  profile_education: Yup.string().required("Education is required"),
  profile_occupation: Yup.string().required("Occupation is required"),

  profile_whatsapp: Yup.string()
    .matches(/^\d+$/, "Whatsapp must be only numbers")
    .required("Whatsapp is required")
    .length(10, "Whatsapp must be exactly 10 digits"),
  profile_main_contact_num: Yup.string()
    .matches(/^\d+$/, "Main Contact must be only numbers")
    .required("Main Contact is required")
    .length(10, "Main Contact must be exactly 10 digits"),
  profile_ref_contact_mobile: Yup.string()
    .matches(/^\d+$/, "Ref Contact must be only numbers")
    .required("Ref Contact is required")
    .length(10, "Ref Contact must be exactly 10 digits"),

  profile_ref_contact_name: Yup.string().required("Ref Contact is required"),
  profile_physical_disablity: Yup.string().required("Disabled is required"),
  profile_have_married_before: Yup.string().required(
    "Married Before is required"
  ),
  profile_working_city: Yup.string().required("City is required"),
  profile_village_city: Yup.string().required("Village is required"),

  payment_amount: Yup.string()
    .matches(/^\d+$/, "Amount must be only numbers")
    .required("Amount Contact is required"),
  payment_trans: Yup.string().required("PaymentTrans is required"),
  profile_validity_ends: Yup.string().required("Validity is required"),
});

const EditMarried = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [married, setMarried] = useState({
    name: "",
    profile_date_of_birth: "",
    profile_gender: "",
    profile_permanent_address: "",
    profile_time_of_birth: "",
    profile_comunity_name: "",
    profile_gotra: "",
    profile_education: "",
    profile_occupation: "",
    email: "",
    profile_mobile: "",
    profile_whatsapp: "",
    profile_main_contact_num: "",
    profile_father_full_name: "",
    profile_ref_contact_name: "",
    profile_ref_contact_mobile: "",
    profile_physical_disablity: "",
    profile_have_married_before: "",
    profile_working_city: "",
    profile_village_city: "",
    profile_place_of_birth: "",
    profile_note: "",
    profile_photo: "",
    payment_amount: "",
    payment_type: "",
    payment_trans: "",
    payment_status: "",
    profile_admin_note: "",
    s_whatsapp: false,
    s_email: false,
    s_sms: false,
    s_notification: false,
    profile_validity_ends: "",
  });

  console.log(married, "file");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [education, setEducation] = useState([]);
  const [payment, setPayment] = useState([]);
  const [image, setImage] = useState("");
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const getTemplateData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/panel-fetch-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data?.user) {
        const user = res.data.user;
        setMarried({
          ...married,
          ...user,
          s_whatsapp: user.s_whatsapp === "Yes",
          s_email: user.s_email === "Yes",
          s_sms: user.s_sms === "Yes",
          s_notification: user.s_notification === "Yes",
        });
        setSelectedGender(res.data.user.profile_gender);
        setImage(res.data.user.profile_photo);
        setImages(res.data.user.profile_photo);
      } else {
        throw new Error("User data is missing");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      toast.error("Failed to load user data");
    }
  };

  const getPayment = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/panel-fetch-payment-mode`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.paymentMode) {
        setPayment(res.data.paymentMode);
      } else {
        throw new Error("Payment data is missing");
      }
    } catch (error) {
      console.error("Failed to fetch Payment:", error);
      toast.error("Failed to load Payment data");
    }
  };
  console.log(selectedGender, "genferSS");
  const getEducationdata = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/panel-fetch-education`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.education) {
        setEducation(res.data.education);
      } else {
        throw new Error("education data is missing");
      }
    } catch (error) {
      console.error("Failed to fetch education:", error);
      toast.error("Failed to load education data");
    }
  };

  useEffect(() => {
    getTemplateData();
    getEducationdata();
    getPayment();
  }, [id]);

  // };
  const onSubmit = async (values) => {
    console.log("in");
    setIsButtonDisabled(true);
    const formData = new FormData();
    formData.append("profile_whatsapp", values.profile_whatsapp);
    formData.append(
      "profile_main_contact_num",
      values.profile_main_contact_num
    );
    formData.append("profile_working_city", values.profile_working_city);
    formData.append(
      "profile_ref_contact_name",
      values.profile_ref_contact_name
    );
    formData.append("profile_village_city", values.profile_village_city);
    formData.append("profile_education", values.profile_education);
    formData.append("profile_occupation", values.profile_occupation);
    formData.append(
      "profile_have_married_before",
      values.profile_have_married_before
    );
    formData.append(
      "profile_physical_disablity",
      values.profile_physical_disablity
    );
    formData.append("profile_note", values.profile_note);
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("profile_photo", image);
    formData.append("profile_admin_note", values.profile_admin_note);
    formData.append(
      "profile_ref_contact_mobile",
      values.profile_ref_contact_mobile
    );

    formData.append("profile_note", values.profile_note);
    formData.append("profile_place_of_birth", values.profile_place_of_birth);
    formData.append(
      "profile_father_full_name",
      values.profile_father_full_name
    );
    formData.append("profile_mobile", values.profile_mobile);
    formData.append("profile_gotra", values.profile_ref_contact_mobile);

    formData.append("profile_comunity_name", values.profile_comunity_name);

    formData.append("profile_time_of_birth", values.profile_time_of_birth);
    formData.append(
      "profile_permanent_address",
      values.profile_permanent_address
    );
    formData.append("profile_gender", values.profile_gender);
    formData.append("profile_date_of_birth", values.profile_date_of_birth);
    formData.append("profile_id", id);

    formData.append("payment_amount", values.payment_amount);
    formData.append("payment_type", values.payment_type);
    formData.append("payment_trans", values.payment_trans);
    formData.append("payment_status", values.payment_status);
    formData.append("profile_validity_ends", values.profile_validity_ends);

    formData.append("s_whatsapp", values.s_whatsapp ? "Yes" : "No");
    formData.append("s_email", values.s_email ? "Yes" : "No");
    formData.append("s_sms", values.s_sms ? "Yes" : "No");
    formData.append("s_notification", values.s_notification ? "Yes" : "No");

    try {
      await axios.post(
        `${BASE_URL}/panel-update-male-female`,
        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Married Updated Successfully");
      navigate("/married");
    } catch (error) {
      toast.error("Error updating Married");
      console.error(error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-sm font-semibold text-black mb-1">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-300 border-red-200";

  const Marrieed = [
    { value: "Yes And Divorced", label: "Yes And Divorced" },
    { value: "Yes and Spouse died", label: "Yes and Spouse died" },
    { value: "No", label: "No" },
  ];
  const Disabled = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];
  const paymentStatus = [
    { value: "Pending", label: "Pending" },
    { value: "Received", label: "Received" },
  ];
  const paymentType = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Chequee" },
    { value: "Online", label: "Online" },
  ];
  const handleAddYear = (years, setFieldValue, values) => {
    const currentDate = new Date(values.profile_validity_ends || new Date());
    currentDate.setFullYear(currentDate.getFullYear() + years);
    setFieldValue(
      "profile_validity_ends",
      currentDate.toISOString().split("T")[0]
    );
  };
  const RandomValue = Date.now();

  return (
    <Layout>
      <div className="bg-white p-4 rounded-lg">
        <div className="sticky top-0 p-2 mb-4 border-b-2 border-red-800 bg-red-50 rounded-lg flex">
          <h2 className="px-5 text-black text-lg flex items-center gap-2 p-2">
            <IconInfoCircle className="w-4 h-4" />
            Edit Married
          </h2>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="tabs"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab
              value="contact"
              label={
                <div className="flex items-center">
                  <IconPhone className="mr-2" />
                  Contact
                </div>
              }
            />
            <Tab
              value="payment"
              label={
                <div className="flex items-center">
                  <IconCurrencyRupee />
                  Payment
                </div>
              }
            />
          </Tabs>
          {/* </Box> */}
        </div>
        <Formik
          initialValues={married}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={onSubmit}
        >
          {({ values, handleChange, handleBlur, setFieldValue }) => (
            <Form
              autoComplete="off"
              className="w-full max-w-7xl mx-auto  space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4">
                {activeTab === "contact" && (
                  <div className="lg:col-span-9">
                    <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <SelectInput
                          label="Education"
                          name="profile_education"
                          options={education.map((item) => ({
                            value: item.education_name,
                            label: item.education_name,
                          }))}
                          value={values.profile_education}
                          // required={true}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          ErrorMessage={ErrorMessage}
                        />
                      </div>

                      <div>
                        <FormLabel required>Occupation</FormLabel>
                        <Field
                          type="text"
                          name="profile_occupation"
                          value={values.profile_occupation}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          // required
                        />
                        <ErrorMessage
                          name="profile_occupation"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div>
                        <FormLabel required>Whatsapp No</FormLabel>
                        <Field
                          type="text"
                          as="input"
                          maxLength="10"
                          name="profile_whatsapp"
                          value={values.profile_whatsapp}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9]/g, "");
                            handleChange({
                              target: {
                                name: "profile_whatsapp",
                                value,
                              },
                            });

                            console.log(value, "whatsapp");
                          }}
                          onBlur={handleBlur}
                          className={inputClass}
                          inputMode="numeric"
                        />
                        <ErrorMessage
                          name="profile_whatsapp"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <FormLabel required>Main Contact No</FormLabel>
                        <Field
                          type="text"
                          as="input"
                          maxLength="10"
                          name="profile_main_contact_num"
                          value={values.profile_main_contact_num}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9]/g, "");
                            handleChange({
                              target: {
                                name: "profile_main_contact_num",
                                value,
                              },
                            });

                            console.log(value, "main cn");
                          }}
                          onBlur={handleBlur}
                          className={inputClass}
                          inputMode="numeric"
                        />
                        <ErrorMessage
                          name="profile_main_contact_num"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div>
                        <FormLabel required>Refrence Name</FormLabel>
                        <Field
                          type="text"
                          name="profile_ref_contact_name"
                          value={values.profile_ref_contact_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          // required
                        />
                        <ErrorMessage
                          name="profile_ref_contact_name"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div>
                        <FormLabel required>Refrence Mobile No</FormLabel>
                        <Field
                          type="text"
                          as="input"
                          maxLength="10"
                          name="profile_ref_contact_mobile"
                          value={values.profile_ref_contact_mobile}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9]/g, "");
                            handleChange({
                              target: {
                                name: "profile_ref_contact_mobile",
                                value,
                              },
                            });

                            console.log(value, "main cn");
                          }}
                          onBlur={handleBlur}
                          className={inputClass}
                          inputMode="numeric"
                        />
                        <ErrorMessage
                          name="profile_ref_contact_mobile"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div>
                        <SelectInput
                          label="Physical Disablity (if any)"
                          name="profile_physical_disablity"
                          options={Disabled}
                          onChange={handleChange}
                          value={values.profile_physical_disablity}
                          onBlur={handleBlur}
                          ErrorMessage={ErrorMessage}
                          // required={true}
                        />
                      </div>
                      <div>
                        <SelectInput
                          label="Have you married before?"
                          name="profile_have_married_before"
                          options={Marrieed}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.profile_have_married_before}
                          ErrorMessage={ErrorMessage}
                          // required={true}
                        />
                      </div>
                      <div>
                        <FormLabel required>Working City</FormLabel>
                        <Field
                          type="text"
                          name="profile_working_city"
                          value={values.profile_working_city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          // required
                        />

                        <ErrorMessage
                          name="profile_working_city"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <FormLabel required>Village, City</FormLabel>
                        <Field
                          type="text"
                          name="profile_village_city"
                          value={values.profile_village_city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          // required
                        />
                        <ErrorMessage
                          name="profile_village_city"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div>
                        <FormLabel>Photo </FormLabel>
                        <input
                          type="file"
                          // value={values.profile_main_contact_num}
                          // onChange={handleFileChange}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setImage(file); // Update local state for the image
                            setFieldValue("profile_photo", file); // Update Formik field value
                          }}
                          // required
                          // onBlur={handleBlur}
                          className={inputClass}
                        />
                      </div>
                      <div className="flex justify-center">
                        {image ? (
                          <div className="relative h-20 w-40">
                            {loading && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
                              </div>
                            )}
                            <img
                              src={`${ImagePath}/${images}?t=${RandomValue}`}
                              alt="Profile"
                              className={`h-20 w-40 object-contain ${
                                loading ? "hidden" : ""
                              }`}
                              onLoad={() => setLoading(false)}
                            />
                          </div>
                        ) : (
                          <img
                            src={NoImagePath}
                            alt="No image available"
                            className="h-20 w-35"
                          />
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 p-2   gap-6">
                      <div>
                        <FormLabel required>Address</FormLabel>
                        <Field
                          as="textarea"
                          name="profile_permanent_address"
                          value={values.profile_permanent_address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${inputClass} resize-none overflow-y-auto`} // resize-y will allow vertical resizing
                          rows="2"
                          // required
                        />
                        <ErrorMessage
                          name="profile_permanent_address"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <FormLabel>Important Note</FormLabel>
                        <Field
                          as="textarea"
                          name="profile_note"
                          value={values.profile_note}
                          onChange={handleChange}
                          className={`${inputClass} resize-none overflow-y-auto`}
                          rows="2"
                          // required
                        />
                      </div>
                      <div>
                        <FormLabel>Admin Note</FormLabel>
                        <Field
                          as="textarea"
                          name="profile_admin_note"
                          value={values.profile_admin_note}
                          onChange={handleChange}
                          className={`${inputClass} resize-none overflow-y-auto`}
                          rows="2"
                        />
                      </div>

                      {/* <Box sx={{ mb: 3 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.s_whatsapp}
                              onChange={() =>
                                setFieldValue("s_whatsapp", !values.s_whatsapp)
                              }
                              name="s_whatsapp"
                              color="primary"
                            />
                          }
                          label={
                            <Typography sx={{ fontWeight: 700 }}>
                              WHATSAPP
                            </Typography>
                          }
                          sx={{ fontSize: "50px", mb: 1 }}
                        />

                   
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.s_email}
                              onChange={() =>
                                setFieldValue("s_email", !values.s_email)
                              }
                              name="s_email"
                              color="primary"
                            />
                          }
                          label={
                            <Typography sx={{ fontWeight: 700 }}>
                              EMAIL
                            </Typography>
                          }
                          sx={{ fontSize: "50px", mb: 1 }}
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.s_sms}
                              onChange={() =>
                                setFieldValue("s_sms", !values.s_sms)
                              }
                              name="s_sms"
                              color="primary"
                            />
                          }
                          label={
                            <Typography sx={{ fontWeight: 700 }}>
                              SMS
                            </Typography>
                          }
                          sx={{ fontSize: "50px", mb: 1 }}
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.s_notification}
                              onChange={() =>
                                setFieldValue(
                                  "s_notification",
                                  !values.s_notification
                                )
                              }
                              name="s_notification"
                              color="primary"
                            />
                          }
                          label={
                            <Typography sx={{ fontWeight: 700 }}>
                              NOTIFICATION
                            </Typography>
                          }
                          sx={{ fontSize: "50px", mb: 1 }}
                        />
                      </Box> */}
                    </div>
                  </div>
                )}
                {activeTab === "payment" && (
                  <div className="lg:col-span-9">
                    <div className="grid grid-cols-1 p-2   gap-6">
                      <div>
                        <FormLabel required>Payment Amount</FormLabel>
                        <Field
                          type="text"
                          as="input"
                          name="payment_amount"
                          value={values.payment_amount}
                          onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9]/g, "");
                            handleChange({
                              target: {
                                name: "payment_amount",
                                value,
                              },
                            });
                            console.log(value);
                          }}
                          onBlur={handleBlur}
                          className={inputClass}
                          inputMode="numeric"
                        />
                        <ErrorMessage
                          name="payment_amount"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <SelectInput
                          label="Payment Type"
                          name="payment_type"
                          options={payment.map((item) => ({
                            value: item.payment_mode,
                            label: item.payment_mode,
                          }))}
                          value={values.payment_type}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <SelectInput
                          label="Payment Status"
                          name="payment_status"
                          options={paymentStatus}
                          value={values.payment_status}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <FormLabel required>Payment Trans</FormLabel>
                        <Field
                          type="text"
                          name="payment_trans"
                          value={values.payment_trans}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={inputClass}
                          // required
                        />
                        <ErrorMessage
                          name="payment_trans"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div>
                        <FormLabel required>Validity Date</FormLabel>
                        <div className="flex justify-between items-center space-x-2">
                          <IconButton
                            type="button"
                            onClick={() =>
                              handleAddYear(1, setFieldValue, values)
                            }
                          >
                            1
                          </IconButton>

                          <Field
                            type="date"
                            name="profile_validity_ends"
                            value={values.profile_validity_ends}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={inputClass}
                          />
                          <ErrorMessage
                            name="profile_validity_ends"
                            component="div"
                            className="text-red-500 text-xs"
                          />

                          <IconButton
                            type="button"
                            onClick={() =>
                              handleAddYear(2, setFieldValue, values)
                            }
                          >
                            2
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="lg:col-span-3">
                  <div className="h-[35rem] overflow-y-auto border-2 border-red-800 rounded-lg p-2 mt-4">
                    {" "}
                    <div className="grid grid-cols-1 p-2   gap-2">
                      <DetailRow label="Name" value={values.name} />
                      <DetailRow label="Gender" value={values.profile_gender} />
                      <DetailRow
                        label="Date Of Birth"
                        // value={values.profile_date_of_birth}
                        value={moment(values.profile_date_of_birth).format(
                          "DD-MM-YYYY"
                        )}
                      />
                      <DetailRow
                        label="Time Of Birth"
                        value={values.profile_time_of_birth}
                      />
                      <DetailRow
                        label="Community"
                        value={values.profile_comunity_name}
                      />
                      <DetailRow label="Gotra" value={values.profile_gotra} />
                      <DetailRow label="Email" value={values.email} />
                      <DetailRow
                        label="Mobile No"
                        value={values.profile_mobile}
                      />
                      <DetailRow
                        label="Height"
                        value={
                          values.profile_height
                            ? `${(values.profile_height / 30.48).toFixed(
                                2
                              )} Feet`
                            : ""
                        }
                      />
                      <DetailRow
                        label="Father Name"
                        value={values.profile_father_full_name}
                      />
                      <DetailRow
                        label="Place of Birth "
                        value={values.profile_place_of_birth}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-4">
                <Button
                  className="w-36 text-white bg-blue-600"
                  type="submit"
                  disabled={isButtonDisabled}
                  onClick={() => console.log("click")}
                >
                  {isButtonDisabled ? "Updating..." : "Update"}
                </Button>

                <Button
                  className="w-36 text-white bg-red-600"
                  onClick={() => navigate("/married")}
                >
                  Back
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <div className="  bg-gradient-to-r from-red-100 via-pink-50 to-red-50/10 text-white px-3 py-1">
    {icon && <div>{icon}</div>}
    <div>
      <p className="text-sm text-gray-800 ">{label}</p>
      <p className="text-gray-900 text-md font-[700]">
        {value || "Not Provided"}
      </p>
    </div>
  </div>
);

export default EditMarried;
