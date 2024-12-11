import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/SignIn";
import SIgnUp from "./pages/auth/SIgnUp";
import Maintenance from "./pages/maintenance/Maintenance";
import ForgetPassword from "./pages/auth/ForgetPassword";
import { Toaster } from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";
import Template from "./pages/Template/Template";
import Campagin from "./pages/Campagin/Campagin";
import ReportUnsubscribe from "./pages/Report/ReportUnsubscribe/ReportUnsubscribe";
import ReportVisted from "./pages/Report/ReportVisited/ReportVisted";
import ReportCampagin from "./pages/Report/ReportCampagin/ReportCampagin";
import AddTemplate from "./pages/Template/AddTemplate";
import EditTemplate from "./pages/Template/EditTemplate";
import Contact from "./pages/Contact/Contact/Contact";
import AddContact from "./pages/Contact/Contact/AddContact";
import EditContact from "./pages/Contact/Contact/EditContact";
import Group from "./pages/Contact/Group/Group";
import AddGroup from "./pages/Contact/Group/AddGroup";
import EditGroup from "./pages/Contact/Group/EditGroup";
import ContactImport from "./pages/Contact/Contact/ContactImport";
import AddCampagin from "./pages/Campagin/AddCampaign";
import Developer from "./pages/Developer/Developer";
import ReportReadForm from "./pages/Report/ReportRead/ReportReadForm";
import CampaginIndivialView from "./pages/Campagin/CampaginIndivialView";
import Setting from "./pages/Setting/Setting";
import ReportReadView from "./pages/Report/ReportRead/ReportView";
import ReportCampaginView from "./pages/Report/ReportCampagin/ReportCampaginView";
import ReportVisitedView from "./pages/Report/ReportVisited/ReportVisitedView";
import NewRegister from "./pages/NewRegister/NewRegister";
import Married from "./pages/Married/Married";
import Male from "./pages/Male/Male";
import Female from "./pages/Female/Female";
import Validity from "./pages/Validity/Validity";
import EditNewRegister from "./pages/NewRegister/EditNewRegister";
import ViewNewRegister from "./pages/NewRegister/ViewNewRegister";
import Testing from "./pages/Testing";
import EditMarried from "./pages/Married/EditMarried";
import ViewMarriage from "./pages/Married/ViewMarriage";
import EditMale from "./pages/Male/EditMale";
import ViewMale from "./pages/Male/ViewMale";
import EditFemale from "./pages/Female/EditFemale";
import ViewFemlae from "./pages/Female/ViewFemale";
import Feedback from "./pages/Feedback/Feedback";
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

        <Route path="/templates" element={<Template />} />

        <Route path="/templates/add" element={<AddTemplate />} />
        <Route path="/templates/edit/:id" element={<EditTemplate />} />
        <Route path="/campaigns" element={<Campagin />} />
        <Route path="/campaigns/add" element={<AddCampagin />} />
        <Route path="/campaigns/view/:id" element={<CampaginIndivialView />} />
        <Route path="/report/read" element={<ReportReadForm />} />
        <Route path="/report/view" element={<ReportReadView />} />
        <Route path="/report/unsubscribe" element={<ReportUnsubscribe />} />

        <Route path="/report/visted" element={<ReportVisted />} />
        <Route path="/report/visted/view" element={<ReportVisitedView />} />
        <Route path="/report/campaign" element={<ReportCampagin />} />
        <Route path="/report/campaign/view" element={<ReportCampaginView />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Contact/add" element={<AddContact />} />
        <Route path="/Contact/edit/:id" element={<EditContact />} />
        <Route path="/Contact/import" element={<ContactImport />} />

        {/* //group */}

        <Route path="/group" element={<Group />} />
        <Route path="/group/add" element={<AddGroup />} />
        <Route path="/group/edit/:id" element={<EditGroup />} />
        {/* //Developer */}
        <Route path="/developer" element={<Developer />} />

        {/* //setting */}
        <Route path="/setting" element={<Setting />} />

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
        <Route path="/feedback" element={<Feedback />} />
        {/* <Route path="/feedback" element={<Feedback />} /> */}
        <Route path="/testing" element={<Testing />} />
      </Routes>
    </>
  );
};

export default App;
