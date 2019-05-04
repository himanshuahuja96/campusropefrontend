/**
 *
 * AssignAdminTask
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import classNames from 'classnames';

import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import UserSearch from 'components/UserSearch';
import makeSelectAssignAdminTask from './selectors';
import TaskSummary from './TaskSummary';
import reducer from './reducer';
import saga from './saga';
import {
  fetchAdminTasksOfGivenUser,
  toggleAdminTaskSelection,
  saveAdminTasks,
  clearTasks,
} from './actions';

const useStyles = makeStyles(theme => ({
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  root: {
    margin: theme.spacing.unit * 4,
  },
  taskListRoot: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  taskListItems: {
    border: '1px solid #f6e9de',
    padding: 10,
    minWidth: 220,
    maxWidth: 220,
    marginBottom: theme.spacing.unit * 2,
    '&:hover': {
      border: '1px solid #4478ac',
    },
  },
  selectedItems: {
    background: '#013571',
    '& aside': {
      color: '#fff',
    },
    '& span': {
      color: '#fff',
    },
  },
  textColor: {
    color: 'orange',
  },
}));

function AdminTasks(props) {
  const classes = useStyles();
  const { adminTasks, handleCheckboxChange } = props;
  return adminTasks.map(task => {
    const taskItemClassName = classNames({
      [classes.taskListItems]: true,
      [classes.selectedItems]: task.selected,
    });
    const taskItemTextClassName = classNames({
      [classes.textColor]: task.selected,
    });
    return (
      <div className={taskItemClassName} key={task.id}>
        <Typography
          variant="body2"
          gutterBottom
          className={taskItemTextClassName}
        >
          {task.taskName}
          <Checkbox
            onChange={() => handleCheckboxChange(task.id)}
            checked={task.selected}
            color="primary"
          />
        </Typography>
      </div>
    );
  });
}

export function AssignAdminTask(props) {
  const classes = useStyles();
  const {
    onSelectUser,
    adminTasks,
    clearAdminTasks,
    toggleAdminTasksSelection,
    saveAdminTasksDispatch,
    selectedAdminTasks,
  } = props;
  useInjectReducer({ key: 'assignAdminTask', reducer });
  useInjectSaga({ key: 'assignAdminTask', saga });

  useEffect(() => {
    clearAdminTasks(); // componentDidMount
  }, []);

  function handleCheckboxChange(taskId) {
    toggleAdminTasksSelection(taskId);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paperRoot} elevation={1}>
        <Typography variant="h6" gutterBottom>
          Assign Task
        </Typography>

        <UserSearch onSelectUser={onSelectUser} />

        <Grid container>
          <Grid item xs={12} sm={7} md={9}>
            <div className={classes.taskListRoot}>
              <AdminTasks
                adminTasks={adminTasks}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
          </Grid>

          <Grid item xs={12} sm={5} md={3}>
            <TaskSummary
              handleRemoveTask={handleCheckboxChange}
              tasks={selectedAdminTasks}
              saveAdminTasks={saveAdminTasksDispatch}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

AssignAdminTask.propTypes = {
  onSelectUser: PropTypes.func.isRequired,
  adminTasks: PropTypes.array.isRequired,
  saveAdminTasksDispatch: PropTypes.func.isRequired,
  selectedAdminTasks: PropTypes.array.isRequired,
  toggleAdminTasksSelection: PropTypes.func.isRequired,
  clearAdminTasks: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  assignAdminTask: makeSelectAssignAdminTask(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSelectUser: userId => dispatch(fetchAdminTasksOfGivenUser(userId)),
    toggleAdminTasksSelection: taskId =>
      dispatch(toggleAdminTaskSelection(taskId)),
    saveAdminTasksDispatch: () => dispatch(saveAdminTasks()),
    clearAdminTasks: () => dispatch(clearTasks()),
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
