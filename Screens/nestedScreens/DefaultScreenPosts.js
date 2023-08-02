import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import SvgLocationMark from '../../helpers/SvgLocationMark';
import SvgRemark from '../../helpers/SvgRemark';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';

const DefaultScreenPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   if (route.params) {
  //     setPosts((prevState) => [...prevState, route.params]);
  //   }
  // }, [route.params]);

  const newPosts = [];
  const getAllPost = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));

    querySnapshot.forEach(async (doc) => {
      console.log(doc.id, ' => ', doc.data());
      newPosts.push({ ...doc.data(), id: doc.id });
    });
  };

  useEffect(() => {
    (async () => {
      await getAllPost();
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
                  uri: item?.firebasePhotoUrl,
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
