import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import SvgLocationMark from '../../helpers/SvgLocationMark';
import SvgRemark from '../../helpers/SvgRemark';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage, base64Raw, base64Invalid } from '../../firebase/config';
import { decode } from 'base-64';
import * as FileSystem from 'expo-file-system';

if (typeof atob === 'undefined') {
  global.atob = decode;
}

const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [base64, setBase64] = useState(null);

  // useEffect(() => {
  //   if (route.params) {
  //     setPosts((prevState) => [...prevState, route.params]);
  //   }
  // }, [route.params]);

  const newPosts = [];
  const getAllPost = async () => {
    //   .onSnapshot((data) =>
    //     setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
    // );
    const querySnapshot = await getDocs(collection(db, 'posts'));

    querySnapshot.forEach(async (doc) => {
      console.log(doc.id, ' => ', doc.data());
      // const response = await fetch(doc.data().firebasePhotoUrl);
      // console.log(JSON.stringify(response.url));
      // const data = await response.blob();
      newPosts.push({ ...doc.data(), id: doc.id });
      // newPosts.push({ ...doc.data(), id: doc.id, dataBlob: data });
    });
  };
  const fetchFirebasePhotoUrl = async () => {
  
    const { uri } = await FileSystem.downloadAsync(
      'https://firebasestorage.googleapis.com/v0/b/react-native-goit-hw-06.appspot.com/o/postImages%2F1690963688961?alt=media&token=5b4b6456-c52b-435a-a494-f5cf1d8f1db4',
      FileSystem.cacheDirectory + 'small',
    );
    console.log('Finished downloading to ', uri);
   

  };
  useEffect(() => {
    (async () => {
      await getAllPost();
      // setPosts((old) => {
      //   console.log('----------old', old);
      //   console.log('----------newPosts', newPosts);
      //   const combinePosts = ([...old,newPosts]).flat();
      //   console.log('----------combine', combinePosts);
      //   console.log('route.params-------------', route.params);
      // return combinePosts;
      // });
      await fetchFirebasePhotoUrl();
      setPosts(newPosts);
    })();
  }, [route.params]);

  const openCoordScreen = () => {
    navigation.navigate('Map', { route });
  };
  return (
    <View style={styles.container}>
      <View style={styles.PostsScreenUserOuter}>
        <Image
          style={styles.PostsScreenUserPhoto}
          source={require('../../assets/user.png')}
        />
        <View>
          <Text style={styles.PostsScreenUserName}>Natali Romanova</Text>
          <Text style={styles.PostsScreenUserEmail}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={{
                  // uri: `data:image/jpeg;base64,https://firebasestorage.googleapis.com/v0/b/react-native-goit-hw-06.appspot.com/o/postImages%2F1690887912141?alt=media&token=1825fc0b-1966-43e4-a20a-2e2e6b29abf8`,
                  // uri: `https://firebasestorage.googleapis.com/v0/b/react-native-goit-hw-06.appspot.com/o/postImages%2F1690887912141?alt=media&token=1825fc0b-1966-43e4-a20a-2e2e6b29abf8`,
                  // uri: item?.dataBlob,
                  uri: 'data:image/jpeg;base64' + base64,
                  // uri: base64,
                  // uri: base64Raw,
                }}
                style={{ width: 350, height: 200 }}
              />
              <Text style={styles.PostsScreenUserName}>
                coordinates latitude {item.coord?.coords.latitude}
              </Text>
              <Text style={styles.PostsScreenUserName}>
                coordinates longitude {item.coord?.coords.longitude}
              </Text>
              <Text style={styles.PostsScreenUserName}>
                title {item?.title}
              </Text>
              <Text style={styles.PostsScreenUserName}>
                location {item?.location}
              </Text>
              <TouchableOpacity title="go to map" onPress={openCoordScreen}>
                <SvgLocationMark />
              </TouchableOpacity>
              <TouchableOpacity
                title="go to Comments"
                onPress={() => navigation.navigate('Comments')}
              >
                <SvgRemark />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: '#fff',
    height: '100%',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  PostsScreenUserOuter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  PostsScreenUserPhoto: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  PostsScreenUserName: {
    fontFamily: 'RobotoRegular',
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 15,
    marginLeft: 8,
    color: '#212121',
  },
  PostsScreenUserEmail: {
    fontFamily: 'RobotoRegular',
    fontStyle: 'normal',
    fontSize: 11,
    lineHeight: 13,
    marginLeft: 8,
    color: '#212121CC',
  },
});

export default DefaultScreenPosts;
