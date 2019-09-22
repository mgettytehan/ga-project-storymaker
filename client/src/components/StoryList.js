import React, { Component } from 'react';
import { withRouter } from 'react-router';

const storyCard = (story = {}, linkHandler = f=>f) => {
    return (
        <div>
            <p id={story._id} onClick={linkHandler}>{story.title ? story.title : "No title found"}</p>
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
        allStories: []
    }

    componentWillMount() {
        this.getAllStories()
            .then(stories => this.setState({allStories: stories}))
            .catch(err => console.log(err));
    }

    getAllStories = () => {
        return fetch('/api/stories')
            .then(res => res.json())
            .catch(err => console.log(err))
    }
    //go to clicked story
    linkToStory = evnt => {
        this.props.history.push(`/story/${evnt.target.getAttribute("id")}`)
    }

    render() {
        return(
            <div>
                <h1>All Stories</h1>
                {listDisplay(this.state.allStories, this.linkToStory)}
            </div>
        );
    }
}