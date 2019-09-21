import React, { Component } from 'react';

//textField, editArea and the choice values are loaded in from NodeEditor's 'node'
const choiceSet = (choice, handler, nodeList) => {
    return (
        <div>
            <input name="choiceText" value={choice.choiceText} onChange={handler} />
            <select name="nextNode" selected={choice.storyId} onChange={handler}>
                {nodeList.map(node => (<option value={nodeList._id}>{node.nodeTitle}</option>))}
            </select>
        </div>
    );
}

const choiceEditor = (choices = [], nodeList = []) => {
    //placeholder for testing
    return (
        <div>
            <p>Choices: </p>
            <p>{choices ? choices.map(choice => choice.choiceText + " " + choice.nextNode) : "No choices"}</p>
            <p>Node List: </p>
            <p>{nodeList ? nodeList.map(node => node._id + " " + node.nodeTitle) : "Nothing to list"}</p>
            {/* {choices.map((choice) => choiceSet(choice, handler, nodeList))} */}
        </div>
    );
}

const textField = (name, value, handler, label = "Title") => (
    <div>
        <label>{label}</label>
        <input type="text" name={name} value={value} onChange={handler}/>
    </div>
);

const editArea = (name, value, handler) => (<textarea name={name} onChange={handler} value={value}></textarea>);

//TODO: eventually list linked node titles instead of choice text
const choiceList = (choice) => (<span className="node-editor-link">{choice.choiceText} </span>);

const nodeCard = (node, changeNodeHandler) => 
    (
        <div className="node-card">
            <button onClick={() => changeNodeHandler(node._id)}>Edit</button>
            <p>{node.nodeTitle}</p>
            <p>Links: {node.choices && node.choices.length ? node.choices.map(choice => choiceList(choice)) : "End"}</p>
        </div>
    );

const nodeDisplay = (storyNodes, changeNodeHandler) =>
    (
        <div className="node-display">
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
    //rewrite
    handleChoicesChange = (evnt) => {
        const node = {...this.state.node};
        node[evnt.target.name] = evnt.target.value;
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

    render() {
        return(
            <form onSubmit={this.handleSave}>
                {editArea("storyText", this.state.node.storyText, this.handleChange)}
                {textField("nodeTitle", this.state.node.nodeTitle, this.handleChange)}
                {choiceEditor(this.state.node.choices, this.props.nodeList)}
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
                <NodeEditor currentNode={this.state.currentNode} updateCurrentNode={this.updateCurrentNode} nodeList={this.createNodeList(this.state.storyNodes)} />
                <button onClick={this.createNewNode}>Add Node</button>
                {nodeDisplay(this.state.storyNodes, this.changeCurrentNode)}
            </div>
        );
    }
}