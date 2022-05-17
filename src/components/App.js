import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

//Escape
  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      selectedCard
    ) {
      function handleEscapeKey(evt) {
        if (evt.key === "Escape") {
          closeAllPopups();
        }
      }
      document.addEventListener("keydown", handleEscapeKey);
      return () => document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, selectedCard]);


  return (
    <div className="App">
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />
          <ImagePopup
            name={"resize"}
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <PopupWithForm
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            name={"profile"}
            title={"Редактировать профиль"}
            buttonText={"Сохранить"}
          >
            <input
              id="name"
              name="title"
              className="popup__text popup__text_input_name"
              type="text"
              value={name || ""}
              onChange={handleChangeName}
              placeholder="Имя"
              autoComplete="off"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="popup__input-error" id="name-error">
              Вы пропустили это поле.
            </span>
            <input
              id="job"
              name="subtitle"
              className="popup__text popup__text_input_job"
              type="text"
              value={name || ""}
              onChange={handleChangeName}
              placeholder="О себе"
              autoComplete="off"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__input-error" id="job-error">
              Вы пропустили это поле.
            </span>
          </PopupWithForm>
          <PopupWithForm
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            name={"cards"}
            title={"Новое место"}
            buttonText={"Создать"}
          >
            <input
              id="title"
              name="title"
              className="popup__text popup__text_input_name"
              type="text"
              value={name || ""}
              onChange={handleChangeName}
              placeholder="Название"
              autoComplete="off"
              minLength="1"
              maxLength="30"
              required
            />
            <span className="popup__input-error" id="title-error">
              Вы пропустили это поле.
            </span>
            <input
              id="link"
              name="subtitle"
              className="popup__text popup__text_input_link"
              type="url"
              value={name || ""}
              onChange={handleChangeName}
              placeholder="Ссылка на картинку"
              autoComplete="off"
              required
            />
            <span className="popup__input-error" id="link-error">
              Введите адрес сайта.
            </span>
          </PopupWithForm>
          <PopupWithForm
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            name={"avatar"}
            title={"Обновить аватар"}
            buttonText={"Сохранить"}
          >
            <input
              id="avatar-link"
              name="avatar-link"
              className="popup__text popup__text_input_link"
              type="url"
              value={name || ""}
              onChange={handleChangeName}
              placeholder="Ссылка на картинку"
              autoComplete="off"
              required
            />
            <span className="popup__input-error" id="avatar-link-error">
              Введите ссылку на аватар
            </span>
          </PopupWithForm>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
