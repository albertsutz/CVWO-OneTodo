import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Tasks from './Tasks'
import Header from './Header'
import Categories from './Categories'
import Category  from './Category'

const App = () => {
    return (
        <Router>
            <div>
                <Header/>
                    <Switch>
                        <Route exact path="/" component = {Tasks}></Route>
                        <Route path="/categories" component = {Categories}></Route>
                    </Switch>
            </div>
        </Router>

    )
}

export default App
