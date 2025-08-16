import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Route/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";

import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";
import SocialSignIn from "../Components/SocialSignIn";
import axios from "axios";



const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(import.meta.env.VITE_image_upload_key)
    const { signUp,updateUser } = useAuth()
    const axiosInstance = useAxios()
    const [profilePic, setProfilePic] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    
    const from = location.state?.from || '/';

    const onSubmit = async (data) => {
        try {
            const result = await signUp(data.email, data.password);
            const userInfo = {
                name:data.name,
                email: data.email,
                profilePic:profilePic,
                role: 'user',
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString()
            };
            console.log("user info",userInfo)
            await axiosInstance.post('/users', userInfo);

            const userProfile = {
                displayName: data.name,
                photoURL: profilePic
            };
            await updateUser(userProfile);

            navigate(from);
        } catch (error) {
            console.error('Registration Error:', error);
        }
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);

        try {
            const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
            const res = await axios.post(uploadUrl, formData);
            setProfilePic(res.data.data.url);
        } catch (error) {
            console.error('Image Upload Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Your Name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
                    </div>

                    {/* Profile Picture Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="file-input file-input-bordered w-full"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Your Email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            className="input input-bordered w-full"
                            placeholder="Password"
                        />
                        {errors.password?.type === 'required' && <p className="text-red-500 text-sm">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500 text-sm">Minimum 6 characters</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full bg-blue-800 text-white">Register</button>
                </form>

                {/* Extra Links */}
                <p className="text-center mt-4 text-sm">
                    Already have an account?
                    <Link to="/login" className="text-blue-600 ml-1 underline">Login</Link>
                </p>

                {/* Social Login */}
                <div className="mt-6">
               <SocialSignIn></SocialSignIn>
                </div>
            </div>
        </div>
    );
};

export default Register;
