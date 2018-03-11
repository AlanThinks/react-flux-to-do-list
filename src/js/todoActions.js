import Flux from "react-flux-dash";

class ToDoActions extends Flux.Action {
  addTask(taskText) {
    let randomId = Math.floor(Math.random() * 10000);
    /*Above: Created a random integer to assign as the "id". It's a random number
      between 0 to 10,000, rounded down (floor), this was only used in the Home element
      to assign a unique 'key' property to the <li></li> which React requires*/
      
    /*Below, created an Object "incomingTask" with the randomId and
    the taskText which came from taskInput on Home, also give each new item
    a default .done value of "false" so that in Home the class will render
    as a regular white color background instead of green (see Home to know what I mean)*/

    let incomingTask = {
      id: randomId,
      task: taskText,
      done: false,
    };

    this.dispatch("ToDoStore.storeAddTask", incomingTask);
    /* Dispatches the Object incomingTask to ToDoStore and looks for the setter '_storeAddTask'
       which will tell it how/where to store it and will emit a BEEP(lol) to the listeners. In this case just Home (this.bindStore(myStore)) */
  }

  removeTask(index) {
    /*In this particular case we are not doing anything in the action
     we will let the store update the store using the index.
     So for now we are just passing the index we collected at Home.*/

    this.dispatch("ToDoStore.removeTask", index); // Dispatching 'index', will look for setter '_removeTask' to match in ToDoStore
  }

  markAsDone(index,tasksArr){
    let currentTaskDoneStatus = tasksArr[index].done
    // Stores the value of the 'done' property (either true or false) of the task that was clicked in a variable(index tells us which was clicked)

    currentTaskDoneStatus? tasksArr[index].done=false : tasksArr[index].done=true
    /*Is current done property true? it will then set done value to false, else then set it to true.
    In other words it just toggles the value of done between true and false when clicked.
    This is being used to update the 'done' className of the <li> it came from,
    and also to get the count of tasks that are done and the ones that are !done */
    this.dispatch("ToDoStore.storeMarkDone", tasksArr);
    //Send over the updated array with new 'done' value of curren item over to the setter "_storeMarkDone" in "ToDoStore"
  }
}

let myActions = new ToDoActions(); // Create an instance of the class ToDoActions() and store it in a variable 'myActions'
export default myActions; // Set said variable as the default export when it's asked to be imported in other file
