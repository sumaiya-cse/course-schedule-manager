// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useRouter } from "expo-router";
// import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
// import React, { useState } from "react";
// import {
//   Alert,
//   Platform,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import tw from "twrnc";
// import { db } from "../firebase";

// export default function AddCourseScreen() {
//   const router = useRouter();

//   const [courseName, setCourseName] = useState("");
//   const [courseCode, setCourseCode] = useState("");
//   const [instructor, setInstructor] = useState("");
//   const [location, setLocation] = useState("");

//   const [classDate, setClassDate] = useState<Date>(new Date());
//   const [startTime, setStartTime] = useState<Date>(new Date());
//   const [endTime, setEndTime] = useState<Date>(new Date());

//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showStartPicker, setShowStartPicker] = useState(false);
//   const [showEndPicker, setShowEndPicker] = useState(false);

//   const getDayOfWeek = (date: Date) =>
//     date.toLocaleDateString(undefined, { weekday: "long" });

//   const handleAddCourse = async () => {
//     if (!courseName || !courseCode || !instructor || !location) {
//       Alert.alert("Error", "All fields are required");
//       return;
//     }

//     // Validation: End Time must be after Start Time
//     if (endTime <= startTime) {
//       Alert.alert("Error", "End time must be after start time");
//       return;
//     }

//     // Validation: Check for duplicate course (same date + location + time)
//     const courseQuery = query(
//       collection(db, "courses"),
//       where("classDate", "==", classDate.toLocaleDateString()),
//       where("location", "==", location),
//       where("startTime", "==", startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
//     );

//     const snapshot = await getDocs(courseQuery);
//     if (!snapshot.empty) {
//       Alert.alert("Conflict", "A course already exists at this time and location.");
//       return;
//     }

//     // All good → Save course
//     try {
//       await addDoc(collection(db, "courses"), {
//         courseName,
//         courseCode,
//         instructor,
//         location,
//         classDate: classDate.toLocaleDateString(),
//         dayOfWeek: getDayOfWeek(classDate),
//         startTime: startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         endTime: endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         createdAt: new Date(),
//       });
//       router.back();
//     } catch (error) {
//       console.error("Error adding course:", error);
//       Alert.alert("Error", "Failed to add course");
//     }
//   };

//   const handleCancel = () => router.push("/");

//   return (
//     <ScrollView contentContainerStyle={tw`flex-grow justify-center items-center p-6 bg-slate-100`}>
//       <View style={tw`bg-white p-5 rounded-xl shadow-lg w-full max-w-md`}>
//         <Text style={tw`text-2xl font-bold text-black text-center mb-6`}>
//           Add New Course
//         </Text>

//         {/* Inputs */}
//         {[{ label: "Course Name", value: courseName, setter: setCourseName, placeholder: "e.g., Mobile Apps Development" },
//           { label: "Course Code", value: courseCode, setter: setCourseCode, placeholder: "e.g., CSE464" },
//           { label: "Instructor", value: instructor, setter: setInstructor, placeholder: "e.g., Dr. Smith" },
//           { label: "Location", value: location, setter: setLocation, placeholder: "e.g., Room 101" }]
//           .map((field, index) => (
//             <View key={index} style={tw`mb-4`}>
//               <Text style={tw`text-black mb-2`}>{field.label}</Text>
//               <TextInput
//                 style={tw`bg-gray-200 border border-gray-300 rounded-lg p-3 text-black`}
//                 value={field.value}
//                 onChangeText={field.setter}
//                 placeholder={field.placeholder}
//                 placeholderTextColor={tw.color("gray-500")}
//               />
//             </View>
//         ))}

//         {/* Class Date Picker */}
//         <View style={tw`mb-4`}>
//           <Text style={tw`text-black mb-2`}>Class Date</Text>
//           <TouchableOpacity
//             onPress={() => setShowDatePicker(true)}
//             style={tw`bg-gray-200 border border-gray-300 rounded-lg p-3`}
//           >
//             <Text style={tw`text-black`}>
//               {classDate.toLocaleDateString()}
//             </Text>
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={classDate}
//               mode="date"
//               display={Platform.OS === "ios" ? "spinner" : "default"}
//               onChange={(event, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) setClassDate(selectedDate);
//               }}
//             />
//           )}
//         </View>

