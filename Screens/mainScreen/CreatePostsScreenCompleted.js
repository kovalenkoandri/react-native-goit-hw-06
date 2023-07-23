import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import SvgLocationMark from '../../helpers/SvgLocationMark';
import SvgCreatePhotoIcon from '../../helpers/SvgCreatePhotoIcon';

const CreatePostsScreenCompleted = ({ navigation }) => {
  return (
    <View style={styles.CreatePostsScreenContainer}>
      <View style={styles.CreatePostsScreenLoadPhotoBg}>
        <ImageBackground
          style={styles.CreatePostsScreenImg}
          source={require('../../assets/forest.png')}
        >
          <View style={styles.CreatePostsScreenLoadPhotoIconCircle}>
            <SvgCreatePhotoIcon fill={'#FFFFFF'} />
          </View>
        </ImageBackground>
      </View>
      <Text style={styles.CreatePostsScreenTextLoadPhoto}>
        Редактировать фото
      </Text>
      <Text style={styles.CreatePostsScreenPhotoName}>Лес</Text>
      <View style={styles.CreatePostsScreenWrapperLocation}>
        <SvgLocationMark />
        <Text style={styles.CreatePostsScreenLocationName}>
          Ivano-Frankivs'k Region, Ukraine
        </Text>
      </View>
      <TouchableOpacity
        style={styles.CreatePostsScreenButtonPublish}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Профиль')}
      >
        <Text style={styles.CreatePostsScreenTextPublish}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
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
    overflow: 'hidden',
  },
  CreatePostsScreenImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CreatePostsScreenLoadPhotoIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF4D',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#212121',
    fontWeight: '500',
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
    color: '#212121',
    marginLeft: 8,
  },
  CreatePostsScreenButtonPublish: {
    borderRadius: 100,
    backgroundColor: '#FF6C00',
    alignItems: 'center',
    justifyContent: 'center',
    height: 51,
  },
  CreatePostsScreenTextPublish: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    lineHeight: 19,
    color: '#fff',
  },
});

export default CreatePostsScreenCompleted;
