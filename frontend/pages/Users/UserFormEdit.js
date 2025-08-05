import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "flowbite-react";
import { useForm } from "react-hook-form";

const UserFormEdit = ({ show, user, onClose, onUpdate }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setProfileImage(user.profileImage || null);
    }
  }, [user, setValue]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    onUpdate({ ...data, profileImage });
  };

  if (!user) return null;

  return (
    <Modal show={show} onClose={onClose} size="md">
      <div className="w-[700px] max-w-full">
        <ModalHeader>Edit User</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full px-4 py-2 border border-black text-blue-600 rounded-md"
                placeholder="Updated Username"
                {...register("username", { required: true })}
              />
              <input
                type="email"
                className="w-full px-4 py-2 border border-black text-blue-600 rounded-md"
                placeholder="Updated Email"
                {...register("email", { required: true })}
              />
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="edit-dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {profileImage ? (
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="h-24 w-24 object-cover rounded-full border border-gray-300"
                      />
                      <p className="text-sm text-blue-600 font-semibold">
                        Change Profile Image
                      </p>
                    </div>
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
                          d="M13 13h3a3 3 0 0 0 0-6h-.025
                             A5.56 5.56 0 0 0 16 6.5
                             5.5 5.5 0 0 0 5.207 5.021
                             C5.137 5.017 5.071 5 5
                             5a4 4 0 0 0 0 8h2.167
                             M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF (max 800x400)</p>
                    </div>
                  )}
                  <input
                    id="edit-dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                </label>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button type="submit">Update</Button>
            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </div>
    </Modal>
  );
};

export default UserFormEdit;
