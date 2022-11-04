import AuthorLayout from "../../components/layout/AuthorLayout";
import ProfileUpdate from "../../components/user/ProfileUpdate";
const AdminProfile = () => {
  return (
    <AuthorLayout>
      <ProfileUpdate page="user" />
    </AuthorLayout>
  );
};

export default AdminProfile;
