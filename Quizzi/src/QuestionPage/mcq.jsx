import { useEffect, useState } from "react";
import "./mcq.css";
import Checkbox from "./checkbox";
import { useParams } from "react-router";
import axios from "axios";

function MCQ() {
  const [questions,setQuestions] = useState([{id:1,question:"hi",option1:'',option2:'',option3:'',option4:''}]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  let params = useParams();
  


  useEffect(() => {
   axios.get(
      `http://localhost:8000/api/getTests?test=${params.test}`,
      
      { headers: { "Content-Type": "multipart/form-data" } }
    ).then(response => setQuestions(response.data));
    console.log(questions)
  }, []);


  function handleNextButton() {
    if (currentQuestionIndex === questions.length - 1) {
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }

  function handlePreviousButton() {
    if (currentQuestionIndex === 0) {
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  }

  function onChangebutton(e) {
    for (let i = 1; i <= 4; i++) {
      let element = document.getElementById(i);
      if (
        element &&
        element.type === "checkbox" &&
        e.target.id !== element.id
      ) {
        element.checked = false;
      }
    }
  }
  return (
    <>
      <div className="bg-black h-[100vh]">
        <div className=" bg-white  shadow-md w-full h-[7vh]  flex justify-end">
          <div className="flex gap-2 mt-2">
            <button onClick={handleNextButton} class="nextButton">
              <div>
                <span>Next</span>
              </div>
            </button >
            <button onClick={handlePreviousButton} class="nextButton">
              <div>
                <span>Back</span>
              </div>
            </button>
          </div>
        </div>

        <div className="w-[50vw] h-[18vh]  rounded-lg shadow-md oswald-font relative left-[30%] mt-10 bg-white">
          <h2 className="p-3">Question 1-10</h2>
          <p className="p-3">Choose Appropriate options A,B,C or D</p>
        </div>
        <div className="  w-[10vw]  rounded-lg shadow-md oswald-font relative left-[30%] mt-10 bg-white">
          <h2 className="oswald-font  text-center p-3">QUESTION 1/3</h2>
        </div>

        <div
          id="question-window"
          className="w-[50vw] h-[50vh]  rounded-lg shadow-md oswald-font relative left-[30%] mt-10 bg-black text-white"
        >
          <div className="">
            <h2 className="">Question</h2>
            <div className="bg-gray-100 rounded-lg w-full">
              <h2 className="p-2 text-gray-500 ">
                {questions[currentQuestionIndex].question}
              </h2>
            </div>

            <h2 className="my-2">Choice</h2>
            <div className="flex gap-3 mx-2 flex-col">
              <Checkbox
                option={questions[currentQuestionIndex].option01}
                id="1"
                onChangebutton={onChangebutton}
              />
              <Checkbox  option={questions[currentQuestionIndex].option02} id="2" onChangebutton={onChangebutton} />

              <Checkbox  option={questions[currentQuestionIndex].option03} id="3" onChangebutton={onChangebutton} />

              <Checkbox  option={questions[currentQuestionIndex].option04} id="4" onChangebutton={onChangebutton} />
              <button className="bg-white text-black px-4 rounded-md py-2 border-2 border-gray-600 w-[20%]">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MCQ;
