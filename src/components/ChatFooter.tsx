import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import UserContext from '../context/UserContext';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';

const ChatFooter = () => {
	const { user } = useContext(UserContext);
	const messagesCollection = collection(db, 'chatty_messages');
	const [message, setMessage] = useState('');

	const handleTyping = (text: string) => {
		setMessage(text);
	}

	const handleSubmit = () => {
		if(message !== '') {
			addDoc(messagesCollection, {
				senderUsername: user?.username,
				senderUserId: user?.id,
				message: message,
				timestamp: serverTimestamp()
			});
		}
		setMessage('');
	}

	return (
		<View style={styles.footerContainer}>
			<TextInput
				style={styles.messageInput}
				onChangeText={(text) => handleTyping(text)}
				value={message}
				placeholder='Add a reply'
				multiline
				maxLength={1000}
			></TextInput>
			<TouchableOpacity 
				style={styles.sendButton}
				onPress={handleSubmit}
			>
				<PaperAirplaneIcon size={24} color={'white'} onPress={handleSubmit} />
			</TouchableOpacity>
		</View>
	)
}

export default ChatFooter

const styles = StyleSheet.create({
	footerContainer: {
		flexDirection: 'row',
		backgroundColor: 'white',
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 20,
		borderTopColor: '#efefef',
		borderTopWidth: 1,
		shadowColor: '#171717',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
	},
	messageInput: {
		flex: 1,
		marginEnd: 20,
		maxHeight: 100,
		backgroundColor: 'white',
    fontSize: 16,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#c4c4c4',
		paddingTop: 15,
		paddingBottom: 15,
		paddingStart: 15,
		paddingEnd: 15
	},
	sendButton: {
		alignSelf: 'center',
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 24,
		backgroundColor: '#ff581d',
	}
})