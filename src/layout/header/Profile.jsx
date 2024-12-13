import React, { useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Dialog,
} from "@mui/material";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  IconMail,
  IconUser,
  IconCircleX,
  IconInfoOctagon,
} from "@tabler/icons-react";
import { FormControlLabel, Checkbox, Typography } from "@mui/material";
import Logout from "../../components/Logout";
import axios from "axios";
import BASE_URL, { ImagePath, NoImagePath } from "../../base/BaseUrl";
import toast from "react-hot-toast";
import SelectInput from "../../components/common/SelectInput";
import { IconSettings } from "@tabler/icons-react";
import { Formik, Field, Form } from "formik";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenLogout = () => setOpenModal(!openModal);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [settings, setSettings] = useState({
    social_whatsapp: false,
    social_email: false,
    social_sms: false,
    social_notification: false,
  });
  const [password, setPassword] = useState({
    username: "",
    password: "",
    old_password: "",
  });

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };

  const getSocialData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/panel-fetch-socialcontrols`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data?.socialcontrols) {
        const socialControls = res.data.socialcontrols;
        setSettings({
          social_whatsapp: socialControls.social_whatsapp === "Yes",
          social_email: socialControls.social_email === "Yes",
          social_sms: socialControls.social_sms === "Yes",
          social_notification: socialControls.social_notification === "Yes",
        });
      } else {
        throw new Error("SocialData is missing");
      }
    } catch (error) {
      console.error("Failed to fetch SocialData:", error);
      toast.error("Failed to load SocialData ");
    }
  };

  const onSubmit = async (values) => {
    try {
      const data = {
        social_whatsapp: values.social_whatsapp ? "Yes" : "No",
        social_email: values.social_email ? "Yes" : "No",
        social_sms: values.social_sms ? "Yes" : "No",
        social_notification: values.social_notification ? "Yes" : "No",
      };

      await axios.put(`${BASE_URL}/panel-update-socialcontrols`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Settings updated successfully");
      handleClose();
    } catch (error) {
      toast.error("Error updating settings");
      console.error(error);
    }
  };

  const onChangePassword = async (e) => {
    e.preventDefault();

    const data = {
      old_password: password.old_password,
      new_password: password.password,
      username: localStorage.getItem("username"),
    };

    try {
      await axios.post(`${BASE_URL}/panel-change-password`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Password Updated Successfully!");
      setOpenDialog1(false);
      setPassword({
        password: "",
        old_password: "",
      });
    } catch (error) {
      console.error("Password change failed:", error);
      toast.error("Please enter valid old password");
    }
  };
  const handleClose = () => {
    setOpenDialog(false);
    setAnchorEl2(null);
  };
  const handleClose1 = () => {
    setOpenDialog1(false);
    setAnchorEl2(null);
  };

  const handleopen = () => {
    setOpenDialog(true);
    getSocialData();
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const FormLabel = ({ children, required }) => (
    <label className="block text-sm font-semibold text-black mb-1 ">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 border-green-500";

  const profilePhoto = localStorage.getItem("profile_photo");
  const imagePath = profilePhoto ? `${ImagePath}${profilePhoto}` : NoImagePath;

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={imagePath}
          alt="image"
          sx={{
            width: 35,
            height: 35,
            padding: "4px",
          }}
        />
      </IconButton>

      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem onClick={handleopen}>
          <ListItemIcon>
            <IconSettings width={20} />
          </ListItemIcon>
          <ListItemText>Setting</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setOpenDialog1(true)}>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>Change Password</ListItemText>
        </MenuItem>

        <Box mt={1} py={1} px={2}>
          <Button
            onClick={handleOpenLogout}
            className="text-center text-sm font-[400] cursor-pointer rounded-full text-black border-[1px] border-blue-300 hover:bg-red-600 hover:text-white"
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>

      <Logout open={openModal} handleOpen={handleOpenLogout} />
    
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={{
          backdropFilter: "blur(5px) sepia(5%)",
          "& .MuiDialog-paper": {
            borderRadius: "18px",
          },
        }}
      >
        <Box sx={{ p: 5 }}>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-slate-800 text-xl font-semibold">
              Notification Settings
            </h1>

            <div className="flex " onClick={handleClose}>
              <Tooltip title="Close">
                <button type="button" className="ml-3 pl-2">
                  <IconCircleX />
                </button>
              </Tooltip>
            </div>
          </div>

          <Formik
            initialValues={settings}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ values, handleChange }) => (
              <Form>
                <Box sx={{ mb: 3 }}>
                  {Object.keys(settings).map((key) => (
                    <FormControlLabel
                      key={key}
                      control={
                        <Checkbox
                          checked={values[key]}
                          onChange={handleChange}
                          name={key}
                          color="primary"
                        />
                      }
                      label={
                        <Typography sx={{ fontWeight: 700 }}>
                          {key
                            .replace("social_", "")
                            .replace("_", " ")
                            .toUpperCase()}
                        </Typography>
                      }
                      sx={{ fontSize: "50px", mb: 1 }}
                    />
                  ))}
                </Box>
                <div className="flex justify-center">
                  <Button
                    className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 h-15 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md mr-2"
                    type="submit"
                  >
                    Save Settings
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Dialog>
      {/*........................................... //chnage password ......................................................*/}
      <Dialog
        open={openDialog1}
        onClose={() => setOpenDialog1(false)}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={{
          backdropFilter: "blur(5px) sepia(5%)",
          "& .MuiDialog-paper": {
            borderRadius: "18px",
          },
        }}
      >
        <form autoComplete="off" onSubmit={onChangePassword}>
          <div className="p-6 space-y-1 sm:w-[280px] md:w-[500px] bg-white rounded-2xl shadow-md">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-slate-800 text-xl font-semibold">
                  Change Password
                </h1>

                <div className="flex " onClick={handleClose1}>
                  <Tooltip title="Close">
                    <button type="button" className="ml-3 pl-2">
                      <IconCircleX />
                    </button>
                  </Tooltip>
                </div>
              </div>

              <div className="mt-2 p-4 ">
                <div className="grid grid-cols-1  gap-6 mb-4">
                  <div>
                    <FormLabel required>Old Password</FormLabel>
                    <input
                      required
                      type="password"
                      name="old_password"
                      value={password.old_password}
                      onChange={handleChangePassword}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <FormLabel required>New Password</FormLabel>
                    <input
                      required
                      type="password"
                      name="password"
                      value={password.password}
                      onChange={handleChangePassword}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="mt-5 flex justify-center">
                  <Button
                    className="text-center text-sm font-[400] cursor-pointer hover:animate-pulse w-36 h-15 text-white bg-blue-600 hover:bg-green-700 p-2 rounded-lg shadow-md mr-2"
                    disabled={isButtonDisabled}
                    type="submit"
                  >
                    {isButtonDisabled ? "Change..." : "Change Password"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Dialog>
    </Box>
  );
};

export default Profile;
