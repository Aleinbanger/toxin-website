import '../styles/global.scss';

import { requireAll } from './utils';

requireAll(require.context('../blocks/', true, /\.js$/));
requireAll(require.context('../pages/', true, /\.js$/));
