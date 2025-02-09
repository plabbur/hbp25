import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
  <Stack.Screen
    name="index"
    options={{ headerShown: false, gestureEnabled: false }}
  />
  <Stack.Screen 
    name="login" 
    options={{headerShown: false, gestureEnabled: true}} />
  <Stack.Screen
    name="home"
    options={{headerShown: false, gestureEnabled: false}}
  />
  <Stack.Screen
    name="scan"
    options={{headerShown: false, gestureEnabled: true, presentation: "modal"}}
  />
  <Stack.Screen
    name="viewphoto"
    options={{headerShown: false, gestureEnabled: true, presentation: "modal"}}
  />
  <Stack.Screen
    name="confirm-items"
    options={{headerShown: false, gestureEnabled: false}}
  />
  <Stack.Screen
    name="add-tip"
    options={{headerShown: false, gestureEnabled: false}}
  />
  </Stack>
}
