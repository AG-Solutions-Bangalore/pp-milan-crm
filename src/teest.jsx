import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import BASE_URL, { ImagePath, NoImagePath } from "../../base/BaseUrl";
import { IconInfoCircle } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { ButtonGroup, Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SelectInput from "../../components/common/SelectInput";

// Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Template name is required"),
  profile_date_of_birth: Yup.string().required("Profile date is required"),
  profile_gender: Yup.string().required("Gender is required"),
  profile_permanent_address: Yup.string().required("Address is required"),
  profile_time_of_birth: Yup.string().required("Time is required"),
  profile_comunity_name: Yup.string().required("Community is required"),
  profile_gotra: Yup.string().required("Gotra is required"),
  profile_education: Yup.string().required("Education is required"),
  profile_occupation: Yup.string().required("Occupation is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  profile_mobile: Yup.number()
    .required("PhoneNumber is required")
    .min(1000000000, "Phone number must be exactly 10 digits")
    .max(9999999999, "Phone number must be exactly 10 digits"),
  profile_whatsapp: Yup.number()
    .required("PhoneNumber is required")
    .min(1000000000, "Phone number must be exactly 10 digits")
    .max(9999999999, "Phone number must be exactly 10 digits"),
  profile_main_contact_num: Yup.number()
    .required("PhoneNumber is required")
    .min(1000000000, "Phone number must be exactly 10 digits")
    .max(9999999999, "Phone number must be exactly 10 digits"),

  profile_height: Yup.string().required("Height is required"),
  profile_father_full_name: Yup.string().required("fathername is required"),
  profile_ref_contact_name: Yup.string().required("Ref Contact is required"),
  profile_ref_contact_mobile: Yup.string().required("Ref Mobile is required"),
  profile_physical_disablity: Yup.string().required("Disabled is required"),
  profile_have_married_before: Yup.string().required(
    "Married Before is required"
  ),
  profile_working_city: Yup.string().required("City is required"),
  profile_village_city: Yup.string().required("Village is required"),
  profile_place_of_birth: Yup.string().required("Birth Place is required"),
  profile_photo: Yup.mixed()
    .required("Image is required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= 1048576
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
    ),
  profile_note: Yup.string().required("NOtes is required"),
  payment_amount: Yup.number().required(" Amount is required"),
  payment_type: Yup.string().required("PaymentType is required"),
  payment_trans: Yup.string().required("PaymentTrans is required"),
  payment_status: Yup.string().required("PaymentStatus is required"),
  profile_admin_note: Yup.string().required("PaymentAdmin is required"),
});

