import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "test title 1",
      description: "test desc 1",
    },
    {
      title: "test title 2",
      description: "test desc 2",
    },
    {
      title: "test title 3",
      description: "test desc 3",
    },
    {
      title: "test title 4",
      description: "test desc 4",
    },
    {
      title: "test title 5",
      description: "test desc 5",
    },
  ]);
  useEffect(() => {
    axios.get("http://localhost:5001/notes").then((res) => {
      console.log(res.data);
      setNotes(res.data.note || []);
    });
  }, []);

  return (
    <>
      <div className="notes">
        {notes.map((note, index) => {
          return (
            <div className="note" key={index}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
