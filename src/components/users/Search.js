import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default class Search extends Component {
    state = {
        text: '',
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        searchAlert: PropTypes.func.isRequired,
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        if (this.state.text === '') {
            this.props.searchAlert('Please enter someting', 'light');
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: '' });
        }
    };

    render() {
        const { showClear, clearUsers } = this.props;
        return (
            <div>
                <form className="form" onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        name="text"
                        onChange={this.onChange}
                        value={this.state.text}
                        placeholder="Search users..."
                    />
                    <input
                        type="submit"
                        value="Search"
                        className="btn btn-dark btn-block"
                    />
                </form>
                {showClear && (
                    <button
                        className="btn btn-light btn-block"
                        onClick={clearUsers}>
                        Clear
                    </button>
                )}
            </div>
        );
    }
}
