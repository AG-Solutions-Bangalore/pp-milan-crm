import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import BASE_URL from "../../base/BaseUrl";
import { Tooltip } from "@mantine/core";
import {
  MantineReactTable,
  useMantineReactTable,
  MRT_GlobalFilterTextInput,
  MRT_ToggleFiltersButton,
} from "mantine-react-table";
import { Box, Button, Center, Flex, Loader, Text } from "@mantine/core";
import {
  IconEdit,
  IconEye,
  IconCircleX,
  IconRadioactive,
} from "@tabler/icons-react";
import { Dialog, FormLabel } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SelectInput from "../../components/common/SelectInput";
import { useNavigate } from "react-router-dom";
import { ImagePath, NoImagePath } from "../../base/BaseUrl";
import { IconButton } from "@material-tailwind/react";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  payment_amount: Yup.number().required(" Amount is required"),
  profile_validity_ends: Yup.date()
    .required("Validity end date is required")
    .typeError("Invalid date format")
    .min(new Date(), "Date must be in the future"),
});
const Married = () => {
  const [married, setMarried] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonDisabled1, setIsButtonDisabled1] = useState(false);
  const [newregister1, setNewRegister1] = useState({
    name: "",
    payment_amount: "",
    payment_type: "",
    payment_trans: "",
    profile_validity_ends: "",
  });

  const [payment, setPayment] = useState([]);

  const navigate = useNavigate();
  const fetchMarriedData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/panel-fetch-married`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMarried(response.data?.user || []);
    } catch (error) {
      console.error("Error fetching template data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getPayment = async () => {
    const token = localStorage.getItem("token");
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
  useEffect(() => {
    fetchMarriedData();
  }, []);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [postId, setPostId] = useState(null);
  const handleOpenDialog = (id) => {
    setPostId(id);
    setOpenDialog1(true);
    getPayment();
  };

  const handleCloseDialog = () => {
    setOpenDialog1(false);
    setPostId(null);
  };
  // const onSubmit = async (values, withEmail = true, actions) => {
  //   if (withEmail) {
  //     setIsButtonDisabled(true);
  //   } else {
  //     setIsButtonDisabled1(true);
  //   }

  //   const token = localStorage.getItem("token");
  //   const data = {
  //     payment_amount: values.payment_amount,
  //     payment_type: values.payment_type,
  //     payment_trans: values.payment_trans,
  //     profile_validity_ends: values.profile_validity_ends,
  //   };
  //   const endpoint = withEmail
  //     ? `${BASE_URL}/panel-update-activation-withemail/${postId}`
  //     : `${BASE_URL}/panel-update-activation-withoutemail/${postId}`;

  //   try {
  //     await axios.put(endpoint, data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const successMessage = withEmail
  //       ? "With email activated successfully"
  //       : "Without email activated successfully";

  //     toast.success(successMessage);
  //     actions.resetForm();
  //     handleCloseDialog();
  //     fetchMarriedData();
  //   } catch (error) {
  //     const errorMessage = withEmail
  //       ? "Error activating with email"
  //       : "Error activating without email";

  //     toast.error(errorMessage);
  //     console.error(error);
  //   } finally {
  //     setIsButtonDisabled(false);
  //     setIsButtonDisabled1(false);
  //   }
  // };
  const onSubmit = async (values, withEmail = true, actions) => {
    if (withEmail) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled1(true);
    }

    const token = localStorage.getItem("token");
    const data = {
      payment_amount: values.payment_amount,
      payment_type: values.payment_type,
      payment_trans: values.payment_trans,
      profile_validity_ends: values.profile_validity_ends,
    };
    const endpoint = withEmail
      ? `${BASE_URL}/panel-update-activation-withemail/${postId}`
      : `${BASE_URL}/panel-update-activation-withoutemail/${postId}`;

    try {
      await axios.put(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const successMessage = withEmail
        ? "With email activated successfully"
        : "Without email activated successfully";

      toast.success(successMessage);
      actions.resetForm();
      handleCloseDialog();
      fetchMarriedData();
    } catch (error) {
      const errorMessage = withEmail
        ? "Error activating with email"
        : "Error activating without email";

      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsButtonDisabled(false);
      setIsButtonDisabled1(false);
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "profile_photo",
        header: "Profile Photo",
        size: 150,
        Cell: ({ row }) => {
          const profilePhoto = row.original.profile_photo;
          const imagePath = profilePhoto
            ? `${ImagePath}${profilePhoto}`
            : NoImagePath;
          const [loading, setLoading] = useState(true);

          return (
            <div
              style={{ position: "relative", width: "50px", height: "50px" }}
            >
              {loading && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Simple loader */}
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      border: "2px solid rgba(0, 0, 0, 0.1)",
                      borderTop: "2px solid #4F46E5",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                </div>
              )}
              <img
                src={imagePath}
                alt={profilePhoto ? "Profile" : "No Profile"}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: loading ? "none" : "block",
                }}
                onLoad={() => setLoading(false)}
              />
            </div>
          );
        },
      },

      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "profile_gender",
        header: "Gender",
        size: 50,
      },
      {
        accessorKey: "profile_father_full_name",
        header: "Father Name",
        size: 50,
      },
      {
        accessorKey: "profile_mobile",
        header: "Mobile Number",
        size: 50,
      },
      {
        accessorKey: "profile_place_of_birth",
        header: "Place of Birth",
        size: 50,
      },
      {
        id: "id",
        header: "Action",
        size: 50,
        enableHiding: false,
        Cell: ({ row }) => (
          <Flex gap="xs">
            <Tooltip label="View" position="top" withArrow>
              <IconEye
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => {
                  navigate(`/married/view/${row.original.id}`);
                }}
              />
            </Tooltip>
            <Tooltip label="Edit" position="top" withArrow>
              <IconEdit
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => {
                  navigate(`/married/edit/${row.original.id}`);
                }}
              />
            </Tooltip>
            <Tooltip label="Activation" position="top" withArrow>
              <IconRadioactive
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => handleOpenDialog(row.original.id)}
              />
            </Tooltip>
          </Flex>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: married,
    enableColumnActions: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    initialState: { showGlobalFilter: true },
    mantineTableContainerProps: { sx: { maxHeight: "400px" } },

    renderTopToolbar: ({ table }) => {
      return (
        <Flex
          p="md"
          justify="space-between"
          sx={{
            overflowX: "auto",
            maxWidth: "100%",
          }}
          flexWrap="wrap"
        >
          {" "}
          <Text size="xl" weight={700}>
            Married
          </Text>
          <Flex gap="sm">
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
        </Flex>
      );
    },
  });

  return (
    <Layout>
      <Box className="max-w-screen">
        {isLoading ? (
          <Center style={{ height: "70vh", flexDirection: "column" }}>
            <Loader size="lg" variant="dots" color="pink" />
            <Text mt="md" color="gray" size="lg">
              Loading, please wait...
            </Text>
          </Center>
        ) : (
          <MantineReactTable table={table} />
        )}
      </Box>
      <Dialog
        open={openDialog1}
        onClose={handleCloseDialog}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={{
          backdropFilter: "blur(5px) sepia(5%)",
          "& .MuiDialog-paper": {
            borderRadius: "18px",
          },
        }}
      >
        <Formik
          initialValues={newregister1}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={onSubmit}
        >
          {({ values, handleChange, handleBlur, setFieldValue, resetForm }) => {
            const handleAddYear = (years) => {
              const currentDate = new Date(
                values.profile_validity_ends || new Date()
              );
              currentDate.setFullYear(currentDate.getFullYear() + years);
              setFieldValue(
                "profile_validity_ends",
                currentDate.toISOString().split("T")[0]
              );
            };
            console.log("Formik ResetForm: ", resetForm);

            return (
              <Form
                autoComplete="off"
                className="w-full max-w-7xl mx-auto space-y-8"
              >
                <div className="p-6 space-y-1 sm:w-[280px] md:w-[500px] bg-white rounded-2xl shadow-md">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h1 className="text-slate-800 text-xl font-semibold">
                        Activation
                      </h1>

                      <div className="flex" onClick={handleCloseDialog}>
                        <Tooltip title="Close">
                          <button type="button" className="ml-3 pl-2">
                            <IconCircleX />
                          </button>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="mt-2 p-4">
                      <div className="grid grid-cols-1 p-2 gap-6">
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
                            options={payment.map((item) => ({
                              value: item.payment_mode,
                              label: item.payment_mode,
                            }))}
                            value={values.payment_type}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            ErrorMessage={ErrorMessage}
                          />
                        </div>
                        <div>
                          <FormLabel required>Validity Date</FormLabel>
                          <div className="flex justify-between space-x-2">
                            <IconButton
                              type="button"
                              onClick={() => handleAddYear(1)}
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
                              onClick={() => handleAddYear(2)}
                            >
                              2
                            </IconButton>
                          </div>
                        </div>

                        <div>
                          <FormLabel>Payment Trans</FormLabel>
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
                      </div>
                      <div className="mt-5 flex justify-center">
                        <Button
                          className="w-36 text-white bg-blue-600 mx-4"
                          // type="submit"
                          type="button"
                          disabled={isButtonDisabled}
                          onClick={() => onSubmit(values, true)}
                        >
                          {isButtonDisabled ? "Updating..." : "With Mail"}
                        </Button>
                        <Button
                          className="w-36 text-white bg-blue-600"
                          // type="submit"
                          type="button"
                          disabled={isButtonDisabled1}
                          onClick={() => onSubmit(values, false)}
                        >
                          {isButtonDisabled1 ? "Updating..." : "Without Mail"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </Layout>
  );
};

export default Married;




const RandomValue = Date.now();


src={`${ImagePath}/${images}?t=${RandomValue}`}
