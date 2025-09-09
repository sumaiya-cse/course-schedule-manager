import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <ScrollView style={tw`flex-1 bg-gray-900`}>
      {/* Header */}
      <View style={tw`p-6 bg-blue-600 rounded-b-3xl shadow-lg`}>
        <Text style={tw`text-white text-2xl font-bold text-center`}>
          📘 Course Schedule Manager
        </Text>
        <Text style={tw`text-white text-center mt-1`}>
          Manage, track, and organize your courses easily
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={tw`p-5`}>
        <Text style={tw`text-white text-lg font-semibold mb-4`}>Quick Actions</Text>

        {/* View All Courses */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/")}
        >
          <Text style={styles.buttonText}>📅 View All Courses</Text>
        </TouchableOpacity>

        {/* Add New Course */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/add-course")}
        >
          <Text style={styles.buttonText}>➕ Add New Course</Text>
        </TouchableOpacity>

        {/* Explore by Date & Week */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/")}
        >
          <Text style={styles.buttonText}>🗓 Explore Schedule</Text>
        </TouchableOpacity>
      </View>

      {/* App Information */}
      <View style={tw`p-5 mt-4 bg-gray-800 rounded-xl mx-4 mb-6`}>
        <Text style={tw`text-white text-lg font-semibold mb-3`}>👩‍💻 Developer Information</Text>
        <Text style={tw`text-gray-300`}>
          <Text style={tw`font-semibold text-white`}>Name:</Text> Sumaiya Rahman
        </Text>
        <Text style={tw`text-gray-300`}>
          <Text style={tw`font-semibold text-white`}>ID:</Text> 223010412
        </Text>
        <Text style={tw`text-gray-300`}>
          <Text style={tw`font-semibold text-white`}>Section:</Text> 3
        </Text>
        <Text style={tw`text-gray-300`}>
          <Text style={tw`font-semibold text-white`}>Version:</Text> 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2563EB", // Blue color
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});