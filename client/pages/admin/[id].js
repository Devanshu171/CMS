import { useState, useEffect, useContext } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import ProfileUpdate from "../../components/user/ProfileUpdate";
const AdminProfile = () => {
  return (
    <AdminLayout>
      <ProfileUpdate />
    </AdminLayout>
  );
};

export default AdminProfile;
