import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const Details = () => {
  const params = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: params.taskName as string,
        }}
      />

      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 20,
        }}
      >
        {/* Main Title */}
        <Text style={{ fontSize: 26, fontWeight: "700" }}>
          {params.taskName}
        </Text>

        {/* Card: Description */}
        <Card title="Description">
          <Text style={{ fontSize: 16, lineHeight: 22 }}>
            {params.taskDescription || "No description"}
          </Text>
        </Card>

        {/* Card: Tags */}
        {params.tags ? (
          <Card title="Tags">
            <Tag text={params.tags as string} />
          </Card>
        ) : null}

        {/* Card: Dates */}
        <Card title="Dates">
          <Line label="Created On" value={params.createdOn} />
          <Line label="Due Date" value={params.dueDate} />
          <Line label="Completed On" value={params.completedOn || "Not completed"} />
        </Card>

        {/* Card: Status */}
        <Card title="Status">
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: params.isCompleted === "true" ? "green" : "red",
            }}
          >
            {params.isCompleted === "true" ? "Completed" : "Pending"}
          </Text>
        </Card>

        {/* Card: ID */}
        <Card title="Task ID">
          <Text style={{ fontSize: 16 }}>{params.itemId}</Text>
        </Card>

      </ScrollView>
    </>
  );
};

export default Details;

/* --- Small Reusable UI Helpers --- */

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View
    style={{
      backgroundColor: "white",
      padding: 16,
      borderRadius: 12,
      elevation: 2,
      gap: 10,
    }}
  >
    <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
    {children}
  </View>
);

const Line = ({ label, value }: { label: string; value: any }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <Text style={{ fontSize: 16, color: "#555" }}>{label}</Text>
    <Text style={{ fontSize: 16 }}>{String(value || "—")}</Text>
  </View>
);

const Tag = ({ text }: { text: string }) => (
  <View
    style={{
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: "#2563eb20",
      alignSelf: "flex-start",
      borderRadius: 8,
    }}
  >
    <Text style={{ color: "#2563eb", fontWeight: "600" }}>{text}</Text>
  </View>
);