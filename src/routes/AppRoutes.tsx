import { HashRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Layout from "../components/layout/Layout";
import Splash from "../pages/Splash/Splash";
import Auth from "../pages/Auth/Auth";
import SignUp from "../pages/SignUp/SignUp";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Home from "../pages/Home/Home";
import TripSetup from "../pages/TripSetup/TripSetup";
import DestinationSuggest from "../pages/DestinationSuggest/DestinationSuggest";
import Itinerary from "../pages/Itinerary/Itinerary";
import Stay from "../pages/Stay/Stay";
import Food from "../pages/Food/Food";
import Transit from "../pages/Transit/Transit";
import EditItinerary from "../pages/EditItinerary/EditItinerary";
import Booking from "../pages/Booking/Booking";
import SavedTrips from "../pages/SavedTrips/SavedTrips";
import Profile from "../pages/Profile/Profile";
import ShareExport from "../pages/ShareExport/ShareExport";

import PageTransition from "../components/common/PageTransition";

// Layout wrapper component that applies the Layout to its children
const LayoutWrapper = () => {
  return (
    <Layout>
      <PageTransition transitionType="fade">
        <Outlet />
      </PageTransition>
    </Layout>
  );
};

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        {/* Public routes without Layout */}
        <Route path="/" element={<PageTransition transitionType="slide-up"><Splash /></PageTransition>} />
        <Route path="/auth" element={<PageTransition transitionType="fade"><Auth /></PageTransition>} />
        <Route path="/signup" element={<PageTransition transitionType="fade"><SignUp /></PageTransition>} />
        <Route path="/reset-password" element={<PageTransition transitionType="fade"><ResetPassword /></PageTransition>} />
        
        {/* Protected routes with Layout wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutWrapper />}>
            <Route path="/home" element={<Home />} />
            <Route path="/trip-setup" element={<TripSetup />} />
            <Route path="/destination-suggest" element={<DestinationSuggest />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/food" element={<Food />} />
            <Route path="/transit" element={<Transit />} />
            <Route path="/edit-itinerary" element={<EditItinerary />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/saved-trips" element={<SavedTrips />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/share-export" element={<ShareExport />} />
            
            {/* Redirect any unknown paths to home */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}
