import React, { Component } from 'react';

const saveButton = (handler, text = "Save") => (<input type="submit" value={text} onClick={handler} />);
//textField and editArea's values are loaded in from NodeEditor's 'node'
const textField = (name, value, handler, label = "Title") => (
    <div>
        <label>{label}</label>
        <input type="text" name={name} value={value} onChange={handler}/>
    </div>
);

const editArea = (name, value, handler) => (<textarea name={name} onChange={handler} value={value}></textarea>);

//TODO: eventually list linked node titles instead of choice text
const choiceList = (choice) => (<span>{choice.choiceText} </span>);

const nodeCard = (node, changeNodeHandler) => 
    (
        <div>
            <button onClick={() => changeNodeHandler(node._id)}>Edit</button>
            <p>{node.nodeTitle}</p>
            <p>Links: {node.choices.length ? node.choices.map(choice => choiceList(choice)) : "End"}</p>
        </div>
    );

const nodeDisplay = (storyNodes, changeNodeHandler) =>
    (
        <div>
            {storyNodes.map(node => nodeCard(node, changeNodeHandler))}
        </div>
    );

class NodeEditor extends Component {
    state = {
        node: {
            nodeTitle : "Title",
            storyText : "Story Text",
            choices : []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({node: nextProps.currentNode});
    }

    componentWillMount() {
        this.setState({node: this.props.currentNode});
    }

    handleChange = (evnt) => {
        const node = {...this.state.node};
        node[evnt.target.name] = evnt.target.value;
        this.setState({node})
    }

    handleSave = (evnt) => {
        evnt.preventDefault();
        this.props.updateCurrentNode(this.state.node);
    }

    render() {
        return(
            <form>
                {editArea("storyText", this.state.node.storyText, this.handleChange)}
                {textField("nodeTitle", this.state.node.nodeTitle, this.handleChange)}
                {saveButton(this.handleSave)}
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

    //may be able to remove once db integrated
    constructor(props) {
        super(props);
        //bind setCurrentNode so it can be passed
        this.updateCurrentNode = this.updateCurrentNode.bind(this);
    }

    componentWillMount() {
        this.setNewCurrentNode(this.state.story.firstNodeId);
    }
    //will change a lot when db integrated
    updateCurrentNode = (updatedNode) => {
        const nodes = [...this.state.storyNodes];
        const newNodes = nodes.map(node => node._id === updatedNode._id ? updatedNode : node);
        this.setState({storyNodes: newNodes});
    }

    changeCurrentNode = (nodeId) => {
        const currentNode = this.findNodeById(nodeId);
        this.setState({currentNode});
    }

    findNodeById = (nodeId) => {
        return this.state.storyNodes.find(node => node._id === nodeId);
    }

    setNewCurrentNode = (nodeId) => {
        this.setState({currentNode: this.findNodeById(nodeId)});
    }

    render() {
        return (
            <div>
                <NodeEditor currentNode={this.state.currentNode} updateCurrentNode={this.updateCurrentNode} />
                {nodeDisplay(this.state.storyNodes, this.changeCurrentNode)}
            </div>
        );
    }
}