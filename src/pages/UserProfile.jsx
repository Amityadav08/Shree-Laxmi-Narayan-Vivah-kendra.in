import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth, API_URL } from "../context/AuthContext";

// Simple toast implementation
const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 px-4 py-2 rounded shadow z-50 text-white ${
      type === "error" ? "bg-red-600" : "bg-green-600"
    }`}
  >
    {message}
    <button onClick={onClose} className="ml-4 font-bold">
      X
    </button>
  </div>
);

const UserProfile = () => {
  const {
    user,
    updateUserData,
    isAuthenticated,
    isLoading,
    uploadProfilePicture,
  } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    location: "",
    education: "",
    occupation: "",
    religion: "",
    motherTongue: "",
    maritalStatus: "",
    about: "",
    profilePicture: null,
  });
  const [localImagePreview, setLocalImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Construct base backend URL
  const backendBaseUrl = API_URL.replace("/api", "");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Load user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      // Initialize profileData with user data, ensuring all fields exist
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        gender: user.gender || "",
        location: user.location || "",
        education: user.education || "",
        occupation: user.occupation || "",
        religion: user.religion || "",
        motherTongue: user.motherTongue || "",
        maritalStatus: user.maritalStatus || "",
        about: user.about || "",
        profilePicture: user.profilePicture || null,
      });
      setLocalImagePreview(null);
    }
  }, [user]); // Dependency on user object

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleProfilePictureUpload = () => {
    fileInputRef.current.click();
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Generate a local preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalImagePreview(reader.result);
        // Store the file itself in profileData to be uploaded on save
        setProfileData({
          ...profileData,
          newProfileImageFile: file,
          profilePicture: null,
        });
        setToast({
          message: 'New picture selected. Click "Save Profile" to upload.',
          type: "info",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    let updatedUserData = { ...profileData };
    let pictureUpdated = false;

    try {
      // Step 1: If a new image file was selected, upload it first
      if (profileData.newProfileImageFile) {
        console.log("Uploading new profile picture...");
        const uploadResult = await uploadProfilePicture(
          profileData.newProfileImageFile
        );
        if (uploadResult.success && uploadResult.filePath) {
          updatedUserData.profilePicture = uploadResult.filePath;
          pictureUpdated = true;
          console.log("New picture uploaded, path:", uploadResult.filePath);
        } else {
          // Upload failed, stop the save process and inform user
          setToast({
            message: `Picture upload failed: ${uploadResult.message}. Profile not saved.`,
            type: "error",
          });
          setIsLoading(false);
          return; // Stop saving if upload fails
        }
      }

      // Step 2: Prepare data for profile update API (excluding temporary file state)
      const { newProfileImageFile, ...dataToSave } = updatedUserData;

      // Step 3: Call API to update profile text data
      console.log("Updating profile text data:", dataToSave);
      updateUserData(dataToSave);
      setToast({
        message: `Profile ${
          pictureUpdated ? "and picture " : ""
        }updated successfully! (Local Update)`,
        type: "success",
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      setToast({ message: "Failed to save profile.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!profileData.name) return "U";
    return profileData.name
      .split(" ")
      .map((name) => name[0])
      .filter(Boolean) // Ensure we don't get undefined if name is just spaces
      .slice(0, 2) // Max 2 initials
      .join("")
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* Consider a more visually appealing loader */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d42a3c]"></div>
      </div>
    );
  }

  // If not loading and still no user (e.g., redirect hasn't happened yet or failed)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p>You need to be logged in to view this page.</p>
        {/* Optionally add a button to redirect */}
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-4 py-2 bg-[#d42a3c] text-white rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Determine the image source URL - prioritize local preview, then stored path
  const displayImageUrl = localImagePreview
    ? localImagePreview
    : profileData.profilePicture
    ? `${backendBaseUrl}${profileData.profilePicture}`
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8f8] to-white py-12 px-4 sm:px-6 lg:px-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
            My Profile
          </h1>

          <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-[#d42a3c] to-[#ff6b6b] p-6 text-white relative">
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                {/* Profile Picture */}
                <div className="relative mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                  <div className="h-28 w-28 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                    {displayImageUrl ? (
                      <img
                        src={displayImageUrl}
                        alt={profileData.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-semibold text-[#d42a3c]">
                        {getUserInitials()}
                      </span>
                    )}
                  </div>
                  {isEditing && (
                    <>
                      <button
                        onClick={handleProfilePictureUpload}
                        className="absolute bottom-0 right-0 bg-white text-[#d42a3c] rounded-full p-1.5 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d42a3c]"
                        aria-label="Change profile picture"
                      >
                        {/* Camera Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 8.9l1.742 1.742-.001.002A7.5 7.5 0 0010 17.5a7.5 7.5 0 10-9.542-8.6zm1.742-1.742L.458 5.418a9.5 9.5 0 0113.436 0l1.742 1.742a7.5 7.5 0 00-11.694 0zM10 4.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleProfilePicChange}
                      />
                    </>
                  )}
                </div>

                {/* Basic Info */}
                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-2xl font-bold">
                    {profileData.name || "User Name"}
                  </h2>
                  <p className="text-red-100 mt-1">
                    {profileData.age ? `${profileData.age} years` : ""}
                    {profileData.location ? ` • ${profileData.location}` : ""}
                  </p>
                  <p className="mt-1 text-red-50">
                    {profileData.occupation || ""}
                    {profileData.education ? ` • ${profileData.education}` : ""}
                  </p>
                </div>

                {/* Edit/Save Button */}
                <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                  {isEditing ? (
                    <button
                      onClick={handleSaveProfile}
                      className="bg-white text-[#d42a3c] px-5 py-2 rounded-md font-semibold hover:bg-red-50 shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#d42a3c] focus:ring-white"
                      disabled={isLoading} // Disable button while saving
                    >
                      {isLoading ? "Saving..." : "Save Profile"}
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-white text-[#d42a3c] px-5 py-2 rounded-md font-semibold hover:bg-red-50 shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#d42a3c] focus:ring-white"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Content Tabs or Sections */}
            <div className="p-6 md:p-8">
              {/* Using a grid layout for simplicity, could use tabs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Basic Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
                    Basic Information
                  </h3>
                  {renderProfileField(
                    "Full Name",
                    "name",
                    profileData.name,
                    handleChange,
                    isEditing
                  )}
                  {renderProfileField(
                    "Email",
                    "email",
                    profileData.email,
                    handleChange,
                    isEditing,
                    { type: "email", readOnly: !isEditing }
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    {renderProfileField(
                      "Age",
                      "age",
                      profileData.age,
                      handleChange,
                      isEditing,
                      { type: "number" }
                    )}
                    {renderProfileField(
                      "Gender",
                      "gender",
                      profileData.gender,
                      handleChange,
                      isEditing,
                      {
                        type: "select",
                        options: [
                          { value: "", label: "Select Gender" },
                          { value: "Male", label: "Male" },
                          { value: "Female", label: "Female" },
                          { value: "Other", label: "Other" },
                        ],
                      }
                    )}
                  </div>
                </div>

                {/* Professional & Educational Background */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
                    Professional & Education
                  </h3>
                  {renderProfileField(
                    "Occupation",
                    "occupation",
                    profileData.occupation,
                    handleChange,
                    isEditing
                  )}
                  {renderProfileField(
                    "Education",
                    "education",
                    profileData.education,
                    handleChange,
                    isEditing
                  )}
                </div>

                {/* Location & Cultural Background */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
                    Location & Background
                  </h3>
                  {renderProfileField(
                    "Location",
                    "location",
                    profileData.location,
                    handleChange,
                    isEditing
                  )}
                  {renderProfileField(
                    "Religion",
                    "religion",
                    profileData.religion,
                    handleChange,
                    isEditing
                  )}
                  {renderProfileField(
                    "Mother Tongue",
                    "motherTongue",
                    profileData.motherTongue,
                    handleChange,
                    isEditing
                  )}
                </div>

                {/* Relationship Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
                    Relationship Info
                  </h3>
                  {renderProfileField(
                    "Marital Status",
                    "maritalStatus",
                    profileData.maritalStatus,
                    handleChange,
                    isEditing,
                    {
                      type: "select",
                      options: [
                        { value: "", label: "Select Status" },
                        { value: "Never Married", label: "Never Married" },
                        { value: "Divorced", label: "Divorced" },
                        { value: "Widowed", label: "Widowed" },
                        {
                          value: "Awaiting Divorce",
                          label: "Awaiting Divorce",
                        },
                      ],
                    }
                  )}
                </div>

                {/* About Me Section (Spanning both columns) */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">
                    About Me
                  </h3>
                  {renderProfileField(
                    "About",
                    "about",
                    profileData.about,
                    handleChange,
                    isEditing,
                    {
                      type: "textarea",
                      rows: 4,
                      placeholder: "Tell us a bit about yourself...",
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper function to render profile fields consistently
const renderProfileField = (
  label,
  name,
  value,
  onChange,
  isEditing,
  options = {}
) => {
  const {
    type = "text",
    readOnly = false,
    placeholder = "",
    rows = 3,
    options: selectOptions,
  } = options;

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      {isEditing ? (
        <>
          {type === "textarea" ? (
            <textarea
              id={name}
              name={name}
              value={value || ""}
              onChange={onChange}
              rows={rows}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-[#d42a3c] focus:border-[#d42a3c] sm:text-sm"
              placeholder={placeholder || label}
              readOnly={readOnly}
            />
          ) : type === "select" ? (
            <select
              id={name}
              name={name}
              value={value || ""}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-[#d42a3c] focus:border-[#d42a3c] sm:text-sm bg-white"
              readOnly={readOnly}
            >
              {selectOptions?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              id={name}
              name={name}
              value={value || ""}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-[#d42a3c] focus:border-[#d42a3c] sm:text-sm"
              placeholder={placeholder || label}
              readOnly={readOnly}
              min={type === "number" ? "18" : undefined} // Add min attribute for age
            />
          )}
        </>
      ) : (
        <p className="text-gray-800 text-sm mt-1 break-words min-h-[20px]">
          {" "}
          {/* Ensure min height */}
          {value || <span className="text-gray-400 italic">Not specified</span>}
        </p>
      )}
    </div>
  );
};

export default UserProfile; // Changed export name
