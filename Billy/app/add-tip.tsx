import BackChevron from "@/components/BackChevron"
import Button from "@/components/Button"
import TopBar from "@/components/TopBar"
import Feather from "@expo/vector-icons/Feather"
import { router } from "expo-router"
import { useRef, useState, useEffect } from "react"
import { Alert, TouchableOpacity, View, Text, TextInput, KeyboardAvoidingView, Platform, Keyboard, Animated } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "tailwindcss/colors"

export default function AddTip() {
    const tipOptions = [10, 15, 20, "Other"];
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [customTip, onChangeCustomTip] = useState();
    const [customTipFocused, setCustomTipFocused] = useState(false);
    const customTipInputRef = useRef(null);

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const buttonPosition = new Animated.Value(0);

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
            Animated.timing(buttonPosition, {
                toValue: 24, // Moves button above keyboard
                duration: 200,
                useNativeDriver: false,
            }).start();
        });

        const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
            Animated.timing(buttonPosition, {
                toValue: 0, // Reset position
                duration: 200,
                useNativeDriver: false,
            }).start();
        });

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);

    const TipOption = ({index}: {index: number}) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedIndex(index);
                if (index === 3) customTipInputRef.current?.focus();
                if (index !== 3) onChangeCustomTip(0);
            }}>
                <View 
                    className="rounded-2xl px-7 py-5 mx-1" 
                    style={{
                        borderWidth: 2, 
                        borderColor: index === selectedIndex ? colors.blue[600] : colors.zinc[200], 
                        backgroundColor: index === selectedIndex ? colors.blue[600] : colors.transparent
                    }}
                >
                    <Text className={`font-inter font-semibold ${index === selectedIndex ? "text-white" : "text-zinc-400"}`}>
                        {tipOptions[index]}{index !== 3 ? "%" : ""}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            className="flex-1 mx-5 my-5 justify-between"
        >
            <SafeAreaView className="flex-1">
                <View>
                    <TopBar />
                    <View className="my-8" />
                    <Text className="text-2xl" style={{ fontFamily: "Bricolage Medium", fontWeight: 500 }}>
                        Did your bill include a tip?
                    </Text>
                    <View className="flex-row my-4">
                        <TipOption index={0}/>
                        <TipOption index={1}/>
                        <TipOption index={2}/>
                        <TipOption index={3}/>
                    </View>

                    <TouchableOpacity onPress={() => {setSelectedIndex(4)}}>
                        <View 
                            className="rounded-2xl px-7 py-5 mx-1" 
                            style={{
                                borderWidth: 2, 
                                borderColor: selectedIndex === 4 ? colors.blue[600] : colors.zinc[200], 
                                backgroundColor: selectedIndex === 4 ? colors.blue[600] : colors.transparent
                            }}
                        >
                            <Text className={`font-inter font-semibold ${selectedIndex === 4 ? "text-white" : "text-zinc-400"}`}>
                                No tip
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {selectedIndex === 3 && (
                        <View 
                            className="my-2 px-5 py-3 rounded-2xl flex-row items-center justify-between" 
                            style={{ borderWidth: 2, borderColor: customTipFocused ? colors.blue[600] : colors.zinc[200] }}
                        >
                            <Text className="text-xl font-inter text-zinc-400">$</Text>

                            <TextInput 
                                ref={customTipInputRef}
                                className="font-inter my-2 text-xl" 
                                onChangeText={(text) => {
                                    if (/^\d*\.?\d*$/.test(text)) onChangeCustomTip(text);
                                }} 
                                value={customTip} 
                                placeholder={"0.00"}
                                onFocus={() => setCustomTipFocused(true)}
                                onBlur={() => {
                                    onChangeCustomTip(text => text === "" ? "0" : parseFloat(text).toString());
                                }}
                                style={{ lineHeight: 20, textAlign: "right" }}
                                keyboardType="numeric"
                            />
                        </View>
                    )}
                </View>
            </SafeAreaView>

            {/* Floating Button */}
            <Animated.View style={{ marginBottom: buttonPosition }}>
                <TouchableOpacity 
                    disabled={selectedIndex === null} 
                    className={`py-5 rounded-full items-center justify-center ${selectedIndex ? "bg-blue-600" : "bg-zinc-200"}`} 
                    onPress={() => {router.push("/name-bill")}}
                >
                    <Text className={`font-inter font-bold text-lg ${selectedIndex ? "text-white" : "text-zinc-400"}`}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    );
}
