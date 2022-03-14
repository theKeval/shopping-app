import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import MangoStyles from '../styles'

const ButtonMain = ({
  title,
  borderColor = MangoStyles.mangoOrangeYellow,
  backgroundColor = MangoStyles.mangoOrangeYellow,
  titleColor = "#fff",
  titleSize = 14,
  onPress,
  width = "100%",
  containerStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={(args) => {
        if (args.pressed) {
          return [
            styles.base,
            {
              opacity: 0.5,
              backgroundColor,
              borderColor,
              width,
            },
            containerStyle,
          ];
        }

        return [
          styles.base,
          {
            opacity: 1,
            backgroundColor,
            borderColor,
            width,
          },
          containerStyle,
        ];
      }}
    >
      <Text style={[styles.text, { color: titleColor, fontSize: titleSize }]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "600",
  },
  base: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
    paddingHorizontal: 12,
  },

});

export default ButtonMain;
