import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { db } from '../../firebase/config';
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
} from 'firebase/firestore';

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { nick } = useSelector((state) => state.auth);
  const commentsRef = collection(db, 'posts', postId, 'comments');
  // Query a reference to a subcollection

  const createComment = async () => {
    const newComment = await addDoc(commentsRef, {
      nick,
      comment,
    });
    console.log('Document written with ID: ', newComment.id);
  };

  const getAllCommentsFromFirebase = useCallback(async () => {
    const q = query(commentsRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fbComments = [];
      querySnapshot.forEach((doc) => {
        fbComments.push({ ...doc.data(), id: doc.id });
      });
      setAllComments(() => fbComments);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      await getAllCommentsFromFirebase();
    })();
  }, [getAllCommentsFromFirebase]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text>CommentsScreen</Text>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.nick}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => {
            // console.log('item.id => ', item.id);
            return item.id.toString();
          }}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setComment} />
      </View>
      <TouchableOpacity onPress={createComment} style={styles.sendBtn}>
        <Text style={styles.sendLabel}>add comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: '#20b2aa',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  sendLabel: {
    color: '#20b2aa',
    fontSize: 20,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    width: 350,
    height: 35,
    borderWidth: 1,
    borderColor: 'green',
    borderBottomColor: '#20b2aa',
  },
});

export default CommentsScreen;
