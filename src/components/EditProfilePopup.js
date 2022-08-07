import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.description);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Edit profile"
      name="edit"
    >
      <input
        id="name-input"
        name="name"
        value={name || ''}
        onChange={handleNameChange}
        type="text"
        placeholder="Sam"
        className="popup__input"
        minLength="2"
        maxLength="40"
        required
      />
      <span id="name-input-error" className="popup__error-text">
        Please fill out this field.
      </span>
      <input
        id="description-input"
        name="about"
        value={description || ''}
        onChange={handleDescriptionChange}
        type="text"
        placeholder="Explorer"
        className="popup__input"
        minLength="2"
        maxLength="200"
        required
      />
      <span id="description-input-error" className="popup__error-text">
        Please fill out this field.
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
