import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { useNavigation } from '@react-navigation/core';
import { NavigationProps } from '../types';
import { ArrowLeftOnRectangleIcon } from 'react-native-heroicons/outline';

const ChatHeader = () => {
	const { user, setUser } = useContext(UserContext);
	const navigation = useNavigation<NavigationProps>();
	const handleLeaveChat = () => {
		setUser({})
		navigation.navigate('Login');
	}

	return (
		<View style={styles.headerContainer}>
			<TouchableOpacity 
				style={styles.leaveButton}
				onPress={handleLeaveChat}
			>
				<ArrowLeftOnRectangleIcon color={'white'} size={24} />
				<Text style={styles.leaveButtonText}>Leave</Text>
			</TouchableOpacity>

			<View style={styles.titleContainer}>
				<Text style={styles.title}>Welcome to the chat</Text>
				<Text style={styles.username}>{user?.username}</Text>
			</View>
		</View>
	)
}

export default ChatHeader

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: '#ff581d',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 10,
		paddingBottom: 20,
	},
	titleContainer: {
		paddingStart: 20,
		borderLeftWidth: 1,
		borderLeftColor: 'white'
	},
	title: {
		fontSize: 20,
		color: 'white'
	},
	username: {
		fontSize: 20,
		fontWeight: '600',
		color: 'white'
	},
	leaveButton: {
		alignItems: 'center',
		marginEnd: 20
	},
	leaveButtonText: {
		marginTop: 3,
		fontSize: 14,
		color: 'white'
	}
})