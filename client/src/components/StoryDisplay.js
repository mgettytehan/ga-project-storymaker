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
            {storyText(currentNode.storyText)}
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

    constructor(props) {
        super(props);
        //set a dummy id as props
        this.props.storyId = "5d7fd3f932aecfc147ec3785";
        //bind setCurrentNode so it can be passed
        this.setNewCurrentNode = this.setNewCurrentNode.bind(this);
    }

    componentWillMount() {
        //set the story and pull the first node
        this.setState({story: this.pullStory()});
        this.setNewCurrentNode(this.state.story.firstNodeId);
    }

    pullStory = async () => {
        try {
            const res = await fetch(`/api/stories/${this.props.storyId}`);
            return await res.json();
        }
        catch (err) {
            return console.log(err);
        }
    }

    //to be refactored with fetch when connecting back end
    findNodeById(nodeId) {
        return this.state.storyNodes.find(node => node._id === nodeId);
    }

    setNewCurrentNode(nodeId) {
        this.setState({currentNode: this.findNodeById(nodeId)});
    }

    render() {
        return (
            <div>
                {storyDetails( this.state.story.title )}
                {storyTextDisplay( this.state.currentNode, this.setNewCurrentNode )}
            </div>
        );
    }
}
