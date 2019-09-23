import React, { Component } from 'react';
import { getAllStories } from '../helpers/ajaxapi.js';

const storyCard = (story = {}, linkHandler = f=>f) => {
    return (
        <div>
            <p id={story._id} onClick={linkHandler}>{story.title ? story.title : "Untitled"}</p>
            <p>by {story.author ? story.author : "Anonymous"}</p>
            <p>{story.summary ? story.summary : "No summary."}</p>
        </div>
    );
}

const listDisplay = (allStories = [], linkHandler = f=>f) => {
    return (
        <div>
            {allStories ?
            allStories.map(story => storyCard(story, linkHandler)) :
            "No stories found"}
        </div>
    );
}

export default class StoryList extends Component {
    state = {
        searchbar: "",
        matchingStories: [],
        allStories: [],
    }

    componentWillMount() {
        getAllStories()
            .then(stories => this.setState(
                {allStories: stories, matchingStories: stories}
            ))
            .catch(err => console.log(err));
    }

    //go to clicked story
    linkToStory = evnt => {
        this.props.history.push(`/story/${evnt.target.getAttribute("id")}`)
    }

    findSearchResults = searchString => {
        return this.state.allStories
            .filter(
                story =>
                    story.title ? story.title.toLowerCase().includes(searchString.toLowerCase()) : false
            );
    }

    handleSearchChange = evnt => {
        const value = evnt.target.value;
        this.setState({searchbar: value});
        this.setState({matchingStories: this.findSearchResults(value)});
    }

    render() {
        return(
            <div>
                <h1>All Stories</h1>
                <input type="text" onChange={this.handleSearchChange}/>
                {listDisplay(this.state.matchingStories, this.linkToStory)}
            </div>
        );
    }
}