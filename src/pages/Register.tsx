import { Button } from '@/components/ui/button';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useSignUPMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(2, "Password should be at least 6 characters long"),
    phone: z.string().min(1, "Phone is required"),
    address: z.string().min(1, "Address is required"),
});

type SignUpFormInputs = z.infer<typeof schema>;

const Register = () => {
    const navigate = useNavigate();
 
    const [signUp, { error }] = useSignUPMutation();

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: SignUpFormInputs) => {
        try {
             await signUp({ ...data, role: "user" }).unwrap();
            // console.log(res)
            navigate('/login', { state: { success: 'Registration successful! Please log in.' } });
        } catch (error) {
            // console.error('Registration failed:', error);
            toast.error('Sign up failed')
            navigate('/');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                        />
                        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                        />
                        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                        />
                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            {...register('phone')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                        />
                        {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            id="address"
                            {...register('address')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
                        />
                        {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <input
                            type="text"
                            id="role"
                            value="USER"
                            readOnly
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 sm:text-sm"
                        />
                    </div>
                    <Button type="submit" className="w-full">Sign Up</Button>
                    {error && <p className="mt-2 text-sm text-red-600">Registration failed. Please try again.</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
