import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Home/AppHome.css";
import QRPage from "./Home/QRPage";
import RegistrationForm from "./Home/RegistrationForm";
import MemberList from "./Home/MemberList";
import MemberShipType from "./Home/MemberShipType";
import SystemManagement from "./Home/SystemManagement";
import AddPayment from "./Home/AddPayment";
import AdminPanel from "./Admin/AdminPanel";
import DashBoard from "./Admin/DashBoard";
import Profile from "./Admin/Profile";
import MemberPaymentManager from "./Home/MemberPaymentManager";
import PaymentView from "./Home/PaymentView";


function App() {
  return (
    <Router>
      <div style={{ padding: "10px", fontFamily: "Arial" }}>

        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/service/registration" element={<RegistrationForm />} />
            <Route path="/service/system" element={<SystemManagement/>} />
          <Route path="/service/payment" element={<MemberPaymentManager />} />
          <Route path="/service/membership-type-management" element={<MemberShipType />} />
          <Route path="/service/income-management" element={<PaymentView />} />
          <Route path="/service/QR-code" element={<QRPage />} />


          <Route path="/service/members-list" element={<MemberList />} />
          <Route path="/addpayment" element={<AddPayment />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
