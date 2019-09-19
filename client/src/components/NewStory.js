import React, { Component } from 'react';

export default class NewStory extends Component {
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
        });
    }

    handleTitleChange = (evnt) => {
        this.setState({title : evnt.target.value});
    }

    render() {
        return (<form>
            <label>Story title:</label>
            <input type="text" name="title" onChange={this.handleTitleChange} required/>
            <input type="submit" value="Create Story" onClick={this.saveStory}/>
        </form>);
    }
}