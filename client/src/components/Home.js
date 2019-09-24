import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class Home extends Component {
    state = {
        title: ""
    }

    saveStory = (evnt) => {
        evnt.preventDefault();

        if (!this.state.title)
            return;
        
        fetch('/api/stories', {
            method: 'POST',
            body: JSON.stringify({ title: this.state.title }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(
            res => res.json()
        )
        .then(
            //go to new story edit page when save is successful
            newStory => {
                this.props.history.push(`/story/${newStory._id}/edit`)
            }
        )
        .catch(
            err => console.log(err)
        );
    }

    handleTitleChange = (evnt) => {
        this.setState({title : evnt.target.value});
    }

    render() {
        return (
        <div>
            <h1>Story Tree</h1>
            <p>A web application for creating and sharing branching stories.</p>
            <div className="mainpage-container">
                <h1><Link to="/login">Login</Link></h1> <h1>or</h1> <h1><Link to="/stories">Browse</Link></h1>
            </div>
            <form>
                <label>Story title:</label>
                <input type="text" name="title" onChange={this.handleTitleChange} required/>
                <input type="submit" value="Create Story" onClick={this.saveStory}/>
            </form>
        </div>
        );
    }
}

export default withRouter(Home);