import { subscribe } from "@/redux/features/newsLetter/newsLetterSlice";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    dispatch(subscribe(email.trim()));
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Stay Updated!
        </h2>
        <p className="mt-4 text-lg leading-6 text-gray-600 dark:text-gray-300">
          Subscribe to our newsletter and never miss out on the latest products,
          promotions, and updates.
        </p>
      </div>
      <form
        onSubmit={handleSubscribe}
        className="mt-8 sm:flex sm:justify-center"
      >
        <div className="flex-1 min-w-0">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="block w-full px-4 py-3 rounded-md text-gray-900 placeholder-gray-500 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <button
            type="submit"
            className="block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
}
