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
import SvgCreateFocused from '../../svg/SvgCreateFocused';
import SvgCreateUnfocused from '../../svg/SvgCreateUnfocused';
import SvgPosts from '../../svg/SvgPosts';
import SvgProfileFocused from '../../svg/SvgProfileFocused';
import SvgProfileUnfocused from '../../svg/SvgProfileUnfocused';
import SvgTrashBin from '../../svg/SvgTrashBin';
import SvgGoBack from '../../svg/SvgGoBack';
import SvgLogout from '../../svg/SvgLogout';
import { HeaderBackButton } from '@react-navigation/elements';
import { useDispatch } from 'react-redux';
import { authSignOutUser } from '../../redux/auth/authOperations';

const MainTab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const logout = () => {

    dispatch(authSignOutUser());
  };
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          tabBarIcon: () => <SvgPosts />,
          headerRight: () => (
            <TouchableOpacity onPress={logout}>
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
