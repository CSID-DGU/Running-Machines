export type reviewRequest = {
  difficulty: string; // LOW, MEDIUM, HIGH
  tagIds: number[]; // 해당하는 태그 id
};

export type runningRequest = {
  distance: number;
  duration: number;
  pace: number;
  courseId?: number;
};

export type runningResponse = {
  userCourseId: number;
  distance: number;
  duration: number;
  pace: number;
  courseUrl: string;
};
