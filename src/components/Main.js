import React, { useEffect, useState } from "react";
import profileIcon from "../images/profileIcon.svg";
import api from "../utils/api";
import Card from "./Card";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

// получение начальных данных
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, cards]) => {
        setUserName(data.name)
        setUserDescription(data.about)
        setUserAvatar(data.avatar)
        setCards(cards)
      })

      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }, [])

  return (
    <div>
      <section className="profile section page__content">
        <div className="profile__description">
          <div className="profile__overlay">
            <img src={userAvatar} className="profile__avatar" alt="аватар" onClick={onEditAvatar} />
            <img
              src={profileIcon}
              className="profile__icon"
              alt="иконка для изменения аватара"
            />
          </div>
          <div className="profile__block">
            <div className="profile__element">
              <h1 className="profile__input profile__name block">{userName}</h1>
              <p className="profile__input profile__job block">{userDescription}</p>
            </div>
            <button type="button" className="profile__open-button" onClick={onEditProfile}></button>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements section page__content">
        {cards.map((card) => (
          <Card
          card={card}
          link={card.link}
          name={card.name}
          key={card._id}
          like={card.likes.length}
          onCardClick={onCardClick}
          />
        ))}
      </section>
    </div>
  );
}
export default Main;
