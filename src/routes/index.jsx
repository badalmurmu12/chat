import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";
import SignUpPage from "../pages/signup/SignUpPage";
import LandingPage from "../pages/landingPage/LandingPage";
import Onboarding from "../pages/additionalDetails/AdditionalDetails";
import Letschat from "../pages/letschat/Letschat";
import ScheduleAnAppointment from "../pages/scheduleAnAppointment/ScheduleAnAppointment";
import SigninConfirm from "../pages/login/SigninConfirm";
import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/projects/Projects";
import InvestorProjects from "../pages/investor/Projects";
import Documentation from "../pages/projects/Documentation";
import AllProjects from "../pages/allProjects/AllProjects";
import NewProjects from "../pages/allProjects/NewProjects";
import Marketplace from "../pages/marketplace/Marketplace";

function ProtectedRoute({ children }) {
  const userdata = useSelector((state) => state.auth);
  const location = useLocation();

  if (userdata.loggedIn) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
}

function DefaultProjectRoute() {
  const { pathname } = useLocation();
  const uuid = pathname.split('/')[1]; // Get the project ID from the URL
 
  // If we're at the root project URL (e.g., /demo), redirect to projectInfo
  if (pathname.split('/').length === 2) {
    return <Navigate to={`/${uuid}/projectInfo`} replace />;
  }

  return <InvestorProjects />;
}

export default function BasicRoutes() {
  const userdata = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route path="/login" element={ <LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/lets-chat" element={<Letschat />} />
      <Route path="/schedule-an-appointment" element={<ScheduleAnAppointment />} />
      <Route path="/home" element={userdata.loggedIn ? <HomePage /> : <Navigate to="/" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/getstarted" element={<LandingPage />} />
      <Route path="/signin-confirm" element={<SigninConfirm />} />
      <Route path="/projects" element={<NewProjects />} />
      <Route path="/projectss" element={<AllProjects />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/investor/project/:uuid/:typeOfQ" element={<InvestorProjects />} />
      <Route path="/project/:uuid" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
      <Route path="/project/documentation/:uuid" element={<ProtectedRoute><Documentation /></ProtectedRoute>} />
      <Route
        path="/"
        element={
          userdata.loggedIn ? <Marketplace /> : <LoginPage />
        }
      />
      <Route
        path="/:uuid/:typeOfQ"
        element={
           <InvestorProjects />  
        }
      />
      <Route
        path="/:uuid"
        element={
          <ProtectedRoute>
            <DefaultProjectRoute />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
