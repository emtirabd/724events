import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  new Date(evtB.date) - new Date(evtA.date)
  );
  const nextCard = () => {
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
    }, 10000);
  };
  useEffect(() => {
    nextCard();
  }, [index]);

  const handleDotClick = (dotIndex) => {
    if (index !== dotIndex) {
      setIndex(dotIndex);
    }
  };
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={event.id}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onClick={() => handleDotClick(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};



export default Slider;