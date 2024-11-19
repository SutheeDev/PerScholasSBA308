// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  const result = [];

  // Throw an error for course id mismatch
  if (course.id !== ag.course_id) {
    throw new Error("Error: Mismatch course_id");
  }

  // Extract unique learner_id, push to the results's object
  const extractLearnerId = (submissions) => {
    const idArr = [];
    submissions.forEach((submission) => {
      const learnerId = submission.learner_id;
      idArr.push(learnerId);
    });
    const uniqueIdArr = [...new Set(idArr)];
    uniqueIdArr.map((uniqueId) => {
      const learnerObj = {};
      learnerObj.id = uniqueId;
      learnerObj.totalScore = 0;
      learnerObj.maxScore = 0;
      result.push(learnerObj);
    });
  };
  extractLearnerId(submissions);

  // Loop through learnerSubmissions and assignments
  for (let i = 0; i < submissions.length; i++) {
    const learnerId = submissions[i].learner_id;
    const assignmentId = submissions[i].assignment_id;
    const submitDate = submissions[i].submission.submitted_at;
    let score = submissions[i].submission.score;

    for (let j = 0; j < ag.assignments.length; j++) {
      if (assignmentId === ag.assignments[j].id) {
        const dueDate = ag.assignments[j].due_at;
        const maxPoints = ag.assignments[j].points_possible;

        // Check potential error for points_possible
        if (isNaN(maxPoints) || maxPoints === 0) {
          throw new Error("Error: Invlid points_possible");
        }

        const presentDate = new Date();
        const submitDateStr = new Date(submitDate);
        const dueDateStr = new Date(dueDate);

        // If it's not due date yet, continue
        if (dueDateStr > presentDate) {
          continue;
        }
        // If submit late, deduct points
        if (submitDateStr > dueDateStr) {
          score = score - (score * 10) / 100;
        }
        // Calculate learner score percentage
        const assignmentScore = score / maxPoints;
        // Add score and assignmentId to result array
        for (let k = 0; k < result.length; k++) {
          if (learnerId === result[k].id) {
            result[k][assignmentId] = assignmentScore;
            // Increment totalScore and maxScore
            result[k].totalScore += score;
            result[k].maxScore += maxPoints;
          } else {
            continue;
          }
        }
      } else {
        continue;
      }
    }
  }

  // Calculate avg. and delete toatlScore and maxScore from obj array.
  result.forEach((obj) => {
    obj.avg = obj.totalScore / obj.maxScore;
    delete obj.totalScore;
    delete obj.maxScore;
  });

  // const result = [
  //   {
  //     id: 125,
  //     avg: 0.985, // (47 + 150) / (50 + 150)
  //     1: 0.94, // 47 / 50
  //     2: 1.0, // 150 / 150
  //   },
  //   {
  //     id: 132,
  //     avg: 0.82, // (39 + 125) / (50 + 150)
  //     1: 0.78, // 39 / 50
  //     2: 0.833, // late: (140 - 15) / 150
  //   },
  // ];

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

// the ID of the learner for which this data has been collected
// "id": number,

// the learner’s total, weighted average, in which assignments
// with more points_possible should be counted for more
// e.g. a learner with 50/100 on one assignment and 190/200 on another
// would have a weighted average score of 240/300 = 80%.
// "avg": number,

// each assignment should have a key with its ID,
// and the value associated with it should be the percentage that
// the learner scored on the assignment (submission.score / points_possible)
// <assignment_id>: number,

// if an assignment is not yet due, it should not be included in either
// the average or the keyed dictionary of scores //

// If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program. //

// You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string?

// Use try/catch and other logic to handle these types of errors gracefully.

// If an assignment is not yet due, do not include it in the results or the average.

// Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.
