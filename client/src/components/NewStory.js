import React, { Component } from 'react';


export default class NewStory extends Component {
    state = {
        title: ""
    }
    render() {
        return (<form>
            <label>Story title:</label>
            <input type="text" />
            <input type="submit" />
        </form>)
    }
}