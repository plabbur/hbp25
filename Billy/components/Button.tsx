import { TouchableOpacity, Text } from "react-native";

export default function Button({title, onPress, textStyles, buttonStyles, showBorder}:{title: string, onPress: () => {}, textStyles: string, buttonStyles: string, showBorder?: boolean}) {
    return (
        <TouchableOpacity className={`py-5 rounded-full shadow-2xl ${buttonStyles} items-center justify-center`} onPress={onPress} style={{borderWidth: showBorder ? 2 : 0, borderColor: "#FFFFFF"}}>
            <Text className={`font-inter font-bold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}