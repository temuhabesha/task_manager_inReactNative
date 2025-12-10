
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput } from "react-native";
import { Task } from "./constants/task-interface";

const NewTask = () => {
  const [form, setForm] = useState<Task>({
    taskName: "",
    taskDescription: "",
    tags: "",
    dueDate: "",
    createdOn: "",
    completedOn: "",
    isCompleted: false,
    itemId: 0,
  });

  function handleChange(key: keyof Task, value: string) {
    setForm({ ...form, [key]: value });
  }

  function handleSubmit() {
    console.log("Form Submitted:", form);
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 20 }}>
        New Task
      </Text>

      {/* Task Name */}
      <TextInput
        placeholder="Task Name"
        value={form.taskName}
        onChangeText={(v) => handleChange("taskName", v)}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 12,
          backgroundColor: 'white'
        }}
      />

      {/* Task Description */}
      <TextInput
        placeholder="Task Description"
        value={form.taskDescription}
        onChangeText={(v) => handleChange("taskDescription", v)}
        multiline
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          height: 100,
          marginBottom: 12,
          backgroundColor: 'white'
        }}
      />

      {/* Tags */}
      <TextInput
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChangeText={(v) => handleChange("tags", v)}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 12,
          backgroundColor: 'white'
        }}
      />

      {/* Due Date */}
      <TextInput
        placeholder="Due Date (YYYY-MM-DD)"
        value={form.dueDate}
        onChangeText={(v) => handleChange("dueDate", v)}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 12,
          backgroundColor: 'white'
        }}
      />

      {/* Created On */}
      <TextInput
        placeholder="Created On (YYYY-MM-DD)"
        value={form.createdOn}
        onChangeText={(v) => handleChange("createdOn", v)}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 12,
          backgroundColor: 'white'
        }}
      />

      {/* Completed On */}
      <TextInput
        placeholder="Completed On (optional)"
        value={form.completedOn}
        onChangeText={(v) => handleChange("completedOn", v)}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 12,
          backgroundColor: 'white'
        }}
      />

      {/* Item ID */}
      <TextInput
        placeholder="Item ID (number)"
        value={String(form.itemId)}
        onChangeText={(v) => handleChange("itemId", v)}
        keyboardType="numeric"
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 12,
          backgroundColor: 'white'
        }}
      />

      {/* Submit Button */}
      <Pressable
        onPress={handleSubmit}
        style={{
          backgroundColor: "#2563eb",
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
          Save Task
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default NewTask;
