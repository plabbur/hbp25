import { View, Text } from "react-native";
import { BillType } from "@/context/BillContext";


export default function BillPreview({bill}:{bill: BillType}) {
    return (
        <View className="w-full">
            <Text className="font-regular">Girls Night</Text>
            <View className="flex-row items-center">
                <View className="bg-black rounded-full w-8 h-8" />
                <Text>Bill by</Text>
                <Text>Jasmine</Text>
            </View>
        </View>
    )

}