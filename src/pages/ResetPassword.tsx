import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as z from "zod";

// Define validation schema
const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Get the token from the query parameters

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    try {
      if (!token) {
        toast.error("Invalid or missing token. Please try again.");
        return;
      }

      await resetPassword({ password: data.password, token }).unwrap();
      toast.success("Password reset successful!");
      navigate("/login"); // Redirect to login after success
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
