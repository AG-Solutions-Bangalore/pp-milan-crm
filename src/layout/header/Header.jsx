import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";

// components
import Profile from "./Profile";
import { IconMenu, IconMenuDeep } from "@tabler/icons-react";
import { IconInfoOctagon } from "@tabler/icons-react";
import { IconDownload } from "@tabler/icons-react";
import axios from "axios";
import toast from "react-hot-toast";
import BASE_URL from "../../base/BaseUrl";
import { Tooltip } from "@mantine/core";

const Header = ({ toggleMobileSidebar, toggleSidebar }) => {
  const handleDownload = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${BASE_URL}/panel-download-biodata`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "biodata.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("BioData Download successful!");
    } catch (error) {
      console.error("Error downloading biodata:", error);
      toast.error("Failed to download biodata.");
    }
  };

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    borderRadius: 13,
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));
  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{
            display: {
              lg: "inline",
              xs: "none",
            },
          }}
        >
          <IconMenuDeep width="20" height="20" />
        </IconButton>

        <Box flexGrow={1} />

        <Stack spacing={1} direction="row" alignItems="center">
        <Tooltip label="BioData" position="top" withArrow>
 
            <IconDownload
              width={20}
              className="cursor-pointer text-black"
              onClick={handleDownload}
            />
          </Tooltip>
        </Stack>
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
