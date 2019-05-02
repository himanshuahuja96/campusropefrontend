/**
 *
 * AppBar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function AppBar() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

AppBar.propTypes = {};

export default memo(AppBar);
