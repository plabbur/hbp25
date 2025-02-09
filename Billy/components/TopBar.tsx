import { router } from "expo-router";
import { Alert, TouchableOpacity, View } from "react-native";
import BackChevron from "./BackChevron";
import Feather from "@expo/vector-icons/Feather";

export default function TopBar() {
    const handleDeleteBill = async () => {
        Alert.alert(
            "Delete bill",
            "Are you sure you want to delete this bill?",
            [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                try {
                    router.push("/home")
                } catch (error) {
                    console.error("Error deleting bill:", error);
                }
                },
            },
            ]
        );
    };

    return (
        <View className="flex-row items-center relative bg-white shadow-sm absolute">
            <View className="absolute left-0">
                <BackChevron onPress={() => {router.back()}}/>
            </View>
            <TouchableOpacity onPress={() => {handleDeleteBill()}} className="absolute right-0">
                <Feather name="x" size={30} color="black"/>
            </TouchableOpacity>
        </View>
    )
}