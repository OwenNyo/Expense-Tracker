import React, { useState, useContext } from "react"
import AuthLayout from "../../components/layouts/AuthLayout"
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  // Form state
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error handling state
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    // Basic validation
    if (!fullName) {
      setError("Please enter your name!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // SignUp API Call
    try {

      // Upload imag if present

      if (profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.relativePath || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {

    }
  };

  return (
    <AuthLayout>
      {/* Sign Up form container */}
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us by entering your details below!</p>

        <form onSubmit={handleSignUp}>
          {/* Profile photo upload */}
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          {/* Input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />

            {/* Full-width password input */}
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Minimum 8 characters"
                type="password"
              />
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing up..." : "SIGN UP"}
          </button>

          {/* Redirect to login */}
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
