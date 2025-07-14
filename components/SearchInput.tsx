import { Image, Pressable, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { icons } from "@/constants";

type Props = {
  onChangeText: (text: string) => void;
  handleSerch: () => void;
};
const SearchInput = ({ onChangeText, handleSerch }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [focused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const handleChangeText = (text: string) => {
      setQuery(text);
      onChangeText(text);
  };

  // handle press on empty search input
  const handlePressOnCloseButton = () => {
    setQuery('')
    
    setTimeout(() => {
      inputRef.current?.focus(); // Correct: Refocus after clear
    }, 50); 
  };

  const searchIcon = query ? (
    <TouchableOpacity className="px-3 py-3" onPress={handlePressOnCloseButton}>
      <Image
        source={icons.close}
        className="w-6 h-6"
        resizeMode="contain"
        tintColor="#7b7b8b"
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity className="px-3 py-3" onPress={handleSerch}>
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#7b7b8b"
      />
    </TouchableOpacity>
  );

  return (
    <View
      className={`bg-black-100 flex-row items-center rounded-2xl ${focused ? "border border-secondary" : "border border-black-200"}`}
    >
      <TextInput
        ref={inputRef}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        className="flex-1 text-white text-[17px] pl-4 py-3 rounded-xl"
        onChangeText={handleChangeText}
        onPressOut={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={query}
      />

        {searchIcon}
    </View>
  );
};

export default SearchInput;