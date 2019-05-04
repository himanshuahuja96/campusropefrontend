/**
 *
 * Progress
 *
 */

import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

/* eslint-disable react/prefer-stateless-function */
function CustomProgress() {
  return (
    <div className="progress">
      <LinearProgress variant="query" color="secondary" />
    </div>
  );
}

CustomProgress.propTypes = {};

export default CustomProgress;
