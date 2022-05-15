function ImagePopup(props) {
  return (
    <div className={`popup popup_${props.name} ${props.card && "popup_opened"}`}>
      <div className="popup__overlay" onClick={props.onClose}></div>
      <div className={`popup__container-${props.name}`}>
        <img className="popup__image" src={props.card && props.card.link} alt={props.card && props.card.name} />
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <p className="popup__description">{props.card && props.card.name}</p>
      </div>
    </div>
  );
}
export default ImagePopup;