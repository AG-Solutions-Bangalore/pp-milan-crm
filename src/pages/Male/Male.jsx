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
import { IconEdit, IconEye, IconRadioactive } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ImagePath, NoImagePath } from "../../base/BaseUrl";
// import {
//   Dialog,
//   DialogBody,
//   DialogFooter,
//   DialogHeader,
// } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { IconRefresh } from "@tabler/icons-react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
const Male = () => {
  const [male, setMale] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [postId, setPostId] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [postId1, setPostId1] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigate = useNavigate();
  const fetchMaleData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/panel-fetch-male`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMale(response.data?.user || []);
    } catch (error) {
      console.error("Error fetching template data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenDialog = (id) => {
    setPostId(id);
    setOpenDialog1(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog1(false);
    setPostId(null);
  };
  const handleOpenDialog1 = (id) => {
    setPostId1(id);
    setOpenDialog(true);
  };

  const handleCloseDialog1 = () => {
    setOpenDialog(false);
    setPostId1(null);
  };
  const onSubmit = async () => {
    setIsButtonDisabled(true);
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${BASE_URL}/panel-update-deactivation/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Deactivated successfully");
      handleCloseDialog();
      fetchMaleData();
    } catch (error) {
      toast.error(" error deactivated");
      console.error(error);
    } finally {
      setIsButtonDisabled(false);
    }
  };
  const onSubmit1 = async () => {
    setIsButtonDisabled(true);
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${BASE_URL}/panel-update-reset-device/${postId1}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Reset successfully");
      handleCloseDialog1();
    } catch (error) {
      toast.error(" error on  Reset");
      console.error(error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    fetchMaleData();
  }, []);
  const RandomValue = Date.now();

  const columns = useMemo(
    () => [
      {
        accessorKey: "profile_photo",
        header: "Profile Photo",
        size: 150,
        Cell: ({ row }) => {
          const profilePhoto = row.original.profile_photo;
          const imagePath = profilePhoto
            ? `${ImagePath}${profilePhoto}?t=${RandomValue}`
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
                  navigate(`/male/view/${row.original.id}`);
                }}
              />
            </Tooltip>
            <Tooltip label="Edit" position="top" withArrow>
              <IconEdit
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => {
                  navigate(`/male/edit/${row.original.id}`);
                }}
              />
            </Tooltip>
            <Tooltip label="Deactivation" position="top" withArrow>
              <IconRadioactive
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => handleOpenDialog(row.original.id)}
              />
            </Tooltip>
            <Tooltip label="Reset" position="top" withArrow>
              <IconRefresh
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => handleOpenDialog1(row.original.id)}
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
    data: male,
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
            Male
          </Text>
          <Flex gap="sm">
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />

            {/* <Button
              className="w-36 text-white bg-blue-600 !important hover:bg-violet-400 hover:animate-pulse"
              onClick={() => {
                navigate("/templates/add");
              }}
            >
              Add
            </Button> */}
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
        TransitionComponent={Slide}
        transitionDuration={500}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            my: "10px",
          }}
        >
          Confirm Deavtivation
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: "15px",
              my: "10px",
            }}
          >
            Are you sure you want to Deavtivation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-red-600 hover:bg-red-400 p-2 rounded-lg shadow-md mr-2"
            onClick={handleCloseDialog}
          >
            <span>No</span>
          </button>
          <button
            className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md mr-2"
            onClick={onSubmit}
            disabled={isButtonDisabled}
          >
            {/* <span>Confirm</span> */}
            {isButtonDisabled ? "Deactivating..." : "Yes"}
          </button>
        </DialogActions>
      </Dialog>
      {/* //resetdevice */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog1}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={{
          backdropFilter: "blur(5px) sepia(5%)",
          "& .MuiDialog-paper": {
            borderRadius: "18px",
          },
        }}
        TransitionComponent={Slide}
        transitionDuration={500}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            my: "10px",
          }}
        >
          Confirm Reset
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: "15px",
              my: "10px",
            }}
          >
            Are you sure you want to Reset?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-red-600 hover:bg-red-400 p-2 rounded-lg shadow-md mr-2"
            onClick={handleCloseDialog1}
          >
            <span>No</span>
          </button>
          <button
            className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md mr-2"
            onClick={onSubmit1}
            disabled={isButtonDisabled}
          >
            {/* <span>Confirm</span> */}
            {isButtonDisabled ? "Resetting..." : "Yes"}
          </button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Male;
