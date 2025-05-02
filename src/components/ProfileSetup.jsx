import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const ProfileSetup = () => {
  const [activeSection, setActiveSection] = useState("Profile Info");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Profile Info
  const [username, setUsername] = useState("Prashant Kumar");
  const [email, setEmail] = useState("prashant@example.com");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [nextHouseProject, setNextHouseProject] = useState("");

  // Contact Info
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Social Media
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [countryOptions, setCountryOptions] = useState([]);

  // Fetch country list
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countries = response.data.map((country) => ({
          label: country.name.common,
          value: country.name.common,
        }));
        setCountryOptions(countries);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setCoverPhoto(URL.createObjectURL(file));
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePhoto(URL.createObjectURL(file));
  };

  const handleUpdateProfile = () => {
    console.log("Profile updated:", { firstName, lastName, aboutMe, nextHouseProject });
    alert("Profile updated successfully!");
  };

  const handleUpdateContact = () => {
    console.log("Contact updated:", { country, state, city, pincode });
    alert("Contact information updated!");
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password don't match!");
      return;
    }
    console.log("Password changed:", { currentPassword, newPassword });
    alert("Password changed successfully!");
  };

  const handleForgotPassword = () => {
    alert("Redirecting to forgot password page...");
    // window.location.href = "/forgot-password";
  };

  const handleGoogleSignIn = () => {
    window.location.href = "https://accounts.google.com/signin";
  };

  const handleUpdateSocialMedia = () => {
    console.log("Social media updated:", { facebook, twitter, instagram, linkedin });
    alert("Social media links updated!");
  };

  const sections = [
    "Profile Info",
    "Contact Info",
    "Password",
    "Social Media Settings",
    "Advanced Settings",
    "Privacy Settings",
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "Profile Info":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Account Information</h2>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Username</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
                />
                <button
                  className="ml-4 px-8 py-3 border border-blue-500 text-black rounded bg-blue-500 hover:bg-blue-600"
                  onClick={() => alert("Edit username clicked!")}
                >
                  Edit
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Email</label>
              <div className="flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
                />
                <button
                  className="ml-4 px-8 py-3 border border-blue-500 text-black rounded bg-blue-500 hover:bg-blue-600"
                  onClick={() => alert("Edit email clicked!")}
                >
                  Edit
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-bold">Profile Information</h2>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">About Me</label>
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
                rows="4"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Next House Project</label>
              <textarea
                value={nextHouseProject}
                onChange={(e) => setNextHouseProject(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
                rows="4"
              ></textarea>
            </div>

            <div className="mt-4">
              <button
                className="px-8 py-3 border border-green-500 text-black rounded bg-green-500 hover:bg-green-600"
                onClick={handleUpdateProfile}
              >
                Update Profile
              </button>
            </div>
          </div>
        );

      case "Contact Info":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact Information</h2>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Country</label>
              <Select
                options={countryOptions}
                onChange={(selectedOption) => setCountry(selectedOption?.value || "")}
                value={countryOptions.find((option) => option.value === country)}
                placeholder="Select a country"
                className="w-96"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="Enter your state"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mt-4">
              <button
                className="px-8 py-3 border border-green-500 text-black rounded bg-green-500 hover:bg-green-600"
                onClick={handleUpdateContact}
              >
                Update Contact Info
              </button>
            </div>
          </div>
        );

      case "Password":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Change Password</h2>
            
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Username or Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                className="px-8 py-3 border border-green-500 text-black rounded bg-green-500 hover:bg-green-600"
                onClick={handlePasswordChange}
              >
                Change Password
              </button>

              <button
                className="text-blue-600 hover:underline"
                onClick={handleForgotPassword}
              >
                Forgot my password?
              </button>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-96 px-8 py-3 border border-gray-300 rounded hover:bg-gray-100"
              >
                <FcGoogle className="text-2xl mr-2" />
                Continue with Google
              </button>
            </div>
          </div>
        );

      case "Social Media Settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Social Media Links</h2>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Facebook</label>
              <input
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="https://facebook.com/yourprofile"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Twitter</label>
              <input
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="https://twitter.com/yourprofile"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Instagram</label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">LinkedIn</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div className="mt-4">
              <button
                className="px-8 py-3 border border-green-500 text-black rounded bg-green-500 hover:bg-green-600"
                onClick={handleUpdateSocialMedia}
              >
                Update Social Links
              </button>
            </div>
          </div>
        );

      case "Advanced Settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Advanced Settings</h2>
            <p className="text-gray-600">Advanced configuration options will appear here.</p>
          </div>
        );

      case "Privacy Settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Privacy Settings</h2>
            <p className="text-gray-600">Privacy configuration options will appear here.</p>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{activeSection}</h2>
            <p className="text-gray-600">Content for this section is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-black py-10 px-4">
      <div className="max-w-6xl mx-auto border shadow overflow-hidden bg-white">
        {/* Cover Section */}
        <div className="relative h-52 bg-gray-200 overflow-visible">
          {coverPhoto ? (
            <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-green-400 to-green-600"></div>
          )}

          <label className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded text-sm cursor-pointer shadow">
            Change Cover
            <input type="file" accept="image/*" onChange={handleCoverPhotoChange} className="hidden" />
          </label>

          <div className="absolute left-6 bottom-[-15%] flex items-center">
            <div className="relative w-36 h-36 border-[2px] border-white bg-gray-300 shadow-md rounded-md overflow-hidden">
              {profilePhoto && (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
              <label className="absolute top-1 right-1 cursor-pointer z-10">
                <span
                  id="editPhotoButton"
                  className="text-black bg-white rounded-full p-2 text-xl shadow-md cursor-pointer"
                >
                  📷
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="ml-4">
              <h1 className="text-2xl font-bold text-white drop-shadow">{username.toUpperCase()}</h1>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Content */}
        <div className="flex border-t mt-16">
          <div className="w-64 bg-gray-50 border-r p-6">
            <h3 className="font-semibold mb-4">Account</h3>
            {sections.map((section) => (
              <div
                key={section}
                onClick={() => setActiveSection(section)}
                className={`cursor-pointer py-2 px-2 rounded mb-2 transition ${
                  activeSection === section
                    ? "bg-green-200 font-semibold text-green-900"
                    : "hover:bg-gray-200"
                }`}
              >
                {section}
              </div>
            ))}
          </div>

          <div className="flex-1 p-8">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;