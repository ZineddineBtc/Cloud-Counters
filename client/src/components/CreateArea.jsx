import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import $ from "jquery";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [counter, setCounter] = useState({title:"",count:0});

  function handleChange(event) {
    const { name, value } = event.target;
    setCounter(prevCounter => {
      return {
        ...prevCounter,
        [name]: value
      };
    });
  }
  function submitCounter(event) {
    pushCounterToDB();
    event.preventDefault();
  }
  function pushCounterToDB() {
    $.ajax({
      url: "create-counter",
      type: "POST",
      data:{title: counter.title, count: counter.count},
      success: function(result){
          const id = result.id;
          console.log("Pushed with success: "+id);
          setCounter(prevCounter => {return {...prevCounter, key:id, id:id}});
          props.onAdd(counter);
          setCounter({title:"", count:0});
    }
  });
  }
  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-counter">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={counter.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="count"
          onClick={expand}
          onChange={handleChange}
          value={counter.count}
          placeholder="Initial value..."
          rows={isExpanded ? 2 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitCounter}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