//         {/* Start Time Picker */}
//         <View style={tw`mb-4`}>
//           <Text style={tw`text-black mb-2`}>Start Time</Text>
//           <TouchableOpacity
//             onPress={() => setShowStartPicker(true)}
//             style={tw`bg-gray-200 border border-gray-300 rounded-lg p-3`}
//           >
//             <Text style={tw`text-black`}>
//               {startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//             </Text>
//           </TouchableOpacity>
//           {showStartPicker && (
//             <DateTimePicker
//               value={startTime}
//               mode="time"
//               is24Hour={false}
//               display={Platform.OS === "ios" ? "spinner" : "default"}
//               onChange={(event, selectedDate) => {
//                 setShowStartPicker(false);
//                 if (selectedDate) setStartTime(selectedDate);
//               }}
//             />
//           )}
//         </View>

//         {/* End Time Picker */}
//         <View style={tw`mb-6`}>
//           <Text style={tw`text-black mb-2`}>End Time</Text>
//           <TouchableOpacity
//             onPress={() => setShowEndPicker(true)}
//             style={tw`bg-gray-200 border border-gray-300 rounded-lg p-3`}
//           >
//             <Text style={tw`text-black`}>
//               {endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//             </Text>
//           </TouchableOpacity>
//           {showEndPicker && (
//             <DateTimePicker
//               value={endTime}
//               mode="time"
//               is24Hour={false}
//               display={Platform.OS === "ios" ? "spinner" : "default"}
//               onChange={(event, selectedDate) => {
//                 setShowEndPicker(false);
//                 if (selectedDate) setEndTime(selectedDate);
//               }}
//             />
//           )}
//         </View>

//         {/* Preview Card */}
//         <View style={tw`mb-6 bg-gray-100 border border-gray-300 rounded-lg p-4`}>
//           <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>Preview</Text>
//           <Text style={tw`text-gray-700`}><Text style={tw`font-semibold`}>Name:</Text> {courseName || '-'}</Text>
//           <Text style={tw`text-gray-700`}><Text style={tw`font-semibold`}>Code:</Text> {courseCode || '-'}</Text>
//           <Text style={tw`text-gray-700`}><Text style={tw`font-semibold`}>Instructor:</Text> {instructor || '-'}</Text>
//           <Text style={tw`text-gray-700`}><Text style={tw`font-semibold`}>Location:</Text> {location || '-'}</Text>
//           <Text style={tw`text-gray-700`}><Text style={tw`font-semibold`}>Date:</Text> {classDate.toLocaleDateString()}</Text>
//           <Text style={tw`text-gray-700`}><Text style={tw`font-semibold`}>Day:</Text> {getDayOfWeek(classDate)}</Text>
//           <Text style={tw`text-gray-700`}><Text style={tw`font-semibold`}>Time:</Text> {startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – {endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
//         </View>

//         {/* Buttons */}
//         <View style={tw`flex-row justify-center`}>
//           <TouchableOpacity
//             style={tw`bg-red-600 px-5 py-3 rounded-full`}
//             onPress={handleCancel}
//           >
//             <Text style={tw`text-white font-semibold text-center`}>Cancel</Text>
//           </TouchableOpacity>

//           <View style={tw`w-4`} />

//           <TouchableOpacity
//             style={tw`bg-green-600 px-5 py-3 rounded-full`}
//             onPress={handleAddCourse}
//           >
//             <Text style={tw`text-white font-semibold text-center`}>Save Course</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }


import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import tw from "twrnc";
import { db } from "../firebase";

