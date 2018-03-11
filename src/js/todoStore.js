import Flux from "react-flux-dash";

class ToDoStore extends Flux.Store {
  constructor() {
    super();
    this.state = {
      tasks: [],
      totalTasksCreated: 0,
      totalTasksRemoved: 0
    };
  }

  //you are forced to use _ to avoid using the setters anywhere else
  _storeAddTask(incomingTaskObject) {
    let tasksArray = this.state.tasks;

    tasksArray.push(incomingTaskObject);

    this.setStoreState({ 
        tasks: tasksArray,
        totalTasksCreated: this.state.totalTasksCreated+1, //Here I up the total count of tasks created ever
        }).emit();
        /*If emit() is not specified an event name (Example: "TASK ADDED") then it will just pass on internally an event called 'change'
        which by default will be listened to at home by this.bindStore(myStore) */

  }
  //you are forced to use _ to avoid using the setters anywhere else
  _removeTask(incomingIndex) {
    let updatingTaskArray = this.state.tasks.filter(
      (taskObj, index) => incomingIndex !== index

    );
        /* Above: Ran filter method on the this.state.tasks array.
           filter() only returns each value(taskObj) back in a new array as long as it meets
           the criteria in the callback function. In this case the criteria checks each taskObj's
           index and it returns it into the new updatingTaskArray as long as it was NOT the same
           index as the one that was clicked to be removed (incomingIndex)

           If the current 'index' does match the 'incomingIndex' that we brought from home then it means
           that that particular element/task of the array was the one who's "remove button"
           was clicked, therefore we will not return it to the "updatingTaskArray" and it will dissapear
           from list once it's setState back at home and it's re-rendered.
        */

        // Below is why these are called "setters" because they update the StoreState with all the new data
    this.setStoreState({ 
        tasks: updatingTaskArray,
        totalTasksRemoved: this.state.totalTasksRemoved+1
     }).emit("change"); //Here I expressely emitted an event by name 'change' which home by default will listen to.
  }

  _storeMarkDone(incomingTasksArr) {
    this.setStoreState({ tasks: incomingTasksArr }).emit(); //since this array was already updated in todoActions, I just need to update the StoreState
  }

  /*The method below doesn't need an _underscore because it's not a "setter" (does not update setStoreState)
    Instead it's just used in Home to pull back the updated information from the store.
    Check out method in Home "handleStoreChanges()", it's part of Dash.
    */
  returnAllData() {
    return this.state;
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
