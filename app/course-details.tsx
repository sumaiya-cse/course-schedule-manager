import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function CourseDetails() {
  const router = useRouter();
  const {
    courseName,
    courseCode,
    instructor,
    location,
    classDate,
    dayOfWeek,
    startTime,
    endTime,
  } = useLocalSearchParams();

  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      <View style={tw`bg-white rounded-xl shadow p-6 m-4`}>
        <Text style={tw`text-2xl font-bold text-gray-800 mb-2`}>
          {courseName}
        </Text>
        <Text style={tw`text-gray-600 text-base mb-2`}>
          📘 Course Code: {courseCode}
        </Text>
        <Text style={tw`text-gray-600 text-base mb-2`}>
          👨‍🏫 Instructor: {instructor}
        </Text>
        <Text style={tw`text-gray-600 text-base mb-2`}>
          🏫 Location: {location}
        </Text>
        <Text style={tw`text-gray-600 text-base mb-2`}>
          📅 Date: {classDate} ({dayOfWeek})
        </Text>
        <Text style={tw`text-gray-600 text-base mb-2`}>
          🕒 Time: {startTime} – {endTime}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.back()}
        style={tw`mx-4 mt-2 bg-blue-600 p-3 rounded-full`}
      >
        <Text style={tw`text-white text-center font-semibold`}>
          ← Back to Schedule
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
