import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import '@/global.css';
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { router, SplashScreen } from "expo-router";
import Button from "@/components/Button";
import { BillProvider } from "@/context/BillContext";
import { ItemProvider } from "@/context/ItemContext";
import { UserProvider } from "@/context/UserContext";


export default function Index() {
  const [fontsLoaded, error] = useFonts({
    Inter: require("../assets/fonts/Inter/Inter-VariableFont_opsz,wght.ttf"),
    Bricolage: require("../assets/fonts/Bricolage_Grotesque/BricolageGrotesque-VariableFont_opsz,wdth,wght.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;
  if (!fontsLoaded && !error) return null;

  return (
    <BillProvider>
      <UserProvider>
        <ItemProvider>
          <View className="flex-1 bg-blue-600">
            <SafeAreaView className="flex-1 justify-between items-center">
              <Text className="font-bold font-bricolage text-white text-5xl my-10">Billy</Text>

              <View className="w-full">
                <Button title="Log in" onPress={() => {router.push("/home")}} textStyles="text-blue-600" buttonStyles="bg-white my-2 mx-16"/>
                <Button title="Sign up" onPress={() => {console.log("Sign up")}} textStyles="text-white" buttonStyles="my-2 mx-16" showBorder={true}/>
              </View>
            </SafeAreaView>
          </View>
        </ItemProvider>
      </UserProvider>
    
    </BillProvider>
  );
}
