import { useRef, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from 'lucide-react';

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {

  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () =>{
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({profilePic : base64Image})
    }
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avtar  */}
          <div className="avatar online">
            <button className="size-14 rounded-full overflow-hidden relative group" onClick={() => fileInputRef.current.click()}>
              <img src={selectedImg || authUser.ProfileHeader || "/avatar.png"} alt=" User image"  className="size-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-white">Change</span>
              </div>
            </button>

            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />

          </div>

          <div>
            {/* Username & online text  */}
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">{authUser?.fullName}</h3>
            <p className="text-xs text-slate-400">Online</p>

          </div>
        </div>

        {/* buttons  */}
        <div className="flex gap-4 items-slate-200 transition-colors">
          {/* logout btn */}
          <button className="text-slate-400 hover:text-slate-200 transition-colors" onClick={logout}>
            <LogOutIcon className="size-5" />
          </button>

          {/* Sound Toggle btn  */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              // play click sound before toggling
              mouseClickSound.currentTime = 0; // reset to start
              mouseClickSound.play().catch((error) => console.log("Failed to play sound:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>

        </div>
      </div>
    </div>
  )
}

export default ProfileHeader;