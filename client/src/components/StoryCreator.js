import React, { Component } from 'react';

export default class StoryCreator extends Component {
    state = {
        story: {},
        storyNodes: {}
    }

    componentWillMount() {
        this.setNewCurrentNode(this.state.story.firstNodeId);
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}