import AuthorLayout from "../../../components/layout/AuthorLayout";
import EditPostComponent from "../../../components/posts/EditPostComponent";

function EditPost() {
  return (
    <AuthorLayout>
      <EditPostComponent page={"author"} />
    </AuthorLayout>
  );
}

export default EditPost;
