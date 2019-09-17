import React, { Component } from 'react';

const storyLink = (choice) => {
    //current contains dummy link instead of choice action
    return (<p><a href="#">{choice.choiceText}</a></p>);
}

const storyText = (text) => {
    return (<p>{text}</p>);
}

const storyTextDisplay = (text, choices) => {
    return (
        <div>
            {storyText(text)}
            {choices.map(storyLink)}
        </div>
    );
}

const storyDetails = (storyTitle) => {
    //add in author when users are introduced
    return (<h1>{storyTitle}</h1>);
}

export default class StoryDisplay extends Component {
    //state hardcoded for testing
    state = {
        story: {
            title: "Hardcoded Test Story",
            firstNodeId: "test123"
        },
        currentNode: {
            storyId: "test123",
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
        }
    }

    render() {
        return (
            <div>
                {storyDetails( this.state.story.title )}
                {storyTextDisplay(
                    this.state.currentNode.storyText
                    , this.state.currentNode.choices
                )}
            </div>
        );
    }
}
