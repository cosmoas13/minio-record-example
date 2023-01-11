import React, { Fragment, useEffect, useState } from 'react';
import { invokeSaveAsDialog } from 'recordrtc';
import { useRecorderPermission } from './useRecorderPermission';
import animated from '../assets/334778.gif';
import mc from '../mc';

export const Recorder = ({ fileName }) => {
	const [blob, setBlob] = useState(null);
	const recorder = useRecorderPermission('video');

	const startRecording = async () => {
		recorder.startRecording();
	};

	function blobToFile(theBlob, fileName) {
		//A Blob() is almost a File() - it's just missing the two properties below which we will add
		theBlob.lastModifiedDate = new Date();
		theBlob.name = fileName;
		return theBlob;
	}

	const stopRecording = async () => {
		await recorder.stopRecording();
		let blob = await recorder.getBlob();
		console.log(blob, '>>> blob');
		const randomNum = Math.floor(Math.random() * 100000);
		const myFile = blobToFile(blob, `${randomNum}.webm`);
		console.log(myFile, '>>> myfile');
		setBlob(myFile);
		console.log(URL.createObjectURL(myFile), '>>> blob');
	};

	const handleSave = async () => {
		invokeSaveAsDialog(blob);
		console.log(blob, '>>> blob save');
	};

	const uploadFile = () => {
		const file = URL.createObjectURL(blob);
		const objKey = blob.name;
		const metaData = {
			'Content-Type': blob.type,
		};

		console.log(blob, '>>>');

		console.log(file, '>>> test');
		mc.putObject(
			'testbucket',
			objKey,
			file,
			metaData,
			blob.size,
			function (err, objInfo) {
				if (err) {
					return console.log(err);
				}
				console.log('Success', objInfo.etag, objInfo.versionId);
				alert('Success', objInfo.etag, objInfo.versionId);
			}
		);
	};

	return (
		<Fragment>
			<div className='header'>
				<img src={animated} alt='' />
				<p>Recording</p>
			</div>
			<div className='wrapper'>
				<div className='btn'>
					<button onClick={startRecording}> Start Recording</button>
					<button onClick={stopRecording}> Stop Recording</button>
					<button onClick={() => handleSave()}>SAVE</button>
					<button onClick={uploadFile}>Kirim Ke MinIO</button>
					<input type='file' />
				</div>
				<div className='wrap video'>
					{blob && <video src={URL.createObjectURL(blob)} controls autoPlay />}
				</div>
			</div>
		</Fragment>
	);
};
