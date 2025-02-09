import Button from "@/components/Button";
import Feather from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, View, Text, TouchableOpacity, useWindowDimensions, Image } from "react-native";
import colors from "tailwindcss/colors";
import Receipt from "../app/model/receipt";
import Bill from "../app/model/bill";
import User from "../app/model/user";
import Currency from "../app/model/user";
import { useState } from "react";
import supabase from '../src/index'

export default function ViewPhoto() {
    const { photo } = useLocalSearchParams(); // Store captured photo
    const decodedPhoto = Array.isArray(photo) ? decodeURIComponent(photo[0]) : decodeURIComponent(photo);
    const [bill, setBill] = useState(null);

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

            <View className="w-full flex-row relative mt-5 items-center justify-center">
                <TouchableOpacity 
                    className="py-5 flex-1 max-w-[180px] rounded-full shadow-2xl bg-white items-center justify-center mx-2"
                    onPress={() => {router.dismiss(); router.push("/scan")}}
                >
                    <Text className="font-inter font-medium text-lg text-zinc-400">Retake photo</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    className={`py-5 w-2/5 rounded-full shadow-2xl bg-blue-600 items-center justify-center mx-2`} 
                    onPress={async () => {
                        router.dismiss();
                        const receipt : Receipt = new Receipt();
                        const user = new User(0, "", "", 0, "");
                        const bill : Bill = receipt.makeBillFromReceipt(user, "", decodedPhoto);
                        console.log(bill);
                        // router.push("/add-tip")
                        }}
                >
                    <Text className="font-inter font-semibold text-lg text-white">Looks good</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
