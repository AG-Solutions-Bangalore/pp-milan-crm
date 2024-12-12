import React, { useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { IconInfoCircle } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  notification_heading: Yup.string().required("Heading is required"),
  notification_des: Yup.string().required("Description is required"),
  notification_date: Yup.date().required("Date is required"),
  notification_image: Yup.mixed().required("Image is required"),
});

const CreateNotification = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onSubmit = async (values) => {
    setIsButtonDisabled(true);

    try {
      const formData = new FormData();
      formData.append("notification_heading", values.notification_heading);
      formData.append("notification_des", values.notification_des);
      formData.append("notification_date", values.notification_date);
      formData.append("notification_image", values.notification_image);

      await axios.post(`${BASE_URL}/panel-create-notification`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Notification created successfully");
      navigate("/notification");
    } catch (error) {
      console.error("Error creating notification:", error);
      toast.error("Failed to create notification");
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

  return (
    <Layout>
      <div className="bg-white p-4 rounded-lg">
        <div className="sticky top-0 p-2 mb-4 border-b-2 border-red-800 bg-red-50 rounded-lg flex">
          <h2 className="px-5 text-black text-lg flex items-center gap-2 p-2">
            <IconInfoCircle className="w-4 h-4" />
            Create Notification
          </h2>
        </div>
        <Formik
          initialValues={{
            notification_heading: "",
            notification_des: "",
            notification_date: "",
            notification_image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form
              autoComplete="off"
              className="w-full max-w-7xl mx-auto space-y-8"
            >
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 p-2 gap-6">
                  <div>
                    <FormLabel required>Notification Image</FormLabel>
                    <input
                      type="file"
                      onChange={(e) => {
                        setFieldValue("notification_image", e.target.files[0]);
                      }}
                      className={inputClass}
                    />
                    <ErrorMessage
                      name="notification_image"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div>
                    <FormLabel required>Notification Heading</FormLabel>
                    <Field name="notification_heading" className={inputClass} />
                    <ErrorMessage
                      name="notification_heading"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                  <div>
                    <FormLabel required>Notification Date</FormLabel>
                    <Field
                      type="date"
                      name="notification_date"
                      className={inputClass}
                    />
                    <ErrorMessage
                      name="notification_date"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 p-2 gap-6">
                  <div>
                    <FormLabel required>Notification Description</FormLabel>
                    <Field
                      as="textarea"
                      name="notification_des"
                      className={`${inputClass} resize-y`}
                      rows="6"
                    />
                    <ErrorMessage
                      name="notification_des"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-4">
                <Button
                  className="w-36 text-white bg-blue-600"
                  type="submit"
                  disabled={isSubmitting || isButtonDisabled}
                >
                  {isButtonDisabled ? "Creating..." : "Create"}
                </Button>
                <Button
                  className="w-36 text-white bg-red-600"
                  onClick={() => navigate("/notification")}
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

export default CreateNotification;
