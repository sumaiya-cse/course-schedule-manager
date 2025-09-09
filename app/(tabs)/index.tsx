import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect, useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { db } from "../../firebase";

type Course = {
  id: string;
  courseName: string;
  courseCode: string;
  instructor: string;
  location: string;
  classDate: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
};

export default function Index() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"daily" | "weekly">("weekly");

  // Daily View State
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  /** Fetch Courses from Firestore */
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courseList: Course[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Course[];
      setCourses(courseList);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /** Refresh on Pull */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCourses();
  }, []);

  /** Auto Refresh When Returning From Course Details */
  useFocusEffect(
    useCallback(() => {
      fetchCourses();
    }, [])
  );

  useEffect(() => {
    fetchCourses();
  }, []);

  // Group courses by day for Weekly View
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const groupedCourses: { [key: string]: Course[] } = {};
  daysOfWeek.forEach((day) => {
    groupedCourses[day] = courses.filter(
      (c) => c.dayOfWeek?.toLowerCase() === day.toLowerCase()
    );
  });

  // Filter courses for Daily View
  const formattedSelectedDate = selectedDate.toLocaleDateString();
  const dailyCourses = courses.filter((c) => c.classDate === formattedSelectedDate);

  return (
    <View style={tw`flex-1 bg-gray-900`}>
      {/* Header */}
      <View style={tw`bg-gray-900 p-4 pt-10`}>
        <Text style={tw`text-white text-xl font-bold text-center`}>
          📘 Course Schedule
        </Text>
        <Text style={tw`text-center text-white text-sm mt-1`}>
          Today:{" "}
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </Text>
      </View>

      {/* Tab Selector */}
      <View style={tw`flex-row justify-center mt-3`}>
        <TouchableOpacity
          style={tw`${selectedTab === "daily" ? "bg-blue-600" : "bg-gray-700"} px-5 py-2 rounded-l-lg`}
          onPress={() => setSelectedTab("daily")}
        >
          <Text style={tw`text-white font-bold`}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`${selectedTab === "weekly" ? "bg-blue-600" : "bg-gray-700"} px-5 py-2 rounded-r-lg`}
          onPress={() => setSelectedTab("weekly")}
        >
          <Text style={tw`text-white font-bold`}>Weekly</Text>
        </TouchableOpacity>
      </View>

      {/* Show Loader */}
      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={tw`text-white mt-4`}>Loading courses...</Text>
        </View>
      ) : (
        <ScrollView
          style={tw`flex-1`}
          contentContainerStyle={tw`p-4 pb-28`}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {/* Daily View */}
          {selectedTab === "daily" && (
            <View>
              {/* Date Picker Button */}
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={tw`bg-gray-800 p-3 rounded-lg mb-4`}
              >
                <Text style={tw`text-white text-center`}>
                  Selected Date: {selectedDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) setSelectedDate(date);
                  }}
                />
              )}

              {/* Daily Courses */}
              {dailyCourses.length === 0 ? (
                <Text style={tw`text-gray-400 text-center mt-4`}>No classes scheduled</Text>
              ) : (
                dailyCourses.map((course) => (
                  <TouchableOpacity
                    key={course.id}
                    style={tw`bg-gray-800 rounded-lg p-4 mb-3 border border-gray-700`}
                    onPress={() =>
                      router.push({
                        pathname: "/course-details",
                        params: { ...course },
                      })
                    }
                  >
                    <Text style={tw`text-white text-lg font-bold`}>{course.courseName}</Text>
                    <Text style={tw`text-gray-400 text-sm`}>
                      {course.startTime} – {course.endTime} | {course.location}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}

          {/* Weekly View */}
          {selectedTab === "weekly" && (
            <View>
              {daysOfWeek.map((day) => (
                <View
                  key={day}
                  style={tw`bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700`}
                >
                  <View style={tw`flex-row justify-between items-center mb-2`}>
                    <Text style={tw`text-white font-bold text-base`}>{day}</Text>
                    <Text
                      style={tw`text-white text-xs bg-gray-600 px-2 py-0.5 rounded-full`}
                    >
                      {groupedCourses[day]?.length || 0} class
                      {groupedCourses[day]?.length !== 1 ? "es" : ""}
                    </Text>
                  </View>

                  {groupedCourses[day]?.length === 0 ? (
                    <Text style={tw`text-gray-400 text-xs`}>No classes</Text>
                  ) : (
                    groupedCourses[day].map((course) => (
                      <TouchableOpacity
                        key={course.id}
                        style={tw`mb-2 pl-2 border-l-2 border-blue-400`}
                        onPress={() =>
                          router.push({
                            pathname: "/course-details",
                            params: { ...course },
                          })
                        }
                      >
                        <Text style={tw`text-white text-sm font-semibold`}>
                          {course.courseName}
                        </Text>
                        <Text style={tw`text-gray-400 text-xs`}>
                          {course.startTime} – {course.endTime}
                        </Text>
                      </TouchableOpacity>
                    ))
                  )}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}

      {/* Add New Course Button */}
      <View
        style={tw`absolute bottom-0 left-0 right-0 bg-white px-6 py-4 border-t border-gray-200`}
      >
        <TouchableOpacity
          onPress={() => router.push("/add-course")}
          style={tw`bg-blue-600 py-3 rounded-full`}
        >
          <Text style={tw`text-white text-center font-bold text-base`}>
            + Add New Course
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}