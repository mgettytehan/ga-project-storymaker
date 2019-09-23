import React, { Component } from 'react';

const login = author => {
    return fetch('/api/authors/login', {
        method: "POST",
        body: JSON.stringify(author),
        headers: { 'Content-Type': 'application/json' }
    })
    .then( res => res.status === 200 ? true : false )
    .catch( err => console.log(err) );
}

const registerUser = author => {
    fetch('/api/authors', {
        method: 'POST',
        body: JSON.stringify(author),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })
    .then(
        f => f
        //to fill in
    )
    .catch(err => console.log(err));
}

export default class Login extends Component {
    state = {
        author: {
            username: "",
            password: ""
        }
    }

    handleChange = evnt => {
        const author = {...this.state.author};
        author[evnt.target.name] = evnt.target.value;
        this.setState({author});
    }

    //change 'false' to trigger notice that login failed
    handleSubmit = evnt => {
        evnt.preventDefault();
        login(this.state.author).then(
            result => result ? this.props.history.push(`/dash`) : false
        );
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