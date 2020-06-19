/* eslint-disable import/no-unresolved */

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './jquery';
import './icons';
import { requireAll } from './utils';

import '../styles/global.scss';

requireAll(require.context('../blocks/', true, /\.js$/));
requireAll(require.context('../pages/', true, /\.js$/));
