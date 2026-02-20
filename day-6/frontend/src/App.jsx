import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [editingID, setEditingID] = useState(null);
  const [updateNote, setUpdateNote] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    axios.get("http://localhost:5001/notes").then((res) => {
      console.log(res.data);
      setNotes(res.data.note || []);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, description } = e.target.elements;
    console.log(title.value, description.value);

    axios
      .post("http://localhost:5001/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        setNotes((prev) => [...prev, res.data.note]);
      });
  };
  function handleEdit(note) {
    setEditingID(note._id);
    setUpdateNote({ title: note.title, description: note.description });
  }
  function handleUpdate(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:5001/notes/${editingID}`, updateNote)
      .then((res) => {
        console.log(res.data);
        setNotes((prev) =>
          prev.map((note) => (note._id === editingID ? res.data.note : note)),
        );
        setEditingID(null);
      });
  }

  const handleDelete = (noteId) => {
    axios.delete(`http://localhost:5001/notes/${noteId}`).then(() => {
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
    });
  };

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter title" />
        <input name="description" type="text" placeholder="Enter description" />
        <button>Create Note</button>
      </form>
      <form className="note-update-form" onSubmit={handleUpdate}>
        <input
          name="title"
          type="text"
          placeholder="Enter title"
          value={updateNote.title}
          onChange={(e) =>
            setUpdateNote({ ...updateNote, title: e.target.value })
          }
        />
        <input
          name="description"
          type="text"
          placeholder="Enter description"
          value={updateNote.description}
          onChange={(e) =>
            setUpdateNote({ ...updateNote, description: e.target.value })
          }
        />
        <button>Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note, index) => {
          return (
            <div className="note" key={index}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => handleEdit(note)}>Update</button>
              <button onClick={() => handleDelete(note._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
