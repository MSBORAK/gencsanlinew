import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

// Alttaki Tab Menüsünün Ekranları
export type MainTabParamList = {
  Home: undefined;
  Transport: undefined;
  GencKart: undefined;
  Assistant: undefined;
  Profile: undefined;
};

// Ana Stack Navigasyonun Ekranları
export type RootStackParamList = {
  Welcome: undefined;
  Main: NavigatorScreenParams<MainTabParamList>; // Tab menüsünü bir ekran olarak içerir
  Events: undefined;
  Magazine: undefined;
  Rewards: undefined;
  Notifications: undefined;
  PartnerDetail: { partnerId: string };
   HeritageDetail: { id: string };
};

// HomeScreen için özel tip oluşturma. Bu, hem Stack hem de Tab tiplerini birleştirir.
export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  StackScreenProps<RootStackParamList>
>;
