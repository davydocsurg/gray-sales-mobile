import React from "react";
import { Text } from "react-native";

import defaultStyles from "../utils/styles";

export default function AppText({ children, style, ...rest }: any) {
    return (
        <Text style={[defaultStyles.text, style]} {...rest}>
            {children}
        </Text>
    );
}
