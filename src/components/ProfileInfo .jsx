// import React from "react";

// const ProfileInfoSection = ({ profile, onFieldChange, onUpdate }) => {
//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">Account Information</h2>
      
//       <div className="mb-6">
//         <label className="block text-lg font-semibold mb-2">Username</label>
//         <input
//           type="text"
//           value={profile.username}
//           onChange={(e) => onFieldChange("username", e.target.value)}
//           className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
//           placeholder="Enter your username"
//         />
//         <p className="text-sm text-gray-500 mt-1">This will be your public display name.</p>
//       </div>
      
//       <div className="mb-6">
//         <label className="block text-lg font-semibold mb-2">Email</label>
//         <input
//           type="email"
//           value={profile.email}
//           onChange={(e) => onFieldChange("email", e.target.value)}
//           className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
//           placeholder="Enter your email address"
//         />
//       </div>
      
//       <h2 className="text-2xl font-bold">Profile Information</h2>
      
//       <div className="mb-6">
//         <label className="block text-lg font-semibold mb-2">First Name</label>
//         <input
//           type="text"
//           value={profile.firstName}
//           onChange={(e) => onFieldChange("firstName", e.target.value)}
//           className="w-full sm:w-96 p-3 border border-gray-300 rounded bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
//           placeholder="Enter your first name"
//         />
//       </div>
      
//       <div className="mt-4">
//         <button
//           onClick={onUpdate}
//           className="px-8 py-3 border border-green-600 text-white rounded bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out"
//         >
//           Update Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileInfoSection;