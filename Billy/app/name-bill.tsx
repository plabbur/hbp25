import TopBar from "@/components/TopBar";
import { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Animated } from "react-native";
import colors from "tailwindcss/colors";

export default function NameBill() {
    const [title, onChangeTitle] = useState("");
    const [titleFocused, setTitleFocused] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const buttonPosition = new Animated.Value(0);

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
            Animated.timing(buttonPosition, {
                toValue: 20, // Position above the keyboard
                duration: 100,
                useNativeDriver: false,
            }).start();
        });

        const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
            Animated.timing(buttonPosition, {
                toValue: 0, // Reset position
                duration: 100,
                useNativeDriver: false,
            }).start();
        });

        return () => {
            keyboardShowListener.remove();
            keyboardHideListener.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            className="flex-1 mx-5 my-8 justify-between"
        >
            <SafeAreaView className="flex-1">
                <View className="mt-5">
                    <TopBar />
                    <View className="my-8" />
                    <Text className="text-2xl" style={{ fontFamily: "Bricolage Medium", fontWeight: 500 }}>
                        Name your bill
                    </Text>
                    <View className="my-2">
                        <View 
                            className="my-2 px-5 py-3 rounded-2xl justify-center" 
                            style={{ borderWidth: 2, borderColor: titleFocused ? colors.blue[600] : colors.zinc[200] }}
                        >
                            <TextInput 
                                className="font-inter text-xl my-2" 
                                onChangeText={onChangeTitle} 
                                value={title} 
                                placeholder="What's this for?"
                                onFocus={() => setTitleFocused(true)}
                                onBlur={() => setTitleFocused(false)}
                                style={{ lineHeight: 20 }}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>

            {/* Floating button */}
            <Animated.View style={{ marginBottom: buttonPosition }}>
                <TouchableOpacity 
                    className={`py-5 rounded-full ${title.length > 0 ? 'bg-blue-600' : 'bg-zinc-200'} items-center justify-center my-8`} 
                    onPress={() => { console.log("bill named") }} 
                    disabled={title.length <= 0}
                >
                    <Text className={`font-inter font-bold text-lg ${title.length > 0 ? 'text-white' : 'text-zinc-400'}`}>
                        Create bill
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    );
}
