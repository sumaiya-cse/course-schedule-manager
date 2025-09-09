import { useRouter } from "expo-router";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const q = query(collection(db, "courses"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const courseList: Course[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Course[];

      setCourses(courseList);
      setLoading(false);
      setRefreshing(false);
    });

    return () => unsubscribe();
  }, []);

  const groupedCourses: { [key: string]: Course[] } = {};
  daysOfWeek.forEach((day) => {
    groupedCourses[day] = courses.filter(
      (c) => c.dayOfWeek?.toLowerCase() === day.toLowerCase()
    );
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <View style={tw`flex-1 bg-gray-900`}>
      {/* Top Title */}
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

      {/* Content */}
      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={tw`text-white mt-4`}>Loading courses...</Text>
        </View>
      ) : (
        <ScrollView
          style={tw`flex-1`}
          contentContainerStyle={tw`p-4 pb-28`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
        </ScrollView>
      )}

      {/* Bottom Add Button */}
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