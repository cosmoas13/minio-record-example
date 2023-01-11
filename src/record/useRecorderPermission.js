import { useState, useEffect } from 'react';
import { RecordRTCPromisesHandler } from 'recordrtc';

export const useRecorderPermission = (recordingType) => {
	const [recorder, setRecorder] = useState();

	useEffect(() => {
		getPermissionInitializeRecorder();
	}, []);

	const getPermissionInitializeRecorder = async () => {
		let stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: false,
		});
		let recorder = new RecordRTCPromisesHandler(stream, {
			type: recordingType,
			mimeType: 'video/webm',
		});
		setRecorder(recorder);
	};

	return recorder;
};
