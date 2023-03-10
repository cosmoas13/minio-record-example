import React from 'react';
import history from './history';
import { Router, Route, Switch } from 'react-router';
import ModalContainer from 'react-modal-promise';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListBuckets from './ListBuckets';
import ListObjects from './ListObjects';
import { Recorder } from './record/Recorder';
const helpers = require('minio/dist/main/helpers');
const { getVersionId, isArray } = helpers;

console.log('Is array::', isArray([]));
console.log('Is getVersionId array::', getVersionId(''));

export default function App() {
	return (
		<div className='h-screen w-screen p-5 d-flex'>
			<Router history={history}>
				<Switch>
					<Route exact path={['/', 'home']} component={Recorder} />
					<Route
						exact
						path={['/list-bucket', 'list-buckets']}
						component={ListBuckets}
					/>
					<Route
						exact
						path={['/list-objects/:bucketName']}
						component={ListObjects}
					/>
				</Switch>
			</Router>
			<ModalContainer />
			<ToastContainer />
		</div>
	);
}
