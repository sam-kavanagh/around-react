import React from "react";

function ImagePopup({card, onClose}) {
    return(
        <div className={`popup popup-preview ${card ? 'popup_open' : ''}`}>
            <div className="popup__container popup__container_type_preview">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <img className="popup__preview-image" src={card ? card.link : ''} alt={card ? card.name : ''} />
                <p className="popup__caption">{card ? card.name : ''}</p>
            </div>
        </div>
    )
}
export default ImagePopup;