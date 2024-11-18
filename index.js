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

  // 1 Compare AssignmentGroup's course_id with the CourseInfo's id. If not match, throw an error (try/catch ???)

  if (course.id !== ag.course_id) {
    throw new Error("The input is invalid: Mismatch course_id");
  }

  // 2. Iterate through the LearnerSubmissions, extract unique learner_id, use that as a value for id in the results's object

  const idArr = [];
  submissions.forEach((submission) => {
    const learnerId = submission.learner_id;
    idArr.push(learnerId);
  });
  const uniqueIdArr = [...new Set(idArr)];
  uniqueIdArr.map((uniqueId) => {
    const learnerObj = {};
    learnerObj.id = uniqueId;
    result.push(learnerObj);
  });

  // 3. Grab the assignment_id (from LearnerSubmissions), loop through AssignmentGroup to get assignments with the same id, then

  // 4. Check the due date (due_at), if it's not due date yet, we don't have to do anything (continue or break???)

  // 5. If pass due date, grab point_possible then check for potential error (0 or string. Try/catch ???)

  // 6. Then, compare submitted_at with the due date to see if it's late. (mark with Boolean variable???)

  // 7. Grab learner's score. Check isLate condition and deduct 10% from score if it's true.

  // 8. Calculate learner score percentage (score / point_possible)

  // 9. Use assignment_id as a property and learner score percentage as a value. Add them into the result's object

  // 10. grab score and point_possible from different assignments and calculate the total weighted average. Push that into the result's object.

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
// the average or the keyed dictionary of scores

// If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.

// You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string?

// Use try/catch and other logic to handle these types of errors gracefully.

// If an assignment is not yet due, do not include it in the results or the average.

// Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.