const EditNewRegister = () => {
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
    payment_amount: "",
    payment_type: "",
    payment_trans: "",
    payment_status: "",
    profile_admin_note: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [education, setEducation] = useState([]);
  const [image, setImage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
      } else {
        throw new Error("User data is missing");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      toast.error("Failed to load user data");
    }
  };

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
    setIsButtonDisabled(true);
    const data = {
      template_name: values.name,
      template_subject: values.template_subject,
      template_design: values.template_design,
      template_url: values.template_url,
      template_status: values.template_status,
      profile_gender: selectedGender,
    };
    try {
      await axios.put(`${BASE_URL}/panel-update-template/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Template Updated Successfully");
      navigate("/templates");
    } catch (error) {
      toast.error("Error updating template");
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
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-red-300 border-green-500";

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
  return (
    <Layout>
      <div className="bg-white p-4 rounded-lg">
        <div className="sticky top-0 p-2 mb-4 border-b-2 border-green-500 bg-red-50 rounded-lg ">
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
              className="w-full max-w-7xl mx-auto p-6 space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4">
                <div className="lg:col-span-9">
                  <div className="grid grid-cols-1 p-4 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <FormLabel required>Name</FormLabel>
                      <Field
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClass} cursor-not-allowed `}
                        disabled
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div className="w-full">
                      <FormLabel required>Gender</FormLabel>
                      <ButtonGroup className="w-full h-[36px]">
                        <Button
                          className={`${
                            selectedGender === "Male"
                              ? "bg-blue-500 shadow-lg shadow-blue-500"
                              : "bg-gray-500"
                          } text-white w-full `}
                          onClick={() => setSelectedGender("Male")}
                        >
                          Male
                        </Button>

                        <Button
                          className={`${
                            selectedGender === "Female"
                              ? "bg-pink-500 shadow-lg shadow-red-500"
                              : "bg-gray-500 "
                          } text-white w-full `}
                          onClick={() => setSelectedGender("Female")}
                        >
                          Female
                        </Button>
                      </ButtonGroup>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <FormLabel required>Date Of Birth</FormLabel>
                      <Field
                        type="Date"
                        name="profile_date_of_birth"
                        value={values.profile_date_of_birth}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClass} cursor-not-allowed `}
                        disabled
                      />
                      <ErrorMessage
                        name="profile_date_of_birth"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <FormLabel required>Time Of Birth</FormLabel>
                      <Field
                        type="time"
                        name="profile_time_of_birth"
                        value={values.profile_time_of_birth}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClass} cursor-not-allowed `}
                        disabled
                      />
                      <ErrorMessage
                        name="profile_time_of_birth"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <FormLabel required>Community</FormLabel>
                      <Field
                        type="text"
                        name="profile_comunity_name"
                        value={values.profile_comunity_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClass} cursor-not-allowed `}
                        disabled
                      />
                      <ErrorMessage
                        name="profile_comunity_name"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <FormLabel required>Gotra</FormLabel>
                      <Field
                        type="text"
                        name="profile_gotra"
                        value={values.profile_gotra}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClass} cursor-not-allowed `}
                        disabled
                      />
                      <ErrorMessage
                        name="profile_gotra"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <SelectInput
                        label="Education"
                        name="profile_education"
                        options={education.map((item) => ({
                          value: item.id,
                          label: item.education_name,
                        }))}
                        value={values.profile_education}
                        required={true}
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
                      />
                      <ErrorMessage
                        name="profile_occupation"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <FormLabel required>Email</FormLabel>
                      <Field
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClass} cursor-not-allowed `}
                        disabled
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <FormLabel required>Mobile No</FormLabel>
                      <Field
                        type="number"
                        name="profile_mobile"
                        value={values.profile_mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // className={inputClass}
                        className={`${inputClass} cursor-not-allowed `}
                        disabled
                      />
                      <ErrorMessage
                        name="profile_mobile"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <FormLabel required>Whatsapp No</FormLabel>
                      <Field
                        type="text"
                        maxLength="10"
                        name="profile_whatsapp"
                        value={values.profile_whatsapp}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass}
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
                        maxLength="10"
                        name="profile_main_contact_num"
                        value={values.profile_main_contact_num}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass}
                      />
                      <ErrorMessage
                        name="profile_main_contact_num"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div>
                      <FormLabel required>Height</FormLabel>
                      <Field
                        type="text"
                        name="profile_height"
                        value={
                          values.profile_height
                            ? `${(values.profile_height / 30.48).toFixed(
                                2
                              )} Feet`
                            : ""
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClass} cursor-not-allowed `}
                        disabled
                      />
                    </div>
                    <div>
                      <FormLabel required>Father Name</FormLabel>
                      <Field
                        type="text"
                        name="profile_father_full_name"
                        value={values.profile_father_full_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClass} cursor-not-allowed `}
                        disabled
                      />
                      <ErrorMessage
                        name="profile_father_full_name"
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
                        maxLength="10"
                        name="profile_ref_contact_mobile"
                        value={values.profile_main_contact_num}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass}
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
                      />
                    </div>
                    <div>
                      <SelectInput
                        label="Have you been married before?"
                        name="profile_have_married_before"
                        options={Marrieed}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.profile_have_married_before}
                        ErrorMessage={ErrorMessage}
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
                      />
                      <ErrorMessage
                        name="profile_village_city"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <FormLabel required>Place of Birth </FormLabel>
                      <Field
                        type="text"
                        name="profile_place_of_birth"
                        value={values.profile_place_of_birth}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClass} cursor-not-allowed `}
                        disabled
                      />
                      <ErrorMessage
                        name="profile_place_of_birth"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>

                    <div>
                      <FormLabel>Photo </FormLabel>
                      <input
                        type="file"
                        onChange={(event) => {
                          setFieldValue(
                            "profile_photo",
                            event.currentTarget.files[0]
                          );
                        }}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="profile_photo"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div className="flex justify-center">
                      {image ? (
                        <img
                          src={`${ImagePath}/${image}`}
                          alt="Profile"
                          className="h-20 w-40 object-contain"
                        />
                      ) : (
                        <img
                          src={NoImagePath}
                          alt="No image available"
                          className="h-20 w-35"
                        />
                      )}
                    </div>

                    <div>
                      <FormLabel required>Payment Amount</FormLabel>
                      <Field
                        type="number"
                        name="payment_amount"
                        value={values.payment_amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass}
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
                        options={paymentType}
                        value={values.payment_type}
                        required={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        ErrorMessage={ErrorMessage}
                      />
                    </div>
                    <div>
                      <SelectInput
                        label="Payment Status"
                        name="payment_status"
                        options={paymentStatus}
                        value={values.payment_status}
                        required={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        ErrorMessage={ErrorMessage}
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
                      />
                      <ErrorMessage
                        name="payment_trans"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
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
                      />
                      <ErrorMessage
                        name="profile_permanent_address"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <FormLabel required>Important Note</FormLabel>
                      <Field
                        as="textarea"
                        name="profile_note"
                        value={values.profile_note}
                        onChange={handleChange}
                        className={`${inputClass} resize-none overflow-y-auto`}
                        rows="2"
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
                  <div>
                    {" "}
                    <div>
                      <DetailRow label="Name" value={values.name} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-4">
                <Button
                  className="w-36 text-white bg-blue-600"
                  type="submit"
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? "Updating..." : "Update"}
                </Button>
                <Button
                  className="w-36 text-white bg-red-600"
                  onClick={() => navigate("/templates")}
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
  <div className="flex items-start">
    {icon && <div>{icon}</div>}
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value || "Not Provided"}</p>
    </div>
  </div>
);

export default EditNewRegister;
