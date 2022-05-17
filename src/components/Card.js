function Card({card, onCardClick}) {

  function handleCardClick() {
    onCardClick(card);
  }

  return(
    <article className="card">
    <img className="card__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
    <div className="card__description">
      <h2 className="card__title block">{card.name}</h2>
      <div>
        <button type="button" className="card__like"></button>
        <div className="card__heart">{card.like}</div>
      </div>
      <button type="button" className="card__delete"></button>
    </div>
  </article>
  )
}
export default Card;