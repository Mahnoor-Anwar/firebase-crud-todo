import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "./config/Firebase";
import "./App.css";
import Edit from "./assets/edit.svg";
import Delete from "./assets/delete.svg";
import EditModal from "./EditModal";
import { Button, TextField } from "@mui/material";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescrtiption] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const addData = async () => {
    try {
      let userobj = {
        title,
        description,
      };
      const aduser = await addDoc(collection(database, "todos"), userobj);
      setTitle("")
      setDescription("")
      setRefresh(!refresh);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getData = async () => {
    try {
      const arr = [];
      const getData = await getDocs(collection(database, "todos"));

      getData.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      setTodo(arr);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (id, title, description) => {
    setEditId(id);
    setEditTitle(title);
    setEditDescrtiption(description);
    setIsEdit(true);
  };
  const handleUpdate = async () => {
    const updateObj = {
      title: editTitle,
      description: editDescription,
    };
    try {
      const updateData = updateDoc(doc(database, "todos", editId), updateObj);
      setRefresh(!refresh);
      setIsEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteUser = await deleteDoc(doc(database, "todos", id));
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  return (
    <div className="container">
      <div className="todo-container">
        <h1>To-Do List</h1>

        <div className="task-input">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Task Description"
           value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={addData}>Add Task</button>
        </div>
        <div className="task-list">
          {!isEdit ? (
            <>
              {todo.map((e,index)=>(
                  <div className="todo">
              
                  <>
                    <div key={index} className="task">
                      <h2>{e.title}</h2>
                      <p>{e.description}</p>
                    </div>
                    <div className="actions">
                      <button
                        onClick={() => handleEdit(e.id, e.title, e.description)}
                        className="action"
                      >
                        <img src={Edit} alt="edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(e.id)}
                        className="action"
                      >
                        <img src={Delete} alt="delete" />
                      </button>
                    </div>
                  </>
                  </div>

              ))}
            </>
          ) :(
            <>
              <TextField id="standard-basic"  type="text"
                placeholder="Task Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)} variant="standard" />
              <TextField
                placeholder="Task Description"
                value={editDescription}
                onChange={(e) => setEditDescrtiption(e.target.value)}
                className="edit-input"
                variant="standard"
              />
              <Button onClick={() => handleUpdate()} className="update-btn" variant="contained" color="secondary">Update</Button>
            </>
          ) 
        }
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
