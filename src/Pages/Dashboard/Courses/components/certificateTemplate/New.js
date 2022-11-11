import React, { useState, useEffect } from 'react';

import { PDFExport } from '@progress/kendo-react-pdf';
import Template from './Template';

const Automobile = (props) => {
	const [word, setWord] = useState('https://www.skillstrainer.in/');
	const [size, setSize] = useState(90);
	const [qrCode, setQrCode] = useState();
	const pdfExportComponent = React.useRef(null);
	console.log(props.data);

	useEffect(() => {
		setQrCode(
			`http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}`
		);
	}, [word, size]);
	return (
		<div className="relative">
			<PDFExport
				paperSize="A4"
				landscape={true}
				ref={pdfExportComponent}
				fileName={`Optical Fiber Splier`}
				creator="skilltrainer.in"
				keepTogether="p"
				title="skilltrainer.in"
				// margin={1}
				// pageTemplate={Template}
			>
				<div
					style={
						{
							// display: 'block',
							// marginLeft: 'auto',
							// marginRight: 'auto',
							// marginTop: 'auto',
							// width: 'full',
							// backgroundImage: `url("/border.jpg")`,
							// backgroundPosition: 'center',
							// height: 'full',
							// backgroundRepeat: 'no-repeat',
							// backgroundColor: 'gray-100',
							// backgroundSize: 'cover',
						}
					}
				>
					{/* <img src="/eskill.png" className="w-full mt-1"></img> */}
					<div className="">
						<div className="flex justify-between">
							{/* <img src="/eskill.png" className="w-full"></img> */}
							{/* <h2 className="para">Admin</h2> */}
							<img src="/asdc.jpg" className="w-12 h-15" />
							<img src="/nsdc.jpg" className=" w-20 h-25" />
							<img src="/auto.jpg" className="w-23 h-20" />
						</div>
						<div className="mt-10">
							<h1 className="text-red text-center">CERTIFICATE</h1>
							<p className="text-center">this is certify that.</p>
							<h2 className="text-center text-red-500">{props.data.name}</h2>
							<p className="text-center">
								Successfully completed the training for the job role With
								Awarded Grade "A" in
							</p>
							<p className="text-center">
								"Certificate Course in Spoken English(NSQF 3)"{' '}
							</p>
							<div className="flex justify-center">
								<img src={qrCode} alt="qrcode" className="" />
							</div>
						</div>
					</div>
					{/* <Template/> */}
					<div className="flex justify-between">
						<div>
							<span>Name:{props.data.name}</span>
							<br />
							<span>Id:{props.data.Id}</span>
							<br />
						</div>
						<div className="">
							<img src="/sign.jpg" className="w-30 p-1"></img>
						</div>
					</div>
				</div>
			</PDFExport>
			<div className="example-config text-red-400 flex justify-content-end">
				<button
					className=" mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
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
export default Automobile;
