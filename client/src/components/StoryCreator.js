import React, { Component } from 'react';

//textField, editArea and the choice values are loaded in from NodeEditor's 'node'

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
            <p>Links: {node.choices && node.choices.length ? node.choices.map(choice => choiceList(choice)) : "End"}</p>
        </div>
    );

const nodeDisplay = (storyNodes, changeNodeHandler) =>
    (
        <div>
            {Object.keys(storyNodes)
                .map(id => nodeCard(storyNodes[id], changeNodeHandler))}
        </div>
    );

class NodeEditor extends Component {
    state = {
        node: {
            nodeTitle: "",
            storyText: "",
            choices: []
        }
    }

    componentWillMount() {
        this.setState({node: this.props.currentNode});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({node: nextProps.currentNode});
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
            <form onSubmit={this.handleSave}>
                {editArea("storyText", this.state.node.storyText, this.handleChange)}
                {textField("nodeTitle", this.state.node.nodeTitle, this.handleChange)}
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default class StoryCreator extends Component {
    //may dispose of 'currentNode'
    state = {
        story: {},
        currentNode: {},
        storyNodes: {}
    }

    //may be able to remove once db integrated
    constructor(props) {
        super(props);
        //bind updateCurrentNode so it can be passed
        this.updateCurrentNode = this.updateCurrentNode.bind(this);
    }

    componentWillMount() {
        this.getStoryAndAllNodes(this.props.match.params.storyId)
            .then(result => {
                this.setState(result);
                this.changeCurrentNode(result.story.firstNodeId);
            })
            .catch(err => console.log(err));
    }
    //TODO: improve this
    getStoryAndAllNodes = (storyId) =>
        fetch(`/api/stories/${storyId}`)
        .then(res => res.json())
        .then(story => 
            fetch(`/api/stories/${storyId}/storynodes`)
            .then(res => res.json())
            .then(storyNodes => {
                return ({ story, storyNodes })})
        )
        .catch(err => console.log(err));

    sendUpdatedNode = (updatedNode) => {
        return fetch(`/api/stories/${updatedNode.storyId}/storynodes/${updatedNode._id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedNode),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .catch(err => console.log(err));
    }

    updateCurrentNode = (updatedNode) => {
        this.sendUpdatedNode(updatedNode)
        .then(
            result => {
                const newNodes = {...this.state.storyNodes};
                newNodes[result._id] = result;
                this.setState({storyNodes: newNodes});
                this.changeCurrentNode(result._id);
            }
        )
        .catch(err => console.log(err))
    }

    changeCurrentNode = (nodeId) => {
        const currentNode = this.state.storyNodes[nodeId];
        this.setState({currentNode});
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