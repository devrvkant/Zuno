import { useEffect } from "react";

import { useSelector } from "react-redux";
import {
  User,
  Mail,
  Calendar,
  Shield,
  CheckCircle,
  Camera,
} from "lucide-react";
import { toast } from "sonner";

import formatDate from "../utils/formatDate";
import { useUploadProfilePicMutation } from "../features/user/userApi";
import { useFileUpload } from "../hooks/use-file-upload";

const Profile = () => {
  const [uploadProfilePicture, { isLoading: isUploading }] =
    useUploadProfilePicMutation();
  const user = useSelector((state) => state.auth.user);
  const profilePicURL = useSelector((state) => state.user?.profilePic.url);

  // Handle file upload when files are added
  const handleFilesAdded = async (addedFiles) => {
    if (addedFiles.length > 0) {
      const file = addedFiles[0].file;
      await uploadImageToBackend(file);
    }
  };

  // Upload image to backend using FormData
  const uploadImageToBackend = async (file) => {
    try {
      // Create FormData - this is what multer expects
      const formData = new FormData();
      formData.append("image", file); // "image" matches your multer field name

      await uploadProfilePicture(formData).unwrap();

      toast.success("Profile picture uploaded successfully.");

      // Clear the file after successful upload
      removeFile(files[0]?.id);
    } catch (err) {
      console.error("Error in uploading profilePic : ", err);
      toast.error(err);

      // Remove the file on error
      if (files[0]?.id) {
        removeFile(files[0].id);
      }
    }
  };

  const [
    { files, errors },
    { removeFile, openFileDialog, getInputProps, clearErrors },
  ] = useFileUpload({
    accept: "image/*",
    maxSize: 10 * 1024 * 1024, // 10MB limit
    onFilesAdded: handleFilesAdded, // This triggers upload when file is selected
  });

  const handleAvatarUpload = () => {
    // Handle file upload logic here
    console.log("Upload avatar clicked");
    // You can add file input or modal logic here
  };

  const previewUrl = files[0]?.preview || null;

  // Show file validation errors
  useEffect(() => {
    if (errors.length > 0) {
      console.log("File validation errors:", errors);
      errors.forEach((error) => {
        if (error.includes("size") || error.includes("large")) {
          toast.error(`File size too large! Maximum size is 70KB.`);
        } else if (error.includes("type") || error.includes("format")) {
          toast.error(`Invalid file type! Only images are allowed.`);
        } else {
          toast.error(error);
        }
      });
    }
  }, [errors]);

  return (
    <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-2xl">
        <div className="bg-card rounded-2xl border shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 sm:p-8 text-center border-b">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Profile
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your account information
            </p>
          </div>

          {/* Profile Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-muted flex items-center justify-center ring-4 ring-primary/20 shadow-lg overflow-hidden transition-all duration-300 group-hover:ring-primary/40 group-hover:shadow-xl">
                  {profilePicURL ? (
                    <img
                      src={profilePicURL}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <User className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
                  )}
                </div>

                {/* Camera Icon */}
                <button
                  disabled={isUploading}
                  onClick={(e) => {
                    e.stopPropagation();
                    openFileDialog();
                  }}
                  className="absolute bottom-0 right-0 sm:bottom-1.5 w-8 h-8 sm:w-10 sm:h-10 bg-primary hover:bg-primary/90 border-2 border-background rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12 active:scale-95 cursor-pointer group/camera backdrop-blur-sm"
                  aria-label="Upload or change profile picture"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground transition-all duration-300 group-hover/camera:scale-110 group-hover/camera:rotate-12" />
                </button>

                {/* Hidden file input */}
                <input
                  {...getInputProps()}
                  className="sr-only"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Description */}
              <p className="text-center text-sm text-muted-foreground max-w-xs">
                Click the camera icon to upload or change your profile picture
              </p>
            </div>

            {/* User Information */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center justify-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h2>

                {/* Full Name */}
                <div className="bg-muted/30 rounded-xl p-4 sm:p-5 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <User className="w-4 h-4" />
                    Full Name
                  </div>
                  <div className="text-foreground font-medium text-lg">
                    {user.name}
                  </div>
                </div>

                {/* Email */}
                <div className="bg-muted/30 rounded-xl p-4 sm:p-5 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                  <div className="text-foreground font-medium text-lg break-all">
                    {user.email}
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4 border-t pt-6">
                <h2 className="text-lg font-semibold text-foreground flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Account Information
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Member Since */}
                  <div className="bg-muted/30 rounded-xl p-4 sm:p-5 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Member Since
                    </div>
                    <div className="text-foreground font-medium">
                      {formatDate(user.createdAt)}
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className="bg-muted/30 rounded-xl p-4 sm:p-5 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <CheckCircle className="w-4 h-4" />
                      Account Status
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-chart-2 font-medium">Active</div>
                      <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
