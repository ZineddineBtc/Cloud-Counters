import React, { useState } from "react";
import $ from "jquery";

function Counter(props) {
  const [count, setCount] = useState(props.count);
  function handleDelete() {
    props.onDelete(props.id);
  }
  function handleDecrement() {
    setCount(count-1);
    updateDB(count-1);
  }
  function handleIncrement() {
    setCount(count+1);
    updateDB(count+1);
  }
  function updateDB(c) {
    $.ajax({
      url: "update-counter/"+props.id+"/"+c,
      type: "POST"
    });
  }
  return (
    <div className="col counter" style={{marginBottom:"20px"}}>
      <div className="card" style={{textAlign:"center", width:"100%"}}>
        <div className="card-body">
          <h1 className="card-title">{props.title}</h1>
          <p className="display-4">{count}</p>
          <div>
            <button onClick={handleDecrement} className="btn btn-outline-primary btn-lg" style={{marginRight:"5px"}}>-</button>
            <button onClick={handleIncrement} className="btn btn-primary btn-lg" style={{marginLeft:"5px"}}>+</button>
          </div>
        </div>
        <div className="card-footer">
        <button onClick={handleDelete} className="btn btn-outline-danger btn-sm">delete</button>
        </div>
      </div>
    </div>
    
  );
}

export default Counter;
