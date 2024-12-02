import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/userApi";
import Loading from "@/components/Loading/Loading";

// Define a type for your form data
interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

const ProfilePage: React.FC = () => {
  const { data, isError, isLoading } = useGetProfileQuery("", {
    pollingInterval: 30000,
  });
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const person = data?.data;

  const [editMode, setEditMode] = useState(false);

  // State to manage form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  // Track which fields have been modified
  const [modifiedFields, setModifiedFields] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (person) {
      // Prefill form with user's current data
      setFormData({
        name: person.name || "",
        email: person.email || "",
        phone: person.phone || "",
        address: person.address || "",
        password: "", // Password remains empty for security reasons
      });
    }
  }, [person]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Cast 'name' to 'keyof FormData' to avoid type error
    const fieldName = name as keyof FormData;

    setFormData({ ...formData, [fieldName]: value });

    // Track modified fields
    if (person && person[fieldName] !== value) {
      setModifiedFields((prev) => ({ ...prev, [fieldName]: value }));
    } else {
      const { [fieldName]: _, ...rest } = modifiedFields;
      setModifiedFields(rest);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(modifiedFields).length > 0) {
      await updateProfile(modifiedFields); // Send only modified fields to update
    }
    setEditMode(false);
  };

  if (isLoading)
    return (
      <p>
        <Loading></Loading>
      </p>
    );
  if (isError)
    return <p>Error fetching profile information. Please try again.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {person?.name}!</h1>
      <p className="text-lg mb-6">Manage your profile information below:</p>
      {!editMode ? (
        <div>
          <div className="mb-2">
            <p>
              <strong>Email:</strong> {person?.email}
            </p>
            <p>
              <strong>Phone:</strong> {person?.phone}
            </p>
            <p>
              <strong>Address:</strong> {person?.address}
            </p>
            <p>
              <strong>Role:</strong> {person?.role}
            </p>
          </div>
          <Button className="mt-4" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          {/* Form Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
                isUpdating ? "opacity-50" : ""
              }`}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={() =>
                setFormData({
                  name: person.name || "",
                  email: person.email || "",
                  phone: person.phone || "",
                  address: person.address || "",
                  password: "",
                })
              }
            >
              Reset
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
