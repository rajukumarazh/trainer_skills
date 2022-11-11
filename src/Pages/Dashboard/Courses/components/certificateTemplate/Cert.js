import React, { useState, useEffect } from 'react';

import { PDFExport } from '@progress/kendo-react-pdf';

const Cert = (props) => {
	const [word, setWord] = useState('https://www.skillstrainer.in/');
	const [size, setSize] = useState(100);
	const [qrCode, setQrCode] = useState();
	// const [portrait, landScape] = useState(true);
	const date = new Date();
	console.log(date);
	const pdfExportComponent = React.useRef(null);

	console.log("pdfExportComponent",pdfExportComponent)
	useEffect(() => {
		setQrCode(
			`http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}`
		);
	}, [word, size]);
	return (
		<div className="">
			<PDFExport
				paperSize="A4"
				landscape="true"
				margin="1"
				ref={pdfExportComponent}
				fileName={`Optical Fiber Splier`}
			>
				<div
					style={{
					
						maxHeight: 'full',
					}}
				>
					<img src="/eskill.png" className="w-full"></img>
					<div className="mt-10">
						<h1 className="text-red text-center">CERTIFICATE</h1>
						<p className="text-center">this is certify that.</p>
						<h2 className="text-center text-red-500">{props.data.name}</h2>
						<p className="text-center">
							Successfully completed the training for the job role With Awarded
							Grade "A" in
						</p>
						<p className="text-center">
							"Certificate Course in Spoken English(NSQF 3)"{' '}
						</p>
						<div className="flex justify-center">
							{/* <img src={qrCode} alt="qrcode" className="" /> */}
						</div>
					</div>
					<div className="flex justify-between">
						<div>
							<span>
								Name:{''}
								{props.data.name}
							</span>
							<br />
							<span>
								Id:{''}
								{props.data.Id}
							</span>
							<br />
							<span>Date:23/02/2022</span>
							<br />
						</div>
						<img src={qrCode} alt="qrcode" className="" />
						<div className="">
							<img src="/sign.jpg" className="w-35"></img>
						</div>
					</div>
				</div>
			</PDFExport>
			<div className="example-config text-red-400 flex justify-content-end">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
					onClick={() => {
						if (pdfExportComponent.current) {
							pdfExportComponent.current.save();
						}
					}}
				>
					Download
				</button>
			</div>
		</div>
	);
};
export default Cert;
