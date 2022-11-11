import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
// import DragAndDropList from './DragAndDropList';
import { PDFExport } from '@progress/kendo-react-pdf';

import './App.css';
// import Cert from './Cert';
// import DndElements from './DndElements';
const Automobile = (props) => {
	const pdfExportComponent = React.useRef(null);
	const [logIn, setLogIn] = useState(true);
	const [department, setDepartment] = useState();
	const [qrCode, setQrCode] = useState('');
	const [word, setWord] = useState('https://www.skillstrainer.in/');
	const [size, setSize] = useState(100);
	console.log(props);
	useEffect(() => {
		setQrCode(
			`http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}`
		);
	}, [word, size]);
	return (
		<div>
			<div className="example-config">
				<button
					className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base bg-blue-300 rounded-lg p-2"
					onClick={() => {
						if (pdfExportComponent.current) {
							pdfExportComponent.current.save();
						}
					}}
				>
					Download Cert..
				</button>
			</div>

			<PDFExport
				paperSize="A4"
				// margin="1cm"
				ref={pdfExportComponent}
				landscape={true}
				fileName="Automobile"
			>
				<div
					style={{
						// width: '500px;',
						width: 'full',
						height: 'full',
					}}
				>
					<div className="flex justify-between">
						{/* <img src="/eskill.png" className="w-full"></img> */}
						{/* <h2 className="para">Admin</h2> */}
						<img src="/asdc.jpg" />
						<img src="skill22.jpg" />
						<img src="/auto.jpg" />
					</div>
					<div className="mt-20">
						<h1 className="text-center">CERTIFICATE</h1>
						<p className="text-center  text-red-400"> this is certify that</p>
						<h2 className="text-center"> {props.usr}</h2>
						<p className="text-center">
							Successfully completed the training for the job role of
						</p>
						<p className="text-center">Taxi Driver (RPL)</p>
					</div>
					<div className="flex justify-between ">
						<div className="mt-10 ml-2">
							<h1>student Details</h1>
							<br />
							<span>
								dkfjdfk
								<br />
								dfjdkfjd
								<br />
								dfdf
							</span>
						</div>
						<div>
							<img src={qrCode} alt="" className="mt-10" />
						</div>
						<div>
							{' '}
							<img src="/sign.jpg" className="mt-10 mr-2" />
						</div>
					</div>
				</div>
			</PDFExport>
		</div>
	);
};
export default Automobile;
