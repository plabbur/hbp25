import TopBar from "@/components/TopBar";
import { SafeAreaView, View, Text } from "react-native";

export default function ConfirmItems() {

    const Item = ({name, cost, isEmphasized}:{name: string, cost: number, isEmphasized?: boolean}) => {
        return (
            <View>
                <View className="w-full flex-row mb-12 mt-8">
                    <Text className={`absolute left-0 text-zinc-600 ${isEmphasized ? "font-medium" : "font-regular"}`}>{name}</Text>
                    <Text className={`absolute right-0 font-regular ${isEmphasized ? "text-zinc-600" : "text-zinc-400"}`}>${cost}</Text>
                </View>
                <View className="w-full h-0.5 bg-zinc-200" />
            </View>
        )
    }

    return (
        <SafeAreaView className="flex-1 mx-5 my-8">
            <View className="mt-5">
                <TopBar />
                <View className="my-8" />
                <Text className="text-2xl" style={{ fontFamily: "Bricolage Medium", fontWeight: 500 }}>
                    Does this look right?
                </Text>
                <View>
                    <Item name="Cucumber" cost={12.00} isEmphasized={true}/>
                    <Item name="Cucumber" cost={12.00} isEmphasized={true}/>
                </View>
            </View>
        </SafeAreaView>
    )
}