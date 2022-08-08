import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarInputRef = React.useRef();

  React.useEffect(() => {
    avatarInputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Change profile picture"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading? 'Saving...' : 'Save'}
    >
      <input
        id="avatar-input"
        name="avatar"
        type="text"
        placeholder="https://somewebsite.com/someimage.jpg"
        className="popup__input"
        minLength="1"
        maxLength="200"
        required
        ref={avatarInputRef}
      />
      <span id="avatar-input-error" className="popup__error-text">
        Please fill out this field.
      </span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
