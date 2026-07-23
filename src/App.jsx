import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Advocates from "./pages/Advocates";
import AdvocateDetail from "./pages/AdvocateDetail";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import Cases from "./pages/Cases";
import Documents from "./pages/Documents";
import Payments from "./pages/Payments";
import BareActs from "./pages/BareActs";
import Diary from "./pages/Diary";
import Rules from "./pages/Rules";
import Reports from "./pages/Reports";
import Tools from "./pages/Tools";
import Notifications from "./pages/Notifications";
import Users from "./pages/Users";
import SettingsPage from "./pages/Settings";
import Membership from "./pages/Membership";
import Location from "./pages/Location";
import NotFound from "./pages/NotFound";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        
        <Route 
          path="dashboard" 
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin", "sub_admin", "advocate", "staff"]}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="advocates" 
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <Advocates />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="advocates/:id" 
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <AdvocateDetail />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="clients" 
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <Clients />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="clients/:id" 
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <ClientDetail />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="cases" 
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin", "sub_admin", "advocate", "staff"]}>
              <Cases />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="membership" 
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <Membership />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="location" 
          element={
            <ProtectedRoute allowedRoles={["super_admin", "staff"]}>
              <Location />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="documents" 
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin", "advocate"]}>
              <Documents />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="payments" 
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <Payments />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="bare-acts" 
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <BareActs />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="diary" 
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin", "sub_admin", "advocate", "staff"]}>
              <Diary />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="rules" 
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <Rules />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="reports" 
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin"]}>
              <Reports />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="tools" 
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <Tools />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="notifications" 
          element={
            <ProtectedRoute allowedRoles={["super_admin", "admin", "sub_admin", "advocate"]}>
              <Notifications />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="users" 
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <Users />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="settings" 
          element={
            <ProtectedRoute allowedRoles={["super_admin"]}>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
