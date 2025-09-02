import React, { useRef, useState } from 'react';
// Import icons from lucide-react (Lu prefix)
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

// Component to handle profile photo upload and preview
const ProfilePhotoSelector = ({ image, setImage }) => {
    // Ref to programmatically trigger the file input
    const inputRef = useRef(null);

    // Local state to hold a preview URL of the uploaded image
    const [previewUrl, setPreviewUrl] = useState(null);

    // When the user selects a new image
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Store image file in parent component's state
            setImage(file);

            // Generate a temporary preview URL for displaying the image
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    // Remove the selected image and clear the preview
    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    // Trigger the hidden file input when user clicks the upload button
    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className='flex justify-center mb-6'>
            {/* Hidden input field for file upload */}
            <input  
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {/* If no image is selected, show placeholder with upload button */}
            {!image ? (
                <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
                    {/* User icon */}
                    <LuUser className='text-4xl text-primary' />

                    {/* Upload button (overlayed on the bottom-right) */}
                    <button
                        type="button"
                        className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
                        onClick={onChooseFile}
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                // If image is selected, show preview with remove button
                <div className='relative'>
                    <img
                        src={previewUrl}
                        alt="Profile Photo"
                        className='w-20 h-20 rounded-full object-cover'
                    />

                    {/* Remove button (bottom-right corner) */}
                    <button
                        type="button"
                        className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
                        onClick={handleRemoveImage}
                    > 
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;
