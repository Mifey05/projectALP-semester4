import { Stack } from "expo-router";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

export default function Layout() {

  useEffect(() => {

    NavigationBar.setVisibilityAsync(
      "hidden"
    );

    NavigationBar.setBehaviorAsync(
      "overlay-swipe"
    );

  }, []);

  return (
    <>
      <StatusBar hidden />

      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </>
  );
}