import React, { useState, useContext, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Platform, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import UserContext from '../context/UserContext';
import { NavigationProps } from '../types';
import { ChatBubbleLeftRightIcon } from 'react-native-heroicons/solid';
import { getUser } from '../services/apiServices';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const { user, setUser } = useContext(UserContext);

  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    setUsername(user?.username || '');
  }, [user]);

  const handleSignIn = async () => {
		if(username !== '') {

			setLoading(true);
			
			const newUser = await getUser(username);
			setUser(newUser);
			
			navigation.navigate('Chat');
			setLoading(false);
		}
  };

  const handleChange = (text: string) => {
    setUsername(text);
  };

  return (
		<KeyboardAvoidingView 
			style={styles.container} 
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
		<SafeAreaView style={styles.safeTop} />
		<SafeAreaView style={styles.safeBottom}>
			<View style={styles.innerContainer}>
				<View style={styles.inputContainer}>
					<View style={styles.logoContainer}>
						<ChatBubbleLeftRightIcon size={64} fill={'#ff581e'} />
						<Text style={styles.logoText}>Chatty</Text>
					</View>
					<Text style={styles.inputLabel}>Display Name</Text>
					<TextInput
						placeholder='Enter your display name'
						onChangeText={(text) => handleChange(text)}
						value={username}
						style={styles.input}
						maxLength={30}
						onSubmitEditing={handleSignIn}
						/>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity onPress={handleSignIn} style={styles.button} disabled={loading}>
						<Text style={styles.buttonLabel}>Start the Chat</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
	safeTop: {
		flex: 0,
		backgroundColor: 'white'
	},
	safeBottom: {
		flex: 1,
		backgroundColor: 'white',
	},
  container: {
    flex: 1,
    
		backgroundColor: 'white'
  },
	innerContainer: {
		flex: 1,
		justifyContent: 'center',
    alignItems: 'center',
		paddingStart: '10%',
		paddingEnd: '10%',
	},
  inputContainer: {
    width: '100%',
  },
	inputLabel: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 10,
	},
  input: {
    backgroundColor: 'white',
    fontSize: 16,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#c4c4c4',
		paddingHorizontal: 20,
		paddingVertical: 15,
  },
  buttonContainer: {
    marginTop: 30,
  },
  button: {
    backgroundColor: '#ff581e',
    paddingHorizontal: 25,
    paddingVertical: 10,
		borderRadius: 10,
    alignItems: 'center',
  },
  buttonLabel: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
	logoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 60,
		marginTop: -150,
	},
	logoText: {
		fontSize: 28,
		marginTop: 10,
		fontWeight: '300',
		color: '#626262'
	},
});
