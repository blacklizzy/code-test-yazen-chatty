import { NavigationProp } from '@react-navigation/core';
import { Timestamp } from 'firebase/firestore';
import { Dispatch, SetStateAction } from "react";

type UserNameType = string;
type UserIdType = string;

export interface UserShape {
	username?: UserNameType;
	id?: UserIdType;
}

export interface UserContextType {
  user: UserShape | undefined;
  setUser: Dispatch<SetStateAction<UserShape | undefined>>;
};

export interface ScreensParamList {
  Login: undefined;
  Chat: undefined;
};

export type NavigationProps = NavigationProp<ScreensParamList>;

export interface MessageShape {
	id: string;
	message: string;
	timestamp: Timestamp;
	senderUserId: UserIdType;
	senderUsername: UserNameType;
}