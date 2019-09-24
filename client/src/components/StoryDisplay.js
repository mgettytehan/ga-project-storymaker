import React, { Component } from 'react';

const resetButton = (resetHandler) => {
    return (<button onClick={resetHandler}>Reset</button>);
}

const storyLink = (choice, changeCurrentNode) => {
    //current contains dummy link instead of choice action
    return (<button className="story-link" onClick={() => changeCurrentNode(choice.nextNode)}>{choice.choiceText}</button>);
}

//rework when introducing improved text editing
const storyText = (text) => {
    return (<p dangerouslySetInnerHTML={{ __html: text }}></p>);
}

const storyTextDisplay = (currentNode, changeCurrentNode) => {
    //'no choices option is placeholder
    return (
        <div className="story-display">
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

    state = {
        story: {},
        currentNode: {}
    }

    constructor(props) {
        super(props);
        //bind setCurrentNode so it can be passed
        this.setNewCurrentNode = this.setNewCurrentNode.bind(this);
    }

    componentWillMount() {
        //set the story and pull the first node
        this.pullStoryAndFirstNode(this.props.match.params.storyId)
        .then(newState => {
            this.setState(newState);
        });
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

    findNodeById = (nodeId) => {
        return fetch(`/api/stories/${this.props.match.params.storyId}/storynodes/${nodeId}`)
        .then(res => res.json())
        .catch(err => console.log(err));
    }

    convertLinebreaks = storyText => {
        return storyText.replace(/\n/g, "<br />");
    }

    resetNode = () => {
        this.setNewCurrentNode(this.state.story.firstNodeId);
    }

    setNewCurrentNode = (nodeId) => {
        this.findNodeById(nodeId).then(currentNode => {
            this.setState({currentNode});
        });
    }

    render() {
        const currentNode = {...this.state.currentNode};
        if(currentNode.storyText)
            currentNode.storyText = this.convertLinebreaks(currentNode.storyText);
        return (
            <div>
                <div className="right">{resetButton(this.resetNode)}</div>
                {storyDetails( this.state.story.title )}
                {currentNode ? storyTextDisplay( currentNode, this.setNewCurrentNode) : "We lost the story..." }
            </div>
        );
    }
}
