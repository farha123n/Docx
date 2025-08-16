import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialSignIn from "../Components/SocialSignIn";
import { toast } from "react-toastify";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(from);
                toast("login successful")
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-600 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Please Login</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                            })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        {errors.password?.type === 'required' &&
                            <p className="text-red-500 text-sm mt-1">Password is required</p>}
                        {errors.password?.type === 'minLength' &&
                            <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>}
                    </div>

                    <div className="text-sm text-right">
                        <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm mt-4 text-center">
                    New to this website?{" "}
                    <Link to="/register" state={{ from }} className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>

                <div className="mt-6">
                    <SocialSignIn></SocialSignIn>
                </div>
            </div>
        </div>
    );
};

export default Login;