const Weather = (props) => {
  return (
    <div className="container text-light">
      <div className="cards pt-4">
        <h1>{props.city}</h1>
      </div>
      <div className="py-4">
        <h5 className="py-2">
          <i className={`wi ${props.weatherIcon} display-1`}></i>
        </h5>
        {props.temp_celsius ? (
          <h1 className="py-2">{props.temp_celsius}&deg;</h1>
        ) : null}
        {minmaxtemp(props.temp_min, props.temp_max)}

        <h4>{props.description}</h4>
      </div>
    </div>
  );
  function minmaxtemp(min, max) {
    if (min && max) {
      return (
        <div className="py-2">
          {" "}
          <h1>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
          </h1>
        </div>
      );
    }
  }
};

export default Weather;
