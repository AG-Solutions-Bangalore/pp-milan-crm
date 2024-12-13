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
const Validity = () => {
  const [female, setFemale] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fetchMarriedData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/panel-fetch-validity-expire`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFemale(response.data?.user || []);
    } catch (error) {
      console.error("Error fetching template data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarriedData();
  }, []);

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
                  navigate(`/validity/view/${row.original.id}`);
                }}
              />
            </Tooltip>
            <Tooltip label="Edit" position="top" withArrow>
              <IconEdit
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => {
                  navigate(`/validity/edit/${row.original.id}`);
                }}
              />
            </Tooltip>
            {/* <Tooltip label="Activation" position="top" withArrow>
              <IconRadioactive
                className="cursor-pointer text-blue-600 hover:text-blue-800"
                onClick={() => {
                  navigate(`/templates/activate/${row.original.id}`);
                }}
              />
            </Tooltip> */}
          </Flex>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: female,
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
            Validity
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
    </Layout>
  );
};

export default Validity;
