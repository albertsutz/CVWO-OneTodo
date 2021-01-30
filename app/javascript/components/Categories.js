import React from 'react'
import axios from 'axios'
import Category from './Category'

class Categories extends React.Component{
    constructor(props){
        super(props);
        this.state={
            categories:[],
            included: [],
            category_new: "",
        }
        this.fetchCategories = this.fetchCategories.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.fetchCategories();
    }

    fetchCategories(){

        axios.get('/api/v1/categories.json')
        .then( resp => this.setState({
            categories: resp.data.data,
            included: resp.data.included
        }))
        .catch( resp => console.log(resp))
    }

    handleChange(e){
		var name = e.target.name;
		var value = e.target.value;
		this.setState({
			[name]: value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        fetch('/api/v1/categories',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.category_new
            })
        })
        .then(resp =>{
            this.fetchCategories();
            this.setState({
                category_new:""
            })
        })
        .then(error=>{
            console.log(error);
        });

    }
    
    render(){
        const categoriesCards = this.state.categories.map(
            function(category, index){
                return(
                    <div key={index}  className="container">
                        <div className="category-wrapper flex-wrapper">
                            <Category key={index} id={category.id}/>
                        </div>
                    </div>

                )
            }
        )
        console.log(this.state.category_new)
        return (
            <div className="container">
                <div id = "categories-form-wrapper">
                    <form onSubmit={this.handleSubmit} id="form">
                        <div className="flex-wrapper">
                            <div style={{flex:10}}>
                                <input className="form-control" id="category_new" type="text" name="category_new" value={this.state.category_new} onChange={this.handleChange} placeholder="Add New Category Here!"></input>
                            </div>
                            <div style = {{flex:1}}></div>
                            <div style={{flex: 1}}>
                                <input id="submit" className="btn btn-warning" type="submit" name="Add"></input>
                            </div>
                        </div>
                    </form>
                </div>
                {categoriesCards}
            </div>
        )
    }  
}

export default Categories
