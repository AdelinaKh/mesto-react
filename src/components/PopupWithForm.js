function PopupWithForm(props) {
  return (
      <div className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}>
        <div className="popup__overlay" onClick={props.onClose}></div>
        <div className="popup__container">
          <form
            name="${props.name}_form"
            className="popup__form popup__content-${props.name}"
            noValidate
          >
            <h2 className="popup__title">{props.title}</h2>
            <button type="button" className="popup__close-button" onClick={props.onClose}></button>
            {props.children}
            <button type="submit" className="popup__save-button">
              Сохранить
            </button>
          </form>
        </div>
      </div>
  );
}
export default PopupWithForm;