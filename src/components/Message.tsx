import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useContext } from 'react'
import UserContext from '../context/UserContext';

interface MessageProps {
	sender: string,
	message: string
}

const Message = ({sender, message}: MessageProps) => {
	const { user } = useContext(UserContext);
	const isMyMessage = sender === user?.username;

	return (
		<View style={[styles.messageContainer, isMyMessage ? styles.myMessage: {}]}>
			{ !isMyMessage ? <Text style={styles.sender}>{sender ? sender : 'Missing sender'}</Text> : null }
			<View style={[styles.messageBubble, isMyMessage ? styles.myMessageBubble: {}]}>
				<Text style={[styles.messageText, isMyMessage ? styles.myMessageText: {}]}>{message && message}</Text>
			</View>
		</View>
	)
}

export default Message

const styles = StyleSheet.create({
	messageContainer: {
		alignSelf: 'flex-start',
		alignItems: 'flex-start',
		marginStart: 20,
		marginEnd: '30%',
	},
	myMessage: {
		alignSelf: 'flex-end',
		marginStart: '30%',
		marginEnd: 20,
	},
	sender: {
		fontWeight: '500',
		fontSize: 14,
		marginBottom: 5,
		color: '#818080'
	},
	messageBubble: {
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 20,
		backgroundColor: '#fee9e2',
	},
	myMessageBubble: {
		backgroundColor: '#cde6c6',
	},
	messageText: {
		fontSize: 16,
		lineHeight: 23,
		color: '#141414',
	},
	myMessageText: {
		color: '#141414',
		fontSize: 16,
	},
})