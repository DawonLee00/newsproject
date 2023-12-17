import React, {
    useRef,
    useState,
    useEffect
  } from "react";
import { render } from "react-dom";
import './Quiz.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import OpenAI from 'openai';
  
import gsap from "https://cdn.skypack.dev/gsap";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const UpperContainer = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

const IconImage = styled.img`
  padding: 8px;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}%;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100px;
  margin-right: 40px;
`;

const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
  
  const questions = [
    {
      id: 0,
      text: "1+3=4",
      answers: ["O", "X"],
      correct: 0,
      selection: null
    },
    {
      id: 1,
      text:
        "5*7=25",
        answers: ["O", "X"],
      correct: 1,
      selection: null
    },
    {
      id: 2,
      text: "1-7=-5",
      answers: ["O", "X"],
      correct: 1,
      selection: null
    } 
  ];
  
  function useCounter(initialState) {
    const [value, setValue] = useState(initialState);
    const reset = () => setValue(0);
  
    const add = () => setValue((value) => (value += 1));
  
    return { value, add, reset };
  }
  
  function Question({
    data,
    buttonText,
    hasButton = true,
    onQuestionButtonClick,
    showAnswer = false,
    markSelection = null
  }) {
    const [answer, setAnswer] = useState(null);
    const parseValue = (value) => (value ? parseInt(value.split("-")[1]) : null);
    const questionRef = useRef(null);
  
    useEffect(() => {
      gsap.fromTo(
        questionRef.current.querySelector(".question-text"),
        {
          x: 40,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.4
        }
      );
      gsap.fromTo(
        questionRef.current.querySelectorAll("li"),
        {
          opacity: 0,
          x: 40
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1
        }
      );
    }, [data]);
  
    return (
      <div className="question" ref={questionRef}>
        <div className="question-inner">
          <h2 className="question-text">({data.id+1}) {data.text}</h2>
          <ul className="question-answers">
            {data.answers.map((text, index) => {
              const value = `q${data.id}-${index}`;
              return (
                <li
                  className={
                    index === data.correct && showAnswer ? "is-true" : ""
                  }
                  data-selected={markSelection === index ? true : null}
                >
                  <input
                    type="radio"
                    name={`q_${data.id}`}
                    value={value}
                    id={value}
                    onChange={(e) => setAnswer(e.target.value)}
                    checked={
                      !showAnswer ? answer === value : markSelection === index
                    }
                  />
                  <label className="question-answer" htmlFor={value}>
                    {text}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
        {hasButton && (
          <button
            className="question-button"
            onClick={() => onQuestionButtonClick(parseValue(answer), data)}
          >
            {buttonText}
          </button>
        )}
      </div>
    );
  }
  
  function Results({ wrong, correct, empty }) {
    return (
      <div className="result">
        <div className="result-item is-correct">
          <span className="result-count">{correct}</span>
          <span className="result-text">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="css-i6dzq1"
              viewBox="0 0 24 24"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
              <path d="M22 4L12 14.01 9 11.01"></path>
            </svg>
            CORRECT
          </span>
        </div>
        <div className="result-item is-wrong">
          <span className="result-count">{wrong}</span>
          <span className="result-text">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="css-i6dzq1"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M15 9L9 15"></path>
              <path d="M9 9L15 15"></path>
            </svg>
            WRONG
          </span>
        </div>
        <div className="result-item is-empty">
          <span className="result-count">{empty}</span>
          <span className="result-text">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="css-i6dzq1"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 12L16 12"></path>
            </svg>
            EMPTY
          </span>
        </div>
      </div>
    );
  }
  
  function QuestionCorrection({ wrong, correct, empty }) {
    return (
      <div className="correction">
        <h1 className="correction-title">Result</h1>
        {questions.map((question) => {
          return (
            <Question
              hasButton={false}
              markSelection={question.selection}
              showAnswer={true}
              data={question}
            />
          );
        })}
      </div>
    );
  }
  
  const QuizPage = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [gameSize, setGameSize] = useState({});
    const totalQuestion = questions.length - 1;
    const gameRef = useRef(null);
    const gameOverlayRef = useRef(null);
  
    const question = useCounter(0);
    const correct = useCounter(0);
    const wrong = useCounter(0);
    const empty = useCounter(0);

    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1);
    };

    const openai = new OpenAI({
      apiKey: "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",
      //process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleClick = async () => {
      setLoading(true);
      try {
        const response = await 	openai.completions.create({
          model: "text-davinci-003",
          prompt: prompt,
          temperature: 0.5,
          max_tokens: 1000,
        });
        setResult(response.data.choices[0].text);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
  
    const handleNewQuestionClick = (selectedValue, currQuestion) => {
      if (totalQuestion >= question.value) {
        if (selectedValue === currQuestion.correct) {
          correct.add();
        } else if (
          selectedValue !== null &&
          selectedValue !== currQuestion.correct
        ) {
          wrong.add();
        } else if (
          selectedValue == null
        ){
          empty.add();
        }
        questions[currQuestion.id].selection = selectedValue;
        question.add();
      }
    };
  
    const resetSelection = () => {
      questions.forEach((q) => (q.selection = null));
    };
  
    const handleRestartClick = () => {
      setGameFinished(false);
      setGameStarted(false);
      resetSelection();
      question.reset();
      correct.reset();
      wrong.reset();
      empty.reset();
    };
  
    const indicatorBg = (index) => {
      if (question.value > index) {
        return "#fff";
      } else if (question.value === index) {
        return "#29b5d5";
      } else {
        return "rgba(255,255,255,.2)";
      }
    };
  
    useEffect(() => {
      if (gameStarted) {
        document.body.classList.add("game-started");
      } else {
        document.body.classList.remove("game-started");
      }
    }, [gameStarted]);
  
    useEffect(() => {
      if (question.value > totalQuestion) {
        gameRef.current.scrollTop = 0;
      }
    }, [question.value]);
  
    return (
    <Wrapper>
      <UpperContainer>
      <IconImage
        width={4}
        height={4}
        src="/asset/arrow_back.svg"
        alt="Back"
        onClick={handleGoBack}
      />      
      <LogoContainer>
        <LogoImage src="/asset/logo.svg" alt="Logo" />
      </LogoContainer>
    </UpperContainer>

    <div className="main">
      <textarea
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="키워드를 설정해주세요."
        className="textarea"
      ></textarea>

      <button
        onClick={handleClick}
        disabled={loading || prompt.length === 0}
        className="btn"
      >
        {loading ? "설정중..." : "설정"}
      </button>

      <pre className="api-result">{result}</pre>
    </div>

    <MiddleContainer>

    <div
      className="game"
      ref={gameRef}
      data-game-started={gameStarted ? true : null}
      data-game-finished={question.value > totalQuestion ? true : null}
    >
      <div className="intro">
        <div className="intro-inner">
          <h1 className="intro-title">Quiz</h1>
          {!gameStarted && (
            <>
              <p className="intro-desc">
                <b>{`퀴즈 개수  :  ${questions.length} 문제` }
                     <br></br>  
                {`시간제한 없음`}</b>
              </p>

              <button
                className="intro-button"
                onClick={() => setGameStarted(true)}
              >
                Start Quiz
              </button>
            </>
          )}
          {gameStarted && (
            <div className="indicator">
              {questions.map((q, index) => {
                return (
                  <span
                    className="indicator-item"
                    style={{
                      backgroundColor: indicatorBg(index)
                    }}
                  />
                );
              })}
            </div>
          )}
          <Results
            wrong={wrong.value}
            correct={correct.value}
            empty={empty.value}
          />
          <button
            className="restart-button"
            onClick={() => handleRestartClick()}
          >
            Restart Quiz
          </button>
        </div>
      </div>
      <div className="game-area">
        {questions[question.value] && (
          <Question
            data={questions[question.value]}
            buttonText={
              question.value !== totalQuestion ? "Next Question" : "Finish Quiz"
            }
            onQuestionButtonClick={handleNewQuestionClick}
          />
        )}

        {!questions[question.value] && (
          <>
            <QuestionCorrection data={questions} />
          </>
        )}
      </div>
    </div>
    </MiddleContainer>
    </Wrapper>
  );
}
  
  export default QuizPage;
