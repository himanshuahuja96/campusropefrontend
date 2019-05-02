/**
 *
 * AssignAdminTask
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAssignAdminTask from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function AssignAdminTask() {
  useInjectReducer({ key: 'assignAdminTask', reducer });
  useInjectSaga({ key: 'assignAdminTask', saga });

  return (
    <div>
      <Helmet>
        <title>AssignAdminTask</title>
        <meta name="description" content="Description of AssignAdminTask" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

AssignAdminTask.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  assignAdminTask: makeSelectAssignAdminTask(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AssignAdminTask);
