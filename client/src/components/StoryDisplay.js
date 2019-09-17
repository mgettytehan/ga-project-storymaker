import React, { Component } from 'react';

const storyLink = (choice) => {
    //current contains dummy link instead of choice action
    return (<p><a href="#">{choice.choiceText}</a></p>);
}

const storyText = (text) => {
    return (<p>{text}</p>);
}

const storyTextDisplay = (currentNode) => {
    //'no choices option is placeholder
    return (
        <div>
            {storyText(currentNode.storyText)}
            {currentNode.choices ? currentNode.choices.map(storyLink) : "No choices"}
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
        story: {
            title: "Hardcoded Test Story",
            firstNodeId: "test123"
        },
        currentNode: {},
        storyNodes: [
            {
                _id: "test123",
                nodeTitle: "The Start",
                storyText: "And so it begins.",
                choices: [
                    {
                        choiceText: "Fly the Excalibur",
                        nextNode: "test124"
                    },
                    {
                        choiceText: "Give up on curing the Drakh plague",
                        nextNode: "test125"
                    }
                ]
            },
            {
                _id: "test124",
                nodeTitle: "OK End",
                storyText: "You fly around space for a while until your show gets cancelled.\nOh well.\nThe End.",
                choices: []
            },
            {
                _id: "test125",
                nodeTitle: "Bad End",
                storyText: "Heartless. The Drakh plague wipes out everyone on Earth.\nThe End.",
                choices: []
            }
        ]
    }

    componentDidMount() {
        const currentNode = this.getFirstNode(this.state.story);
        this.setState({currentNode: currentNode});
    }

    getFirstNode(story) {
        return {...this.state.storyNodes.find(node => node._id === story.firstNodeId)}
    }

    render() {
        return (
            <div>
                {storyDetails( this.state.story.title )}
                {storyTextDisplay( this.state.currentNode )}
            </div>
        );
    }
}
