import React from "react";
import myActions from "./todoActions";
import Flux from "react-flux-dash";
import myStore from "./todoStore";

export class Home extends Flux.View {
  constructor() {
    super();
    this.state = {
      taskInput: "",
      homeTasksArray: [],
      totalCreated: 0,
      totalRemoved: 0
    };
    this.markDone = this.markDone.bind(this);
    this.bindStore(myStore);//Using Dash, it tells Home Component/View to always be listening to myStore for emits of any changes)
  }


  // If you don't define the following function you get an error
  // this function gets automatically called when ToDoStore state changes
  handleStoreChanges() {
   // retrieve the "global state" that's in myStore by calling it's method 'returnAllData()', I made that method in todoStore.js, you can name it anything you want
    let updatedData = myStore.returnAllData();
    //using the updatedData variable I make sure to assign the incoming elements of the object to its corresponding keys here in Home's keys.
    this.setState({
      homeTasksArray: updatedData.tasks,
      totalCreated: updatedData.totalTasksCreated,
      totalRemoved: updatedData.totalTasksRemoved
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.state.taskInput !== "") {
      /* First we make sure the person actually typed something, as to not add just an empty task to the list
        then we send the taskInput to the addTask action/method located in myAction (see import at top of this file) */
      myActions.addTask(this.state.taskInput);

      /* After submitting the taskInput to the action myActions.addTask()
            we clear the current taskInput state below so the user can type a new task with ease */
      this.setState({ taskInput: "" });
    }
  }

  markDone(index) {
     /* I call the method markAsDone() which is located in myActions (see top of file for import)
       I pass on the parameter 'index' which comes from the label onClick event and represents the item's index which was clicked.
       I also will pass the current array of tasks (homeTasksArray) because I will use it in the markDone action */
    myActions.markAsDone(index, this.state.homeTasksArray);
  }

  render() {
    /* Below: Every 'task object' in array 'homeTasksArray' will be MAPped out ot the following HTML
        and be put in variable 'tasksToRender' which we put in the code later on
        See the inside of the <ul></ul> way below to see where it will render */
    let tasksToRender = this.state.homeTasksArray.map((taskObject, index, tasksArray) => (
        /* I created a class in index.scss called .done which just changes the background-color: green
        So below for each taskObject it checks to see if it's done property is equal to 'true', if so it
        returns 'done' and the class makes it green, if it's not true, then it returns an empty string
        and the class doesn't change for the current li  and it stays the current color*/ 
        <li className={taskObject.done ? "done" : ""} key={taskObject.id}index={index}>
          <div className="view">
            <label onClick={e => this.markDone(index)}>{taskObject.task}</label>
            {/*Below: I am passing the index of the current item being clicked to the method removeTask() in myActions
              which I will use to help me remove it from the array*/}
            <button
              className="destroy"
              onClick={() => myActions.removeTask(index)}
            />
          </div>
        </li>
      )
    );
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={e => this.handleFormSubmit(e)}>
          {/*Below: Controlled Input: The value is coming from taskInput which is being updated by onChange.
           Any time the person types it update the state.taskInput with the values being typed*/}
            <input
              autoFocus={true}
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.taskInput}
              onChange={evt => this.setState({taskInput: evt.target.value })}
            />
          </form>
        </header>
        <section className="main">
          <ul className="todo-list">{tasksToRender}</ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            Not Done:
            <strong>
              {this.state.homeTasksArray.filter(taskObj => !taskObj.done).length}&nbsp;&nbsp;
              {/*Above: filter will return a new array based on the original array (homeTasksArray)
              as long as each element meets the conditions defined in the function. In the example above it checks each item's done property and it checks
              to see if its !NOT true. Then since it's a new array, we use the length method to find out how many items are in that array, which we know all
              have property .done being !not true*/}
            </strong>
          </span>
          <span className="todo-count">
            Tasks Done:
            <strong>
              {this.state.homeTasksArray.filter(taskObj => taskObj.done).length}&nbsp;&nbsp;
            </strong>
            {/*Above it checks the opposite, it filters to a temporary new array only the ones that ARE TRUE (taskObj.done returns either true or false)
            and then we check it's .length property and that's how we know how many tasks ARE done (taskObj.done=true)*/}
          </span>
          <span className="todo-count">
            Tasks Created:
            <strong>{this.state.totalCreated} &nbsp;&nbsp;</strong>
          </span>
          <span className="todo-count">
            Tasks Removed:
            <strong>{this.state.totalRemoved} &nbsp;&nbsp;</strong>
          </span>
        </footer>
      </section>
    );
  }
}
