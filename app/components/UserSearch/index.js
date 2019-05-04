/**
 *
 * UserSearch
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function UserSearch() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

UserSearch.propTypes = {};

export default memo(UserSearch);
