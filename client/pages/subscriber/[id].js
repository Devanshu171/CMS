import SubscriberLayout from "../../components/layout/SubscriberLayout";
import ProfileUpdate from "../../components/user/ProfileUpdate";
import { useState } from "react";
const AdminProfile = () => {
  return (
    <SubscriberLayout>
      <ProfileUpdate page="user" />
    </SubscriberLayout>
  );
};

export default AdminProfile;
