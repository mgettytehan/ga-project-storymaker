import React, { Component } from 'react';

const storyLink = (choice, changeCurrentNode) => {
    //current contains dummy link instead of choice action
    return (<button onClick={() => changeCurrentNode(choice.nextNode)}>{choice.choiceText}</button>);
}

const storyText = (text) => {
    return (<p>{text}</p>);
}

const storyTextDisplay = (currentNode, changeCurrentNode) => {
    //'no choices option is placeholder
    return (
        <div>
            {currentNode.storyText ? storyText(currentNode.storyText) : ""}
            {currentNode.choices ? currentNode.choices.map(choice => storyLink(choice, changeCurrentNode)) : "No choices"}
        </div>
    );
}

const storyDetails = (storyTitle) => {
    //add in author when users are introduced
    return (<h1>{storyTitle}</h1>);
}

export default class StoryDisplay extends Component {
    //state hardcoded for testing
    //storyNodes will not exist when DB is connected
    state = {
        story: {},
        currentNode: {}
    }

    constructor(props) {
        super(props);
        //set a dummy id as props
        // this.props.storyId = "5d7fd3f932aecfc147ec3785";
        //bind setCurrentNode so it can be passed
        this.setNewCurrentNode = this.setNewCurrentNode.bind(this);
    }

    componentWillMount() {
        //set the story and pull the first node
        this.pullStoryAndFirstNode(this.props.match.params.storyId)
        .then(newState => this.setState(newState));
    }

    pullStoryAndFirstNode = (storyId) => {
        return fetch(`/api/stories/${storyId}`)
        .then(res => res.json())
        .then(story => {
            return fetch(`/api/stories/${story._id}/storynodes/${story.firstNodeId}`)
            .then(res => res.json())
            .then(currentNode => ({story, currentNode}))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
    pull

    findNodeById = (nodeId) => {
        return fetch(`/api/stories/${this.props.match.params.storyId}/storynodes/${nodeId}`)
        .then(res => res.json())
        .catch(err => console.log(err));
    }

    setNewCurrentNode = (nodeId) => {
        this.findNodeById(nodeId).then(currentNode => this.setState({currentNode}));
    }

    render() {
        return (
            <div>
                {storyDetails( this.state.story.title )}
                {this.state.currentNode ? storyTextDisplay( this.state.currentNode, this.setNewCurrentNode) : "We lost the story..." }
            </div>
        );
    }
}
