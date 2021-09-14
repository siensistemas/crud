import { isEmpty, size } from "lodash";
import React, { useState } from "react";
import shortid from "shortid";
//el hub usestate sirve para tener datos y almacenarlos y modificar

function App() {
  //coloco el nombre, luego el metodo con el que modificamos, en que inicia
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [id, setid] = useState("");
  const [error, setError] = useState(null);

  const validForm = () => {
    let isValid = true;
    setError(null);

    if (isEmpty(task)) {
      setError("debes de ingresar una tarea");
      isValid = false;
    }
    return isValid;
  };

  const addTask = (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const newTask = {
      id: shortid.generate(),
      name: task,
    };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const saveTask = (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    if (isEmpty(task)) {
      console.log("task emply");
      return;
    }

    const editTasks = tasks.map((item) =>
      item.id === id ? { id, name: task } : item
    );
    setTasks(editTasks);
    seteditMode(false);
    setTask("");
    setid("");
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const editTask = (theTask) => {
    setTask(theTask.name);
    seteditMode(true);
    setid(theTask.id);
  };

  return (
    <div className="container mt-5">
      <h1>Tareas </h1>
      <hr />
      <div className="row">
        <div className="col-md-8">
          <h4 className="text-center">Lista de Tareas</h4>

          {size(tasks) == 0 ? (
            <li className="list-group-item"> Aun no hay tareas</li>
          ) : (
            <ul className="list-group">
              {tasks.map((task) => (
                <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => deleteTask(task.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editTask(task)}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-md-4">
          <h4 className="text-center">
            {editMode ? "Modificar Tarea" : "Agregar Tarea"}{" "}
          </h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            {error && <span className="text-danger">{error}</span>}
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese la Tarea"
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />

            <button
              className={
                editMode
                  ? "btn btn-warning btn-block"
                  : "btn btn-primary btn-block"
              }
              type="submit"
            >
              {editMode ? "Guardar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
