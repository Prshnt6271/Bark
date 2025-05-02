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

  // Business Info
  const [businessName, setBusinessName] = useState("");
  const [businessLogo, setBusinessLogo] = useState(null);
  const [establishmentYear, setEstablishmentYear] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  // Portfolio
  const [projectTitle, setProjectTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectStatus, setProjectStatus] = useState("completed");
  const [projectYear, setProjectYear] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [projectRole, setProjectRole] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectMedia, setProjectMedia] = useState([]);

  const [countryOptions, setCountryOptions] = useState([]);
  const projectTypeOptions = [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" },
    { value: "landscape", label: "Landscape" },
    { value: "interior", label: "Interior Design" },
  ];

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

  const handleBusinessLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setBusinessLogo(URL.createObjectURL(file));
  };

  const handleProjectMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const mediaUrls = files.map(file => URL.createObjectURL(file));
    setProjectMedia([...projectMedia, ...mediaUrls]);
  };

  const removeProjectMedia = (index) => {
    const updatedMedia = [...projectMedia];
    updatedMedia.splice(index, 1);
    setProjectMedia(updatedMedia);
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
  };

  const handleGoogleSignIn = () => {
    window.location.href = "https://accounts.google.com/signin";
  };

  const handleUpdateSocialMedia = () => {
    console.log("Social media updated:", { facebook, twitter, instagram, linkedin });
    alert("Social media links updated!");
  };

  const handleUpdateBusinessInfo = () => {
    console.log("Business info updated:", { businessName, establishmentYear, licenseNumber });
    alert("Business information updated!");
  };

  const handleAddPortfolioItem = () => {
    console.log("Portfolio item added:", { 
      projectTitle, 
      projectType, 
      projectStatus, 
      projectYear, 
      projectLocation, 
      budgetRange, 
      projectRole, 
      projectLink,
      projectMedia
    });
    alert("Portfolio item added successfully!");
    
    // Reset form
    setProjectTitle("");
    setProjectType("");
    setProjectStatus("completed");
    setProjectYear("");
    setProjectLocation("");
    setBudgetRange("");
    setProjectRole("");
    setProjectLink("");
    setProjectMedia([]);
  };

  const sections = [
    "Profile Info",
    "Contact Info",
    "Password",
    "Social Media Settings",
    "Portfolio",
    "Business Info",
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "Profile Info":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Account Information</h2>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Username</label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                />
                <button
                  className="px-8 py-3 border border-blue-500 text-black rounded bg-blue-500 hover:bg-blue-600 sm:w-auto"
                  onClick={() => alert("Edit username clicked!")}
                >
                  Edit
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Email</label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                />
                <button
                  className="px-8 py-3 border border-blue-500 text-black rounded bg-blue-500 hover:bg-blue-600 sm:w-auto"
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
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">About Me</label>
              <textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                rows="4"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Next House Project</label>
              <textarea
                value={nextHouseProject}
                onChange={(e) => setNextHouseProject(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
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
                className="w-full sm:w-96"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="Enter your state"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
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
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
              <button
                className="px-8 py-3 border border-green-500 text-black rounded bg-green-500 hover:bg-green-600"
                onClick={handlePasswordChange}
              >
                Change Password
              </button>

              <button
                className="text-blue-600 hover:underline sm:text-right"
                onClick={handleForgotPassword}
              >
                Forgot my password?
              </button>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full sm:w-96 px-8 py-3 border border-gray-300 rounded hover:bg-gray-100"
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
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="https://facebook.com/yourprofile"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Twitter</label>
              <input
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="https://twitter.com/yourprofile"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Instagram</label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">LinkedIn</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
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

      case "Business Info":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Business Information</h2>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="Enter your business name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Business Logo</label>
              <div className="flex items-center gap-4">
                {businessLogo ? (
                  <div className="relative w-24 h-24 border-2 border-gray-300 rounded-md overflow-hidden">
                    <img src={businessLogo} alt="Business Logo" className="w-full h-full object-contain" />
                    <button 
                      onClick={() => setBusinessLogo(null)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                    <span className="text-gray-400">No logo</span>
                  </div>
                )}
                <label className="cursor-pointer">
                  <span className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    {businessLogo ? "Change Logo" : "Upload Logo"}
                  </span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleBusinessLogoChange} 
                    className="hidden" 
                  />
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Establishment Year</label>
              <input
                type="number"
                value={establishmentYear}
                onChange={(e) => setEstablishmentYear(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="Year your business was established"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">License or Registration Number</label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="Enter your business license/registration number"
              />
            </div>

            <div className="mt-4">
              <button
                className="px-8 py-3 border border-green-500 text-black rounded bg-green-500 hover:bg-green-600"
                onClick={handleUpdateBusinessInfo}
              >
                Update Business Info
              </button>
            </div>
          </div>
        );

      case "Portfolio":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Add Portfolio Project</h2>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Project Title</label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="Name of the project"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Project Type</label>
              <Select
                options={projectTypeOptions}
                onChange={(selectedOption) => setProjectType(selectedOption?.value || "")}
                value={projectTypeOptions.find((option) => option.value === projectType)}
                placeholder="Select project type"
                className="w-full sm:w-96"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Project Status</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="projectStatus"
                    value="completed"
                    checked={projectStatus === "completed"}
                    onChange={() => setProjectStatus("completed")}
                    className="mr-2"
                  />
                  Completed
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="projectStatus"
                    value="in-progress"
                    checked={projectStatus === "in-progress"}
                    onChange={() => setProjectStatus("in-progress")}
                    className="mr-2"
                  />
                  In Progress
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Year {projectStatus === "completed" ? "Completed" : "Started"}</label>
              <input
                type="number"
                value={projectYear}
                onChange={(e) => setProjectYear(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder={`Year project was ${projectStatus === "completed" ? "completed" : "started"}`}
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Location</label>
              <input
                type="text"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="Project location"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Budget Range</label>
              <input
                type="text"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="Approximate budget range (e.g., $50,000 - $75,000)"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Your Role in Project</label>
              <input
                type="text"
                value={projectRole}
                onChange={(e) => setProjectRole(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="Your role (e.g., Architect, Contractor, Designer)"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Link to Case Study or External Site</label>
              <input
                type="url"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black"
                placeholder="https://example.com/project-details"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Upload Project Media (Images/Videos)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {projectMedia.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                    {projectMedia.map((media, index) => (
                      <div key={index} className="relative group">
                        {media.endsWith('.mp4') || media.endsWith('.mov') ? (
                          <video src={media} className="w-full h-32 object-cover rounded" controls />
                        ) : (
                          <img src={media} alt={`Project media ${index}`} className="w-full h-32 object-cover rounded" />
                        )}
                        <button
                          onClick={() => removeProjectMedia(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No media uploaded yet
                  </div>
                )}
                <label className="cursor-pointer flex justify-center">
                  <span className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    {projectMedia.length > 0 ? 'Add More Media' : 'Upload Media'}
                  </span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleProjectMediaChange}
                    multiple
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="mt-4">
              <button
                className="px-8 py-3 border border-green-500 text-black rounded bg-green-500 hover:bg-green-600"
                onClick={handleAddPortfolioItem}
              >
                Add to Portfolio
              </button>
            </div>
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
        <div className="relative h-32 sm:h-52 bg-gray-200 overflow-visible">
          {coverPhoto ? (
            <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-green-400 to-green-600"></div>
          )}

          <label className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded text-sm cursor-pointer shadow">
            Change Cover
            <input type="file" accept="image/*" onChange={handleCoverPhotoChange} className="hidden" />
          </label>

          <div className="absolute left-4 sm:left-6 bottom-[-15%] flex items-center">
            <div className="relative w-24 h-24 sm:w-36 sm:h-36 border-[2px] border-white bg-gray-300 shadow-md rounded-md overflow-hidden">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No photo
                </div>
              )}
              <label className="absolute top-1 right-1 cursor-pointer z-10">
                <span className="text-black bg-white rounded-full p-1 sm:p-2 text-lg sm:text-xl shadow-md cursor-pointer">
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

            <div className="ml-2 sm:ml-4">
              <h1 className="text-lg sm:text-2xl font-bold text-white drop-shadow">{username.toUpperCase()}</h1>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Content */}
        <div className="flex flex-col sm:flex-row border-t mt-20 sm:mt-16">
          <div className="w-full sm:w-64 bg-gray-50 border-r p-4 sm:p-6">
            <h3 className="font-semibold mb-4">Account</h3>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
              {sections.map((section) => (
                <div
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`cursor-pointer py-2 px-2 rounded mb-1 transition ${
                    activeSection === section
                      ? "bg-green-200 font-semibold text-green-900"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {section}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-4 sm:p-8 overflow-auto">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;