import Flux from "react-flux-dash";

class ToDoStore extends Flux.Store {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
  }

  //you are forced to use _ to avoid using the setters anywhere else
  _storeAddTask(incomingTaskObject) {
    let tasksArray = this.state.tasks;

    tasksArray.push(incomingTaskObject);

    this.setStoreState({ tasks: tasksArray }).emit();
    //apparently in current Dash version 1.0.3 it works without specifying the event name aka: 'change'
  }
  //you are forced to use _ to avoid using the setters anywhere else
  _removeTask(index) {
    let updatingTaskArray = this.state.tasks.filter((taskObj, indx) => index !== indx);
    /*Above: ran filter method on the tasks array that we brought from Home via removeTask action,
          filter only returns each value(taskObj) as long as it meets the criteria
          in the callback function. In this case it's checking if the incoming 'index'
          is NOT the same as that items 'indx', if that's true then the task can stay
          in the array and it will be returned to the new array 'updatingTaskArray'.

          If the current 'indx' matches the 'index' that we brought from home then it means
          that that particular element/task of the array was the one who's "remove button"
          was clicked, therefore we will not return it to the "updatingTaskArray"
        */
    this.setStoreState({ tasks: updatingTaskArray }).emit("change");
  }

  /*The method below doesn't need an _underscore because it's not a "setter" (does not update setStoreState)
    Instead it's just used in Home to pull back the updated information from the store.
    Check out method in Home "handleStoreChanges()", it's part of Dash.
    */
  returnTasksArray() {
    return this.state.tasks;
  }
}

// Create a new instance of class ToDoStore() and assigned it to a new variable "myStore"
let myStore = new ToDoStore();
/*
    Then we set that variable as the default export, the reason we do this instead of
    directly exporting by default the whole store class (like in pure React) is to save
    us from having to do some extra work/typing in other documents.
    */
export default myStore;
