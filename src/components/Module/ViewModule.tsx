"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { Button } from "mu";
import {
  ArrowLeft,
  Lock,
  CheckCircle,
  PlayCircle,
  List,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@mui/material";
import { useGetAllLectureByClassIdQuery } from "@/redux/api/lectureApi";

const courseModules = [
  {
    id: 1,
    title: "Getting Started",
    lectures: [
      {
        id: 1,
        title: "Introduction to Web Development",
        duration: "12:34",
        youtubeId: "dQw4w9WgXcQ",
        isCompleted: false,
        isUnlocked: true,
      },
      {
        id: 2,
        title: "Setting Up Development Environment",
        duration: "15:20",
        youtubeId: "dQw4w9WgXcQ",
        isCompleted: false,
        isUnlocked: false,
      },
    ],
  },
  {
    id: 2,
    title: "HTML Fundamentals",
    lectures: [
      {
        id: 3,
        title: "HTML Structure and Elements",
        duration: "18:45",
        youtubeId: "dQw4w9WgXcQ",
        isCompleted: false,
        isUnlocked: false,
      },
      {
        id: 4,
        title: "Forms and Input Elements",
        duration: "16:30",
        youtubeId: "dQw4w9WgXcQ",
        isCompleted: false,
        isUnlocked: false,
      },
    ],
  },
  {
    id: 3,
    title: "CSS Styling",
    lectures: [
      {
        id: 5,
        title: "CSS Basics and Selectors",
        duration: "22:15",
        youtubeId: "dQw4w9WgXcQ",
        isCompleted: false,
        isUnlocked: false,
      },
      {
        id: 6,
        title: "Flexbox and Grid Layout",
        duration: "28:40",
        youtubeId: "dQw4w9WgXcQ",
        isCompleted: false,
        isUnlocked: false,
      },
    ],
  },
  {
    id: 4,
    title: "JavaScript Programming",
    lectures: [
      {
        id: 7,
        title: "JavaScript Introduction",
        duration: "25:30",
        youtubeId: "dQw4w9WgXcQ",
        isCompleted: false,
        isUnlocked: false,
      },
      {
        id: 8,
        title: "DOM Manipulation",
        duration: "19:20",
        youtubeId: "dQw4w9WgXcQ",
        isCompleted: false,
        isUnlocked: false,
      },
    ],
  },
];

export default function ViewModule({ id }: { id: string }) {
  const router = useRouter();
  const [modules, setModules] = useState(courseModules);

  const query: Record<string, any> = {};
  if (id) {
    query["courseId"] = id;
  }

  const { data } = useGetAllLectureByClassIdQuery(query);
  console.log("data", data);
  const [currentLecture, setCurrentLecture] = useState({
    moduleIndex: 0,
    lectureIndex: 0,
  });
  const [showSidebar, setShowSidebar] = useState(true);
  const [collapsedModules, setCollapsedModules] = useState<number[]>([]);

  const getCurrentLecture = () => {
    return modules[currentLecture.moduleIndex]?.lectures[
      currentLecture.lectureIndex
    ];
  };

  const getAllLectures = () => {
    return modules.flatMap((module) => module.lectures);
  };

  const findLecturePosition = (lectureId: number) => {
    for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
      const lectureIndex = modules[moduleIndex].lectures.findIndex(
        (lecture) => lecture.id === lectureId
      );
      if (lectureIndex !== -1) {
        return { moduleIndex, lectureIndex };
      }
    }
    return null;
  };

  const currentLectureData = getCurrentLecture();

  const handleVideoComplete = () => {
    const updatedModules = [...modules];
    updatedModules[currentLecture.moduleIndex].lectures[
      currentLecture.lectureIndex
    ].isCompleted = true;

    const allLectures = getAllLectures();
    const currentGlobalIndex = allLectures.findIndex(
      (lecture) => lecture.id === currentLectureData.id
    );

    if (currentGlobalIndex + 1 < allLectures.length) {
      const nextLecture = allLectures[currentGlobalIndex + 1];
      const nextPosition = findLecturePosition(nextLecture.id);
      if (nextPosition) {
        updatedModules[nextPosition.moduleIndex].lectures[
          nextPosition.lectureIndex
        ].isUnlocked = true;
      }
    }

    setModules(updatedModules);
  };

  const handleNextVideo = () => {
    const allLectures = getAllLectures();
    const currentGlobalIndex = allLectures.findIndex(
      (lecture) => lecture.id === currentLectureData.id
    );

    if (currentGlobalIndex + 1 < allLectures.length) {
      const nextLecture = allLectures[currentGlobalIndex + 1];
      const nextPosition = findLecturePosition(nextLecture.id);
      if (nextPosition && nextLecture.isUnlocked) {
        setCurrentLecture(nextPosition);
      }
    }
  };

  const handleLectureSelect = (moduleIndex: number, lectureIndex: number) => {
    const lecture = modules[moduleIndex].lectures[lectureIndex];
    if (lecture.isUnlocked) {
      setCurrentLecture({ moduleIndex, lectureIndex });
    }
  };

  const toggleModule = (moduleId: number) => {
    setCollapsedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const totalLectures = getAllLectures().length;
  const completedLectures = getAllLectures().filter(
    (lecture) => lecture.isCompleted
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Video Player Section */}
        <div
          className={`flex-1 ${
            showSidebar ? "lg:mr-80" : ""
          } transition-all duration-300`}
        >
          {/* Header */}
          <div className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between">
              <Button
                //     variant="ghost"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Course
              </Button>
              <Button
                //     variant="ghost"
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden flex items-center gap-2"
              >
                <List className="h-4 w-4" />
                Lessons
              </Button>
            </div>
          </div>

          {/* Video Player */}
          <div className="p-4">
            <div className="aspect-video bg-black rounded-lg mb-6 relative overflow-hidden">
              {currentLectureData?.isUnlocked ? (
                <iframe
                  src={`https://www.youtube.com/embed/${currentLectureData.youtubeId}?enablejsapi=1`}
                  title={currentLectureData.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-900">
                  <div className="text-center text-white">
                    <Lock className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">Video Locked</h3>
                    <p className="text-gray-400">
                      Complete the previous video to unlock this lesson
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="mb-6">
              <div className="text-sm text-primary font-medium mb-1">
                {modules[currentLecture.moduleIndex]?.title}
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {currentLectureData?.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <PlayCircle className="h-4 w-4" />
                  {currentLectureData?.duration}
                </span>
                <span>
                  Lesson{" "}
                  {getAllLectures().findIndex(
                    (l) => l.id === currentLectureData?.id
                  ) + 1}{" "}
                  of {totalLectures}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {currentLectureData?.isUnlocked &&
                !currentLectureData?.isCompleted && (
                  <Button
                    onClick={handleVideoComplete}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Mark as Complete
                  </Button>
                )}

              {currentLectureData?.isCompleted &&
                getAllLectures().findIndex(
                  (l) => l.id === currentLectureData?.id
                ) +
                  1 <
                  totalLectures && (
                  <Button
                    onClick={handleNextVideo}
                    className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                  >
                    Next Lesson
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}

              {currentLectureData?.isCompleted &&
                getAllLectures().findIndex(
                  (l) => l.id === currentLectureData?.id
                ) +
                  1 >=
                  totalLectures && (
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Course Complete! 🎉
                  </Button>
                )}
            </div>
          </div>
        </div>

        {/* Sidebar - Course Content */}
        <div
          className={`fixed right-0 top-0 h-full w-80 bg-card border-l border-border transform transition-transform duration-300 z-40 ${
            showSidebar ? "translate-x-0" : "translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Course Content
              </h2>
              <Button
                //     variant="ghost"
                //     size="sm"
                onClick={() => setShowSidebar(false)}
                className="lg:hidden"
              >
                ×
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {completedLectures} of {totalLectures} lessons completed
            </p>
          </div>

          <div className="overflow-y-auto h-full pb-20">
            {modules.map((module, moduleIndex) => (
              <div key={module.id} className="border-b border-border">
                {/* Module Header */}
                <div
                  className="p-4 cursor-pointer hover:bg-muted/50 flex items-center justify-between"
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {module.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {module.lectures.filter((l) => l.isCompleted).length} of{" "}
                      {module.lectures.length} completed
                    </p>
                  </div>
                  {collapsedModules.includes(module.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>

                {/* Module Lectures */}
                {!collapsedModules.includes(module.id) && (
                  <div className="bg-muted/20">
                    {module.lectures.map((lecture, lectureIndex) => (
                      <div
                        key={lecture.id}
                        className={`p-4 pl-8 border-b border-border/50 cursor-pointer transition-colors ${
                          moduleIndex === currentLecture.moduleIndex &&
                          lectureIndex === currentLecture.lectureIndex
                            ? "bg-primary/10 border-l-4 border-l-primary"
                            : "hover:bg-muted/50"
                        } ${
                          !lecture.isUnlocked
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() =>
                          handleLectureSelect(moduleIndex, lectureIndex)
                        }
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {lecture.isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : lecture.isUnlocked ? (
                              <PlayCircle className="h-5 w-5 text-primary" />
                            ) : (
                              <Lock className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-medium text-sm mb-1 ${
                                lecture.isUnlocked
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {lecture.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {lecture.duration}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Overlay for mobile sidebar */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}
      </div>
    </div>
  );
}
