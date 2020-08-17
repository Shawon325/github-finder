import React, { Fragment, useContext, useState } from 'react';

import GithubContext from '../../context/github/githubContext';
import PropTypes from 'prop-types';

const Search = ({ searchAlert }) => {
    const githubContext = useContext(GithubContext);
    const [text, setText] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        if (text === '') {
            searchAlert('Please enter someting', 'light');
        } else {
            githubContext.searchUsers(text);
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
            {githubContext.users.length > 0 && (
                <button
                    className="btn btn-light btn-block"
                    onClick={githubContext.clearUsers}>
                    Clear
                </button>
            )}
        </Fragment>
    );
};

Search.propTypes = {
    searchAlert: PropTypes.func.isRequired,
};

export default Search;
