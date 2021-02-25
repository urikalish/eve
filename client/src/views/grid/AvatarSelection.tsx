import React, { memo, useCallback } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Box } from '@material-ui/core';
import { AvatarHelper } from '../../services/avatarHelper';

interface AvatarSelectionProps {
	onSelectAvatar: (avatar: string) => void;
}

export const AvatarSelection = memo(({ onSelectAvatar }: AvatarSelectionProps) => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'absolute',
			left: '50%',
			transform: 'translateX(-50%)',
			top: 116,
			bottom: 16,
			backgroundColor: 'transparent',
			color: '#fff',
			display: 'grid',
			gridTemplateColumns: 'repeat(5, 256px)',
			gridGap: 16,
			overflow: 'auto',
		},
		avatar: {
			height: 256,
			width: 256,
			cursor: 'pointer',
			userSelect: 'none',
			borderRadius: '16px',
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

	return (
		<Box id="AvatarSelection" className={`${classes.root} no-scrollbar`}>
			{avatars.map((avatar) => (
				<img
					src={`/img/avatars/${avatar}.jpg`}
					key={avatar}
					data-avatar={avatar}
					onClick={handleClickAvatar}
					className={classes.avatar}
					title={avatar}
				/>
			))}
		</Box>
	);
});
