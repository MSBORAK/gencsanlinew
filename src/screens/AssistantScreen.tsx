import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SendHorizonal, Bot } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { MOCK_MESSAGES } from '@/api/mockData';
import { ChatMessage } from '@/types';

const QUICK_START_SUGGESTIONS = [
  "Bugün Urfa'da ne yapılır?",
  "En yakın otobüs durağı nerede?",
  "Genç Kart avantajları neler?",
  "Bana bir fıkra anlat.",
];

const AssistantScreen = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES.slice().reverse()); // reverse for inverted FlatList
  const flatListRef = useRef<FlatList>(null);

  const renderMessageItem = ({ item }: { item: ChatMessage }) => (
    <View style={[
      styles.bubbleContainer,
      item.sender === 'user' ? styles.userBubbleContainer : styles.botBubbleContainer
    ]}>
      {item.sender === 'bot' && <View style={styles.botAvatar}><Bot color={Colors.primary.indigo} size={20} /></View>}
      <LinearGradient
        colors={item.sender === 'user' ? [Colors.primary.indigo, Colors.primary.violet] : ['#ffffff', '#f9fafb']}
        style={[
          styles.bubble,
          item.sender === 'user' ? styles.userBubble : styles.botBubble
        ]}
      >
        <Text style={item.sender === 'user' ? styles.userBubbleText : styles.botBubbleText}>
          {item.text}
        </Text>
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.bubblePage}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Adjusted for the tab bar
        >
          {/* Header */}
          <View style={styles.header}>
              <Text style={styles.headerTitle}>ŞanlıAsistan</Text>
              <Text style={styles.headerSubtitle}>Sana nasıl yardımcı olabilirim?</Text>
          </View>
          
          {/* Quick Start Suggestions */}
          <View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickStartContainer}
            >
              {QUICK_START_SUGGESTIONS.map((text, index) => (
                <TouchableOpacity key={index} style={styles.quickStartChip}>
                  <Text style={styles.quickStartText}>{text}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Chat Area */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatContainer}
            showsVerticalScrollIndicator={false}
            inverted 
            style={{ flex: 1 }}
          />

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Mesajını buraya yaz..."
              style={styles.input}
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity style={styles.sendButton}>
               <LinearGradient colors={[Colors.primary.indigo, Colors.primary.violet]} style={styles.sendButtonGradient}>
                  <SendHorizonal color={Colors.white} size={24} />
               </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  bubblePage: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginBottom: 95, // Critical: Lifts the page above the tab bar
    borderRadius: 30,
    overflow: 'hidden', // Ensures children conform to the bubble shape
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20, // Increased top padding
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  headerSubtitle: {
      fontSize: 16,
      color: '#6b7280',
      marginTop: 2,
  },
  quickStartContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  quickStartChip: {
    backgroundColor: Colors.lightGray, // Changed color to match background
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  quickStartText: {
    color: Colors.darkGray,
    fontWeight: '500',
  },
  chatContainer: {
    paddingHorizontal: 15,
    flexGrow: 1,
    paddingBottom: 10, // Reset this
  },
  bubbleContainer: {
    marginVertical: 10,
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  userBubbleContainer: {
    alignSelf: 'flex-end',
  },
  botBubbleContainer: {
    alignSelf: 'flex-start',
  },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    padding: 15,
    borderRadius: 20,
  },
  userBubble: {
    borderBottomRightRadius: 5,
  },
  botBubble: {
    backgroundColor: Colors.lightGray, // Bot bubble color changed
    borderBottomLeftRadius: 5,
  },
  userBubbleText: {
    color: Colors.white,
    fontSize: 16,
  },
  botBubbleText: {
    color: Colors.darkGray,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6', // Lighter border
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.lightGray, // Changed input color
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 0, // Removed border
    marginRight: 10,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default AssistantScreen;
