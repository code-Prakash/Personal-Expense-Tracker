import { LuUser , LuUpload , LuTrash } from "react-icons/lu";
import { useRef, useState } from "react";

const ProfilePhotoSelector = ({image , setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file) {
            //Update the image state
            setImage(file);

            //Generate preview URL from the image
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        //Clear the image state
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    }
    
  return (
    <div className="flex justify-center mb-6">
        <input
            type="file"
            ref={inputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
        />

        {!image ? (
            <div className="w-24 h-24 flex items-center justify-center bg-purple-100 rounded-full relative shadow-lg ring-2 ring-purple-300 transition-transform duration-200 hover:scale-105">
            <LuUser className="text-4xl text-primary" />

            <button
                type="button"
                className="w-9 h-9 flex items-center justify-center text-white rounded-full absolute -bottom-1 right-1 shadow-md bg-purple-700 transition-all duration-200"
                onClick={onChooseFile}
            >
                <LuUpload className="text-lg" />
            </button>
            </div>
        ) : (
            <div className="relative w-24 h-24 transition-transform duration-200 hover:scale-105">
            <img
                src={previewUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover ring-2 ring-purple-400 shadow-lg"
            />
            <button
                type="button"
                className="w-9 h-9 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 right-1 shadow-md hover:bg-red-600 transition-all duration-200"
                onClick={handleRemoveImage}
            >
                <LuTrash className="text-lg" />
            </button>
            </div>
        )}
    </div>

  )
};

export default ProfilePhotoSelector
