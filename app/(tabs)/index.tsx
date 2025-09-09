// import { useRouter } from "expo-router";
// import { collection, getDocs } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View
// } from "react-native";
// import tw from "twrnc";
// import { db } from "../../firebase";

// type Course = {
//   id: string;
//   courseName: string;
//   dayOfWeek: string;
//   startTime: string;
//   endTime: string;
// };

// export default function Index() {
//   const router = useRouter();
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchCourses = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "courses"));
//       const courseList: Course[] = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Course[];
//       setCourses(courseList);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const daysOfWeek = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const groupedCourses: { [key: string]: Course[] } = {};
//   daysOfWeek.forEach((day) => {
//     groupedCourses[day] = courses.filter(
//       (c) => c.dayOfWeek?.toLowerCase() === day.toLowerCase()
//     );
//   });

//   return (
//     <View style={tw`flex-1 bg-gray-900`}>
//       {/* Top Title */}
//       <View style={tw`bg-gray-900 p-4 pt-10`}>
//         <Text style={tw`text-white text-xl font-bold text-center`}>
//           📘 Course Schedule
//         </Text>
//         <Text style={tw`text-center text-white text-sm mt-1`}>
//           Today: {new Date().toLocaleDateString("en-GB", {
//             weekday: "long",
//             day: "2-digit",
//             month: "long",
//             year: "numeric",
//           })}
//         </Text>
//       </View>

//       {/* Content */}
//       {loading ? (
//         <View style={tw`flex-1 justify-center items-center`}>
//           <ActivityIndicator size="large" color="#fff" />
//           <Text style={tw`text-white mt-4`}>Loading courses...</Text>
//         </View>
//       ) : (
//         <ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4 pb-28`}>
//           {daysOfWeek.map((day) => (
//             <View
//               key={day}
//               style={tw`bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700`}
//             >
//               <View style={tw`flex-row justify-between items-center mb-2`}>
//                 <Text style={tw`text-white font-bold text-base`}>{day}</Text>
//                 <Text
//                   style={tw`text-white text-xs bg-gray-600 px-2 py-0.5 rounded-full`}
//                 >
//                   {groupedCourses[day]?.length || 0} class
//                   {groupedCourses[day]?.length !== 1 ? "es" : ""}
//                 </Text>
//               </View>

//               {groupedCourses[day]?.length === 0 ? (
//                 <Text style={tw`text-gray-400 text-xs`}>No classes</Text>
//               ) : (
//                 groupedCourses[day].map((course) => (
//                   <View
//                     key={course.id}
//                     style={tw`mb-2 pl-2 border-l-2 border-blue-400`}
//                   >
//                     <Text style={tw`text-white text-sm font-semibold`}>
//                       {course.courseName}
//                     </Text>
//                     <Text style={tw`text-gray-400 text-xs`}>
//                       {course.startTime} – {course.endTime}
//                     </Text>
//                   </View>
//                 ))
//               )}
//             </View>
//           ))}
//         </ScrollView>
//       )}

//       {/* Bottom Add Button */}
//       <View
//         style={tw`absolute bottom-0 left-0 right-0 bg-white px-6 py-4 border-t border-gray-200`}
//       >
//         <TouchableOpacity
//           onPress={() => router.push("/add-course")}
//           style={tw`bg-blue-600 py-3 rounded-full`}
//         >
//           <Text style={tw`text-white text-center font-bold text-base`}>
//             + Add New Course
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

//Need Later for design landing page
// import { useRouter } from "expo-router";
// import { collection, getDocs } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import tw from "twrnc";
// import { db } from "../../firebase";

// type Course = {
//   id: string;
//   courseName: string;
//   dayOfWeek: string;
//   startTime: string;
//   endTime: string;
// };

// export default function Index() {
//   const router = useRouter();
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("Schedule");

//   const fetchCourses = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "courses"));
//       const courseList: Course[] = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Course[];
//       setCourses(courseList);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const daysOfWeek = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const groupedCourses: { [key: string]: Course[] } = {};
//   daysOfWeek.forEach((day) => {
//     groupedCourses[day] = courses.filter(
//       (c) => c.dayOfWeek?.toLowerCase() === day.toLowerCase()
//     );
//   });

//   const today = new Date().toLocaleDateString("en-GB", {
//     weekday: "long",
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <View style={tw`flex-1 bg-black`}>
//       {/* Header */}
//       <View style={tw`flex-row justify-between items-center p-4`}>
//         <Text style={tw`text-white text-xl font-bold`}>📘 Course Schedule</Text>
//         <TouchableOpacity
//           style={tw`bg-white px-4 py-2 rounded-md`}
//           onPress={() => router.push("/add-course")}
//         >
//           <Text style={tw`text-black font-semibold text-sm`}>+ Add Course</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Tab Row */}
//       <View style={tw`flex-row justify-between bg-[#111] mx-4 p-1 rounded-lg`}>
//         {["Schedule", "Day View", "Courses"].map((tab) => (
//           <TouchableOpacity
//             key={tab}
//             style={tw`flex-1 items-center py-2 rounded-md ${
//               activeTab === tab ? "bg-white" : ""
//             }`}
//             onPress={() => setActiveTab(tab)}
//           >
//             <Text
//               style={tw`${
//                 activeTab === tab ? "text-black font-semibold" : "text-white"
//               } text-sm`}
//             >
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Today's Date */}
//       <View style={tw`mt-4 mb-2 px-4`}>
//         <Text style={tw`text-center text-white text-sm`}>
//           Today: {today}
//         </Text>
//       </View>

