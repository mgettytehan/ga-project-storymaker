import React, { Component } from 'react';

//textField, editArea and the choice values are loaded in from NodeEditor's 'node'
const choiceSet = (choice, index, nodeList, changeHandler, deleteHandler) => {
    return (
        <div>
            <button data-index={index} onClick={deleteHandler} className="close">X</button>
            <input name="choiceText" data-index={index} value={choice.choiceText} onChange={changeHandler} />
            <select name="nextNode" data-index={index} value={choice.nextNode} onChange={changeHandler}>
                <option></option>
                {nodeList ? nodeList.map(node => (<option value={node._id}>{node.nodeTitle}</option>)) : "No options available"}
            </select>
        </div>
    );
}

const choiceEditor = (choices = [], nodeList = [], changeHandler = f=>f, deleteHandler = f=>f) => {
    //placeholder for testing
    return choices.map((choice, index) => choiceSet(choice, index, nodeList, changeHandler, deleteHandler));
}

const textField = (name, value, handler, label = "Title") => (
    <div>
        <label>{label}</label>
        <input type="text" name={name} value={value} onChange={handler}/>
    </div>
);

const editArea = (name, value, handler) => (<textarea className="big" name={name} onChange={handler} value={value}></textarea>);

//TODO: eventually list linked node titles instead of choice text
const choiceList = (choice) => (<span className="node-editor-link">{choice.choiceText} </span>);

const nodeCard = (node, changeNodeHandler) => 
    (
        <div className="tile">
            <button onClick={() => changeNodeHandler(node._id)}>Edit</button>
            <p>{node.nodeTitle}</p>
            <p>Links: {node.choices && node.choices.length ? node.choices.map(choice => choiceList(choice)) : "End"}</p>
        </div>
    );

const nodeDisplay = (storyNodes, changeNodeHandler) =>
    (
        <div className="tile-display">
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
        this.setState({node : nextProps.currentNode});
    }

    handleChoicesRemove = (evnt) => {
        const node = {...this.state.node}
        const index = evnt.target.dataset.index;
        node.choices.splice(index, 1);
        this.setState(node);
    }

    handleChoicesChange = (evnt) => {
        const node = {...this.state.node};
        node.choices[evnt.target.dataset.index][evnt.target.name] = evnt.target.value;
        this.setState({node});
    }

    handleChange = (evnt) => {
        const node = {...this.state.node};
        node[evnt.target.name] = evnt.target.value;
        this.setState({node});
    }

    handleSave = (evnt) => {
        evnt.preventDefault();
        this.props.updateCurrentNode(this.state.node);
    }

    addChoice = () => {
        const node = {...this.state.node};
        node.choices.push({choiceText: "New choice", nextNode: ""});
        this.setState({node});
    }

    render() {
        if (Object.entries(this.state.node).length === 0)
            return (<div>Nothing selected for editing.</div>)
        return(
            <form onSubmit={this.handleSave}>
                {textField("nodeTitle", this.state.node.nodeTitle, this.handleChange)}
                {editArea("storyText", this.state.node.storyText, this.handleChange)}
                <button type="button" onClick={this.addChoice}>Add Choice</button>
                {choiceEditor(this.state.node.choices, this.props.nodeList, this.handleChoicesChange, this.handleChoicesRemove)}
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

    createNewNode = () => {
        fetch(`/api/stories/${this.state.story._id}/storynodes`, {
            method: 'POST',
            body: JSON.stringify({
                nodeTitle: "Untitled Node",
                storyText: "",
                choices: [],
                storyId: this.state.story._id}),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(newNode => {
            const nodes = {...this.state.storyNodes}
            nodes[newNode._id] = newNode;
            this.setState({
                storyNodes: nodes,
                currentNode: newNode
            })
        })
        .catch(err => console.log(err));
    }

    createNodeList = (nodes) => {
        return Object.keys(nodes)
                .map(id => ({_id: nodes[id]._id, nodeTitle: nodes[id].nodeTitle}));
    }

    render() {
        return (
            <div>
                <h1>{this.state.story.title ? this.state.story.title : "No Title"}</h1>
                <NodeEditor currentNode={this.state.currentNode} updateCurrentNode={this.updateCurrentNode} nodeList={this.createNodeList(this.state.storyNodes)} />
                <hr/>
                <div className="left"><button onClick={this.createNewNode}>Add Node</button></div>
                {nodeDisplay(this.state.storyNodes, this.changeCurrentNode)}
            </div>
        );
    }
}