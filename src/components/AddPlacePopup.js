import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }


  React.useEffect(() => {
      setName('');
      setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="New Place"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading? 'Saving...' : 'Save'}
    >
      <input
        id="title-input"
        name="name"
        type="text"
        placeholder="Title"
        className="popup__input"
        minLength="1"
        maxLength="30"
        required
        onChange={handleNameChange}
        value={name}
      />
      <span id="title-input-error" className="popup__error-text">
        Please fill out this field.
      </span>
      <input
        id="link-input"
        name="link"
        type="url"
        placeholder="Image Link"
        className="popup__input"
        required
        onChange={handleLinkChange}
        value={link}
      />
      <span id="link-input-error" className="popup__error-text">
        Please enter a web address.
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;