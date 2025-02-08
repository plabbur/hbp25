import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { router, SplashScreen } from "expo-router";
import Button from "@/components/Button";
import { exampleBill } from "@/example_data/example_bill";
import BillPreview from "@/components/BillPreview";
import { UserType } from "@/context/UserContext";
import Feather from '@expo/vector-icons/Feather';
import colors from "tailwindcss/colors";

export default function Home() {



    return (
        <SafeAreaView className="mx-5 flex-1 justify-between">

            <View>
                <View className="flex-row relative items-center w-full my-10">
                    <Text className="font-bold font-bricolage text-blue-600 text-3xl">Billy</Text>
                    <View className="bg-black rounded-full w-8 h-8 absolute right-0" />
                </View>

                <View>
                    <Text className="text-zinc-400 text-2xl" style={{fontFamily: "Bricolage Regular", fontWeight: 400}}>Recent Bills</Text>
                    <BillPreview bill={exampleBill}/>
                    <View className="h-0.5 w-full bg-zinc-200 my-1" />
                    <BillPreview bill={exampleBill}/>
                    <View className="h-0.5 w-full bg-zinc-200 my-1" />
                    <BillPreview bill={exampleBill}/>
                    <View className="h-0.5 w-full bg-zinc-200 my-1" />
                </View>
            </View>

            <TouchableOpacity className={`py-5 rounded-full shadow-2xl bg-blue-600 items-center justify-center mx-32 my-2`} onPress={() => {router.push("/scan")}}>
                <Feather name="plus" size={26} color={colors.white} />
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}

