import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router';

function SignUp() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const validatePasswordMatch = (value) => {
        const password = watch("password", "");
        return value === password || "Passwords do not match";
    }

    const validateEmail = (value) => {
        const isEmail = /\S+@\S+\.\S+/.test(value)
        return isEmail || "Enter a valid email address";
    }

    const [error, setError] = React.useState(null);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, data);
            console.log("User registered successfully ::", response.data);
            setError(null);
            navigate('/login');
        } catch (error) {
            console.log("Error while registering user ::", error?.response?.data?.message || "Internal error");
            setError(error?.response?.data?.message || "Internal error");
        }
        console.log(data)
    }

    return (
        <div>
            <section className="bg-gray-50 w-screen dark:bg-black">
                <div className="flex flex-col items-center justify-center px-6 py-8 my-auto h-screen mx-auto md:h-screen lg:py-0">
                    <h1 className='mb-6 text-4xl font-bold'>Sign Up</h1>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-950 dark:border-gray-800">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create your account
                            </h1>

                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        {...register("name", { required: true })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter Name"
                                        
                                    />
                                    {errors.name && <span className='text-red-500 font-medium text-xs'>This field is required</span>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        {...register("email", { required: "This field is required", validate: validateEmail })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter Email"
                                        
                                    />
                                    {errors.email && <span className='text-red-400 font-medium text-sm'>{errors.email.message}</span>}
                                </div>

                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        {...register("username", { required: true })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter Username"
                                        
                                    />
                                    {errors.username && <span className='text-red-400 font-medium text-sm'>This field is required</span>}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Create Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        {...register("password", { required: true })}
                                        placeholder="Enter Password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    {errors.password && <span className='text-red-400 font-medium text-sm'>This field is required</span>}
                                </div>

                                <div>
                                    <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmpassword"
                                        id="confirm-password"
                                        {...register("confirmpassword", { required: "Confirm your password", validate: validatePasswordMatch })}
                                        placeholder="Enter Password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    {errors.confirmpassword && <span className='text-red-400 font-medium text-sm'>{errors.confirmpassword.message}</span>}
                                </div>

                                <button
                                    type='submit'
                                    className="w-full bg-blue-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Create an account
                                </button>

{error && <div className='text-center text-red-400'>{error}</div>}

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to="/login" className="font-medium text-primary-600 text-blue-400 hover:underline dark:text-primary-500">Login here</Link>
                                </p>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp
