import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function CourseQuiz() {
    const [counter, setCounter] = useState(0);
	const [showQuiz, setShowQuiz] = useState(false);
	const [showTakeQuiz, setShowTakeQuiz] = useState(false);
	const [question, setQuestion] = useState('');
	const [options, setOptions] = useState([]);
	const [optionsList, setOptionsList] = useState([]);
	const [answer, setAnswer] = useState('');
	const [marks, setMarks] = useState(0);
	const [score, setScore] = useState(0);
	const [seconds, setSeconds] = useState(3600);

	const [questionList, setQuestionList] = useState([
		
	]);

	useEffect(() => {
		if (showTakeQuiz) {
			if (seconds > 0) {
				setTimeout(() => setSeconds(seconds - 60), 60000);
			} else {
				setSeconds('Time Over');
			}
		}
		return () => clearTimeout(seconds);
	});
	

	const [selectedAnswer, setSelectedAnswer] = useState('');
	const [correctAnswers, setsetCorrectAnswers] = useState([]);
	const [showCompleted, setShowCompleted] = useState(false);

	const toggleShowQuiz = (show) => {
		setShowQuiz(!show);
	};
	const toggleShowTakeQuiz = (show) => {
		setShowTakeQuiz(!show);
	};
	console.log('Total Score', score);

	const addOption = (e) => {
		if (e.charCode == 13) {
			// Options can't be empty or more than 5.
			if (optionsList.length < 5 && e.target.value) {
				setOptionsList([...optionsList, e.target.value]);
				setOptions('');
			}
		}
	};

	const resetQuiz = () => {
		setCounter(0);
		setQuestion('');
		setOptions('');
		setOptionsList([]);
		setAnswer('');
		setsetCorrectAnswers(0);
		setScore(0);
		// setSeconds(3600);
	};
	console.log('Marks', marks);

	const addQuestion = () => {
		const obj = {
			question: question,
			options: optionsList,
			answer: answer,
			marks: marks,
		};
		CheckField();
		if (question && optionsList.length > 1 && answer) {
			setQuestionList([...questionList, obj]);
			resetQuiz();
		}
	};
	const CheckField = () => {
		question == '' && alert('Enter qeustion details');
		question !== '' && marks == 0 && alert('select marks field');
		marks !== 0 &&
			question !== '' &&
			optionsList.length < 4 &&
			alert('Add  atleast four Options');
		optionsList.length == 4 &&
			answer == '' &&
			alert('select One correct answer');
	};
	const checkAnswer = () => {
		if (questionList[counter].answer === selectedAnswer) {
			let mrk = Number(questionList[counter].marks);
			// let total = Number(mrk);
			toast.success("Congrats! That's correct ");
			let correctCount = correctAnswers + 1;
			// selectedAnswer == '' && alert('select Answer');
			setScore(score + mrk);

			setsetCorrectAnswers(correctCount);
		} else {
			toast.error("Sorry, that's incorrect  ");
		}
	};
	const backHome = () => {
		setShowCompleted(false);
		setShowQuiz(false);
		setShowTakeQuiz(false);
		resetQuiz();
	};

	const nextQuestion = () => {
		if (counter < questionList.length - 1) {
			checkAnswer();
			let count = counter + 1;
			setCounter(count);
			setSelectedAnswer('');
		} else if (counter == questionList.length - 1) {
			checkAnswer();
			setShowCompleted(true);
		}
	};
	
	console.log('options', questionList.options);
	console.log('question', question);
	console.log('questionList', questionList);
	console.log('seconds', seconds);
	return (
		<div className="App">
			{/* {questionList.length > 1 && alert('Questions Added successfully')} */}
			{showCompleted ? (
				<div className="bg-gray-700 flex justify-center items-center content-center h-screen align-middle">
					<div className="bg-white md:w-1/2 p-6 text-gray-500 rounded-lg">
						<h2 className="text-2xl font-bold w-full pb-4">You're done!</h2>
						<p>
							You scored {correctAnswers} out of {questionList.length}{' '}
						</p>
						<span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
							Your Total Marks is:&nbsp;
							{score}
						</span>
						<button
							onClick={() => backHome()}
							className="w-full mt-4 border border-blue-500 py-2 px-4 text-blue-500 bg-white focus:outline-none"
						>
							Try Again
						</button>
					</div>
				</div>
			) : showTakeQuiz ? (
				<div className="bg-gray-700 flex justify-center items-center content-center h-screen align-middle">
					<div className="bg-white md:w-1/2 p-6 text-left text-gray-500 rounded-lg">
						<span className="inline-flex justify-end px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
							Your Total Marks is :&nbsp;{score}
						</span>
						{questionList.length > 0 && (
							<h2 className="text-center">
								{' '}
								Available time:{''}&nbsp;
								<span className="text-red-500 text-center">
									{seconds / 60} Min
								</span>
							</h2>
						)}
						<h2 className="text-2xl font-bold w-full pb-4">
							{questionList.length > 0 && questionList[counter].question}
						</h2>
						<ul>
							{questionList.length > 0 &&
								questionList[counter].options.map((option, i) => {
									return (
										<li className="answerOption">
											<label
												className="inline-flex items-center py-1"
												htmlFor="answer"
											>
												<input
													key={i}
													type="radio"
													className="form-radio h-4 w-4"
													name="radioGroup"
													checked={option === selectedAnswer}
													id={option}
													value={option}
													onChange={(e) => setSelectedAnswer(e.target.value)}
												/>
												<span className="ml-3 my-3 pb text-xl">{option}</span>
											</label>
										</li>
									);
								})}
						</ul>
						{questionList.length > 0 && (
							<button
								onClick={() => nextQuestion()}
								className="w-full mt-4 border border-blue-500 py-2 px-4 text-blue-500 bg-white focus:outline-none"
							>
								Submit
							</button>
						)}
						{questionList == '' && (
							<button
								onClick={() => setShowTakeQuiz(false)}
								className="w-full mt-4 border border-blue-500 py-2 px-4 text-blue-500 bg-white focus:outline-none"
							>
								Create Again
							</button>
						)}
					</div>
				</div>
			) : //// Quizz creator part
			(seconds == 0 || seconds !== 0) && showQuiz && !showTakeQuiz ? (
				<div className="bg-gray-700 flex justify-center items-center content-center h-screen align-middle">
					<div className="bg-white md:w-1/2 p-6 text-gray-500 rounded-lg">
						<h1>Please add your questions below</h1>
						<div className="relative m-4">
							<label
								htmlFor="question"
								className="text-left leading-7 text-sm text-gray-600"
							>
								Question:
							</label>
							<input
								type="text"
								id="question"
								name="question"
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
								placeholder="Enter your question here"
								className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
						<label htmlFor="cars">Choose marks:</label>

						<select
							name="cars"
							id="cars"
							onChange={(e) => setMarks(e.target.value)}
						>
							<option value={marks}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
						</select>
						<div className="relative m-4">
							<label
								htmlFor="options"
								className="text-left leading-7 text-sm text-gray-600"
							>
								Options:
							</label>
							<input
								type="text"
								id="options"
								name="options"
								value={options}
								onChange={(e) => setOptions(e.target.value)}
								onKeyPress={(e) => addOption(e)}
								placeholder="Press enter after each option"
								className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-1"
							/>
							{optionsList.map((option, i) => {
								return (
									<p className="flex text-xs p-1 px-2 bg-blue-500 text-white border m-1">
										{option}{' '}
										<button
											onClick={() =>
												setOptionsList(
													optionsList.filter((e) => e !== optionsList[i])
												)
											}
											className="ml-auto focus:outline-none text-red-600 font-semibold text-lg"
										>
											x
										</button>
									</p>
								);
							})}
						</div>

						<div className="relative m-4">
							<label
								htmlFor="answer"
								className="text-left leading-7 text-sm text-gray-600"
							>
								Answer:
							</label>
							<select
								id="answer"
								name="answer"
								value={answer}
								onChange={(e) => setAnswer(e.target.value)}
								placeholder="Make  sure your answer matches one of the options"
								className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-3 leading-8 transition-colors duration-200 ease-in-out"
							>
								<option key={0} disabled selected hidden value="">
									Select an answer
								</option>
								{optionsList.map((type, index) => {
									return (
										<option key={index + 1} value={type}>
											{type}
										</option>
									);
								})}
							</select>
						</div>
						<button
							onClick={() => addQuestion()}
							className="border py-2 px-4 text-white bg-blue-500"
						>
							Add Question
						</button>
						<button
							onClick={() => toggleShowTakeQuiz(showTakeQuiz)}
							className="w-full mt-4 border border-blue-500 py-2 px-4 text-blue-500 bg-white"
						>
							Take Quiz
						</button>
					</div>
				</div>
			) : (
				//// Quizz creator part End
				<div className="App-header">
					<h1 className="App-logo text-8xl font-black">?</h1>
					{/* <p>Welcome to our not-so-fancy quiz-maker/taker.</p> */}
					<button
						onClick={() => toggleShowQuiz(showQuiz)}
						className="App-link text-3xl p-4 underline focus:outline-none"
					>
						Create Quiz
					</button>
				</div>
			)}
			<ToastContainer />
		</div>
	);
}
