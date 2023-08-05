import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import SvgLocationMark from '../../helpers/SvgLocationMark';
import SvgCreatePhotoIcon from '../../helpers/SvgCreatePhotoIcon';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { ValidateInput } from '../../helpers/ValidateInput';
import { storage, db } from '../../firebase/config';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { uriToBlob } from '../../helpers/uriToBlob';

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [coord, setCoord] = useState(null);
  const inputTitleHandler = (text) => setTitle(text);
  const inputLocationHandler = (text) => setLocation(text);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pressed, setPressed] = useState(false);
  const { keyboardHide, isShowKeyboard, setIsShowKeyboard } = ValidateInput();
  const { userId, nick } = useSelector((state) => state.auth);

  const requestLocation = useCallback(async () => {
    let isSubscribed = true;
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    const locationCoords = await Location.getCurrentPositionAsync().catch(
      console.error,
    );
    if (isSubscribed) {
      setCoord(locationCoords || errorMsg);
    }
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    requestLocation().catch(console.error);
  }, [requestLocation]);

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
  };

  const getFirebaseURL = async () => {
    const uniquePostId = Date.now().toString();
    const file = await uriToBlob(photo);
    try {
      await uploadBytes(ref(storage, `postImages/${uniquePostId}.jpeg`), file, {
        contentType: 'image/jpeg',
      }).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    } catch (error) {
      console.error(error);
    }

    const pathReference = await getDownloadURL(
      ref(storage, `postImages/${uniquePostId}.jpeg`),
    );
    return pathReference;
  };

  const uploadPostToServer = async () => {
    const firebasePhotoUrl = await getFirebaseURL();
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, 'posts'), {
      firebasePhotoUrl,
      title,
      location,
      coord,
      userId,
      nick,
    });
    console.log('Document written with ID: ', docRef.id);
  };

  const sendPhoto = async () => {
    await uploadPostToServer();
    navigation.navigate('Публикации', {
      photo,
      title,
      location,
      coord,
    });
    setPressed(false);
    setPhoto(null);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={{
          ...styles.CreatePostsScreenContainer,
          marginTop: isShowKeyboard ? -270 : 0,
        }}
      >
        <Camera style={styles.CreatePostsScreenLoadPhotoBg} ref={setCamera}>
          {photo && (
            <Image
              source={{ uri: photo }}
              style={styles.CreatePostsScreenWidthHeight}
            />
          )}
          <TouchableOpacity
            onPress={takePhoto}
            style={styles.CreatePostsScreenLoadPhotoIconCircle}
          >
            <SvgCreatePhotoIcon />
          </TouchableOpacity>
        </Camera>
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <View style={styles.CreatePostsScreenWidthHeight}>
            <Text style={styles.CreatePostsScreenTextLoadPhoto}>
              Загрузите фото
            </Text>
            {/* <Text style={styles.CreatePostsScreenPhotoName}>Название...</Text> */}
            <TextInput
              placeholder="Название..."
              value={title}
              onChangeText={inputTitleHandler}
              style={styles.CreatePostsScreenPhotoName}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <View style={styles.CreatePostsScreenWrapperLocation}>
              <SvgLocationMark />
              <TextInput
                placeholder="Местность..."
                value={location}
                onChangeText={inputLocationHandler}
                style={styles.CreatePostsScreenLocationName}
                onFocus={() => setIsShowKeyboard(true)}
              />
              {/* <Text style={styles.CreatePostsScreenLocationName}>Местность...</Text> */}
            </View>
            <TouchableOpacity
              disabled={!photo ? true : false}
              style={
                styles.CreatePostsScreenButtonPublish

                // style={({ pressed }) => {
                // pressed && setPressed(true);
                // return [
                //   {
                //     backgroundColor: pressed ? '#FF6C00' : '#F6F6F6',
                //   },
                //   styles.CreatePostsScreenButtonPublish,
                // ];
              }
              onPress={sendPhoto}
            >
              <Text
                style={{
                  ...styles.CreatePostsScreenTextPublish,
                  color: pressed ? '#FFF' : '#BDBDBD',
                }}
              >
                Опубликовать
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  CreatePostsScreenContainer: {
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: '#fff',
    height: '100%',
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  CreatePostsScreenLoadPhotoBg: {
    backgroundColor: '#F6F6F6',
    height: 240,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CreatePostsScreenWidthHeight: {
    width: '100%',
    height: '100%',
  },
  CreatePostsScreenLoadPhotoIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -30, // Half of the width
    marginTop: -30, // Half of the height
  },
  CreatePostsScreenTextLoadPhoto: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
    marginBottom: 48,
  },
  CreatePostsScreenPhotoName: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
    marginBottom: 15,
  },
  CreatePostsScreenWrapperLocation: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
    height: 66,
    marginBottom: 32,
    paddingTop: 32,
    flexDirection: 'row',
  },
  CreatePostsScreenLocationName: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
    marginLeft: 8,
  },
  CreatePostsScreenButtonPublish: {
    borderRadius: 100,
    // backgroundColor: '#F6F6F6',
    backgroundColor: '#FF6C00',
    alignItems: 'center',
    justifyContent: 'center',
    height: 51,
  },
  CreatePostsScreenTextPublish: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    lineHeight: 19,
    // color: '#BDBDBD',
  },
});

export default CreatePostsScreen;
