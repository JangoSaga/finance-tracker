import { useForm } from "react-hook-form";
import { useSignUp } from "../Features/Authentication/useSignUp";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const { signUp, isLoading } = useSignUp();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    signUp(data, {
      onSuccess: () => {
        toast.success("Account created successfully!");
        reset();
      },
      onError: (err) => {
        toast.error(err.message || "Something went wrong!");
      },
    });
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className={`border ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">
              {errors.fullName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            })}
            className={`border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Password must contain at least one letter and one number",
              },
            })}
            className={`border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            className={`border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md p-2`}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? "Creating Account..." : "Register"}
        </button>
      </form>
      <p className="text-center mt-4 hover:underline">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
