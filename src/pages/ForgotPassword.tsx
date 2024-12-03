import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordFormInputs,
  forgotPasswordSchema,
} from "@/schema/forgotPasswordSchema";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [forgotPassword, { isLoading, isError }] = useForgotPasswordMutation();

  const onSubmit = async (data: forgotPasswordFormInputs) => {
    try {
      await forgotPassword(data.email).unwrap();
      toast.success("Reset password link sent successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to send reset password link. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
          {isError && (
            <p className="mt-2 text-sm text-red-600">
              Failed to send reset link. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
