import React, { memo, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

interface VideoLoopProps {
	videoName: string;
	playbackSpeed?: number;
	blurPixels?: number;
}

export const VideoLoop = memo(({ videoName, playbackSpeed, blurPixels }: VideoLoopProps) => {
	const useStyles = makeStyles((/*theme*/) => ({
		root: {
			position: 'absolute',
			left: 0,
			top: 0,
			minWidth: '100vw',
			minHeight: '100vh',
			overflow: 'hidden',
			pointerEvents: 'none',
		},
		video: {
			position: 'absolute',
			width: '177.77777778vh' /* 100 * 16 / 9 */,
			minWidth: '100vw',
			height: '100vh',
			minHeight: '56.25vw' /* 100 * 9 / 16 */,
		},
	}));
	const classes = useStyles();

	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef && videoRef.current) {
			if (playbackSpeed && playbackSpeed < 1) {
				videoRef.current.playbackRate = playbackSpeed;
			}
			if (blurPixels && blurPixels > 0) {
				videoRef.current.style.filter = `blur(${blurPixels}px`;
			}
		}
	}, []);

	return (
		<Box id="VideoLoop" className={classes.root}>
			<video ref={videoRef} autoPlay={true} loop={true} muted={true} playsInline={true} className={classes.video}>
				<source type="video/mp4" src={`./videos/${videoName}.mp4`} />
			</video>
		</Box>
	);
});
