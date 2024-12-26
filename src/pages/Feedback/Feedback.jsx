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
  IconRadioactive,
  IconTrash,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [postId, setPostId] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigate = useNavigate();
  const fetchFeedbackdata = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/panel-fetch-feedback`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFeedback(response.data?.feedback || []);
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

      toast.success("deactivated successfully");
      // navigate("/newregister");
      handleCloseDialog();
    } catch (error) {
      toast.error(" error deactivated");
      console.error(error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    fetchFeedbackdata();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "from_name",
        header: "From Name",
        size: 150,
      },
      {
        accessorKey: "to_name",
        header: " To Name",
        size: 50,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 150,
      },

      {
        id: "id",
        header: "Action",
        size: 50,
        enableHiding: false,
        Cell: ({ row }) => (
          <Flex gap="xs">
            <Tooltip label="Delete" position="top" withArrow>
              <IconTrash
                className="cursor-pointer text-blue-600 hover:text-red-800"
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
    data: feedback,
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
            Feedback
          </Text>
          <Flex gap="sm">
            <MRT_GlobalFilterTextInput table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Flex>
        </Flex>
      );
    },
  });
  console.log(postId);
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
          Confirm Feedback Delete{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: "15px",
              my: "10px",
            }}
          >
            Are you sure you want to Delete this Feedback?{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button
            className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-red-600 hover:bg-red-400 p-2 rounded-lg shadow-md mr-2"
            onClick={handleCloseDialog}
          >
            <span>Cancel</span>
          </button>
          <button
            className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md mr-2"
            onClick={onSubmit}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? "Deleting..." : "Delete"}
          </button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Feedback;
