import React, { memo, useCallback } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box } from '@material-ui/core';
import { AvatarHelper } from '../../services/avatarHelper';
import CloseIcon from '@material-ui/icons/Close';

interface AvatarSelectionProps {
	onSelectAvatar: (avatar: string) => void;
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
			bottom: 16,
			backgroundColor: 'transparent',
			color: '#fff',
			display: 'grid',
			gridTemplateColumns: 'repeat(5, 256px)',
			gridGap: '8px 16px',
			overflow: 'auto',
		},
		avatarWrapper: {
			position: 'relative',
			'&:after': {
				content: 'attr(data-avatar) " "',
				position: 'absolute',
				left: 1,
				right: 1,
				bottom: 7,
				height: 17,
				backgroundColor: '#111',
				borderRadius: '0 0 8px 8px',
				opacity: '0.5',
				color: '#fff',
				fontSize: 14,
				textAlign: 'center',
			},
		},
		avatar: {
			height: 256,
			width: 256,
			cursor: 'pointer',
			userSelect: 'none',
			borderRadius: '8px',
			border: '1px solid #333',
		},
	}));
	const classes = useStyles();

	const avatars = AvatarHelper.getAllAvatars(true);

	const handleClickAvatar = useCallback(
		(e) => {
			onSelectAvatar(e.currentTarget.dataset.avatar);
		},
		[onSelectAvatar],
	);

	const handleClickExit = useCallback(() => {
		onSelectAvatar('');
	}, []);

	return (
		<Box id="AvatarSelection" className={classes.root}>
			<CloseIcon onClick={handleClickExit} className={classes.actionButton} titleAccess="Close" />
			<Box className={`${classes.avatarGrid} no-scrollbar`}>
				{avatars.map((avatar) => (
					<Box key={avatar}>
						<Box data-avatar={avatar.substring(1)} className={classes.avatarWrapper}>
							<img src={`/img/avatars/${avatar}.jpg`} data-avatar={avatar} onClick={handleClickAvatar} className={classes.avatar} />
						</Box>
					</Box>
				))}
			</Box>
		</Box>
	);
});
