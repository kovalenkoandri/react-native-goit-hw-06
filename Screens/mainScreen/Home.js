import PostsScreen from './PostsScreen';
import PostsScreenCompleted from './PostsScreenCompleted';
import CreatePostsScreen from './CreatePostsScreen';
import CreatePostsScreenCompleted from './CreatePostsScreenCompleted';
import ProfileScreen from './ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import SvgCreateFocused from '../../helpers/SvgCreateFocused';
import SvgCreateUnfocused from '../../helpers/SvgCreateUnfocused';
import SvgPosts from '../../helpers/SvgPosts';
import SvgProfileFocused from '../../helpers/SvgProfileFocused';
import SvgProfileUnfocused from '../../helpers/SvgProfileUnfocused';
import SvgTrashBin from '../../helpers/SvgTrashBin';
import SvgGoBack from '../../helpers/SvgGoBack';
import SvgLogout from '../../helpers/SvgLogout';
import { HeaderBackButton } from '@react-navigation/elements';

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: () => <SvgPosts />,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <SvgLogout />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            paddingRight: 20,
          },
          headerTitleAlign: 'center',
        }}
        name="Публикации"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <SvgTrashBin /> : <SvgCreateFocused />,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => navigation.navigate('Публикации')}
              backImage={() => <SvgGoBack />}
            />
          ),
        }}
        name="Создать публикацию"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: () => <SvgProfileUnfocused />,
          headerTitleAlign: 'center',
        }}
        name="Профиль"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default Home;
