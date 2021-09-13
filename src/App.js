import { isEmpty } from "lodash";
import React, { useState } from "react";
import shortid from "shortid";
//el hub usestate sirve para tener datos y almacenarlos y modificar

function App() {
  //coloco el nombre, luego el metodo con el que modificamos, en que inicia
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const addTask = (e) => {
    e.preventDefault();
    if (isEmpty(task)) {
      console.log("task emply");
      return;
    }

    const newTask = {
      id: shortid.generate(),
      name: task
    };
    setTasks([...tasks, newTask]);
    setTask("");
  };
  return (
    <div className="container mt-5">
      <h1>Tareas </h1>
      <hr />
      <div className="row">
        <div className="col-md-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {tasks.map((task) => (
              <li className="list-group-item" key={task.id}>
                <span className="lead">{task.name}</span>
                <button className="btn btn-danger btn-sm float-right mx-2">
                  Eliminar
                </button>
                <button className="btn btn-warning btn-sm float-right">
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h4 className="text-center">Formulario </h4>
          <form onSubmit={addTask}>
            <input
              type="text"
              className="form-control"
              placeholder="Ingrese la Tarea"
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            <button className="btn btn-primary btn-block" type="submit">
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
