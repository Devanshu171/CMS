import AuthorLayout from "../../components/layout/AuthorLayout";
import UserComments from "../../components/comment/userComments";

export default function comments() {
  return (
    <AuthorLayout>
      <UserComments />
    </AuthorLayout>
  );
}
