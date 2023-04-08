import { View, Text, StyleSheet, KeyboardAvoidingView, SafeAreaView, FlatList, Platform } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatFooter from '../components/ChatFooter';
import Message from '../components/Message';
import UserContext from '../context/UserContext';
import { useNavigation } from '@react-navigation/core';
import { NavigationProps, MessageShape } from '../types';
import { getMessages } from '../services/apiServices';

const MessageSeperator: React.FC = () => (
  <View style={styles.messageSeparator}></View>
);

const NoMessages: React.FC = () => {
	return (
		<View style={styles.noMessages}>
			<Text style={styles.noMessagesText}>There are no messages here yet. Feel free to write something to get the conversation started.</Text>
		</View>
	)
}

const ChatScreen: React.FC = () => {
  const { user } = useContext(UserContext);
  const [ messages, setMessages ] = useState<MessageShape[]>([]);
	const [ messagesPerLoad, setMessagesPerLoad ] = useState<number>(25);

  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    if (!user?.id) {
      navigation.navigate('Login');
    } else {
			getMessages(messagesPerLoad, setMessages, setMessagesPerLoad);
    }
  }, []);

  return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			style={styles.container}
		>
			<SafeAreaView style={styles.safeTop} />
			<SafeAreaView style={styles.safeBottom}>
      
        <View style={styles.container}>
          <ChatHeader />
          <View style={styles.listWrapper}>
						{messages.length < 1 ? 
							<NoMessages /> 
							:
							<FlatList
							inverted={true}
							style={styles.messageArea}
							data={messages}
							renderItem={(item) => (
								<Message sender={item.item.senderUsername} message={item.item.message} />
								)}
								keyExtractor={(item) => item.id}
								ItemSeparatorComponent={MessageSeperator}
								onEndReached={() => getMessages(messagesPerLoad, setMessages, setMessagesPerLoad)}
								onEndReachedThreshold={0.01}
								/>
						}
          </View>
          <ChatFooter />
        </View>
			</SafeAreaView>
		</KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
	safeTop: {
		flex: 0,
		backgroundColor: '#ff581d'
	},
	safeBottom: {
		flex: 1,
		backgroundColor: 'white',
	},
	container: {
		flex: 1,
		backgroundColor: 'white',

	},
	noMessages: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingStart: 40,
		paddingEnd: 40,
	},
	noMessagesText: {
		fontSize: 16,
		lineHeight: 23
	},
	messageArea: {
	},
	listWrapper: {
		flex: 1,
		paddingBottom: 20,
		backgroundColor: 'white',
	},
	messageSeparator: {
		height: 30,
	}
})