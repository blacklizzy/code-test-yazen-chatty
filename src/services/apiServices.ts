import { collection, onSnapshot, query, orderBy, limit, DocumentData, where, getDocs, addDoc } from 'firebase/firestore';
import { MessageShape } from "../types";
import { db } from "../config/firebaseConfig";
import { Dispatch, SetStateAction } from 'react';

export const getUser = async (name: string) => {
  const usersCollection = collection(db, 'chatty_users');
  const usernameQuery = query(usersCollection, where('username', '==', name));

  const existingUser = await getDocs(usernameQuery);

  if (existingUser.empty) {
    const addedUser = await addDoc(usersCollection, { username: name });
    return { id: addedUser.id, username: name };
  } else {
    return { id: existingUser.docs[0].id, username: name };
  }
};

export const getMessages = async (
  limitNumber: number,
  setMessages: Dispatch<SetStateAction<MessageShape[]>>,
  setMessagesPerLoad: Dispatch<SetStateAction<number>>,
) => {
  const messagesQuery = query(
    collection(db, 'chatty_messages'),
    orderBy('timestamp', 'desc'),
    limit(limitNumber),
  );

  onSnapshot(messagesQuery, (snapshot) => {
    let messagesList: MessageShape[] = [];
    snapshot.docs.map((doc: DocumentData) =>
      messagesList.push({ ...doc.data(), id: doc.id }),
    );

    setMessages(messagesList);
    setMessagesPerLoad(limitNumber + limitNumber);
  });
};