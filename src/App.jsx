import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ForgetPassword from "./pages/auth/ForgetPassword";
import { Toaster } from "react-hot-toast";
import NewRegister from "./pages/NewRegister/NewRegister";
import Married from "./pages/Married/Married";
import Male from "./pages/Male/Male";
import Female from "./pages/Female/Female";
import Validity from "./pages/Validity/Validity";
import EditNewRegister from "./pages/NewRegister/EditNewRegister";
import ViewNewRegister from "./pages/NewRegister/ViewNewRegister";
import EditMarried from "./pages/Married/EditMarried";
import ViewMarriage from "./pages/Married/ViewMarriage";
import EditMale from "./pages/Male/EditMale";
import ViewMale from "./pages/Male/ViewMale";
import EditFemale from "./pages/Female/EditFemale";
import ViewFemlae from "./pages/Female/ViewFemale";
import Feedback from "./pages/Feedback/Feedback";
import Notification from "./pages/Notification/Notification";
import CreateNotification from "./pages/Notification/CreateNotification";
import EditNotification from "./pages/Notification/EditNotification";
import ViewValidity from "./pages/Validity/ViewValidity";
import EditValidity from "./pages/Validity/EditValidity";
import Testing from "./pages/Testing";
const App = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          success: { style: { background: "#10B981", color: "#fff" } },
          error: { style: { background: "#EF4444", color: "#fff" } },
        }}
        position="top-right"
        reverseOrder={false}
      />

      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SIgnUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/maintenance" element={<Maintenance />} />
        {/* //EMAIL MARKETING/////// */}
        {/* //PPM */}
        <Route path="/newregister" element={<NewRegister />} />
        <Route path="/newregister/edit/:id" element={<EditNewRegister />} />
        <Route path="/newregister/view/:id" element={<ViewNewRegister />} />
        <Route path="/married" element={<Married />} />
        <Route path="/married/edit/:id" element={<EditMarried />} />
        <Route path="/married/view/:id" element={<ViewMarriage />} />
        <Route path="/male" element={<Male />} />
        <Route path="/male/edit/:id" element={<EditMale />} />
        <Route path="/male/view/:id" element={<ViewMale />} />
        <Route path="/female" element={<Female />} />
        <Route path="/female/edit/:id" element={<EditFemale />} />
        <Route path="/female/view/:id" element={<ViewFemlae />} />
        <Route path="/validity" element={<Validity />} />
        <Route path="/validity/view/:id" element={<ViewValidity />} />
        <Route path="/validity/edit/:id" element={<EditValidity />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/notification/add" element={<CreateNotification />} />
        <Route path="/notification/edit/:id" element={<EditNotification />} />
        <Route path="/test/edit/:id" element={<Testing/>} />
      </Routes>
    </>
  );
};

export default App;
