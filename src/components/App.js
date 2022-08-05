import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "../vendor/index.css";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";

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

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.log(error));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => console.log(error));
  }

  function handleUpdateUser(userUpdate){
    api
    .patchUserInfo(userUpdate)
    .then((newUserUpdate) => {
      setCurrentUser(newUserUpdate);
      closeAllPopups();
    })
    .catch((error) => console.log(error));
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
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
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
