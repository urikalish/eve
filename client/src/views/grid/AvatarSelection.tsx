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
			top: 120,
			bottom: 120,
			backgroundColor: '#222',
			color: '#fff',
			display: 'grid',
			gridTemplateColumns: 'repeat(5, 256px)',
			gridGap: 0,
			overflow: 'auto',
		},
		avatar: {
			height: 256,
			width: 256,
			cursor: 'pointer',
			userSelect: 'none',
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
				<img src={`/img/avatars/${avatar}.jpg`} key={avatar} data-avatar={avatar} onClick={handleClickAvatar} className={classes.avatar} />
			))}
		</Box>
	);
});
