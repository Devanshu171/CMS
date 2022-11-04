import React, { useContext, useEffect, useState } from "react";
import { Upload, message, Image, Badge } from "antd";
import { AuthContext } from "../../context/auth";
import { InboxOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { MediaContext } from "../../context/media";
import axios from "axios";
import toast from "react-hot-toast";

const { Dragger } = Upload;

const MediaLibrary = ({ show, page = "admin" }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);
  let dimension = show ? "220px" : "120px";
  const [showPreview, setShowPreview] = useState(false);
  useEffect(() => {
    if (show) {
      setShowPreview(true);
      // dimension = "250px";
    }
    getMedia();
  }, []);
  const getMedia = async () => {
    try {
      const { data } = await axios.get("/media");
      setMedia((prev) => ({ ...prev, images: data }));
    } catch (err) {
      console.log(err);
    }
  };
  const props = {
    name: "file",
    multiple: true,
    action: `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        // console.log("info.file on drag drop => ", info.file);
        setMedia({
          images: [...media.images, info.file.response],
          selected: info.file.response,
          showMediaModal: false,
        });
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const handleImageDetele = async (imageId) => {
    try {
      const { data } = await axios.delete(`/media/${imageId}`);
      if (data.ok) {
        setMedia({
          ...media,
          images: media.images.filter((image) => image._id !== imageId),
          selected: null,
        });
        toast.success("Image removed successfully.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Dragger {...props} accept="image/*">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>

      <div style={{ textAlign: "center" }}>
        {media?.images?.map((image) => {
          return (
            <Badge style={{ textAlign: "center" }}>
              <Image
                onClick={() => setMedia({ ...media, selected: image })}
                style={{
                  cursor: "pointer",
                  paddingTop: 10,
                  paddingRight: 15,
                  height: dimension,
                  width: dimension,
                  objectFit: "cover",
                }}
                preview={showPreview}
                src={image.url}
              />
              <br />
              <CloseCircleOutlined
                disabled={
                  image?.postedBy?._id !== auth.user._id && page !== "admin"
                }
                onClick={() => handleImageDetele(image._id)}
                style={{
                  marginTop: "5px",
                  color: "#1890ff ",

                  fontSize: "17px",
                }}
              />
            </Badge>
          );
        })}
      </div>
    </>
  );
};

export default MediaLibrary;
