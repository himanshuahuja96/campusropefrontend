/**
 *
 * UserSearch
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';

import Search from 'components/Search/Loadable';

import { searchUser } from './api';

const RootComponent = Styled.div`
    flex-grow: 1;
    margin-bottom: '20px';
`;

function UserSearch(props) {
  const users = [];
  const [selectedUser, setSelectedUser] = useState(null);
  const { onSelectUser } = props;

  function handleChange(selected) {
    setSelectedUser(selected);
    if (selected.value) {
      onSelectUser(selected.value);
    }
  }

  function createOptions(userList) {
    return userList.map(user => ({
      label: user.name,
      // eslint-disable-next-line no-underscore-dangle
      value: user._id,
    }));
  }

  function loadOptions(inputValue, callback) {
    // eslint-disable-next-line no-shadow
    searchUser(inputValue).then(users => callback(createOptions(users)));
  }

  return (
    <RootComponent>
      <NoSsr>
        <Search
          options={users}
          value={selectedUser}
          loadOptions={loadOptions}
          onChange={handleChange}
          placeholder="Search for a user by typing name"
        />
      </NoSsr>
    </RootComponent>
  );
}

UserSearch.propTypes = {
  onSelectUser: PropTypes.func,
};

export default memo(UserSearch);
