"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
// const QuizCards = ({ lesson }) => {
//   const [answers, setAnswers] = React.useState({});
//   const [questionState, setQuestionState] = React.useState({});
//   const checkAnswer = React.useCallback(() => {
//     const newQuestionState = { ...questionState };
//     lesson.questions.forEach((question) => {
//       const user_answer = answers[question.id];
//       if (!user_answer) return;
//       if (user_answer === question.correctAnswer) {
//         newQuestionState[question.id] = true;
//       } else {
//         newQuestionState[question.id] = false;
//       }
//       setQuestionState(newQuestionState);
//     });
//   }, [answers, questionState, lesson.questions]);
//   return (
//     <div className="my-16 flex-[1] px-3">
//       <h1 className="text-center text-3xl font-bold">
//         <span className="font-handwrite text-4xl text-primary">Concept</span>{" "}
//         Check
//       </h1>
//       <div className="mt-2">
//         {lesson.questions.map((question) => {
//           const options = JSON.parse(question.answers);
//           return (
//             <div
//               key={question.id}
//               className={cn("mt-4 rounded-lg border border-secondary p-3", {
//                 "bg-green-700": questionState[question.id] === true,
//                 "bg-red-700": questionState[question.id] === false,
//                 "bg-secondary": questionState[question.id] === null,
//               })}
//             >
//               <h1 className="text-lg font-semibold">{question.question}</h1>
//               <div className="mt-2">
//                 <RadioGroup
//                   onValueChange={(e) => {
//                     setAnswers((prev) => {
//                       return {
//                         ...prev,
//                         [question.id]: e,
//                       };
//                     });
//                   }}
//                 >
//                   {options.map((option, index) => {
//                     return (
//                       <div className="flex items-center space-x-2" key={index}>
//                         <RadioGroupItem
//                           value={option}
//                           id={question.id + index.toString()}
//                         />
//                         <Label htmlFor={question.id + index.toString()}>
//                           {option}
//                         </Label>
//                       </div>
//                     );
//                   })}
//                 </RadioGroup>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <Button className="mt-2 w-full" size="lg" onClick={checkAnswer}>
//         Check Answer
//       </Button>
//     </div>
//   );
// };

export default function QuizCards({ lesson }) {
  let cntProv = 0;
  const correctAnswers = lesson.questions.map((question) => {
    return question.correctAnswer;
  });
  const [punctaj, setPunctaj] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const [questionState, setQuestionState] = React.useState([]);

  // console.log(correctAnswers);
  async function ModificariMajore() {
    for (let i = 0; i < answers.length; i++)
      if (correctAnswers[i] !== answers[i].response)
        setQuestionState((prev) => [...prev, false]);
      else setQuestionState((prev) => [...prev, true]);
    for (let i = 0; i < questionState.length; i++) {
      if (questionState[i] === true) {
        setPunctaj((pct) => pct + 25);
      }
    }
  }

  async function checkAnswerFront() {
    console.log(answers);
    if (answers.length !== correctAnswers.length) {
      alert("hai bai baiatule, completeaza tot");
      return;
    }
    await ModificariMajore();
    const res = axios.post("/api/course/quizHandle", {
      punctaj: punctaj,
      answers: answers,
      questionState: questionState,
      lessonId: lesson.id,
    });
    console.log(punctaj);
    console.log(questionState);
  }

  const handleValueChange = (selectedOption, questionIndex) => {
    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex(
        (answer) => answer.index === questionIndex,
      );

      if (existingAnswerIndex !== -1) {
        // Update the response for the existing question index
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = {
          response: selectedOption,
          index: questionIndex,
        };
        return updatedAnswers;
      } else {
        // Add a new object for the new question index at the correct position
        const sortedAnswers = [
          ...prev,
          {
            response: selectedOption,
            index: questionIndex,
          },
        ].sort((a, b) => a.index - b.index);

        return sortedAnswers;
      }
    });
  };

  return (
    <div className="mb-32 mt-16 flex-[1] px-3">
      <h1 className="text-center text-3xl font-bold">
        <span className="font-handwrite text-4xl text-primary">Concept</span>{" "}
        Check
      </h1>
      <div className="mt-2">
        {lesson.questions.map((question, index) => {
          const options = JSON.parse(question.answers);
          return (
            <div
              key={question.id}
              className={`mt-4 rounded-lg border border-secondary p-3 ${
                questionState.length > 0
                  ? questionState[index] === true
                    ? "bg-green-800"
                    : "bg-red-800"
                  : "bg-none"
              }`}
            >
              <h1 className="text-lg font-semibold">{question.question}</h1>
              <div className="mt-2">
                <RadioGroup
                  onValueChange={(e) => {
                    handleValueChange(e, index);
                  }}
                >
                  {options.map((option, index) => {
                    return (
                      <div className="flex items-center space-x-2" key={index}>
                        <RadioGroupItem
                          value={option}
                          id={question.id + index.toString()}
                        />
                        <Label htmlFor={question.id + index.toString()}>
                          {option}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        className="mt-2 w-full"
        size="lg"
        disabled={questionState.length === 0 ? false : true}
        onClick={checkAnswerFront}
      >
        Check Answer
      </Button>
    </div>
  );
}