export default function AddCourseScreen() {
  const router = useRouter();

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [instructor, setInstructor] = useState("");
  const [location, setLocation] = useState("");

  const [classDate, setClassDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const getDayOfWeek = (date: Date) =>
    date.toLocaleDateString(undefined, { weekday: "long" });

  const handleAddCourse = async () => {
    if (!courseName || !courseCode || !instructor || !location) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (endTime <= startTime) {
      Alert.alert("Error", "Start time must be before end time");
      return;
    }

    try {
      const courseQuery = query(
        collection(db, "courses"),
        where("classDate", "==", classDate.toLocaleDateString()),
        where("location", "==", location),
        where(
          "startTime",
          "==",
          startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        )
      );
      const snapshot = await getDocs(courseQuery);

      if (!snapshot.empty) {
        Alert.alert("Conflict", "A course already exists at this time and location.");
        return;
      }

      await addDoc(collection(db, "courses"), {
        courseName,
        courseCode,
        instructor,
        location,
        classDate: classDate.toLocaleDateString(),
        dayOfWeek: getDayOfWeek(classDate),
        startTime: startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        endTime: endTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        createdAt: new Date(),
      });

      Toast.show({
        type: "success",
        text1: "✅ Course Added",
        text2: "Your course has been saved.",
        position: "bottom",
      });

      setTimeout(() => router.back(), 1500);
    } catch (error) {
      console.error("Error adding course:", error);
      Toast.show({
        type: "error",
        text1: "❌ Failed to Add",
        text2: "Please try again.",
        position: "bottom",
      });
    }
  };

  const handleCancel = () => router.push("/");

  return (
    <ScrollView contentContainerStyle={tw`flex-grow justify-center items-center p-6 bg-slate-100`}>
      <View style={tw`bg-white p-5 rounded-xl shadow-lg w-full max-w-md`}>
        <Text style={tw`text-2xl font-bold text-black text-center mb-6`}>
          Add New Course
        </Text>

        {[{ label: "Course Name", value: courseName, setter: setCourseName, placeholder: "e.g., Mobile Apps Development" },
          { label: "Course Code", value: courseCode, setter: setCourseCode, placeholder: "e.g., CSE464" },
          { label: "Instructor", value: instructor, setter: setInstructor, placeholder: "e.g., Dr. Smith" },
          { label: "Location", value: location, setter: setLocation, placeholder: "e.g., Room 101" }]
          .map((field, index) => (
            <View key={index} style={tw`mb-4`}>
              <Text style={tw`text-black mb-2`}>{field.label}</Text>
              <TextInput
                style={tw`bg-gray-200 border border-gray-300 rounded-lg p-3 text-black`}
                value={field.value}
                onChangeText={field.setter}
                placeholder={field.placeholder}
                placeholderTextColor={tw.color("gray-500")}
              />
            </View>
        ))}

        <View style={tw`mb-4`}>
          <Text style={tw`text-black mb-2`}>Class Date</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={tw`bg-gray-200 border border-gray-300 rounded-lg p-3`}
          >
            <Text style={tw`text-black`}>
              {classDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={classDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setClassDate(selectedDate);
              }}
            />
          )}
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-black mb-2`}>Start Time</Text>
          <TouchableOpacity
            onPress={() => setShowStartPicker(true)}
            style={tw`bg-gray-200 border border-gray-300 rounded-lg p-3`}
          >
            <Text style={tw`text-black`}>
              {startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Text>
          </TouchableOpacity>
          {showStartPicker && (
            <DateTimePicker
              value={startTime}
              mode="time"
              is24Hour={false}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowStartPicker(false);
                if (selectedDate) setStartTime(selectedDate);
              }}
            />
          )}
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-black mb-2`}>End Time</Text>
          <TouchableOpacity
            onPress={() => setShowEndPicker(true)}
            style={tw`bg-gray-200 border border-gray-300 rounded-lg p-3`}
          >
            <Text style={tw`text-black`}>
              {endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Text>
          </TouchableOpacity>
          {showEndPicker && (
            <DateTimePicker
              value={endTime}
              mode="time"
              is24Hour={false}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowEndPicker(false);
                if (selectedDate) setEndTime(selectedDate);
              }}
            />
          )}
        </View>

        <View style={tw`flex-row justify-center`}>
          <TouchableOpacity
            style={tw`bg-red-600 px-5 py-3 rounded-full`}
            onPress={handleCancel}
          >
            <Text style={tw`text-white font-semibold text-center`}>Cancel</Text>
          </TouchableOpacity>

          <View style={tw`w-4`} />

          <TouchableOpacity
            style={tw`bg-green-600 px-5 py-3 rounded-full`}
            onPress={handleAddCourse}
          >
            <Text style={tw`text-white font-semibold text-center`}>Save Course</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </ScrollView>
  );
}
