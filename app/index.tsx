
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import AppButton from "./components/Button";
import { Task } from "./constants/task-interface";

export default function Index() {
  const [items, setItems] = useState<Task[]>([]);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    const response = await fetch(
      "http://freeapi.miniprojectideas.com/api/JWT/GetAllTaskList"
    );
    const jsonData = await response.json();
    setItems(jsonData.data);
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 20,
        padding: 16,
      }}
    >
      <Link href="/new-task" asChild>
        <AppButton title="Add Task" />
      </Link>

      {items.map((item) => (
        <Link
          key={item.itemId}
          href={{
            pathname: "/task-detail",
            params: {
              ...item,
              isCompleted: String(item.isCompleted),
            },
          }}
          asChild
        >
          <Pressable style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.taskName}>{item.taskName}</Text>

              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: item.isCompleted ? "#4ade8040" : "#f8717140",
                  },
                ]}
              >
                <Text
                  style={{
                    color: item.isCompleted ? "#15803d" : "#b91c1c",
                    fontWeight: "600",
                  }}
                >
                  {item.isCompleted ? "Done" : "Pending"}
                </Text>
              </View>
            </View>

            {item.tags ? (
              <View style={styles.tag}>
                <Text style={{ color: "#2563eb", fontWeight: "600" }}>
                  {item.tags}
                </Text>
              </View>
            ) : null}

            <Text style={styles.dateText}>Due: {item.dueDate}</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    gap: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskName: {
    fontSize: 20,
    fontWeight: "700",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#2563eb20",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dateText: {
    color: "#555",
    fontSize: 14,
  },
});

