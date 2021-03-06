import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box/Box';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import { CodePenInfo, CodePenInfoHelper } from '../../services/codePenInfo';
import Modal from '@material-ui/core/Modal';
import { AvatarSelection } from './AvatarSelection';
import { AvatarHelper } from '../../services/avatarHelper';
import { TextHelper } from '../../services/textHelper';
import { LocalStorageHelper } from '../../services/localStorageHelper';

interface GridItemProps {
	index: number;
	cpi: CodePenInfo;
	height: number;
	showCode: boolean;
}

export const GridItem = memo(({ index, cpi, height, showCode }: GridItemProps) => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
		},
		avatar: {
			position: 'absolute',
			left: 2,
			top: 2,
			width: 49,
			height: 49,
			border: '1px solid #333',
			borderRadius: '0 50% 50% 0',
			cursor: 'pointer',
			zIndex: 1,
			transition: 'all 0.4s ease-in-out',
			'&:hover': {
				width: 160,
				height: 160,
				borderRadius: '0 50% 50% 50%',
			},
		},
		opacityWrapper: {
			height: '100%',
			opacity: 0.7,
		},
		jsContainer: {
			position: 'absolute',
			width: '100%',
			height: '100%',
		},
		blurCode: {
			filter: 'blur(3px)',
		},
		resultContainer: {
			position: 'absolute',
			width: '100%',
			height: '100%',
		},
		gridItemHeader: {
			position: 'absolute',
			left: 2,
			right: 2,
			top: 2,
			height: 49,
			display: 'flex',
			alignItems: 'center',
			backgroundColor: '#222',
			padding: '0 8px 0 0',
		},
		codePenTitle: {
			flex: '1 1 auto',
			fontSize: 13,
			fontWeight: 700,
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			marginLeft: 60,
			color: '#ccc',
		},
		actionButton: {
			flex: '0 0 24px',
			marginLeft: 4,
			cursor: 'pointer',
			transition: 'all 0.2s ease-in-out',
			color: '#ccc',
			'&:hover': {
				color: '#fff',
			},
		},
		gridItemFooter: {
			position: 'absolute',
			left: 2,
			right: 2,
			bottom: 4,
			height: 29,
			backgroundColor: '#222',
		},
		avatarSelectionModal: {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
		},
	}));
	const classes = useStyles();

	const [blurCode, setBlurCode] = useState<boolean>(true);
	const [avatarSelection, setAvatarSelection] = useState<boolean>(false);
	const itemRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);

	const cpUser = CodePenInfoHelper.getCodePenUser(cpi);
	const cpId = CodePenInfoHelper.getCodePenId(cpi);
	const cpAvatar = CodePenInfoHelper.getCodePenAvatar(cpi);
	const cpTitle = CodePenInfoHelper.getCodePenTitle(cpi);
	const cpColor = CodePenInfoHelper.getCodePenColor(cpi);

	useEffect(() => {
		if (!itemRef.current) {
			return;
		}
		const iFrames = itemRef.current.querySelectorAll('iframe');
		iFrames.forEach((iFrame) => {
			iFrame.setAttribute('height', height.toString());
			iFrame.setAttribute('src', iFrame.getAttribute('src') || '');
		});
	}, [height]);

	const handleClickBlur = useCallback(() => {
		setBlurCode((val) => !val);
	}, []);

	const handleClickRefresh = useCallback(() => {
		if (!itemRef.current) {
			return;
		}
		const iFrames = itemRef.current.querySelectorAll('iframe');
		iFrames.forEach((iFrame) => {
			iFrame.setAttribute('src', iFrame.getAttribute('src') || '');
		});
	}, []);

	const handleNavigateToCodePen = useCallback(() => {
		window.open(cpi.url, '_blank');
	}, []);

	const handleClickAvatar = useCallback(() => {
		const elm = document.getElementById('root');
		if (elm) {
			elm.style.filter = 'blur(4px)';
		}
		setAvatarSelection(true);
	}, []);

	const handleCloseAvatarSelection = useCallback(() => {
		setAvatarSelection(false);
		const elm = document.getElementById('root');
		if (elm) {
			elm.style.filter = 'none';
		}
	}, []);

	const handleSelectAvatar = useCallback((newAvatar) => {
		setAvatarSelection(false);
		const elm = document.getElementById('root');
		if (elm) {
			elm.style.filter = 'none';
		}
		if (newAvatar === -1) {
			return;
		}
		if (imageRef.current) {
			imageRef.current.src = AvatarHelper.getAvatarFilePath(newAvatar);
		}
		LocalStorageHelper.updateCodePenAvatar(index, newAvatar);
	}, []);

	return (
		<div id="GridItem" ref={itemRef} className={`${classes.root} grid-item-${index}`} style={{ height: height + 2 }}>
			<img ref={imageRef} src={AvatarHelper.getAvatarFilePath(cpAvatar)} onClick={handleClickAvatar} className={classes.avatar} />
			<Box className={classes.opacityWrapper}>
				<Box
					id="js-container"
					className={`${classes.jsContainer} ${blurCode ? classes.blurCode : ''}`}
					style={{ display: showCode ? 'block' : 'none' }}
				>
					<Box
						className="codepen"
						data-height={height}
						data-theme-id="dark"
						data-default-tab="js"
						data-user={cpUser}
						data-pen-title={cpId}
						data-slug-hash={cpId}
					/>
				</Box>
				<Box id="result-container" className={classes.resultContainer} style={{ display: showCode ? 'none' : 'block' }}>
					<p
						className="codepen"
						data-height={height}
						data-theme-id="dark"
						data-default-tab="result"
						data-user={cpUser}
						data-pen-title={cpId}
						data-slug-hash={cpId}
					/>
				</Box>
				<Box className={classes.gridItemHeader}>
					<Box className={classes.codePenTitle} style={{ color: cpColor }} title={cpTitle}>
						{TextHelper.hack(cpTitle, true, '_')}
					</Box>
					{showCode && blurCode && <VisibilityOutlinedIcon onClick={handleClickBlur} className={classes.actionButton} titleAccess="Reveal code" />}
					{showCode && !blurCode && <VisibilityOffOutlinedIcon onClick={handleClickBlur} className={classes.actionButton} titleAccess="Blur code" />}
					<RefreshIcon onClick={handleClickRefresh} className={classes.actionButton} titleAccess="Refresh frame" />
					<OpenInNewIcon onClick={handleNavigateToCodePen} className={classes.actionButton} titleAccess="Open in CodePen" />
				</Box>
				<Box className={classes.gridItemFooter} />
				<Modal open={avatarSelection} onClose={handleCloseAvatarSelection} className={classes.avatarSelectionModal}>
					<Box>
						<AvatarSelection onSelectAvatar={handleSelectAvatar} />
					</Box>
				</Modal>
			</Box>
		</div>
	);
});
