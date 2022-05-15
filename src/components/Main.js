import React from "react";
import profileIcon from "../images/profileIcon.svg";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

// получение начальных данных
  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUserName(data.name)
        setUserDescription(data.about)
        setUserAvatar(data.avatar)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }, [])
  React.useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  return (
    <div>
      <section className="profile section page__content">
        <div className="profile__description">
          <div className="profile__overlay">
            <img src={userAvatar} className="profile__avatar" alt="аватар" onClick={props.onEditAvatar} />
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
            <button type="button" className="profile__open-button" onClick={props.onEditProfile}></button>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements section page__content">
        {cards.map((card, id) => (
          <Card
          card={card}
          link={card.link}
          name={card.name}
          key={id}
          like={card.likes.length}
          onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </div>
  );
}
export default Main;
