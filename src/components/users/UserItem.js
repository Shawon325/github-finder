import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
    return (
        <div className="card text-center">
            <img
                src={avatar_url}
                alt=""
                className="round-image"
                style={{ width: '60px' }}
            />
            <h3>{login}</h3>
            <div>
                <Link
                    to={`/user/${login}`}
                    className="btn btn-dark btn-sm my-1">
                    More
                </Link>
            </div>
        </div>
    );
};

UserItem.prototype = {
    user: PropTypes.object.isRequired,
};

export default UserItem;
