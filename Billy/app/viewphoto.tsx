import Feather from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, View, Text, TouchableOpacity, useWindowDimensions, Image } from "react-native";
import colors from "tailwindcss/colors";
import { CameraView, useCameraPermissions } from 'expo-camera';

import Button from "@/components/Button";
// import { useEffect, useRef, useState } from "react";

export default function ViewPhoto() {
    const screenHeight = useWindowDimensions().height;
    const {photo} = useLocalSearchParams(); // Store captured photo

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

            <View>
                <Image
                    source={{ uri: photo }}
                    className="w-full h-full"
                />
            </View>


            {/* This is gonna be where the camera is */}
            {/* <View className="w-full mt-3 rounded-3xl shadow-3xl justify-center px-1 py-1"
                style={{ height: screenHeight - 150, borderWidth: 3, borderColor: colors.blue[600] }}>
                {!permission ? (
                    <Text>Loading</Text>
                ) : !permission.granted ? (
                    <View className="items-center">
                        <Text className="font-inter">Enable camera to scan your receipt</Text>
                        <Button title="Enable camera" onPress={requestPermission} textStyles="text-white" buttonStyles="bg-blue-600 mx-10"/>
                    </View>
                ) : (
                    <View className="rounded-2xl" style={{ flex: 1, overflow: "hidden" }}>
                        
                    </View>
                )}
            </View> */}

        </SafeAreaView>
    )
    
}