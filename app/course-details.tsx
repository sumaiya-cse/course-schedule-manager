import { useLocalSearchParams, useRouter } from "expo-router";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import tw from "twrnc";
import { db } from "../firebase";

export default function CourseDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [courseName, setCourseName] = useState(params.courseName as string);
  const [courseCode, setCourseCode] = useState(params.courseCode as string);
  const [instructor, setInstructor] = useState(params.instructor as string);
  const [location, setLocation] = useState(params.location as string);
  const [classDate, setClassDate] = useState(params.classDate as string);
  const [startTime, setStartTime] = useState(params.startTime as string);
  const [endTime, setEndTime] = useState(params.endTime as string);

  const handleUpdate = async () => {
    if (!courseName || !courseCode || !instructor || !location || !classDate || !startTime || !endTime) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill all the fields before saving.",
      });
      return;
    }

    try {
      const courseRef = doc(db, "courses", params.id as string);
      await updateDoc(courseRef, {
        courseName,
        courseCode,
        instructor,
        location,
        classDate,
        startTime,
        endTime,
      });

      Toast.show({
        type: "success",
        text1: "Course Updated",
        text2: "The course details have been updated successfully.",
      });

      setIsEditing(false);
      router.back();
    } catch (error) {
      console.error("Error updating course:", error);
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Something went wrong. Please try again.",
      });
    }
  };

  const handleDelete = () => {
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
              const courseRef = doc(db, "courses", params.id as string);
              await deleteDoc(courseRef);

              Toast.show({
                type: "success",
                text1: "Course Deleted",
                text2: "The course has been removed successfully.",
              });

              router.back();
            } catch (error) {
              console.error("Error deleting course:", error);
              Toast.show({
                type: "error",
                text1: "Delete Failed",
                text2: "Could not delete the course. Try again.",
              });
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      <View style={tw`bg-white rounded-xl shadow p-6 m-4`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-4`}>
          {isEditing ? "Edit Course" : courseName}
        </Text>

        {/* Editable Fields */}
        {isEditing ? (
          <>
            {[ 
              { label: "Course Name", value: courseName, setter: setCourseName },
              { label: "Course Code", value: courseCode, setter: setCourseCode },
              { label: "Instructor", value: instructor, setter: setInstructor },
              { label: "Location", value: location, setter: setLocation },
              { label: "Class Date", value: classDate, setter: setClassDate },
              { label: "Start Time", value: startTime, setter: setStartTime },
              { label: "End Time", value: endTime, setter: setEndTime },
            ].map((field, index) => (
              <View key={index} style={tw`mb-4`}>
                <Text style={tw`text-gray-700 font-semibold mb-1`}>
                  {field.label}
                </Text>
                <TextInput
                  style={tw`bg-gray-200 p-3 rounded-lg text-black`}
                  value={field.value}
                  onChangeText={field.setter}
                  placeholder={field.label}
                  placeholderTextColor="#888"
                />
              </View>
            ))}

            <View style={tw`flex-row justify-between mt-4`}>
              <TouchableOpacity
                onPress={() => setIsEditing(false)}
                style={tw`bg-gray-400 px-4 py-3 rounded-lg flex-1 mr-2`}
              >
                <Text style={tw`text-white text-center font-bold`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleUpdate}
                style={tw`bg-green-600 px-4 py-3 rounded-lg flex-1 ml-2`}
              >
                <Text style={tw`text-white text-center font-bold`}>Save</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* Displaying Details */}
            <Text style={tw`text-gray-700 text-base mb-2`}>
              📘 Course Code: {courseCode}
            </Text>
            <Text style={tw`text-gray-700 text-base mb-2`}>
              👨‍🏫 Instructor: {instructor}
            </Text>
            <Text style={tw`text-gray-700 text-base mb-2`}>
              🏫 Location: {location}
            </Text>
            <Text style={tw`text-gray-700 text-base mb-2`}>
              📅 Date: {classDate}
            </Text>
            <Text style={tw`text-gray-700 text-base mb-2`}>
              🕒 Time: {startTime} – {endTime}
            </Text>

            {/* Edit & Delete Buttons */}
            <View style={tw`flex-row justify-between mt-6`}>
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                style={tw`bg-blue-600 px-4 py-3 rounded-lg flex-1 mr-2`}
              >
                <Text style={tw`text-white text-center font-bold`}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={tw`bg-red-600 px-4 py-3 rounded-lg flex-1 ml-2`}
              >
                <Text style={tw`text-white text-center font-bold`}>Delete</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Back Button */}
      {!isEditing && (
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`mx-4 mt-2 bg-gray-700 p-3 rounded-full`}
        >
          <Text style={tw`text-white text-center font-semibold`}>
            ← Back to Schedule
          </Text>
        </TouchableOpacity>
      )}

      {/* Toast Container */}
      <Toast />
    </ScrollView>
  );
}