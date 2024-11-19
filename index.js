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

// Function to setup each learner object
const setUpResult = (id) => {
  const learnerObj = {};
  learnerObj.id = id;
  learnerObj.totalScore = 0;
  learnerObj.maxScore = 0;
  return learnerObj;
};

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
      const learnerObj = setUpResult(uniqueId);
      result.push(learnerObj);
    });
  };
  extractLearnerId(submissions);

  try {
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
            throw new Error("Error: Invalid points_possible");
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
          for (const obj of result) {
            if (learnerId === obj.id) {
              obj[assignmentId] = assignmentScore;
              // Increment totalScore and maxScore
              obj.totalScore += score;
              obj.maxScore += maxPoints;
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
  } catch (error) {
    throw new Error("Error: something went wrong");
  }

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

/*
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0, // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833, // late: (140 - 15) / 150
    },
  ];
*/

/*
Check requirement
1. let and const - done
2. use operator - done
3. use string, number, and boolean
4. use two if/else - done
5. use try/catch - done
6. two types of loop - done
7. one break or continue - done
8. manipulate array and object - done
9. use function - done
10. outputs processed data as described - done
11. no error - done
12. commit - done
13. include README - done
*/
