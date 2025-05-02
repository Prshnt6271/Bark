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
  const [country, setCountry] = useState(null); // Initialize as null for react-select
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
  const [projectType, setProjectType] = useState(null); // Initialize as null for react-select
  const [projectStatus, setProjectStatus] = useState("completed");
  const [projectYear, setProjectYear] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [projectRole, setProjectRole] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectMedia, setProjectMedia] = useState([]);

  // --- NEW: Experience & Clients State ---
  const [workHistory, setWorkHistory] = useState([]);
  const [currentWorkItem, setCurrentWorkItem] = useState({ name: "", role: "", duration: "" });
  const [pastClients, setPastClients] = useState([]);
  const [currentClient, setCurrentClient] = useState({ name: "", logo: null, logoPreview: null });
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState({ clientName: "", review: "" });
  const [awards, setAwards] = useState([]);
  const [currentAward, setCurrentAward] = useState({ name: "", body: "", year: "" });

  // --- NEW: Certifications & Associations State ---
  const [certifications, setCertifications] = useState([]);
  const [currentCertification, setCurrentCertification] = useState({ name: "", body: "", year: "" });
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentTeamMember, setCurrentTeamMember] = useState({ name: "", role: "", bio: "", designation: "", internalLink: "" });
  // --- End NEW State ---

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
          value: country.name.common, // Using common name as value for simplicity
        }));
        // Sort countries alphabetically
        countries.sort((a, b) => a.label.localeCompare(b.label));
        setCountryOptions(countries);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // --- Image/File Handlers ---
  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
       // Optional: Revoke previous object URL to free memory
       if (coverPhoto) {
         URL.revokeObjectURL(coverPhoto);
       }
       setCoverPhoto(URL.createObjectURL(file));
    } else if (file) {
        alert("Please select an image file for the cover photo.");
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
     if (file && file.type.startsWith("image/")) {
       // Optional: Revoke previous object URL
       if (profilePhoto) {
         URL.revokeObjectURL(profilePhoto);
       }
       setProfilePhoto(URL.createObjectURL(file));
    } else if (file) {
        alert("Please select an image file for the profile photo.");
    }
  };

  const handleBusinessLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
       // Optional: Revoke previous object URL
       if (businessLogo) {
         URL.revokeObjectURL(businessLogo);
       }
       setBusinessLogo(URL.createObjectURL(file));
    } else if (file) {
        alert("Please select an image file for the business logo.");
    }
  };

  const handleProjectMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const currentMediaCount = projectMedia.length;
    // Optional: Limit the number of files
    // const maxFiles = 10;
    // if (currentMediaCount + files.length > maxFiles) {
    //     alert(`You can upload a maximum of ${maxFiles} media items per project.`);
    //     return;
    // }

    const mediaUrls = files
        .filter(file => file.type.startsWith("image/") || file.type.startsWith("video/")) // Basic filtering
        .map(file => URL.createObjectURL(file));

    if (mediaUrls.length !== files.length) {
        alert("Some selected files were not valid image or video types and were ignored.");
    }

    setProjectMedia([...projectMedia, ...mediaUrls]);
  };

  const removeProjectMedia = (index) => {
    const updatedMedia = [...projectMedia];
    // Revoke object URL before removing from state
    URL.revokeObjectURL(updatedMedia[index]);
    updatedMedia.splice(index, 1);
    setProjectMedia(updatedMedia);
  };

  // NEW: Client Logo Handler
  const handleClientLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
        // Optional: Revoke previous preview URL if adding another
        if (currentClient.logoPreview) {
            URL.revokeObjectURL(currentClient.logoPreview);
        }
      setCurrentClient({
        ...currentClient,
        logo: file, // Store the file object itself if needed for upload
        logoPreview: URL.createObjectURL(file)
      });
    } else if(file) {
        alert("Please select an image file for the client logo.");
    }
  };

  // --- Save/Update Handlers ---
  const handleUpdateProfile = () => {
    // Add validation if needed
    console.log("Profile updated:", { firstName, lastName, aboutMe, nextHouseProject });
    alert("Profile updated successfully!");
    // Add API call here
  };

  const handleUpdateContact = () => {
     // Add validation if needed
    console.log("Contact updated:", { country: country?.value, state, city, pincode }); // Use country.value
    alert("Contact information updated!");
     // Add API call here
  };

  const handlePasswordChange = () => {
    // Add more robust validation (e.g., password strength)
    if (!currentPassword || !newPassword || !confirmPassword) {
        alert("Please fill all password fields.");
        return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
     if (newPassword === currentPassword) {
      alert("New password cannot be the same as the current password.");
      return;
    }
    console.log("Password change requested:", { currentPassword, newPassword }); // Don't log passwords in production
    alert("Password change request submitted successfully!"); // Changed message for security
    // Add API call here (send current and new password)
    // Reset fields after successful attempt
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleForgotPassword = () => {
    alert("If your email is registered, a password reset link will be sent."); // More secure message
    // Redirect or trigger forgot password API call here
  };

  const handleGoogleSignIn = () => {
    // In a real app, you'd initiate the Google OAuth flow here
    // window.location.href = "YOUR_GOOGLE_AUTH_URL";
    console.log("Attempting Google Sign-In...");
    alert("Initiating Google Sign-In...");
  };

  const handleUpdateSocialMedia = () => {
     // Add validation (e.g., check if URLs are valid)
    console.log("Social media updated:", { facebook, twitter, instagram, linkedin });
    alert("Social media links updated!");
     // Add API call here
  };

  const handleUpdateBusinessInfo = () => {
     // Add validation if needed
    console.log("Business info updated:", { businessName, businessLogo, establishmentYear, licenseNumber });
     // You might need to handle the actual logo file upload here, not just the preview URL
    alert("Business information updated!");
     // Add API call here
  };

  const handleAddPortfolioItem = () => {
     // Add validation
     if (!projectTitle || !projectType || !projectYear || !projectLocation || !projectRole) {
         alert("Please fill all required portfolio fields (Title, Type, Year, Location, Role).");
         return;
     }
    console.log("Portfolio item added:", {
      projectTitle,
      projectType: projectType?.value, // Use projectType.value
      projectStatus,
      projectYear,
      projectLocation,
      budgetRange,
      projectRole,
      projectLink,
      projectMedia // You might need to handle actual file uploads here
    });
    alert("Portfolio item added successfully!");
     // Add API call here to save the portfolio item

    // Reset form
    setProjectTitle("");
    setProjectType(null);
    setProjectStatus("completed");
    setProjectYear("");
    setProjectLocation("");
    setBudgetRange("");
    setProjectRole("");
    setProjectLink("");
    // Clean up Object URLs for removed media
    projectMedia.forEach(URL.revokeObjectURL);
    setProjectMedia([]);
  };

  // --- NEW: Experience & Clients Handlers ---
  const handleAddWorkItem = () => {
    if (!currentWorkItem.name || !currentWorkItem.role || !currentWorkItem.duration) {
        alert("Please fill all work history fields.");
        return;
    }
    setWorkHistory([...workHistory, currentWorkItem]);
    setCurrentWorkItem({ name: "", role: "", duration: "" }); // Reset form
  };
  const handleRemoveWorkItem = (index) => {
    setWorkHistory(workHistory.filter((_, i) => i !== index));
  };

  const handleAddClient = () => {
     if (!currentClient.name) {
        alert("Please enter the client name.");
        return;
    }
    // Important: If uploading the logo, handle the 'currentClient.logo' File object here
    // For now, we only store the preview URL in the list state
    const clientToAdd = { name: currentClient.name, logoPreview: currentClient.logoPreview };
    setPastClients([...pastClients, clientToAdd]);
    // Clean up preview URL if it exists before resetting
     if (currentClient.logoPreview) {
        // URL.revokeObjectURL(currentClient.logoPreview); // Be careful not to revoke if it's already in pastClients state
     }
    setCurrentClient({ name: "", logo: null, logoPreview: null }); // Reset form
  };
  const handleRemoveClient = (index) => {
     // Revoke object URL when removing from the list
     if (pastClients[index].logoPreview) {
       URL.revokeObjectURL(pastClients[index].logoPreview);
     }
    setPastClients(pastClients.filter((_, i) => i !== index));
  };

  const handleAddTestimonial = () => {
     if (!currentTestimonial.clientName || !currentTestimonial.review) {
        alert("Please fill all testimonial fields.");
        return;
    }
    setTestimonials([...testimonials, currentTestimonial]);
    setCurrentTestimonial({ clientName: "", review: "" }); // Reset form
  };
  const handleRemoveTestimonial = (index) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const handleAddAward = () => {
    if (!currentAward.name || !currentAward.body || !currentAward.year) {
        alert("Please fill all award fields.");
        return;
    }
    setAwards([...awards, currentAward]);
    setCurrentAward({ name: "", body: "", year: "" }); // Reset form
  };
  const handleRemoveAward = (index) => {
    setAwards(awards.filter((_, i) => i !== index));
  };

  const handleSaveExperience = () => {
      console.log("Experience & Clients Saved:", { workHistory, pastClients, testimonials, awards });
      // Remember pastClients currently only holds logoPreview, not the file. Upload needs separate handling.
      alert("Experience & Clients information saved!");
       // Add API call here
  };

  // --- NEW: Certifications & Associations Handlers ---
  const handleAddCertification = () => {
    if (!currentCertification.name || !currentCertification.body || !currentCertification.year) {
        alert("Please fill all certification fields.");
        return;
    }
    setCertifications([...certifications, currentCertification]);
    setCurrentCertification({ name: "", body: "", year: "" }); // Reset form
  };
  const handleRemoveCertification = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleAddTeamMember = () => {
    if (!currentTeamMember.name || !currentTeamMember.role) {
        alert("Please fill at least Team Member Name and Role.");
        return;
    }
    setTeamMembers([...teamMembers, currentTeamMember]);
    setCurrentTeamMember({ name: "", role: "", bio: "", designation: "", internalLink: "" }); // Reset form
  };
  const handleRemoveTeamMember = (index) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

   const handleSaveCertifications = () => {
      console.log("Certifications & Team Saved:", { certifications, teamMembers });
      alert("Certifications & Associations information saved!");
       // Add API call here
  };
  // --- End NEW Handlers ---


  const sections = [
    "Profile Info",
    "Contact Info",
    "Password",
    "Social Media Settings",
    "Portfolio",
    "Business Info",
    "Collaboration/Hiring Preferences", // Corrected Typo
    "Experience & Clients", // Corrected typo
    "Certifications & Associations", // Corrected typo/spacing
  ];

    // Styles for react-select
    const selectStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? 'rgb(59 130 246)' : 'rgb(209 213 219)', // blue-500 on focus, gray-300 otherwise
            boxShadow: state.isFocused ? '0 0 0 1px rgb(59 130 246)' : 'none',
            minHeight: '46px', // Match input height p-3
            '&:hover': {
                borderColor: state.isFocused ? 'rgb(59 130 246)' : 'rgb(156 163 175)', // gray-400 on hover
            }
        }),
        input: (base) => ({ ...base, color: 'black'}),
        singleValue: (base) => ({ ...base, color: 'black'}),
        placeholder: (base) => ({ ...base, color: '#6b7280' }), // gray-500
         option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? 'rgb(34 197 94)' : state.isFocused ? 'rgb(229 231 235)' : 'white', // green-500 selected, gray-100 focused
            color: state.isSelected ? 'white' : 'black',
            '&:active': {
                backgroundColor: state.isSelected ? 'rgb(22 163 74)' : 'rgb(209 213 219)', // green-600 selected active, gray-300 active
            },
        }),
    };


  const renderSection = () => {
    switch (activeSection) {
      case "Profile Info":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Account Information</h2>
      
            {/* Username - Now editable */}
            <div className="mb-6">
              <label htmlFor="username" className="block text-lg font-semibold mb-2">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter your username"
              />
              <p className="text-sm text-gray-500 mt-1">This will be your public display name.</p>
            </div>
      
            {/* Email - Now editable */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter your email address"
              />
              <p className="text-sm text-gray-500 mt-1">We'll send important notifications to this email.</p>
            </div>
      
            <h2 className="text-2xl font-bold">Profile Information</h2>
      
            <div className="mb-6">
              <label htmlFor="firstName" className="block text-lg font-semibold mb-2">First Name</label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter your first name"
              />
            </div>
      
            <div className="mb-6">
              <label htmlFor="lastName" className="block text-lg font-semibold mb-2">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter your last name"
              />
            </div>
      
            <div className="mb-6">
              <label htmlFor="aboutMe" className="block text-lg font-semibold mb-2">About Me</label>
              <textarea
                id="aboutMe"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                rows="4"
                placeholder="Tell us a little about yourself"
              ></textarea>
            </div>
      
            <div className="mb-6">
              <label htmlFor="nextHouseProject" className="block text-lg font-semibold mb-2">Next House Project</label>
              <textarea
                id="nextHouseProject"
                value={nextHouseProject}
                onChange={(e) => setNextHouseProject(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                rows="4"
                placeholder="What are you planning for your next project?"
              ></textarea>
            </div>
      
            <div className="mt-4">
              <button
                className="px-8 py-3 border border-green-600 text-white rounded bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
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
              <label htmlFor="country" className="block text-lg font-semibold mb-2">Country</label>
              <Select
                inputId="country"
                options={countryOptions}
                onChange={setCountry} // react-select passes the whole selected option object
                value={country}
                placeholder="Select a country"
                className="w-full sm:w-96"
                classNamePrefix="react-select"
                styles={selectStyles}
                isClearable
                />

            </div>

            <div className="mb-6">
              <label htmlFor="state" className="block text-lg font-semibold mb-2">State / Province</label>
              <input
                id="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter your state or province"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="city" className="block text-lg font-semibold mb-2">City</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                 placeholder="Enter your city"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="pincode" className="block text-lg font-semibold mb-2">Pincode / Zip Code</label>
              <input
                id="pincode"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter your pincode or zip code"
              />
            </div>

            <div className="mt-4">
              <button
                className="px-8 py-3 border border-green-600 text-white rounded bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
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
              <label htmlFor="currentPassword" className="block text-lg font-semibold mb-2">Current Password</label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                 placeholder="Enter your current password"
                 autoComplete="current-password"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="newPassword" className="block text-lg font-semibold mb-2">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter your new password"
                autoComplete="new-password"
              />
                 {/* Add password strength indicator here if needed */}
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-lg font-semibold mb-2">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full sm:w-96 p-3 border rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none ${
                    confirmPassword && newPassword !== confirmPassword ? 'border-red-500' : 'border-gray-300'
                 }`}
                placeholder="Confirm your new password"
                autoComplete="new-password"
              />
               {confirmPassword && newPassword !== confirmPassword && (
                 <p className="text-red-600 text-sm mt-1">Passwords do not match.</p>
               )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
              <button
                 className="px-8 py-3 border border-green-600 text-white rounded bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50"
                onClick={handlePasswordChange}
                disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
              >
                Change Password
              </button>

              <button
                type="button"
                className="text-blue-600 hover:underline sm:text-right text-sm"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-3">Connected Accounts</h3>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full sm:w-96 px-8 py-3 border border-gray-300 rounded hover:bg-gray-100 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition duration-150 ease-in-out"
              >
                <FcGoogle className="text-2xl mr-2" />
                Continue with Google
              </button>
              {/* Add buttons for other providers (Facebook, Apple, etc.) here if needed */}
            </div>
          </div>
        );

       case "Social Media Settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Social Media Links</h2>
            <p className="text-sm text-gray-500">Add links to your profiles on other platforms.</p>

            <div className="mb-6">
              <label htmlFor="facebook" className="block text-lg font-semibold mb-2">Facebook</label>
              <input
                id="facebook"
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="https://facebook.com/yourprofile"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="twitter" className="block text-lg font-semibold mb-2">Twitter (X)</label>
              <input
                id="twitter"
                type="url"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="https://x.com/yourprofile"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="instagram" className="block text-lg font-semibold mb-2">Instagram</label>
              <input
                id="instagram"
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="https://instagram.com/yourprofile"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="linkedin" className="block text-lg font-semibold mb-2">LinkedIn</label>
              <input
                id="linkedin"
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
             {/* Add other social media links (Pinterest, YouTube, etc.) here if needed */}

            <div className="mt-4">
               <button
                 className="px-8 py-3 border border-green-600 text-white rounded bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
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
            <p className="text-sm text-gray-500">Provide details if you operate as a business.</p>

            <div className="mb-6">
              <label htmlFor="businessName" className="block text-lg font-semibold mb-2">Business Name</label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter your business name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Business Logo</label>
              <div className="flex items-center gap-4">
                {businessLogo ? (
                  <div className="relative w-24 h-24 border-2 border-gray-300 rounded-md overflow-hidden bg-gray-100">
                    <img src={businessLogo} alt="Business Logo Preview" className="w-full h-full object-contain" />
                    <button
                        type="button"
                        onClick={() => {
                            if (businessLogo) URL.revokeObjectURL(businessLogo);
                            setBusinessLogo(null);
                        }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                      aria-label="Remove logo"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                    <span className="text-gray-400 text-sm text-center p-1">Upload Logo</span>
                  </div>
                )}
                <label className="cursor-pointer">
                  <span className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
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
              <label htmlFor="establishmentYear" className="block text-lg font-semibold mb-2">Establishment Year</label>
              <input
                id="establishmentYear"
                type="number"
                value={establishmentYear}
                onChange={(e) => setEstablishmentYear(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="YYYY"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="licenseNumber" className="block text-lg font-semibold mb-2">License or Registration Number <span className="text-sm text-gray-500">(Optional)</span></label>
              <input
                id="licenseNumber"
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Enter your business license/registration number"
              />
            </div>

            <div className="mt-4">
              <button
                 className="px-8 py-3 border border-green-600 text-white rounded bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
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
             <p className="text-sm text-gray-500">Showcase your completed work.</p>

            <div className="mb-6">
              <label htmlFor="projectTitle" className="block text-lg font-semibold mb-2">Project Title <span className="text-red-500">*</span></label>
              <input
                id="projectTitle"
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Name of the project"
                 required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="projectType" className="block text-lg font-semibold mb-2">Project Type <span className="text-red-500">*</span></label>
               <Select
                inputId="projectType"
                options={projectTypeOptions}
                onChange={setProjectType}
                value={projectType}
                placeholder="Select project type"
                className="w-full sm:w-96"
                classNamePrefix="react-select"
                 styles={selectStyles}
                 required
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Project Status</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="projectStatus"
                    value="completed"
                    checked={projectStatus === "completed"}
                    onChange={() => setProjectStatus("completed")}
                    className="mr-2 h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  Completed
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="projectStatus"
                    value="in-progress"
                    checked={projectStatus === "in-progress"}
                    onChange={() => setProjectStatus("in-progress")}
                    className="mr-2 h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  In Progress
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="projectYear" className="block text-lg font-semibold mb-2">Year {projectStatus === "completed" ? "Completed" : "Started"} <span className="text-red-500">*</span></label>
              <input
                 id="projectYear"
                type="number"
                value={projectYear}
                onChange={(e) => setProjectYear(e.target.value)}
                 className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder={`YYYY`}
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="projectLocation" className="block text-lg font-semibold mb-2">Location <span className="text-red-500">*</span></label>
              <input
                id="projectLocation"
                type="text"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="City, Country"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="budgetRange" className="block text-lg font-semibold mb-2">Budget Range <span className="text-sm text-gray-500">(Optional)</span></label>
              <input
                 id="budgetRange"
                type="text"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                 className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="e.g., $50,000 - $75,000 or Approx. €100k"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="projectRole" className="block text-lg font-semibold mb-2">Your Role in Project <span className="text-red-500">*</span></label>
              <input
                id="projectRole"
                type="text"
                value={projectRole}
                onChange={(e) => setProjectRole(e.target.value)}
                className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="e.g., Architect, Contractor, Interior Designer"
                 required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="projectLink" className="block text-lg font-semibold mb-2">Link to Case Study or External Site <span className="text-sm text-gray-500">(Optional)</span></label>
              <input
                id="projectLink"
                type="url"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                 className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="https://example.com/project-details"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2">Upload Project Media (Images/Videos)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                {projectMedia.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {projectMedia.map((media, index) => (
                      <div key={index} className="relative group aspect-w-1 aspect-h-1"> {/* Use aspect ratio */}
                        {media.startsWith('blob:http') ? ( // Check if it's an Object URL
                             media.includes('video') || /\.(mp4|mov|webm|ogg)$/i.test(media) ? ( // Heuristic check based on URL or common extensions
                               <video src={media} className="w-full h-full object-cover rounded bg-black" controls />
                             ) : (
                               <img src={media} alt={`Project media ${index + 1}`} className="w-full h-full object-cover rounded bg-gray-200" />
                             )
                        ) : (
                            // Fallback for non-blob URLs or if type detection fails
                             <img src={media} alt={`Project media ${index + 1}`} className="w-full h-full object-cover rounded bg-gray-200" />
                        )}
                        <button
                          type="button"
                          onClick={() => removeProjectMedia(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-90 hover:bg-red-600 transition-opacity focus:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500"
                          aria-label={`Remove media ${index + 1}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                 )}
                  {projectMedia.length === 0 && (
                     <div className="text-center py-8 text-gray-500">
                       No media uploaded yet. Click below to add.
                     </div>
                   )}
                <label className="cursor-pointer flex justify-center mt-2">
                  <span className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
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
                 className="px-8 py-3 border border-green-600 text-white rounded bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                onClick={handleAddPortfolioItem}
                 disabled={!projectTitle || !projectType || !projectYear || !projectLocation || !projectRole} // Example disabled state
              >
                Add Project to Portfolio
              </button>
            </div>
          </div>
        );

       // --- NEW: Experience & Clients Section ---
       case "Experience & Clients":
         return (
           <div className="space-y-8">
             <h2 className="text-2xl font-bold">Experience & Clients</h2>
             <p className="text-sm text-gray-500">Detail your professional background and client interactions.</p>


             {/* Work History Sub-Section */}
             <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
               <h3 className="text-xl font-semibold mb-4">Work History</h3>
               {workHistory.length > 0 ? (
                 <ul className="space-y-3 mb-4">
                   {workHistory.map((item, index) => (
                     <li key={index} className="p-3 border rounded bg-white flex justify-between items-start group">
                       <div>
                         <p className="font-medium text-gray-800">{item.name}</p>
                         <p className="text-sm text-gray-600">{item.role}</p>
                         <p className="text-sm text-gray-500">{item.duration}</p>
                       </div>
                       <button type="button" onClick={() => handleRemoveWorkItem(index)} className="text-red-500 hover:text-red-700 text-sm ml-4 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" aria-label={`Remove ${item.name}`}>Remove</button>
                     </li>
                   ))}
                 </ul>
               ) : (
                 <p className="text-sm text-gray-500 mb-4 italic">No work history added yet.</p>
               )}
               {/* Form to add new item */}
               <div className="space-y-3 border-t pt-4 mt-4">
                   <label htmlFor="workName" className="sr-only">Company/Project Name</label>
                   <input
                     id="workName"
                     type="text"
                     placeholder="Company/Project Name"
                     value={currentWorkItem.name}
                     onChange={(e) => setCurrentWorkItem({...currentWorkItem, name: e.target.value })}
                      className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                    <label htmlFor="workRole" className="sr-only">Your Role</label>
                   <input
                     id="workRole"
                     type="text"
                     placeholder="Your Role"
                     value={currentWorkItem.role}
                     onChange={(e) => setCurrentWorkItem({...currentWorkItem, role: e.target.value })}
                      className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                   <label htmlFor="workDuration" className="sr-only">Duration</label>
                   <input
                     id="workDuration"
                     type="text"
                     placeholder="Duration (e.g., Jan 2020 - Present)"
                     value={currentWorkItem.duration}
                     onChange={(e) => setCurrentWorkItem({...currentWorkItem, duration: e.target.value })}
                      className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                   <button type="button" onClick={handleAddWorkItem} className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50" disabled={!currentWorkItem.name || !currentWorkItem.role || !currentWorkItem.duration}>Add Work History</button>
               </div>
             </div>


             {/* Past Clients Sub-Section */}
             <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
               <h3 className="text-xl font-semibold mb-4">Past Clients</h3>
               {pastClients.length > 0 ? (
                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {pastClients.map((client, index) => (
                     <div key={index} className="p-3 border rounded bg-white text-center relative group aspect-w-1 aspect-h-1 flex flex-col justify-center items-center">
                        {client.logoPreview ? (
                            <img src={client.logoPreview} alt={`${client.name} Logo`} className="max-h-16 w-auto mx-auto mb-2 object-contain"/>
                        ) : (
                            <div className="h-16 flex items-center justify-center text-gray-400 mb-2 text-xs italic">(No Logo)</div>
                        )}
                        <p className="font-medium text-sm text-gray-800 break-words">{client.name}</p>
                        <button type="button" onClick={() => handleRemoveClient(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-red-400" aria-label={`Remove ${client.name}`}>×</button>
                     </div>
                    ))}
                 </div>
               ) : (
                 <p className="text-sm text-gray-500 mb-4 italic">No past clients added yet.</p>
               )}
                {/* Form to add new client */}
                <div className="space-y-3 border-t pt-4 mt-4">
                   <label htmlFor="clientName" className="sr-only">Client Name</label>
                   <input
                     id="clientName"
                     type="text"
                     placeholder="Client Name"
                     value={currentClient.name}
                     onChange={(e) => setCurrentClient({...currentClient, name: e.target.value })}
                      className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                    <div className="flex items-center gap-4">
                         {currentClient.logoPreview ? (
                            <div className="relative w-16 h-16 border rounded overflow-hidden bg-gray-100">
                                <img src={currentClient.logoPreview} alt="Client Logo Preview" className="w-full h-full object-contain" />
                                <button type="button" onClick={() => { if (currentClient.logoPreview) URL.revokeObjectURL(currentClient.logoPreview); setCurrentClient({...currentClient, logo: null, logoPreview: null})}} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600 focus:outline-none focus:ring-1 focus:ring-red-400" aria-label="Remove Preview">×</button>
                            </div>
                            ) : (
                            <div className="w-16 h-16 border-dashed border-2 rounded flex items-center justify-center text-gray-400 text-xs bg-white">Preview</div>
                            )}
                        <label className="cursor-pointer">
                            <span className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 text-sm">Upload Logo <span className="text-gray-400">(Optional)</span></span>
                            <input type="file" accept="image/*" onChange={handleClientLogoChange} className="hidden" />
                        </label>
                    </div>
                   <button type="button" onClick={handleAddClient} className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50" disabled={!currentClient.name}>Add Client</button>
               </div>
             </div>


             {/* Testimonials Sub-Section */}
             <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
               <h3 className="text-xl font-semibold mb-4">Testimonials / Client Reviews</h3>
                 {testimonials.length > 0 ? (
                 <ul className="space-y-3 mb-4">
                   {testimonials.map((item, index) => (
                     <li key={index} className="p-3 border rounded bg-white relative group">
                         <blockquote className="italic text-gray-700">"{item.review}"</blockquote>
                         <p className="text-sm text-gray-600 text-right mt-1 font-medium">- {item.clientName}</p>
                       <button type="button" onClick={() => handleRemoveTestimonial(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-red-400" aria-label={`Remove testimonial by ${item.clientName}`}>×</button>
                     </li>
                   ))}
                 </ul>
                ) : (
                    <p className="text-sm text-gray-500 mb-4 italic">No testimonials added yet.</p>
                )}
                {/* Form to add new testimonial */}
                <div className="space-y-3 border-t pt-4 mt-4">
                   <label htmlFor="testClientName" className="sr-only">Client Name</label>
                   <input
                     id="testClientName"
                     type="text"
                     placeholder="Client Name"
                     value={currentTestimonial.clientName}
                     onChange={(e) => setCurrentTestimonial({...currentTestimonial, clientName: e.target.value })}
                     className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                    <label htmlFor="testReview" className="sr-only">Client Review</label>
                   <textarea
                      id="testReview"
                      placeholder="Client Review / Testimonial Text"
                      value={currentTestimonial.review}
                     onChange={(e) => setCurrentTestimonial({...currentTestimonial, review: e.target.value })}
                      className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      rows="3"
                   ></textarea>
                   <button type="button" onClick={handleAddTestimonial} className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50" disabled={!currentTestimonial.clientName || !currentTestimonial.review}>Add Testimonial</button>
               </div>
             </div>


              {/* Awards/Recognition Sub-Section */}
             <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
               <h3 className="text-xl font-semibold mb-4">Awards / Recognition</h3>
                {awards.length > 0 ? (
                 <ul className="space-y-3 mb-4">
                   {awards.map((item, index) => (
                     <li key={index} className="p-3 border rounded bg-white flex justify-between items-start group">
                       <div>
                         <p className="font-medium text-gray-800">{item.name}</p>
                         <p className="text-sm text-gray-600">{item.body} ({item.year})</p>
                       </div>
                       <button type="button" onClick={() => handleRemoveAward(index)} className="text-red-500 hover:text-red-700 text-sm ml-4 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" aria-label={`Remove ${item.name}`}>Remove</button>
                     </li>
                   ))}
                 </ul>
                ) : (
                    <p className="text-sm text-gray-500 mb-4 italic">No awards added yet.</p>
                )}
                 {/* Form to add new award */}
                <div className="space-y-3 border-t pt-4 mt-4">
                    <label htmlFor="awardName" className="sr-only">Award Name</label>
                   <input
                     id="awardName"
                     type="text"
                     placeholder="Award or Recognition Name"
                      value={currentAward.name}
                     onChange={(e) => setCurrentAward({...currentAward, name: e.target.value })}
                      className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                    <label htmlFor="awardBody" className="sr-only">Awarding Body</label>
                   <input
                     id="awardBody"
                     type="text"
                     placeholder="Awarding Body/Organization"
                      value={currentAward.body}
                     onChange={(e) => setCurrentAward({...currentAward, body: e.target.value })}
                     className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                   <label htmlFor="awardYear" className="sr-only">Year Received</label>
                   <input
                     id="awardYear"
                     type="number"
                     placeholder="Year Received (YYYY)"
                      value={currentAward.year}
                     onChange={(e) => setCurrentAward({...currentAward, year: e.target.value })}
                     min="1900"
                     max={new Date().getFullYear()}
                      className="w-full sm:w-48 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                   <button type="button" onClick={handleAddAward} className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50" disabled={!currentAward.name || !currentAward.body || !currentAward.year}>Add Award</button>
               </div>
             </div>


              {/* Save Button for the whole section */}
              <div className="mt-6 pt-6 border-t">
                   <button
                     className="px-8 py-3 border border-green-600 text-white rounded bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                    onClick={handleSaveExperience}
                    >
                    Save Experience & Client Info
                    </button>
              </div>
           </div>
         );

       // --- NEW: Certifications & Associations Section ---
      case "Certifications & Associations":
        return (
          <div className="space-y-8">
             <h2 className="text-2xl font-bold">Certifications & Associations</h2>
              <p className="text-sm text-gray-500">List your professional credentials and team members.</p>

             {/* Certifications / Professional Memberships */}
             <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
               <h3 className="text-xl font-semibold mb-4">Certifications & Memberships</h3>
                 {certifications.length > 0 ? (
                 <ul className="space-y-3 mb-4">
                   {certifications.map((item, index) => (
                     <li key={index} className="p-3 border rounded bg-white flex justify-between items-start group">
                       <div>
                         <p className="font-medium text-gray-800">{item.name}</p>
                         <p className="text-sm text-gray-600">{item.body} ({item.year})</p>
                       </div>
                       <button type="button" onClick={() => handleRemoveCertification(index)} className="text-red-500 hover:text-red-700 text-sm ml-4 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" aria-label={`Remove ${item.name}`}>Remove</button>
                     </li>
                   ))}
                 </ul>
                 ) : (
                     <p className="text-sm text-gray-500 mb-4 italic">No certifications or memberships added yet.</p>
                 )}
                {/* Form to add new certification */}
                <div className="space-y-3 border-t pt-4 mt-4">
                    <label htmlFor="certName" className="sr-only">Certification Name</label>
                   <input
                     id="certName"
                     type="text"
                     placeholder="Certification or Association Name"
                     value={currentCertification.name}
                     onChange={(e) => setCurrentCertification({...currentCertification, name: e.target.value })}
                      className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                    <label htmlFor="certBody" className="sr-only">Issuing Body</label>
                    <input
                     id="certBody"
                     type="text"
                     placeholder="Issuing Body / Organization"
                      value={currentCertification.body}
                     onChange={(e) => setCurrentCertification({...currentCertification, body: e.target.value })}
                      className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                    <label htmlFor="certYear" className="sr-only">Year Obtained</label>
                   <input
                     id="certYear"
                     type="number"
                     placeholder="Year Obtained (YYYY)"
                     value={currentCertification.year}
                     onChange={(e) => setCurrentCertification({...currentCertification, year: e.target.value })}
                     min="1900"
                     max={new Date().getFullYear()}
                     className="w-full sm:w-48 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                   <button type="button" onClick={handleAddCertification} className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50" disabled={!currentCertification.name || !currentCertification.body || !currentCertification.year}>Add Certification/Membership</button>
               </div>
             </div>


             {/* Team Members */}
             <div className="p-4 border rounded-lg bg-gray-50 shadow-sm">
               <h3 className="text-xl font-semibold mb-4">Team Members</h3>
                {teamMembers.length > 0 ? (
                 <ul className="space-y-3 mb-4">
                   {teamMembers.map((item, index) => (
                     <li key={index} className="p-3 border rounded bg-white flex justify-between items-start group">
                       <div className="flex-1 mr-4">
                         <p className="font-medium text-gray-800">{item.name} <span className="text-sm text-gray-600">({item.role})</span></p>
                         {item.designation && <p className="text-sm text-indigo-600 font-semibold">{item.designation}</p>}
                         {item.bio && <p className="text-sm text-gray-500 mt-1">{item.bio}</p>}
                          {item.internalLink && <p className="text-sm text-blue-500 mt-1">Profile Link: <a href={item.internalLink} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.internalLink}</a></p>}
                       </div>
                       <button type="button" onClick={() => handleRemoveTeamMember(index)} className="text-red-500 hover:text-red-700 text-sm ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" aria-label={`Remove ${item.name}`}>Remove</button>
                     </li>
                   ))}
                 </ul>
                 ) : (
                    <p className="text-sm text-gray-500 mb-4 italic">No team members added yet.</p>
                )}
                {/* Form to add new team member */}
                <div className="space-y-3 border-t pt-4 mt-4">
                     <label htmlFor="teamName" className="sr-only">Team Member Name</label>
                   <input
                     id="teamName"
                     type="text"
                     placeholder="Team Member Name"
                     value={currentTeamMember.name}
                     onChange={(e) => setCurrentTeamMember({...currentTeamMember, name: e.target.value })}
                     className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                    <label htmlFor="teamRole" className="sr-only">Role</label>
                    <input
                     id="teamRole"
                     type="text"
                     placeholder="Role (e.g., Architect, Designer)"
                     value={currentTeamMember.role}
                     onChange={(e) => setCurrentTeamMember({...currentTeamMember, role: e.target.value })}
                     className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                     <label htmlFor="teamDesignation" className="sr-only">Designation</label>
                    <input
                     id="teamDesignation"
                     type="text"
                     placeholder="Designation (e.g., Head of Design) (Optional)"
                      value={currentTeamMember.designation}
                     onChange={(e) => setCurrentTeamMember({...currentTeamMember, designation: e.target.value })}
                     className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                    <label htmlFor="teamBio" className="sr-only">Bio</label>
                   <textarea
                      id="teamBio"
                      placeholder="Short Bio (Optional)"
                      value={currentTeamMember.bio}
                     onChange={(e) => setCurrentTeamMember({...currentTeamMember, bio: e.target.value })}
                      className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      rows="2"
                   ></textarea>
                     <label htmlFor="teamLink" className="sr-only">Internal Profile Link</label>
                   <input
                     id="teamLink"
                     type="text" // Use text for internal IDs, URL if it's a web link
                     placeholder="Internal Profile Link/ID (Optional)"
                      value={currentTeamMember.internalLink}
                     onChange={(e) => setCurrentTeamMember({...currentTeamMember, internalLink: e.target.value })}
                      className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                   />
                   <button type="button" onClick={handleAddTeamMember} className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50" disabled={!currentTeamMember.name || !currentTeamMember.role}>Add Team Member</button>
               </div>
             </div>


              {/* Save Button for the whole section */}
              <div className="mt-6 pt-6 border-t">
                   <button
                    className="px-8 py-3 border border-green-600 text-white rounded bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                     onClick={handleSaveCertifications}
                    >
                    Save Certifications & Team Info
                    </button>
              </div>
          </div>
        );

      // Placeholder for other sections
      case "Collaboration/Hiring Preferences":
         return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Collaboration & Hiring Preferences</h2>
            <p className="text-gray-600">Specify how you prefer to collaborate or be hired.</p>
            {/* Add relevant form fields here: e.g., preferred project types, budget ranges, availability, remote work preferences etc. */}
             <div className="p-4 border rounded-lg bg-gray-100">
                <p className="italic text-gray-500">Section content coming soon...</p>
            </div>
          </div>
        );


      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{activeSection}</h2>
            <p className="text-gray-600">Content for this section is under development.</p>
          </div>
        );
    }
  };

  // Component Return
  return (
    <div className="min-h-screen bg-gray-100 text-black py-10 px-4">
      <div className="max-w-7xl mx-auto border shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Cover Section */}
        <div className="relative h-40 sm:h-64 bg-gray-300 overflow-visible group"> {/* Added group for button visibility */}
          {coverPhoto ? (
            <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <span className="text-white text-opacity-70">Upload a Cover Photo</span>
            </div>
          )}

          <label className="absolute top-3 right-3 bg-black bg-opacity-40 text-white px-3 py-1 rounded text-xs sm:text-sm cursor-pointer shadow hover:bg-opacity-60 focus-within:bg-opacity-60 transition opacity-0 group-hover:opacity-100 focus-within:opacity-100">
            Change Cover
            <input type="file" accept="image/*" onChange={handleCoverPhotoChange} className="hidden" />
          </label>

          {/* Profile Photo and Name Area - CORRECTED STRUCTURE */}
          <div className="absolute left-4 sm:left-8 -bottom-12 sm:-bottom-16 flex items-end space-x-4">
             {/* This div contains the photo and the edit label */}
             <div className="relative w-24 h-24 sm:w-32 sm:h-32 border-4 border-white bg-gray-400 shadow-lg rounded-full overflow-hidden group"> {/* Added group for button visibility */}
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-100 text-sm bg-gray-400">
                  Add Photo
                </div>
              )}
              {/* Label is INSIDE the relative div */}
              <label className="absolute bottom-0 right-0 cursor-pointer z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 focus-within:ring-2 focus-within:ring-blue-400 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                <span className="text-lg sm:text-xl block"> {/* Make span block for focus ring */}
                  📷
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  className="hidden"
                />
              </label>
            </div> {/* End of profile photo container div */}

            {/* Name */}
             <div className="pb-1 sm:pb-2">
               <h1 className="text-xl sm:text-3xl font-bold text-gray-800">{firstName && lastName ? `${firstName} ${lastName}` : username}</h1>
               {/* Optionally add title/location */}
               {/* <p className="text-sm text-gray-600">Architect | {city || 'Location'}</p> */}
             </div>

          </div> {/* End of profile photo and name area div */}
        </div> {/* End Cover Section */}


        {/* Layout: Sidebar + Content */}
        <div className="flex flex-col sm:flex-row border-t mt-16 sm:mt-20"> {/* Increased top margin */}
          {/* Sidebar */}
          <div className="w-full sm:w-60 md:w-72 bg-gray-50 border-r p-4 sm:p-6 flex-shrink-0">
            <h3 className="font-semibold text-lg mb-4 text-gray-700">Account Settings</h3>
            <nav className="space-y-1"> {/* Use space-y for vertical spacing */}
              {sections.map((section) => (
                <button
                  type="button"
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`cursor-pointer block w-full text-left py-2.5 px-3 rounded transition text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 ${
                    activeSection === section
                      ? "bg-green-100 font-semibold text-green-800"
                      : "hover:bg-gray-200 text-gray-700"
                  }`}
                  aria-current={activeSection === section ? "page" : undefined}
                >
                   {/* Correct display names on the fly */}
                   {section.replace('Prefffeences', 'Preferences').replace('Exprience', 'Experience').replace('Associations ', 'Associations')}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <main className="flex-1 p-6 sm:p-10 overflow-y-auto bg-white">
              {renderSection()}
          </main>
        </div> {/* End Sidebar + Content Layout */}
      </div> {/* End Main Container */}
    </div> /* End Page Container */
  );
};

export default ProfileSetup;