import React from "react";
import myActions from "./todoActions";
import Flux from "react-flux-dash";
import myStore from "./todoStore";

export class Home extends Flux.View {
  constructor() {
    super();
    this.state = {
      taskInput: "",
      homeTasksArray: []
    };
    this.bindStore(myStore); //Using Dash, it tells Home to always be listening to myStore for emits of any changes)
  }

  // if you dont define this function you get an error
  // this function gets automatically called when ToDoStore state changes
  handleStoreChanges() {
    // retreive any store updatedTasksArray
    let updatedTasksArray = myStore.returnTasksArray();
    this.setState({ homeTasksArray: updatedTasksArray });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    myActions.addTask(this.state.taskInput);

    /* After submitting the taskInput to the action myActions.addTask()
            we clear the current taskInput state */
    this.setState({ taskInput: "" });
  }

  render() {
    /* Below: For every 'task' in array 'homeTasksArray' map out the following HTML
        and put in variable 'tasksToRender' which we put in the code later on
        See the inside of the <ul></ul> */
    let tasksToRender = this.state.homeTasksArray.map(function(taskObject,index,tasksArray) {
      return (
        <li key={taskObject.id}>
          <div className="view">
            <label>{taskObject.task}</label>
            <button
              className="destroy"
              onClick={() => myActions.removeTask(index)}
            />
          </div>
        </li>
      );
    });
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={e => this.handleFormSubmit(e)}>
            <input
              autoFocus={true}
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.taskInput}
              onChange={evt => this.setState({ taskInput: evt.target.value })}
            />
          </form>
        </header>
        <section className="main">
          <ul className="todo-list">{tasksToRender}</ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>
              {this.state.homeTasksArray.filter(key => !key.done).length}
            </strong>{" "}
            items left
          </span>
        </footer>
      </section>
    );
  }
}
