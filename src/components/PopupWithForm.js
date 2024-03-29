import React from "react";

function PopupWithForm({
  name,
  title,
  buttonText = "Save",
  onClose,
  isOpen,
  children,
  onSubmit,
}) {
  return (
    <div className={`popup popup__form${name} ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        <form name={name} className="popup__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
