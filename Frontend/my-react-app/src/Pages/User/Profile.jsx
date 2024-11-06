import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import{useProfileMutation} from "../../redux/Api/UsersApiSlice"

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // State for user information
  const [profileUpdate] = useProfileMutation();

  // Simulate fetching user info from local storage or an API
  useEffect(() => {
    const fetchedUserInfo = localStorage.getItem("userInfo"); // Get user info from local storage
    if (fetchedUserInfo) {
      const user = JSON.parse(fetchedUserInfo); // Parse the JSON string
      setUserInfo(user);
      setUserName(user.username);
      setEmail(user.email);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    // Call the mutation function provided by useProfileMutation
    
  
    setLoadingUpdateProfile(true);
  
    try {
      const updatedUserInfo = {
        _id: userInfo._id,  // Use the current user ID
        username,           // Assume username is a state variable
        email,              // Email state
        password,           // Password state (new)
      };
  
      // Make the API call using the mutation
      const result = await profileUpdate(updatedUserInfo).unwrap();
  
      // Store the updated user info in local storage
      localStorage.setItem("userInfo", JSON.stringify(result));
  
      // Update state with new user info
      setUserInfo(result);
  
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoadingUpdateProfile(false);
    }
  };
  

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-sm w-full"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input p-4 rounded-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                disabled={loadingUpdateProfile}
              >
                {loadingUpdateProfile ? "Updating..." : "Update"}
              </button>

              <Link
                to="/user-orders"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                My Orders
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
