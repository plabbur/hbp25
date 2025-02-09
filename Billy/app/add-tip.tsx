import BackChevron from "@/components/BackChevron"
import Button from "@/components/Button"
import TopBar from "@/components/TopBar"
import Feather from "@expo/vector-icons/Feather"
import { router } from "expo-router"
import { useRef, useState } from "react"
import { Alert, TouchableOpacity, View, Text, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "tailwindcss/colors"

export default function AddTip() {
    const tipOptions = [10, 15, 20, "Other"];
    const [selectedIndex, setSelectedIndex] = useState<number>();

    const [customTip, onChangeCustomTip] = useState();
    const [customTipFocused, setCustomTipFocused] = useState(false);

    const customTipInputRef = useRef(null);

    const TipOption = ({index}: {index: number}) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedIndex(index);

                if (index === 3) {
                    customTipInputRef.current?.focus()
                }

                if (index !== 3) onChangeCustomTip(0);
                
            }}>
                <View className="rounded-2xl px-7 py-5 mx-1" style={{borderWidth: 2, borderColor: index === selectedIndex ? colors.blue[600] : colors.zinc[200], backgroundColor: index === selectedIndex ? colors.blue[600] : colors.transparent}}>
                    <Text className={`font-inter font-semibold ${index === selectedIndex ? "text-white" : "text-zinc-400"}`}>{tipOptions[index]}{index !== 3 ? "%" : ""}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 mx-5 my-5 justify-between">
            <View>
                <TopBar />
                <View className="my-8" />
                <Text className="text-2xl" style={{ fontFamily: "Bricolage Medium", fontWeight: 500 }}>Did your bill include a tip?</Text>
                <View className="flex-row my-4">
                    <TipOption index={0}/>
                    <TipOption index={1}/>
                    <TipOption index={2}/>
                    <TipOption index={3}/>
                </View>
                {selectedIndex === 3 && (
                    <View 
                        className="my-2 px-5 py-3 rounded-2xl flex-row items-center justify-between" 
                        style={{ borderWidth: 2, borderColor: customTipFocused ? colors.blue[600] : colors.zinc[200] }}
                    >
                        <Text className="text-xl font-inter text-zinc-400">$</Text>

                        <TextInput 
                        ref={customTipInputRef} // Attach ref to password input
                        className="font-inter my-2 text-xl" 
                        onChangeText={(text) => {
                            // Allow empty string and valid decimal input
                            if (/^\d*\.?\d*$/.test(text)) {
                                onChangeCustomTip(text);
                            }
                        }} 
                        value={customTip} // Store the raw text instead of forcing a number
                        placeholder={"0.00"}
                        onFocus={() => setCustomTipFocused(true)}
                        onBlur={() => {
                            // Convert to a number on blur, if valid
                            onChangeCustomTip(text => text === "" ? "0" : parseFloat(text).toString());
                        }}
                        style={{ lineHeight: 20, textAlign: "right" }}
                        returnKeyType="next"
                        keyboardType="numeric"
                    />
                    </View>
                )}
            </View>

            <View>
                {(customTip && selectedIndex) && (
                    <Button title="Continue" onPress={() => {console.log("Continue")}} buttonStyles="bg-blue-600" textStyles="text-white"/>
                )}
            </View>
            
            <Button title={selectedIndex || customTip ? "Continue" : "Skip"} onPress={() => {
                selectedIndex || customTip ? console.log("Continue") : console.log("Skip")
                }} buttonStyles="bg-blue-600" textStyles="text-white"/>
            </SafeAreaView>
    );
}