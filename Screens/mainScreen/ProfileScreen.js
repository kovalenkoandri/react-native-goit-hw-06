import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
} from 'react-native';
import SvgLogout from '../../svg/SvgLogout';
import { useDispatch, useSelector } from 'react-redux';
import { authSignOutUser } from '../../redux/auth/authOperations';
import { db } from '../../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const ProfileScreen = () => {
  const [userComments, setUserComments] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authSignOutUser());
  };
  let unsubscribe;
  const profileComments = [];
  const getUserPosts = async () => {
    const q = query(collection(db, 'posts'), where('userId', '==', userId));
    unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        profileComments.push({ ...doc.data(), id: doc.id });
      });
    });
    setUserComments(profileComments);
    //   .onSnapshot((data) =>
    //     setUserPosts(data.docs.map((doc) => ({ ...doc.data() }))),
    //   );
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) {
        await getUserPosts();
      }
    })();
    return () => {
      unsubscribe();
      mounted = false;
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logout}>
        <SvgLogout />
      </TouchableOpacity>
      <Text>ProfileScreen</Text>
      <View>
        <FlatList
          data={userComments}
          CommentsyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            console.log('Current profileComments: ', Object.entries(item));
            return (
              <View
                style={{
                  marginBottom: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.itemText}>{item.id}</Text>
                <Image
                  source={{ uri: item?.firebasePhotoUrl }}
                  style={{ width: 350, height: 200 }}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: 50,
    width: 200,
    height: 30,
  },
  itemText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: 200,
    height: 20,
    borderColor: 'green',
  },
});

export default ProfileScreen;
