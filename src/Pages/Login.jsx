import { useForm } from "react-hook-form";
import { useLogin } from "../Features/Authentication/useLogin";
import { Link } from "react-router";
function Login() {
  const { login, isLoading } = useLogin();
  const { register, handleSubmit, reset } = useForm();
  function onSubmit(data) {
    login(data, {
      onSuccess: () => {
        console.log("success");
        reset();
      },
    });
  }
  return (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          className="border border-gray-300 rounded-md p-2"
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="border border-gray-300 rounded-md p-2"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <p className="text-center mt-4 hover:underline">
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
