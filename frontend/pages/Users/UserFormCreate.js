import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useState } from "react";

const UserFormCreate = ({ show, onClose, onCreate }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [profileImage, setProfileImage] = useState(null);

  const onSubmit = (data) => {
    onCreate({ ...data, profileImage });
    reset();
    setProfileImage(null);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <Modal show={show} onClose={onClose} size="md">
      <div className="w-[600px] max-w-full">
        <ModalHeader>Create New User</ModalHeader>
        <ModalBody>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="w-full px-4 py-2 border border-black text-blue-600 rounded-md"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            <input
              type="email"
              className="w-full px-4 py-2 border border-black text-blue-600 rounded-md"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <input
              type="password"
              className="w-full px-4 py-2 border border-black text-blue-600 rounded-md"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                {profileImage ? (
                  <img src={profileImage} alt="Preview" className="h-full object-contain rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5
                           5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5
                           5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8
                           8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (max 800x400)</p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
              </label>
            </div>

            <ModalFooter>
              <Button type="submit" disabled={!profileImage}>Create</Button>
              <Button color="gray" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default UserFormCreate;
