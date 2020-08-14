import React, { Fragment, useState } from 'react';

import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClear, clearUsers, searchAlert }) => {
    const [text, setText] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        if (text === '') {
            searchAlert('Please enter someting', 'light');
        } else {
            searchUsers(text);
            setText('');
        }
    };

    return (
        <Fragment>
            <form className="form" onSubmit={onSubmit}>
                <input
                    type="text"
                    name="text"
                    onChange={e => setText(e.target.value)}
                    value={text}
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
        </Fragment>
    );
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    searchAlert: PropTypes.func.isRequired,
};

export default Search;
