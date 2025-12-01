import axios from 'axios';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/authcontext';
import { Link } from 'react-router';

function Login() {
    const { login } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const value = data.emailorusername.trim();

        const isEmail = /\S+@\S+\.\S+/.test(value)

        const payload = {
            email: isEmail ? value : null,
            username: !isEmail ? value : null,
            password: data.password
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, payload, { withCredentials: true });
            console.log("User Logged in successfully ::", response.data);
            login(response.data);
        } catch (error) {
            console.log("Error while registering user ::", error?.response?.data?.message || "Internal error");
            console.log(error);
        }
        console.log(data)
        console.log(payload)
    }


    return (
        <div class="flex min-h-full flex-col justify-center w-full px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" class="mx-auto h-10 w-auto" /> */}
                <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)}
                    method="POST"
                    class="space-y-6">
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-100">Email or Username</label>
                        <div class="mt-2">
                            <input id="email" type="text" name="emailorusername" autocomplete="email"
                                {...register("emailorusername", { required: true })}
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            {errors.emailorusername && <span>email or username is required</span>}
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium text-gray-100">Password</label>
                            {/* <div class="text-sm">
                                <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                            </div> */}
                        </div>
                        <div class="mt-2">
                            <input id="password" type="password" name="password" autocomplete="current-password"
                                {...register("password", { required: true })}
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            {errors.password && <span>Password is required</span>}
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
                    </div>
                </form>

                <p class="mt-10 text-center text-sm/6 text-gray-400">
                    New here?&nbsp;
                    <Link to={"/signup"} class="font-semibold text-indigo-400 hover:text-indigo-300">Start with a SignUp</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
