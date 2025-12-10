// components/AppButton.tsx
import React from "react";
import { Pressable, Text, StyleProp, ViewStyle, TextStyle } from "react-native";

type AppButtonProps = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#f0f9ff" : "white",
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 12,
          alignItems: "center",
          marginVertical: 8,
        },
        style,
      ]}
      android_ripple={{ color: "#e0e7ff" }}
    >
      <Text
        style={[
          {
            fontSize: 16,
            fontWeight: "bold",
            color: "#1e40af",
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default AppButton;