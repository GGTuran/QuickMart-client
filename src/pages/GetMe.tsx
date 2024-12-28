import React from "react";
import { useGetProfileQuery } from "@/redux/features/user/userApi";
import Loading from "@/components/Loading/Loading";
import UpdateProfileModal from "@/components/Dashboard/UpdateProfileModal";

const ProfilePage: React.FC = () => {
  const { data, isError, isLoading } = useGetProfileQuery("", {
    pollingInterval: 30000,
  });
  const person = data?.data;

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-red-600 text-center mt-8">
        Error fetching profile information. Please try again.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6  rounded-lg ">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Profile Image */}
        <img
          src={person?.image || "https://via.placeholder.com/150"}
          alt={person?.name || "User"}
          className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-full border-2 border-gray-300"
        />

        {/* Profile Info */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold ">
            {person?.name || "N/A"}
          </h1>
          {/* <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            {person?.bio ||
              "The World of Luxury. Explore seasonal collections, iconic accessories, and more."}
          </p> */}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 border-t pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="text-sm  ">
            <span className="font-semibold  dark:text-white">Email:</span>{" "}
            {person?.email || "N/A"}
          </p>
          <p className="text-sm  ">
            <span className="font-semibold  dark:text-white">Phone:</span>{" "}
            {person?.phone || "N/A"}
          </p>
          <p className="text-sm  ">
            <span className="font-semibold  dark:text-white">Address:</span>{" "}
            {person?.address || "N/A"}
          </p>
        </div>
      </div>

      {/* Update Modal */}
      <div className="mt-6 text-center">
        <UpdateProfileModal />
      </div>
    </div>
  );
};

export default ProfilePage;
