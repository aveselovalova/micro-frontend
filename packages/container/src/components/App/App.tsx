import * as React from 'react';
import * as ReactDOM from 'react-dom';

import styles from './App.css';
// @ts-ignore
const ChildApp = React.lazy(() => import("module/App"));

const App = () => (
	<div className={styles.container}>
		<h1>Container App</h1>
		<React.Suspense fallback="Loading Child App">
			<ChildApp />
		</React.Suspense>
	</div>
);

export default App;
