import React, { Component } from 'react';
import { getAllStories, saveStory } from '../helpers/ajaxapi.js';

const storyCard = (story = {}, index = -1, changeHandler = f=>f, saveHandler = f=>f, linkHandler = f=>f) => {
    return (
        <div class="tile">
            <p><a id={story._id} onClick={linkHandler}>Edit Story→</a></p>
            <div><input type="text" data-index={index} name="title" value={story.title} onChange={changeHandler} /></div>
            <div><textarea data-index={index} name="summary" value={story.summary} onChange={changeHandler} /></div>
            <div><button type="button" data-index={index} onClick={saveHandler}>Save</button></div>
        </div>
    );
}

export default class StoryDash extends Component {
    state = {
        allStories: [],
        show: false
    }

    componentWillMount() {
        console.log(document.cookie);
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

    linkToStory = evnt => {
        this.props.history.push(`/story/${evnt.target.getAttribute("id")}/edit`)
    } 

    render() {
        console.log(document.cookie);
        return (
            <div>
                <h2>My Stories</h2>
                <div className="tile-display">
                    {this.state.allStories.map((story, index) => storyCard(story, index, this.handleChange, this.handleSave, this.linkToStory))}
                </div>
            </div>
        );
    }
}