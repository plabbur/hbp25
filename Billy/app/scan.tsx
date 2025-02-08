import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { SafeAreaView, View, Text, TouchableOpacity, useWindowDimensions, Image } from "react-native";
import colors from "tailwindcss/colors";
import { CameraView, useCameraPermissions } from 'expo-camera';

import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";

export default function Scan() {
    const [permission, requestPermission] = useCameraPermissions();
    const screenHeight = useWindowDimensions().height;
    const cameraRef = useRef(null); // Store camera reference
    const [photo, setPhoto] = useState(null); // Store captured photo

    async function takePhoto() {
        console.log("photo taken")

        if (cameraRef.current) {
            const photoData = await cameraRef.current.takePictureAsync({ quality: 1, base64: false });
            setPhoto(photoData.uri); // Store photo URI
            router.dismiss();
            router.push({
                pathname: "/viewphoto",
                params: { photo: encodeURIComponent(photoData.uri) }, // Correctly pass the photo URI
            });
        }
    }

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

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

            {/* This is gonna be where the camera is */}
            <View className="w-full mt-3 rounded-3xl shadow-3xl justify-center px-1 py-1"
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

                        <CameraView ref={cameraRef} style={{ flex: 1 }} >
                            <View className="w-full items-center h-full justify-end">
                            <TouchableOpacity 
                                className="w-[100] h-[100] opacity-80 rounded-full items-center justify-center my-7" 
                                style={{borderWidth: 5, borderColor: "#FFFFFF"}} 
                                onPress={takePhoto}
                            >
                                <View className="w-[86] h-[86] bg-white rounded-full" />
                            </TouchableOpacity>
                            </View>
                        </CameraView>
                    </View>
                )}
            </View>

            {/* Text updating if the scan is working */}
            
        </SafeAreaView>
    )
    
}