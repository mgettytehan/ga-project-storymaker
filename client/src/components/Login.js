import React, { Component } from 'react';

const login = author => {
    return fetch('/api/authors/login', {
        method: "POST",
        body: JSON.stringify(author),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })
    .then( res => res.status === 200 ? true : false )
    .catch( err => console.log(err) );
}

const register = author => {
    return fetch('/api/authors/register', {
        method: "POST",
        body: JSON.stringify(author),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })
    .then( res => res.status === 200 ? true : false )
    .catch( err => console.log(err) );
}

export default class Login extends Component {
    state = {
        author: {
            username: "",
            password: ""
        },
        login : true
    }

    handleChange = evnt => {
        const author = {...this.state.author};
        author[evnt.target.name] = evnt.target.value;
        this.setState({author});
    }

    //change 'false' to trigger notice that login failed or that register failed
    handleSubmit = evnt => {
        evnt.preventDefault();
        if (this.state.login)
            login(this.state.author).then(
                result => result ? this.props.history.push(`/dash`) : false
            );
        else
            register(this.state.author).then(
                result => result ? this.setState({login: true}) : false
            );
    }

    loginToggle = () => {
        this.setState({login: !this.state.login});
    }

    render() {
        return (
            <div>
                <h3>{ this.state.login ? "Login" : "Sign Up"}</h3>
                <form onSubmit={this.handleSubmit}  className="login-form" >
                    <div>
                        <label>Username:</label><br/>
                        <input type="text" name="username" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Password:</label><br/>
                        <input type="password" name="password" onChange={this.handleChange} />
                    </div>
                    <div><input type="submit" value="Login" /></div>
                </form>
                <p className="link" onClick={this.loginToggle}>{this.state.login ? "Sign Up?" : "Login"}</p>
            </div>
        );
    }
}