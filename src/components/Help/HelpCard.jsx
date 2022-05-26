import React, { useState } from "react";

function HelpComponen({ item }) {
  const [text, setText] = useState(false);
  return (
    <div className="help-outter-card" onClick={()=>setText(v => !v)} key={item.id}>
      <div className="help-inner-card">
        <h4>{item.title}</h4>
        {text ? (
          <img
            src={require("../../images/arrow-up.png")}
            alt="arrow up"
          />
        ) : (
          <img
            src={require("../../images/arrow-down.png")}
            alt="arrow down"
          />
        )}
      </div>
      {text ? <p className="help-extra-info">{item.text}</p> : null}
    </div>
  );
}

export default HelpComponen;
