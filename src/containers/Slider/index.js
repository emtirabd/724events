import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const byDateDesc = data?.focus.sort((evtA, evtB) =>
      new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
    );

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex < (byDateDesc?.length || 0) - 1 ? prevIndex + 1 : 0));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  const handleDotClick = (dotIndex) => {
    if (index !== dotIndex) {
      setIndex(dotIndex);
    }
  };

  return (
    <div className="SlideCardList">
      {data?.focus.map((event, idx) => (
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
          {data?.focus.map((event, radioIdx) => (
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