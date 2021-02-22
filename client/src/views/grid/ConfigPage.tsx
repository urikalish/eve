import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Box from '@material-ui/core/Box/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SaveIcon from '@material-ui/icons/Save';
import { TextField } from '@material-ui/core';

function checkJson(jsonStr: string) {
	try {
		JSON.parse(jsonStr);
		return true;
	} catch (e) {
		return false;
	}
}

export const ConfigPage = memo(() => {
	const useStyles = makeStyles(() => ({
		root: {
			position: 'relative',
			height: '100%',
			display: 'grid',
			justifyContent: 'center',
			alignContent: 'center',
			gridTemplateColumns: 'auto',
			gridTemplateRows: '30px auto',
			gridRowGap: 16,
			userSelect: 'none',
		},
		form: {},
		configJson: {
			width: 600,
			'& label.Mui-focused': {
				color: '#fff',
			},
			'& .MuiFilledInput-underline:after': {
				borderBottomColor: '#fff',
			},
		},
		actionButtons: {
			display: 'flex',
		},
		actionButton: {
			marginRight: 16,
			width: 100,
			textTransform: 'none',
		},
	}));
	const classes = useStyles();

	const gridConfigJson = JSON.stringify(
		{
			id: '123',
			name: 'myGrid',
			codePens: [
				{
					url: 'https://codepen.io/urikalish/pen/yLVeGzq',
					title: 'gr33n_hack3r',
				},
				{
					url: 'https://codepen.io/urikalish/pen/ZEBGVVY',
					title: 'r3d_hack3r',
				},
			],
		},
		null,
		2,
	);

	const configFieldRef = useRef(null);
	const [configStr, setConfigStr] = useState<string>(gridConfigJson);
	const [configOK, setConfigOK] = useState<boolean>(true);
	const history = useHistory();

	useEffect(() => {
		setConfigOK(checkJson(configStr));
	}, [configStr]);

	const handleConfigChange = useCallback((e) => {
		setConfigStr(e.currentTarget.value);
	}, []);

	const handleClickSave = useCallback(() => {
		history.push('/grid/123');
	}, []);

	const handleClickLaunch = useCallback(() => {
		history.push('/grid/123');
	}, []);

	return (
		<Box id="ConfigPage" className={classes.root}>
			<Box className={classes.actionButtons}>
				<Button
					disabled={!configOK}
					onClick={handleClickSave}
					variant="contained"
					size="small"
					startIcon={<SaveIcon />}
					className={classes.actionButton}
				>
					Save
				</Button>
				<Button
					disabled={!configOK}
					onClick={handleClickLaunch}
					variant="contained"
					size="small"
					startIcon={<PlayCircleOutlineIcon />}
					className={classes.actionButton}
				>
					Launch
				</Button>
			</Box>
			<form className={classes.form} noValidate autoComplete="off">
				<TextField
					value={configStr}
					onChange={handleConfigChange}
					id="config-field"
					ref={configFieldRef}
					label=""
					multiline
					rows={30}
					defaultValue={gridConfigJson}
					variant="filled"
					color="secondary"
					className={`${classes.configJson} grid-config ${configOK ? '' : 'error-color'}`}
				/>
			</form>
		</Box>
	);
});
