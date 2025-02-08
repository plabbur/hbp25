import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { SplashScreen } from "expo-router";
import Button from "@/components/Button";
import { exampleBill } from "@/example_data/example_bill";
import BillPreview from "@/components/BillPreview";

export default function Home() {
    return (
        <SafeAreaView className="mx-5">
            <View className="flex-row relative items-center w-full my-10">
                <Text className="font-bold font-bricolage text-blue-600 text-3xl">Billy</Text>
                <View className="bg-black rounded-full w-8 h-8 absolute right-0" />
            </View>

            <View>
                <Text className="font-bricolage text-zinc-400 text-2xl">Recent</Text>
                <BillPreview bill={exampleBill}/>
            </View>

        </SafeAreaView>
    )
}

