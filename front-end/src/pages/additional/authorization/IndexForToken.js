import React, { Component } from 'react';

class Index extends Component {

    state = {
        isAuth: false,
    }

    componentDidMount () {
        if(localStorage.getItem("user_token") !== 'undefined') {
            this.setState({isAuth: true});
        } 
    }

    render() {

        return (
            <div>
                {this.state.isAuth ? (
                    <h1>Person is authorized</h1>
                ) : (
                    <h1>Person is NOT authorized</h1>
                )}
            </div>
        )
    }
}

export default Index;