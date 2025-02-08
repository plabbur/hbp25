import Button from "@/components/Button";
import Feather from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, View, Text, TouchableOpacity, useWindowDimensions, Image } from "react-native";
import colors from "tailwindcss/colors";

export default function ViewPhoto() {
    const { photo } = useLocalSearchParams(); // Store captured photo
    const decodedPhoto = decodeURIComponent(photo);

    return (
        <SafeAreaView className="flex-1 my-3 items-center mx-3">
            <View className="flex-row items-center justify-between w-full h-12">
                <View className="w-12">
                    <TouchableOpacity onPress={() => router.dismiss()}>
                        <Feather name="chevron-left" size={32} color="black" />
                    </TouchableOpacity>
                </View>

                <View className="flex-1 items-center">
                    <Text className="font-inter font-medium">Take receipt photo</Text>
                </View>

                <View className="w-12" />
            </View>

            {/* Outer Frame with Padding */}
            <View 
                className="mt-3 rounded-3xl shadow-3xl justify-center items-center bg-white border-4"
                style={{ height: 620, width: 350, borderColor: colors.white, padding: 4 }}
            >
                {photo ? (
                    <Image
                        source={{ uri: decodedPhoto }}
                        style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                        className="rounded-2xl"
                    />
                ) : (
                    <Text>Loading photo...</Text>
                )}
            </View>

            <View className="w-full flex-row relative mt-5">
                <Button title="Retake photo" onPress={() => {console.log("Retake photo")}} textStyles="text-zinc-400" buttonStyles="bg-white mx-2"/>
                <Button title="Looks good" onPress={() => {console.log("Looks good")}} textStyles="text-white" buttonStyles="bg-blue-600 mx-2"/>
            </View>
        </SafeAreaView>
    );
}
