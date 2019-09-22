import React, { Component } from 'react';

export default class Login extends Component {
    state = {
        author: {
            username: "",
            password: ""
        }
    }

    registerUser = user => {
        fetch('/api/authors', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(
            f => f
            //to fill in
        )
        .catch(err => console.log(err));
    }

    handleChange = evnt => {
        const author = {...this.state.author};
        author[evnt.target.name] = evnt.target.value;
        this.setState({author});
    }

    handleSubmit = () => {

    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={this.handleSubmit}>
                    <label for="username">Username:</label>
                    <input type="text" name="username" onChange={this.handleChange} />
                    <label for="password">Password:</label>
                    <input type="password" name="password" onChange={this.handleChange} />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}