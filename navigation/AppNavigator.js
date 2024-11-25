import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateNovelScreen from '../screens/CreateNovelScreen';
import NovelListScreen from '../screens/NovelListScreen';
import ParagraphListScreen from '../screens/ParagraphListScreen';
import ExportNovelScreen from '../screens/ExportNovelScreen';
import WordCountScreen from '../screens/WordCountScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="NovelList">
      <Stack.Screen name="NovelList" component={NovelListScreen} />
      <Stack.Screen name="CreateNovel" component={CreateNovelScreen} />
      <Stack.Screen name="ParagraphList" component={ParagraphListScreen} />
      <Stack.Screen name="ExportNovel" component={ExportNovelScreen} />
      <Stack.Screen name="WordCount" component={WordCountScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
