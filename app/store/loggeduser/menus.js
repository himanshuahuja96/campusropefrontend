import React from 'react';
import AccountBalance from '@material-ui/icons/AccountBalanceRounded';
import Gavel from '@material-ui/icons/Gavel';
import SettingsPhone from '@material-ui/icons/SettingsPhone';
import InfoOutline from '@material-ui/icons/InfoOutlined';
import SentimentSatisfiedAlt from '@material-ui/icons/SentimentSatisfiedAlt';
import Assessment from '@material-ui/icons/Assessment';
import Title from '@material-ui/icons/Title';
import { push } from 'connected-react-router';
import { logOut } from '../../containers/Login/actions';

export const userDrawerMenus = [
  {
    id: 1,
    iconName: 'home',
    menuLabel: 'Home',
    subMenus: [],
  },
  {
    id: 2,
    iconName: 'message',
    menuLabel: 'Messages',
    subMenus: [],
  },
  {
    id: 3,
    iconName: 'assignment',
    menuLabel: 'My Admin Tasks',
    trigger: dispatch => dispatch(push('/my/admintasks')),
    subMenus: [],
  },
  {
    id: 4,
    iconName: 'insert_invitation',
    menuLabel: 'Invite Friends',
    subMenus: [],
  },
  {
    id: 5,
    iconName: 'perm_identity',
    menuLabel: 'Friend Suggestions',
    subMenus: [],
  },
  {
    id: 6,
    iconName: 'settings',
    menuLabel: 'Settings',
    subMenus: [],
  },
  {
    id: 7,
    iconName: 'feedback',
    menuLabel: 'Suggestions and Feedback',
    subMenus: [],
  },
  {
    id: 8,
    iconName: 'help',
    menuLabel: 'Help',
    subMenus: [],
  },
  {
    id: 9,
    iconName: 'person',
    menuLabel: 'Log Out',
    trigger: dispatch => dispatch(logOut()),
    subMenus: [],
  },
];

export const adminDrawerMenus = [
  {
    id: 1,
    iconName: 'home',
    menuLabel: 'Home',
  },
  {
    id: 2,
    iconName: 'message',
    menuLabel: 'Messages',
  },
  {
    id: 4,
    iconName: 'insert_invitation',
    menuLabel: 'Invite Friends',
  },
  {
    id: 5,
    iconName: 'perm_identity',
    menuLabel: 'Friend Suggestions',
  },
  {
    id: 6,
    iconName: 'settings',
    menuLabel: 'Settings',
  },
  {
    id: 7,
    iconName: 'feedback',
    menuLabel: 'Suggestions and Feedback',
  },
  {
    id: 8,
    iconName: 'help',
    menuLabel: 'Help',
  },
  {
    id: 9,
    iconName: 'person',
    menuLabel: 'Log Out',
    trigger: dispatch => dispatch(logOut()),
  },
];

export const userHomeMenus = [
  {
    title: 'NGOs',
    iconBgColor: '#FF6D00',
    icon: <AccountBalance />,
    linkTo: '/ngos',
  },
  {
    title: 'Helpline',
    iconBgColor: '#D81B60',
    icon: <SettingsPhone />,
    linkTo: '/helpline',
  },
  {
    title: 'About Us',
    iconBgColor: '#006064',
    icon: <InfoOutline />,
    linkTo: '/about',
  },
];

export const adminHomeMenus = [
  {
    title: 'NGOs',
    iconBgColor: '#FF6D00',
    icon: <AccountBalance />,
    linkTo: '/ngos',
  },
  {
    title: 'Helpline',
    iconBgColor: '#D81B60',
    icon: <SettingsPhone />,
    linkTo: '/helpline',
  },
  {
    title: 'Support',
    iconBgColor: '#3F51B5',
    icon: <Gavel />,
    linkTo: '/support',
  },
  {
    title: 'About Us',
    iconBgColor: '#006064',
    icon: <SentimentSatisfiedAlt />,
    linkTo: '/about',
  },
  {
    title: 'Assign Admin tasks',
    iconBgColor: '#006064',
    icon: <Assessment />,
    linkTo: '/admin/task/assignment',
  },
  {
    title: 'NGO verification',
    iconBgColor: '#006064',
    icon: <InfoOutline />,
    linkTo: '/ngos/verification',
  },
  {
    title: 'Admin Trends',
    iconBgColor: '#006064',
    icon: <Title />,
    linkTo: '/news/trends/admin/',
  },

  {
    title: 'Admin Helpline',
    iconBgColor: '#006064',
    icon: <SettingsPhone />,
    linkTo: '/helpline/admin',
  },
];
