import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Categories extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Categories Component</div>

                            <div className="card-body">I'm an example component!</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


if (document.getElementById('categories')) {
    ReactDOM.render(<Categories />, document.getElementById('categories'));
}
