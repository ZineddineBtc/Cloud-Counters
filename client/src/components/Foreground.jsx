import React, {useState} from "react";
import Counter from "./Counter";
import CreateArea from "./CreateArea";
import $ from "jquery";

function Foreground() {
    const [counters, setCounters] = useState([]);


    function addCounter(newCounter) {
        setCounters(prevCounters => {
        return [...prevCounters, newCounter];
        });
    }

    function deleteCounter(id) {
        $.ajax({url: "delete-counter/"+id, type: "POST"});
        setCounters(prevCounters =>{
            return prevCounters.filter((counterItem)=>{return counterItem._id !== id;});
        });
    }
    
    const [areCountersFetched, fetchCounters] = useState(false);

    function getAllCounters() {
        $.ajax({
            url: "get-counters",
            type: "POST",
            success: function(counters){
                counters.forEach(counter=>{addCounter(counter)});
            }
        });
    }

    if(!areCountersFetched) {
        getAllCounters();
        fetchCounters(true);
    } 

    return <div style={{margin:"20px 20px 0"}}>
        <CreateArea onAdd={addCounter} />
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1">
            {counters.map((counterItem) => {
                return (
                <Counter
                    key={counterItem._id}
                    id={counterItem._id}
                    title={counterItem.title}
                    count={counterItem.count}
                    onDelete={deleteCounter}
                />
                );
            })}
        </div>
    </div>
}

export default Foreground;