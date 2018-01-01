import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
let colors = [];
let correctColor = '';

generateColorsAndSetCorrectColor();

class Header extends Component {
	state = { colors, finalColor: correctColor, isGameOver: false };

	reGenerateColorsAndSetCorrectColor() {
		generateColorsAndSetCorrectColor();
		this.setState({ colors, finalColor: correctColor, isGameOver: false });
	}

	renderColorBlocks() {
		return this.state.colors.map((color, index) => {
			return (
				<TouchableOpacity 
					key={index}
					style={[styles.blocks, { backgroundColor: color }]} 
					onPress={() => this.renderGameOver(color)}
				/>);
		});
	}

	renderGameOver(finalColor) {
		if (finalColor === this.state.finalColor) {
			colors = colors.map(() => finalColor);
			this.setState({ colors, isGameOver: true });
		}
	}

	renderGameOverText() {
		if (this.state.isGameOver) {
			return (
				<Text style={{ marginRight: 40 }}>Game Over!</Text>
			);		
		}
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={[styles.header, this.state.isGameOver ? { backgroundColor: this.state.finalColor } : {} ]}>
					<Text style={styles.texts}>RGB Color</Text>
					<Text style={styles.correctColor}>{correctColor}</Text>
					<Text style={styles.texts}>Guessing Game</Text>
				</View>

				<View style={styles.navbar}>
					<TouchableOpacity 
						style={styles.navbarTexts}
						onPress={() => this.reGenerateColorsAndSetCorrectColor()}
					>
						<Text style={{ color: '#fff', textAlign: 'center' }}>
							Change colors
						</Text>
					</TouchableOpacity>
					{this.renderGameOverText()}
				</View>

				<View style={styles.body}>
					{this.renderColorBlocks()}
				</View>
			</View>
		);
	}
}

const styles = {
	header: {
		paddingTop: 30,
		flex: 0.27,
		backgroundColor: 'steelblue',
		alignItems: 'center'
	},
	texts: {
		fontSize: 24,
		color: 'rgb(255, 255, 255)'
	},
	correctColor: {
		fontSize: 44,
		color: '#fff'
	},
	navbar: {
		flex: 0.05,
		flexWrap: 'wrap',
		flexDirection: 'row',
		backgroundColor: '#fff',
		justifyContent: 'space-between'
	},
	navbarTexts: {
		width: SCREEN_WIDTH / 3,
		backgroundColor: 'steelblue',
		marginLeft: 20
	},
	body: {
		width: SCREEN_WIDTH - 28,
		flex: 0.68,
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		marginTop: 25
	},
	blocks: {
		width: 100,
		backgroundColor: '#fff',
		height: 100,
		marginBottom: 10,
		borderRadius: 15
	}
};

function generateColorsAndSetCorrectColor() {
	colors = [1, 2, 3, 4, 5, 6].map(() => {
		return randomColor();
	});

	const k = Math.floor(Math.random() * 6);
	correctColor = colors[k];
}

function randomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	return `rgb(${r}, ${g}, ${b})`;
}

export default Header;
