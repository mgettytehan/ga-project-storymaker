import React, { Component } from 'react';
import { getAllStories, saveStory } from '../helpers/ajaxapi.js';

const storyCard = (story = {}, index = -1, changeHandler = f=>f, saveHandler = f=>f, linkHandler = f=>f) => {
    return (
        <div>
            <button type="button" onClick={linkHandler}>Edit Story</button>
            <input type="text" data-index={index} name="title" value={story.title} onChange={changeHandler} />
            <button type="button" data-index={index} onClick={saveHandler}>Save</button>
        </div>
    );
}

export default class StoryDash extends Component {
    state = {
        allStories: []
    }

    componentWillMount() {
        getAllStories()
            .then(stories => this.setState(
                {allStories: stories}
            ))
            .catch(err => console.log(err));
    }

    handleSave = evnt => {
        const story = {...this.state.allStories[evnt.target.dataset.index]};
        saveStory(story)
            .catch(err => console.log(err));
    }

    handleChange = evnt => {
        const allStories = [...this.state.allStories];
        allStories[evnt.target.dataset.index][evnt.target.name] = evnt.target.value;
        this.setState({allStories});
    }

    render() {
        return (
            <div>
                {this.state.allStories.map((story, index) => storyCard(story, index, this.handleChange, this.handleSave))}
            </div>
        );
    }
}