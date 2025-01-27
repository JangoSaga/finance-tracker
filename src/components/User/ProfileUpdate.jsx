/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useUpdateUser } from "../../Features/Authentication/useUpdateUser";
import { useState } from "react";
import Loading from "../Loading";

export function ProfileUpdate({ cancel }) {
  const { register, handleSubmit, reset } = useForm();
  const { updateUser, isLoading } = useUpdateUser();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }

  function updateUserHandler(data) {
    const formData = {
      ...data,
      avatar: data.avatar?.length > 0 ? data.avatar : null,
    };
    updateUser(formData, {
      onSettled: () => {
        reset();
        setPreviewUrl(null);
      },
    });
  }

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(updateUserHandler)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            className="border rounded p-2"
            placeholder="Full Name"
            {...register("fullName")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              className="border rounded p-2 w-full"
              placeholder="Enter your new password"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="avatar">Profile Picture</label>
          <input
            id="avatar"
            type="file"
            className="border rounded p-2"
            accept="image/*"
            {...register("avatar")}
            onChange={handleImageChange}
          />
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
          <button
            onClick={() => cancel()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
