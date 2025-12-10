import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Task List",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <Stack.Screen
        name="task-detail"
        options={{
          title: "Task Details",
          headerBackButtonDisplayMode: "minimal",
          // presentation: "formSheet",
          // sheetAllowedDetents: [0.3, 0.5, 0.8],
        }}
      />

      <Stack.Screen
        name="new-task"
        options={{
          title: "New Task",
          headerBackButtonDisplayMode: "minimal",
        }}
      />

      <Stack.Screen
        name="task-preview"
        options={{
          title: "Task Preview",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}