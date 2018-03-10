import React from 'react';
import myActions from './todoActions';
import Flux from 'react-flux-dash';
import myStore from './todoStore';

export class Home extends Flux.View {

    constructor() {
        super();
        this.state={
            taskInput: "",
            homeTasksArray:[]
        }
        this.bindStore(myStore)

    }
        
        // if you dont define this function you get an error
        // this function gets automatically called when SessionStore state changes
        handleStoreChanges(){
            // retreive any store homeTasksArray
            let updatedTasksArray = myStore.returnTasksArray();
            this.setState({homeTasksArray: updatedTasksArray})
        }
    
    handleFormSubmit(e) {
        e.preventDefault()
        myActions.addTask(this.state.taskInput)
        console.log('form submitted')
    }

    render() {
        let tasksToRender = this.state.homeTasksArray.map(function (task) {
            return (<li key={task.id}>
                <div className="view">
                    <label>{task.task}</label>
                    <button className="destroy" onClick={() => todoActions.deleteTask(task.id)}></button>
                </div>
            </li>);
        });
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <form onSubmit={(e)=>this.handleFormSubmit(e)}>
                        <input
                            autoFocus={true}
                            className="new-todo"
                            placeholder="What needs to be done?"
                            value={this.state.taskInput}
                            onChange={(evt) => this.setState({taskInput: evt.target.value})}
                        />
                    </form>
                </header>
                <section className="main">
                    <ul className="todo-lisvt">
                        {tasksToRender}
                    </ul>
                </section>
                <footer className="footer">
          <span className="todo-count">
            <strong>
              {this.state.homeTasksArray.filter(key => !key.done).length}
            </strong> item left
          </span>
                </footer>
            </section>
        );
    }
}