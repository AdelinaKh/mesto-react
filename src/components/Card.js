function Card(props) {

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return(
    <article className="card">
    <img className="card__image" src={props.link} alt={props.name} onClick={handleCardClick}/>
    <div className="card__description">
      <h2 className="card__title block">{props.name}</h2>
      <div>
        <button type="button" className="card__like"></button>
        <div className="card__heart">{props.like}</div>
      </div>
      <button type="button" className="card__delete"></button>
    </div>
  </article>
  )
}
export default Card;