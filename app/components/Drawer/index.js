/**
 *
 * Drawer
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Drawer() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Drawer.propTypes = {};

export default memo(Drawer);
