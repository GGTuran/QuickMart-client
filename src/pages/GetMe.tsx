import React from "react";
import { Button } from "@/components/ui/button";

import { useGetProfileQuery } from "@/redux/features/user/userApi";
import Loading from "@/components/Loading/Loading";
import UpdateProfileModal from "@/components/Dashboard/UpdateProfileModal";

const ProfilePage: React.FC = () => {
  const { data, isError, isLoading } = useGetProfileQuery("", {
    pollingInterval: 30000,
  });
  const person = data?.data;

  if (isLoading)
    return (
      <p>
        <Loading />
      </p>
    );
  if (isError)
    return <p>Error fetching profile information. Please try again.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {person?.name}!</h1>
      <p className="text-lg mb-6">Manage your profile information below:</p>

      <div className="mt-6 border-t pt-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 mt-4">
          <div>
            <img
              src={person?.image || "https://via.placeholder.com/150"}
              alt={person?.name || "Shop Owner"}
              className="w-15 h-15 sm:w-32 sm:h-32 object-cover rounded-full border"
            />
          </div>
          <div className="flex-1">
            <p className="text-lg font-medium">{person?.name || "N/A"}</p>
            <p className="text-sm">Email: {person?.email || "N/A"}</p>
            <p className="text-sm">Phone: {person?.phone || "N/A"}</p>
            <p className="text-sm">Address: {person?.address || "N/A"}</p>
          </div>
        </div>
        <UpdateProfileModal />
      </div>
    </div>
  );
};

export default ProfilePage;
