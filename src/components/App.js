import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

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
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    selectedCard,
  ]);

// получение начальных данных
  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCards(cards)
        setCurrentUser(user)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

//ставим/удаляем лайк
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api.postLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }
//удаляем карточку
  function handleDeleteClick(card) {
    api.deleteCard(card)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
//обновляем данные пользователя
  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
//обновляем аватар
  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
//добавляем карточку
  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="page__container">
            <Header />
            <Main
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
            />
            <ImagePopup
              name={"resize"}
              card={selectedCard}
              onClose={closeAllPopups}
            />
            <EditProfilePopup 
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            />
            <EditAvatarPopup 
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <Footer />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;