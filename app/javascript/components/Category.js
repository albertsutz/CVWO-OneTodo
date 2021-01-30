import React from 'react'
import axios from 'axios'

class Category extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:{
                id:"",
                attributes:{
                    name:""
                }
            },
            included:[],
            isLoaded:false,
        }
        this.fetchCategory = this.fetchCategory.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.strikeUnstrikeItem = this.strikeUnstrikeItem.bind(this);
    }

    componentDidMount(){
        this.fetchCategory();
    }

    fetchCategory(){
        axios.get(`/api/v1/categories/${this.props.id}.json`)
        .then( resp=>{
            this.setState({
                data:resp.data.data,
                included:resp.data.included,
                isLoaded:true,
            })
        })
        .catch( resp => console.log(resp))
    }

    handleDelete(){

        const categoryId = this.state.data.id
        axios({
            method:"DELETE",
            url: `/api/v1/categories/${categoryId}`,
            headers: {'Content-type': 'application/json'}
        })
        .then(resp=> {})
        .catch(resp=> console.log(resp))
        location.reload();
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
            this.fetchCategory();
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
            this.fetchCategory();
		})
    }

    render(){
        var self = this;
        var tasks = self.state.included.length == 0 ? <div style={{flex:7}}></div> :this.state.included.map(
            function(task, index){
                if (task.attributes.completed === true){
                    var description = <strike>{task.attributes.description}</strike>
                }else{
                    var description = <span>{task.attributes.description}</span>
                }
                return(
                    <div key={index} style={{flex:7}}>
                        <div className="category-task-wrapper task-wrapper flex-wrapper"  >
                            <div style={{flex:3}}>
                                {task.attributes.title}
                            </div>
                            <div onClick = {() => self.strikeUnstrikeItem(task)} style={{flex:7}}>
                                {description}
                            </div>
                            <div style={{flex:1}}>
                                <button onClick = {()=>self.deleteItem(task)} className="btn btn-sm btn-outline-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                )
            }
        )
        return(
            <div className="container">
                <div className="flex-wrapper">
                    <div className="card" style={{flex:3}}>
                        <div className="card-body text-center">
                            <h5 className="card-title ">{this.state.data.attributes.name}</h5>
                            <p className="card-text">There are currently {this.state.included.length} tasks in this category</p>
                            <button onClick={this.handleDelete} className="btn btn-primary">Delete</button>
                        </div>
                    </div>
                    {<div style={{flex:7}}>
                        {tasks}
                    </div>}
                </div>
            </div>


        )
    }
}

export default Category
