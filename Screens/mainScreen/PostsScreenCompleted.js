import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import SvgLocationMark from '../../svg/SvgLocationMark';
import SvgRemark from '../../svg/SvgRemark';

const PostsScreenCompleted = () => {
  return (
    <View style={styles.container}>
      <View style={styles.postsScreenUserOuter}>
        <Image
          style={styles.postsScreenUserPhoto}
          source={require('../../assets/user.png')}
        />
        <View>
          <Text style={styles.postsScreenUserName}>Natali Romanova</Text>
          <Text style={styles.postsScreenUserEmail}>email@example.com</Text>
        </View>
      </View>
      <View style={styles.postsScreenLoadPhotoBg}>
        <ImageBackground
          style={styles.postsScreenImg}
          source={require('../../assets/forest.png')}
        ></ImageBackground>
      </View>
      <Text style={styles.postsScreenPhotoName}>Лес</Text>
      <View style={styles.postsScreenWrapperLocation}>
        <SvgRemark />
        <Text style={styles.postsScreenCounter}>0</Text>
        <View style={styles.postsScreenLocationSpot}>
          <SvgLocationMark />
        </View>
        <Text style={styles.postsScreenLocationName}>
          Ivano-Frankivs'k Region, Ukraine
        </Text>
      </View>
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
  postsScreenUserOuter: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 32,
  },
  postsScreenUserPhoto: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  postsScreenUserName: {
    fontFamily: 'RobotoRegular',
    fontStyle: 'normal',
    fontSize: 13,
    lineHeight: 15,
    marginLeft: 8,
    color: '#212121',
  },
  postsScreenUserEmail: {
    fontFamily: 'RobotoRegular',
    fontStyle: 'normal',
    fontSize: 11,
    lineHeight: 13,
    marginLeft: 8,
    color: '#212121CC',
  },
  postsScreenLoadPhotoBg: {
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
  postsScreenImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  postsScreenPhotoName: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    fontWeight: '500',
    marginBottom: 11,
  },
  postsScreenWrapperLocation: {
    marginBottom: 34,
    flexDirection: 'row',
  },
  postsScreenCounter: {
    fontFamily: 'RobotoRegular',
    color: '#BDBDBD',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9,
  },
  postsScreenLocationSpot: {
    marginLeft: 51,
  },
  postsScreenLocationName: {
    fontFamily: 'RobotoRegular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    marginLeft: 8,
  },
});

export default PostsScreenCompleted;
