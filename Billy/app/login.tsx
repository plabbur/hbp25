import BackChevron from "@/components/BackChevron";
import Button from "@/components/Button";
import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from "react-native";
import colors from "tailwindcss/colors";

export default function Login() {
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    return (
        <SafeAreaView className="flex-1 mx-5 my-8">
            <View className="my-15">
                <View className="-mx-2">
                    <BackChevron onPress={() => { router.back() }} />
                </View>
                <Text className="text-3xl my-5" style={{ fontFamily: "Bricolage Medium", fontWeight: 500 }}>Log in</Text>

                <View className="my-2">
                    <Text className="font-inter text-sm font-regular text-zinc-400">Username or email</Text>
                    <View 
                        className="my-2 px-5 py-3 rounded-2xl justify-center" 
                        style={{ borderWidth: 2, borderColor: usernameFocused ? colors.blue[600] : colors.zinc[200] }}
                    >
                        <TextInput 
                            className="font-inter text-xl my-4" 
                            onChangeText={onChangeUsername} 
                            value={username} 
                            placeholder="Enter your username or email"
                            onFocus={() => setUsernameFocused(true)}
                            onBlur={() => setUsernameFocused(false)}
                            style={{lineHeight: 20}}
                        />
                    </View>
                </View>

                <View className="my-2">
                    <Text className="font-inter text-sm font-regular text-zinc-400">Password</Text>
                    <View 
                        className="my-2 px-5 py-3 rounded-2xl justify-center" 
                        style={{ borderWidth: 2, borderColor: passwordFocused ? colors.blue[600] : colors.zinc[200] }}
                    >
                        <TextInput 
                            className="font-inter text-xl my-4" 
                            onChangeText={onChangePassword} 
                            value={password} 
                            placeholder="Enter your password"
                            secureTextEntry
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            style={{lineHeight: 20}}
                        />
                    </View>
                </View>
            </View>

            <TouchableOpacity 
                disabled={username.length <= 0 && password.length <= 0}
                className={`py-5 rounded-full shadow-2xl ${username.length > 0 && password.length > 0 ? 'bg-blue-600' : 'bg-zinc-300 opacity-50'} items-center justify-center my-8`} 
                onPress={() => { router.push("/home") }} 
            >
                <Text className={`font-inter font-bold text-lg ${username.length > 0 && password.length > 0 ? 'text-white' : 'text-zinc-500'}`}>Log in</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
