import React, { memo, useCallback, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box } from '@material-ui/core';
import { AvatarHelper } from '../../services/avatarHelper';
//import ZoomInIcon from '@material-ui/icons/ZoomIn';
//import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import CloseIcon from '@material-ui/icons/Close';

interface AvatarSelectionProps {
	onSelectAvatar: (avatar: number) => void;
}

export const AvatarSelection = memo(({ onSelectAvatar }: AvatarSelectionProps) => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
		},
		actionButton: {
			position: 'absolute',
			left: '50%',
			transform: 'translateX(640px)',
			top: 68,
			width: 32,
			height: 32,
			opacity: 0.7,
			border: '1px solid #666',
			borderRadius: 16,
			backgroundColor: '#222',
			padding: '0 4px',
			textAlign: 'center',
			cursor: 'pointer',
			transition: 'all 0.2s ease-in-out',
			color: '#ccc',
			'&:hover': {
				color: '#fff',
			},
		},
		avatarGrid: {
			position: 'absolute',
			left: '50%',
			transform: 'translateX(-50%)',
			top: 116,
			bottom: 20,
			backgroundColor: 'transparent',
			color: '#fff',
			display: 'grid',
			gridGap: 16,
			borderRadius: '16px',
			overflow: 'auto',
		},
		avatarWrapper: {
			position: 'relative',
			border: '1px solid #333',
			borderRadius: '16px',
			overflow: 'hidden',
			transition: 'all 0.25s ease-in-out',
			filter: 'grayscale(0.2)',
			'&:hover': {
				filter: 'grayscale(0)',
			},
			'&:after': {
				content: 'attr(data-avatar) " "',
				position: 'absolute',
				top: 8,
				left: 8,
				width: 28,
				height: 28,
				border: '1px solid #666',
				borderRadius: '50%',
				backgroundColor: '#111',
				paddingTop: 6,
				color: '#fff',
				fontSize: 11,
				textAlign: 'center',
				opacity: '0.5',
			},
		},
		avatar: {
			cursor: 'pointer',
			userSelect: 'none',
		},
	}));
	const classes = useStyles();

	const [size] = useState(256);
	const [cols] = useState(5);

	const avatars = AvatarHelper.getAllAvatars(true);

	const handleClickAvatar = useCallback(
		(e) => {
			onSelectAvatar(parseInt(e.currentTarget.dataset.avatar));
		},
		[onSelectAvatar],
	);

	const handleClickExit = useCallback(() => {
		onSelectAvatar(-1);
	}, []);

	return (
		<Box id="AvatarSelection" className={classes.root}>
			<CloseIcon onClick={handleClickExit} className={classes.actionButton} titleAccess="Close" />
			<Box className={`${classes.avatarGrid} no-scrollbar`} style={{ gridTemplateColumns: `repeat(${cols}, ${size}px)`, gridTemplateRows: `${size}px` }}>
				{avatars.map((avatar) => (
					<Box key={avatar} data-avatar={avatar} onClick={handleClickAvatar} className={classes.avatarWrapper} style={{ height: `${size}px` }}>
						<img src={AvatarHelper.getAvatarFilePath(avatar)} className={classes.avatar} style={{ width: `${size}px`, height: `${size}px` }} />
					</Box>
				))}
			</Box>
		</Box>
	);
});
