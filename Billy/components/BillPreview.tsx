import { View, Text } from "react-native";
import { BillType } from "@/context/BillContext";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import colors from "tailwindcss/colors"

export default function BillPreview({bill}:{bill: BillType}) {

    const daysAgo = new Date().getDate() - bill.date.getDate();
    const hoursAgo = new Date().getHours() - bill.date.getHours();
    const minutesAgo = new Date().getMinutes() - bill.date.getMinutes();
    const timeDisplay = daysAgo <= 0 ? minutesAgo < 60 ? `${minutesAgo}m` : `${hoursAgo}h` : `${daysAgo}d`;

    return (
        <View className="w-full my-2 pb-2">
            <Text className="text-2xl my-2" style={{fontFamily: "Bricolage Medium", fontWeight: 500}}>{bill.title || "New bill"}</Text>
            <View className="my-2">
                <View className="flex-row items-center my-2">
                    <View className="flex-row w-full absolute left-0 items-center">
                        <View className="bg-black rounded-full w-8 h-8" />
                        <Text className="font-inter text-zinc-400"> Bill by </Text>
                        <Text className="font-inter font-bold text-zinc-400">{bill.billStarter?.name}</Text>
                        <Text className="text-zinc-400"> • {timeDisplay}</Text>
                    </View>

                    <View className="flex-row items-center absolute right-0" >
                        <FontAwesome6 name="user-large" size={12} color={colors.zinc[400]} className=""/>
                        <Text className="text-zinc-400 text-xs"> {bill.partyMembers.length}</Text>
                    </View>
                </View>
            </View>
            <View className="bg-black w-full h-1 mt-2" />
        </View>
    )

}