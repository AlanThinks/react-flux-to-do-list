import Flux from 'react-flux-dash';

class ToDoActions extends Flux.Action{
    
    addTask(taskText){
      let randomId = Math.floor(Math.random()*10000)

        let incomingTask = {
          id: randomId,
          task: taskText
        }

        this.dispatch('ToDoStore.storeAddTask', incomingTask);
                        // look for _storeAddTask()
    }

    removeTask(id){
      this.dispatch('ToDoStore.removeTask')
    }

  }

  let myActions = new ToDoActions()
  export default myActions