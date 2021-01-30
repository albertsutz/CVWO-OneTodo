import React from 'react'
import axios from 'axios'

class Tasks extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tasks : [],
			activeItem:{
				id:null,
                title:'',
                description:'',
                completed:false,
                category_id:'DEFAULT',
            },
            categories:[],
			editing:false,
        }
        this.fetchTasks = this.fetchTasks.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.strikeUnstrikeItem = this.strikeUnstrikeItem.bind(this);
        this.startEdit = this.startEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
    }

    componentDidMount(){
        this.fetchTasks();
        this.fetchCategories();
    }

    fetchTasks(){
        axios.get('/api/v1/tasks.json')
        .then( resp => this.setState({
            tasks: resp.data.data
        }))
        .catch( resp => console.log(resp))
    }

    fetchCategories(){
        axios.get('/api/v1/categories.json')
        .then( resp => this.setState({
            categories: resp.data.data,
        }))
        .catch( resp => console.log(resp))
    }

    handleChange(e){
		var name = e.target.name;
		var value = e.target.value;
		this.setState({
			activeItem:{
				...this.state.activeItem,
				[name]: value,
			}
        })
    }
    
    strikeUnstrikeItem(task){
		var url = `/api/v1/tasks/${task.id}`;
        var completed = !task.attributes.completed;
        task.attributes.completed = completed;
        fetch(url, {
			method:'PUT',
			headers:{
				'Content-type': 'application/json',
			},
			body:JSON.stringify({
                'completed': completed
            })
		})
		.then(resp =>{
			this.fetchTasks();
			this.setState({
				activeItem:{
					id:null,
                    title:'',
                    description:'',
                    completed:false,
                    category_id:null
				}
			})
		})
		.then(error=>{
				console.log(error);
		});
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.editing === false){
            var url = '/api/v1/tasks/';
            var method = "POST";
            fetch(url,{
                method: method,
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    title:this.state.activeItem.title,
                    description:this.state.activeItem.description,
                    completed:false,
                    category_id:this.state.activeItem.category_id,
                })
            })
            .then(resp =>{
                this.fetchTasks();
                this.setState({
                    activeItem:{
                        id:null,
                        title:'',
                        description:'',
                        completed:false,
                        category_id:null
                    },
                    editing:false
                })
            })
            .then(error=>{
                console.log(error);
            });
        }else{
            var url = `/api/v1/tasks/${this.state.activeItem.id}`;
            var method = "PUT"
            fetch(url,{
                method: method,
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(this.state.activeItem)
            })
            .then(resp =>{
                this.fetchTasks();
                this.setState({
                    activeItem:{
                        id:null,
                        title:'',
                        description:'',
                        completed:false,
                        category_id:null
                    },
                    editing:false
                })
            })
            .then(error=>{
                console.log(error);
            });
        }
    }

	deleteItem(task){
		var url = `/api/v1/tasks/${task.id}`
		fetch(url, {
			method: "DELETE",
			headers:{
				'Content-type': 'application/json',
			},
		})
		.then(resp =>{
			this.fetchTasks();
			this.setState({
				activeItem:{
					id:null,
                    title:'',
                    description:'',
                    completed:false,
                    category_id:null
				}
			})
		})
		.then(error=>{
				console.log(error);
		});
	}

    startEdit(task){
        this.setState({
            activeItem:{
				id:task.id,
                title:task.attributes.title,
                description:task.attributes.description,
                completed:task.attributes.completed,
                category_id: task.attributes.category_id
            },
            editing:true,
        })
    }
    
    render(){
        var self = this;

        //mapping tasks from api
        const tasksComponents = this.state.tasks.map(
            function(task, index){
                if (task.attributes.completed === true){
                    var description = <strike>{task.attributes.description}</strike>
                }else{
                    var description = <span>{task.attributes.description}</span>
                }
                return(
                    <div key={index} className="task-wrapper flex-wrapper">
                        <div style={{flex:3}}>
                            {task.attributes.title}
                        </div>
                        <div onClick = {() => self.strikeUnstrikeItem(task)} style={{flex:7}}>
                            {description}
                        </div>
                        <div style={{flex:1}}>
                            <button onClick = {()=>self.startEdit(task)} className="btn btn-sm btn-outline-info">edit</button>
                        </div>
                        <div style={{flex:1}}>
                            <button onClick = {()=>self.deleteItem(task)} className="btn btn-sm btn-outline-dark">-</button>
                        </div>
                    </div>
                )
            }
        )

        //mapping categories from api to make select options
        const categoriesOptions = this.state.categories.map(
            function(category, index){
                return (
                    <option key={index} value={category.id}>{category.attributes.name}</option>
                )
            }
        )

        return (
            <div className="container">
                    <div id = "task-container">
                        <div id = "form-wrapper">
                            <form onSubmit={this.handleSubmit} id="form">
                                <div className="flex-wrapper">
                                    <div style={{flex:6}}>
                                        <input onChange={this.handleChange} value = {this.state.activeItem.title} className="form-control" id="title" type="text" name="title" placeholder="Title"></input>
                                    </div>
                                    <div style = {{flex:1}}></div>
                                    <div style={{flex: 12}}>
                                        <input onChange={this.handleChange} value = {this.state.activeItem.description} className="form-control" id="description" type="text" name="description" placeholder="Description"></input>
                                    </div>
                                    <div style = {{flex:1}}></div>
                                    <select className="form-select mb-3" style={{flex:4}} name='category_id' value={this.state.activeItem.category_id} onChange={this.handleChange}>
                                        <option value="DEFAULT" disabled>Category</option>
                                        {categoriesOptions}
                                    </select>
                                    <div style = {{flex:1}}></div>
                                    <div style={{flex: 1}}>
                                        <input  id="submit" className="btn btn-warning" type="submit" name="Add"></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div id = "list-wrapper">
                            {tasksComponents}
                        </div>
                    </div>
                </div>
        )
    }  
}

export default Tasks
