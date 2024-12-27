import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormInputs } from "@/schema/loginSchema";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await login(data).unwrap();
      const user = res.data;
      dispatch(setUser({ user: user, token: res.token }));
      if (user?.role === "vendor") {
        navigate("/vendor/shop", {
          state: { success: "Login successful! Welcome to your shop." },
        });
      } else {
        navigate("/", {
          state: { success: "Login successful! Welcome back." },
        });
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  const autofillCredentials = (role: "customer" | "vendor" | "admin") => {
    const credentials = {
      customer: { email: "john@customer.com", password: "customer123" },
      vendor: { email: "john@vendor.com", password: "vendor123" },
      admin: { email: "john@admin.com", password: "admin123" },
    };

    const { email, password } = credentials[role];
    setValue("email", email);
    setValue("password", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>

          {error && (
            <p className="mt-2 text-sm text-red-600">
              Login failed. Please try again.
            </p>
          )}
        </form>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => autofillCredentials("customer")}
          >
            Customer Credential
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => autofillCredentials("vendor")}
          >
            Vendor Credential
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => autofillCredentials("admin")}
          >
            Admin Credential
          </Button>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
          <Link to="/signup" className="text-sm text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
