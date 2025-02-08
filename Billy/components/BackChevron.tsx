import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";

export default function BackChevron({onPress}:{onPress: () => {}}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Feather name="chevron-left" size={32} color="black"/>
        </TouchableOpacity>
    )
}