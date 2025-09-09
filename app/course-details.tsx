import { useLocalSearchParams, useRouter } from "expo-router";
import {
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { db } from "../firebase";

export default function CourseDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [editing, setEditing] = useState(false);
  const [courseName, setCourseName] = useState(params.courseName as string);
  const [courseCode, setCourseCode] = useState(params.courseCode as string);
  const [instructor, setInstructor] = useState(params.instructor as string);
  const [location, setLocation] = useState(params.location as string);
  const [startTime, setStartTime] = useState(params.startTime as string);
  const [endTime, setEndTime] = useState(params.endTime as string);

  const handleUpdateCourse = async () => {
    if (!courseName || !courseCode || !instructor || !location || !startTime || !endTime) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const docRef = doc(db, "courses", params.id as string);
      await updateDoc(docRef, {
        courseName,
        courseCode,
        instructor,
        location,
        startTime,
        endTime,
      });

      Alert.alert("Success", "Course updated successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("Error updating course:", error);
      Alert.alert("Error", "Failed to update course.");
    }
  };

  const handleDeleteCourse = async () => {
    Alert.alert(
      "Delete Course",
      "Are you sure you want to delete this course?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const docRef = doc(db, "courses", params.id as string);
              await deleteDoc(docRef);
              Alert.alert("Deleted", "Course deleted successfully!", [
                { text: "OK", onPress: () => router.back() },
              ]);
            } catch (error) {
              console.error("Error deleting course:", error);
              Alert.alert("Error", "Failed to delete course.");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow p-6 bg-slate-100`}
    >
      <View style={tw`bg-white p-5 rounded-xl shadow-lg`}>
        <Text style={tw`text-2xl font-bold text-black text-center mb-6`}>
          {editing ? "Edit Course" : "Course Details"}
        </Text>

        {/* Input Fields */}
        {[
          {
            label: "Course Name",
            value: courseName,
            setter: setCourseName,
            editable: editing,
          },
          {
            label: "Course Code",
            value: courseCode,
            setter: setCourseCode,
            editable: editing,
          },
          {
            label: "Instructor",
            value: instructor,
            setter: setInstructor,
            editable: editing,
          },
          {
            label: "Location",
            value: location,
            setter: setLocation,
            editable: editing,
          },
          {
            label: "Start Time",
            value: startTime,
            setter: setStartTime,
            editable: editing,
          },
          {
            label: "End Time",
            value: endTime,
            setter: setEndTime,
            editable: editing,
          },
        ].map((field, index) => (
          <View key={index} style={tw`mb-4`}>
            <Text style={tw`text-black mb-2`}>{field.label}</Text>
            <TextInput
              style={tw`bg-gray-200 border border-gray-300 rounded-lg p-3 text-black`}
              value={field.value}
              editable={field.editable}
              onChangeText={field.setter}
            />
          </View>
        ))}

        {/* Buttons */}
        <View style={tw`flex-row justify-between mt-4`}>
          {!editing ? (
            <>
              <TouchableOpacity
                style={tw`bg-blue-600 px-5 py-3 rounded-full flex-1 mr-2`}
                onPress={() => setEditing(true)}
              >
                <Text style={tw`text-white font-semibold text-center`}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`bg-red-600 px-5 py-3 rounded-full flex-1 ml-2`}
                onPress={handleDeleteCourse}
              >
                <Text style={tw`text-white font-semibold text-center`}>
                  Delete
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={tw`bg-green-600 px-5 py-3 rounded-full flex-1 mr-2`}
                onPress={handleUpdateCourse}
              >
                <Text style={tw`text-white font-semibold text-center`}>
                  Save
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`bg-gray-500 px-5 py-3 rounded-full flex-1 ml-2`}
                onPress={() => setEditing(false)}
              >
                <Text style={tw`text-white font-semibold text-center`}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}