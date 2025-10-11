import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ValidationWrapper from "./components/common/ValidationWrapper";
import ForgetPassword from "./pages/auth/ForgetPassword";
import SignIn from "./pages/auth/SignIn";
import Home from "./pages/dashboard/Home";
import Feedback from "./pages/Feedback/Feedback";
import EditFemale from "./pages/Female/EditFemale";
import Female from "./pages/Female/Female";
import ViewFemlae from "./pages/Female/ViewFemale";
import Maintenance from "./pages/maintenance/Maintenance";
import EditMale from "./pages/Male/EditMale";
import Male from "./pages/Male/Male";
import ViewMale from "./pages/Male/ViewMale";
import EditMarried from "./pages/Married/EditMarried";
import Married from "./pages/Married/Married";
import ViewMarriage from "./pages/Married/ViewMarriage";
import EditNewRegister from "./pages/NewRegister/EditNewRegister";
import NewRegister from "./pages/NewRegister/NewRegister";
import ViewNewRegister from "./pages/NewRegister/ViewNewRegister";
import CreateNotification from "./pages/Notification/CreateNotification";
import EditNotification from "./pages/Notification/EditNotification";
import Notification from "./pages/Notification/Notification";
import Testing from "./pages/Testing";
import EditValidity from "./pages/Validity/EditValidity";
import Validity from "./pages/Validity/Validity";
import ViewValidity from "./pages/Validity/ViewValidity";
const App = () => {
  return (
    <>
      {/* <DisableRightClick /> */}
      <Toaster
        toastOptions={{
          success: { style: { background: "#10B981", color: "#fff" } },
          error: { style: { background: "#EF4444", color: "#fff" } },
        }}
        position="top-right"
        reverseOrder={false}
      />
      <ValidationWrapper>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
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
          <Route path="/test/edit/:id" element={<Testing />} />
        </Routes>
      </ValidationWrapper>
    </>
  );
};

export default App;
