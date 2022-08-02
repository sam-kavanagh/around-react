import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "../vendor/index.css";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([userInfo, card]) => {
        setCurrentUser(userInfo);
        setCards(card);
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("keyup", handleEscClose);
    return () => {
      document.removeEventListener("keyup", handleEscClose);
    };
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main
            onEditAvatarClick={handleEditAvatarClick}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
          />
          <Footer />

          <PopupWithForm
            title="Edit Profile"
            name="edit"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          >
            <input
              id="name-input"
              name="name"
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
              name="description"
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

          <PopupWithForm
            title="New Place"
            name="new-card"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
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
            />
            <span id="link-input-error" className="popup__error-text">
              Please enter a web address.
            </span>
          </PopupWithForm>

          <PopupWithForm
            title="Change profile picture"
            name="edit-avatar"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
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
            />
            <span id="avatar-input-error" className="popup__error-text">
              Please fill out this field.
            </span>
          </PopupWithForm>

          <PopupWithForm
            title="Are you Sure?"
            name="delete-card"
            buttonText="Yes"
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
