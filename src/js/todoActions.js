import Flux from "react-flux-dash";

class ToDoActions extends Flux.Action {
  addTask(taskText) {
    let randomId = Math.floor(Math.random() * 10000);
    /*Above: Created a random integer to assign as the "id". It's a random number
      between 0 to 10,000, rounded down (floor)
      */

    //Below, created an Object "incomingTask" with the randomId and
    //the taskText which came from taskINPUT on Home
    let incomingTask = {
      id: randomId,
      task: taskText
    };

    this.dispatch("ToDoStore.storeAddTask", incomingTask);
    /* dispatches the Object incomingTask to ToDoStore and looks for _storeAddTask
           which will tell it how/where to store it and will emit a BEEP(lol) to the listeners.
          In this case just Home.
          */
  }

  removeTask(index) {
    // In this particular case we are not doing anything in the action
    // we will let the store update the store using the index

    this.dispatch("ToDoStore.removeTask", index); // will look for _removeTask to match in ToDoStore
  }
}

let myActions = new ToDoActions();
export default myActions;
