/**
 *
 * FormComponents
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function FormComponents() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

FormComponents.propTypes = {};

export default memo(FormComponents);