//       {/* Schedule View */}
//       {loading ? (
//         <View style={tw`flex-1 justify-center items-center`}>
//           <ActivityIndicator size="large" color="white" />
//           <Text style={tw`text-white mt-3`}>Loading schedule...</Text>
//         </View>
//       ) : (
//         <ScrollView contentContainerStyle={tw`px-4 pb-6`}>
//           {daysOfWeek.map((day) => (
//             <View
//               key={day}
//               style={tw`border border-gray-700 rounded-xl px-4 py-3 mb-4 bg-[#111]`}
//             >
//               {/* Day Header */}
//               <View style={tw`flex-row justify-between items-center`}>
//                 <Text style={tw`text-white text-base font-bold`}>{day}</Text>
//                 <Text
//                   style={tw`bg-gray-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold`}
//                 >
//                   {groupedCourses[day]?.length || 0} classes
//                 </Text>
//               </View>

//               {/* Classes */}
//               {groupedCourses[day]?.length === 0 ? (
//                 <Text style={tw`text-gray-400 text-sm mt-2`}>
//                   No classes scheduled
//                 </Text>
//               ) : (
//                 groupedCourses[day].map((course) => (
//                   <View key={course.id} style={tw`mt-2 ml-2`}>
//                     <Text style={tw`text-white text-sm font-medium`}>
//                       {course.courseName}
//                     </Text>
//                     <Text style={tw`text-gray-400 text-xs`}>
//                       {course.startTime} – {course.endTime}
//                     </Text>
//                   </View>
//                 ))
//               )}
//             </View>
//           ))}
//         </ScrollView>
//       )}
//     </View>
//   );
// }

// ✅ index.tsx
// import { useRouter } from "expo-router";
// import { collection, getDocs } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Toast from "react-native-toast-message";
// import tw from "twrnc";
// import { db } from "../../firebase";

// type Course = {
//   id: string;
//   courseName: string;
//   dayOfWeek: string;
//   startTime: string;
//   endTime: string;
// };

// export default function Index() {
//   const router = useRouter();
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchCourses = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "courses"));
//       const courseList: Course[] = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Course[];
//       setCourses(courseList);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const daysOfWeek = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const groupedCourses: { [key: string]: Course[] } = {};
//   daysOfWeek.forEach((day) => {
//     groupedCourses[day] = courses.filter(
//       (c) => c.dayOfWeek?.toLowerCase() === day.toLowerCase()
//     );
//   });

//   return (
//     <View style={tw`flex-1 bg-gray-900`}>
//       {/* Top Title */}
//       <View style={tw`bg-gray-900 p-4 pt-10`}>
//         <Text style={tw`text-white text-xl font-bold text-center`}>
//           📘 Course Schedule
//         </Text>
//         <Text style={tw`text-center text-white text-sm mt-1`}>
//           Today: {new Date().toLocaleDateString("en-GB", {
//             weekday: "long",
//             day: "2-digit",
//             month: "long",
//             year: "numeric",
//           })}
//         </Text>
//       </View>

//       {/* Content */}
//       {loading ? (
//         <View style={tw`flex-1 justify-center items-center`}>
//           <ActivityIndicator size="large" color="#fff" />
//           <Text style={tw`text-white mt-4`}>Loading courses...</Text>
//         </View>
//       ) : (
//         <ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4 pb-28`}>
//           {daysOfWeek.map((day) => (
//             <View
//               key={day}
//               style={tw`bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700`}
//             >
//               <View style={tw`flex-row justify-between items-center mb-2`}>
//                 <Text style={tw`text-white font-bold text-base`}>{day}</Text>
//                 <Text
//                   style={tw`text-white text-xs bg-gray-600 px-2 py-0.5 rounded-full`}
//                 >
//                   {groupedCourses[day]?.length || 0} class
//                   {groupedCourses[day]?.length !== 1 ? "es" : ""}
//                 </Text>
//               </View>

//               {groupedCourses[day]?.length === 0 ? (
//                 <Text style={tw`text-gray-400 text-xs`}>No classes</Text>
//               ) : (
//                 groupedCourses[day].map((course) => (
//                   <View
//                     key={course.id}
//                     style={tw`mb-2 pl-2 border-l-2 border-blue-400`}
//                   >
//                     <Text style={tw`text-white text-sm font-semibold`}>
//                       {course.courseName}
//                     </Text>
//                     <Text style={tw`text-gray-400 text-xs`}>
//                       {course.startTime} – {course.endTime}
//                     </Text>
//                   </View>
//                 ))
//               )}
//             </View>
//           ))}
//         </ScrollView>
//       )}

