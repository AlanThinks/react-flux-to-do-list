import Flux from 'react-flux-dash';

class ToDoStore extends Flux.Store{
    constructor(){
        super();
        this.state = {
            tasks: [] 
        }
    }
    
    //you are forced to use _ to avoid using the setters anywhere else
    _storeAddTask(incomingTaskObject){
        let tasksArray = this.state.tasks
        
        tasksArray.push(incomingTaskObject)

        this.setStoreState({tasks: tasksArray}).emit('change');
    }
    //you are forced to use _ to avoid using the setters anywhere else
    _removeTask(data){
        //set the the new store state and emit
        //this.setStoreState({ autenticated: data.autenticated }).emit();
        //you can specify an event name if you want
        this.setStoreState({ tasks: task }).emit('change');
    }

    returnTasksArray(){
        return this.state.tasks;
    }
    
}

    let myStore = new ToDoStore()
    export default myStore;
