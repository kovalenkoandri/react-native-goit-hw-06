import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DefaultScreenPosts from '../nestedScreens/DefaultScreenPosts';
import CommentsScreen from '../nestedScreens/CommentsScreen';
import MapScreen from '../nestedScreens/MapScreen';

const NestedScreen = createNativeStackNavigator();

const PostsScreen = ({ route, navigation }) => {
  
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen name="DefaultScreen">
        {() => <DefaultScreenPosts {...{ navigation, route }} />}
      </NestedScreen.Screen>
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
