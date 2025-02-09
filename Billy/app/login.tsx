import { useRef, useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, Animated } from "react-native";
import { router } from "expo-router";
import colors from "tailwindcss/colors";
import BackChevron from "@/components/BackChevron";

export default function Login() {
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    
    const passwordInputRef = useRef(null);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const buttonPosition = new Animated.Value(0);

    useEffect(() => {
        const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
            Animated.timing(buttonPosition, {
                toValue: 20, // Moves button above keyboard
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

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            className="flex-1 mx-5 my-8 justify-between"
        >
            <SafeAreaView className="flex-1">
                <View className="my-15">
                    <View className="-mx-2">
                        <BackChevron onPress={() => { router.back() }} />
                    </View>
                    <Text className="text-3xl my-5" style={{ fontFamily: "Bricolage Medium", fontWeight: 500 }}>
                        Log in
                    </Text>

                    {/* Username Input */}
                    <View className="my-2">
                        <Text className="font-inter text-sm font-regular text-zinc-400">Username or email</Text>
                        <View 
                            className="my-2 px-5 py-3 rounded-2xl justify-center" 
                            style={{ borderWidth: 2, borderColor: usernameFocused ? colors.blue[600] : colors.zinc[200] }}
                        >
                            <TextInput 
                                className="font-inter text-xl my-2" 
                                onChangeText={onChangeUsername} 
                                value={username} 
                                placeholder="Enter your username or email"
                                onFocus={() => setUsernameFocused(true)}
                                onBlur={() => setUsernameFocused(false)}
                                style={{ lineHeight: 20 }}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordInputRef.current?.focus()} // Auto focus password input on Enter
                            />
                        </View>
                    </View>

                    {/* Password Input */}
                    <View className="my-2">
                        <Text className="font-inter text-sm font-regular text-zinc-400">Password</Text>
                        <View 
                            className="my-2 px-5 py-3 rounded-2xl justify-center" 
                            style={{ borderWidth: 2, borderColor: passwordFocused ? colors.blue[600] : colors.zinc[200] }}
                        >
                            <TextInput 
                                ref={passwordInputRef} // Attach ref to password input
                                className="font-inter text-xl my-2" 
                                onChangeText={onChangePassword} 
                                value={password} 
                                placeholder="Enter your password"
                                secureTextEntry
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                style={{ lineHeight: 20 }}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>

            {/* Floating Button */}
            <Animated.View style={{ marginBottom: buttonPosition }}>
                <TouchableOpacity 
                    className={`py-5 rounded-full ${(username.length > 0 && password.length > 0) ? 'bg-blue-600' : 'bg-zinc-200'} items-center justify-center my-8`} 
                    onPress={() => { router.push("/home") }} 
                    disabled={username.length <= 0 || password.length <= 0}
                >
                    <Text className={`font-inter font-bold text-lg ${username.length > 0 && password.length > 0 ? 'text-white' : 'text-zinc-400'}`}>
                        Log in
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    );
}