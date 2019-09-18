import React, { Component } from 'react';

const saveButton = (text = "Save") => {
    return (<input type="submit" value={text} />);
}
//textField and editArea's values are loaded in from NodeEditor's 'node'
const textField = (name, value, label = "Title") => {
    return (
        <div>
            <label>{label}</label>
            <input type="text" name={name} value={value}/>
        </div>
    );
}

const editArea = (name, value) => {
    return (<textarea name={name}>{value}</textarea>);
}

class NodeEditor extends Component {
    state = {
        node: {
            nodeTitle : "Title",
            storyText : "Story Text",
            choices : []
        }
    }
    render() {
        return(
            <form>
                <div>

                </div>
                <div>
                    {editArea("storyText", this.state.node.storyText)}
                    {textField("nodeTitle", this.state.node.nodeTitle)}
                    {saveButton()}
                </div>
            </form>
        );
    }
}

export default class StoryCreator extends Component {
    //state is all dummy data
    //keys will be the same when loading from db
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

    render() {
        return (
        <div>
            <NodeEditor />
        </div>
        );
    }
}