//       {/* Bottom Add Button */}
//       <View
//         style={tw`absolute bottom-0 left-0 right-0 bg-white px-6 py-4 border-t border-gray-200`}
//       >
//         <TouchableOpacity
//           onPress={() => router.push("/add-course")}
//           style={tw`bg-blue-600 py-3 rounded-full`}
//         >
//           <Text style={tw`text-white text-center font-bold text-base`}>
//             + Add New Course
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <Toast />
//     </View>
//   );
// }

// import { useRouter } from "expo-router";
// import { collection, getDocs } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import tw from "twrnc";
// import { db } from "../../firebase"; // adjust path as needed

// type Course = {
//   id: string;
//   courseName: string;
//   dayOfWeek: string;
//   startTime: string;
//   endTime: string;
// };

// export default function CourseScheduleScreen() {
//   const router = useRouter();
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchCourses = async () => {
//     try {
//       const snapshot = await getDocs(collection(db, "courses"));
//       const list: Course[] = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Course[];
//       setCourses(list);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const daysOfWeek = [
//     "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
//   ];

//   const groupedCourses: { [key: string]: Course[] } = {};
//   daysOfWeek.forEach((day) => {
//     groupedCourses[day] = courses.filter(
//       (course) => course.dayOfWeek?.toLowerCase() === day.toLowerCase()
//     );
//   });

//   return (
//     <View style={tw`flex-1 bg-gray-900`}>
//       {/* Header */}
//       <View style={tw`bg-gray-800 p-5 pt-10`}>
//         <Text style={tw`text-white text-2xl font-bold text-center`}>📘 Course Schedule</Text>
//         <Text style={tw`text-center text-gray-300 text-sm mt-1`}>
//           Today: {new Date().toLocaleDateString("en-GB", {
//             weekday: "long",
//             day: "2-digit",
//             month: "long",
//             year: "numeric",
//           })}
//         </Text>
//       </View>

//       {/* Content */}
//       {loading ? (
//         <View style={tw`flex-1 justify-center items-center`}>
//           <ActivityIndicator size="large" color="#fff" />
//           <Text style={tw`text-white mt-4`}>Loading courses...</Text>
//         </View>
//       ) : (
//         <ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4 pb-28`}>
//           {daysOfWeek.map((day) => (
//             <View key={day} style={tw`bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700`}>
//               <View style={tw`flex-row justify-between items-center mb-2`}>
//                 <Text style={tw`text-white font-bold text-base`}>{day}</Text>
//                 <Text style={tw`text-white text-xs bg-gray-600 px-2 py-0.5 rounded-full`}>
//                   {groupedCourses[day]?.length || 0} class{groupedCourses[day]?.length !== 1 ? "es" : ""}
//                 </Text>
//               </View>

//               {groupedCourses[day]?.length === 0 ? (
//                 <Text style={tw`text-gray-400 text-xs`}>No classes</Text>
//               ) : (
//                 groupedCourses[day].map((course) => (
//                   <View
//                     key={course.id}
//                     style={tw`mb-2 pl-2 border-l-2 border-blue-400`}
//                   >
//                     <Text style={tw`text-white text-sm font-semibold`}>
//                       {course.courseName}
//                     </Text>
//                     <Text style={tw`text-gray-400 text-xs`}>
//                       {course.startTime} – {course.endTime}
//                     </Text>
//                   </View>
//                 ))
//               )}
//             </View>
//           ))}
//         </ScrollView>
//       )}

//       {/* Add Button */}
//       <View style={tw`absolute bottom-0 left-0 right-0 bg-white px-6 py-4 border-t border-gray-200`}>
//         <TouchableOpacity
//           onPress={() => router.push("/add-course")}
//           style={tw`bg-blue-600 py-3 rounded-full`}
//         >
//           <Text style={tw`text-white text-center font-bold text-base`}>
//             + Add New Course
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

export default function HomeScreen() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "courses"));
      const courseList: Course[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Course[];
      setCourses(courseList);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const groupedCourses: { [key: string]: Course[] } = {};
  daysOfWeek.forEach((day) => {
    groupedCourses[day] = courses.filter(
      (c) => c.dayOfWeek?.toLowerCase() === day.toLowerCase()
    );
  });

  return (
    <View style={tw`flex-1 bg-gray-900`}>
      {/* Top Header */}
      <View style={tw`bg-gray-800 p-5 pt-12`}>
        <Text style={tw`text-white text-2xl font-bold text-center`}>
          📘 Course Schedule
        </Text>
        <Text style={tw`text-center text-gray-300 text-sm mt-1`}>
          Today:{" "}
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </Text>
      </View>

      {/* Loading */}
      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={tw`text-white mt-4`}>Loading courses...</Text>
        </View>
      ) : (
        <ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4 pb-28`}>
          {daysOfWeek.map((day) => (
            <View
              key={day}
              style={tw`bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700`}
            >
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-white font-bold text-base`}>{day}</Text>
                <Text style={tw`text-white text-xs bg-gray-600 px-2 py-0.5 rounded-full`}>
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
                    onPress={() =>
                      router.push({
                        pathname: "/course-details",
                        params: { ...course },
                      })
                    }
                    style={tw`mb-2 pl-2 border-l-2 border-blue-400`}
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
