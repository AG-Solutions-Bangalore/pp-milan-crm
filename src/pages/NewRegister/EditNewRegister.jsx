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
import { ButtonGroup, Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SelectInput from "../../components/common/SelectInput";
import { Tab, Tabs } from "@mui/material";
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
  profile_photo: Yup.mixed().required("Image is required"),
});

const EditNewRegister = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [newregister, setNewRegister] = useState({
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
    profile_admin_note: "",
  });

  console.log(newregister, "file");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [education, setEducation] = useState([]);
  const [image, setImage] = useState("");
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(image, "image");
  const getTemplateData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/panel-fetch-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.user) {
        setNewRegister(res.data.user);
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
  }, [id]);

  const onSubmit = async (values) => {
    console.log("in");
    setIsButtonDisabled(true);
    const formData = new FormData();

    // Append fields to formData
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
    // formData.append("profile_validity_ends", values.profile_validity_ends);
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("profile_photo", image); // Ensure `image` is a valid File object
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

    try {
      // Send the PUT request with the correct `formData`
      await axios.post(
        `${BASE_URL}/panel-update-new-registration`,
        formData, // Corrected to use lowercase `formData`
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Register Updated Successfully");
      navigate("/newregister");
    } catch (error) {
      toast.error("Error updating Register");
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
  const RandomValue = Date.now();

  return (
    <Layout>
      <div className="bg-white p-4 rounded-lg">
        <div className="sticky top-0 p-2 mb-4 border-b-2 border-red-800 bg-red-50 rounded-lg flex">
          <h2 className="px-5 text-black text-lg flex items-center gap-2 p-2">
            <IconInfoCircle className="w-4 h-4" />
            Edit NewRegister
          </h2>
        </div>
        <Formik
          initialValues={newregister}
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
                {/* {activeTab === "contact" && ( */}
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

                      <ErrorMessage
                        name="profile_photo"
                        component="div"
                        className="text-red-500 text-xs"
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
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="border-2 h-[35rem] overflow-y-auto  border-red-800 rounded-lg p-2 mt-4">
                    {" "}
                    <div className="grid grid-cols-1 p-2  gap-2">
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
                  onClick={() => navigate("/newregister")}
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

export default EditNewRegister;
