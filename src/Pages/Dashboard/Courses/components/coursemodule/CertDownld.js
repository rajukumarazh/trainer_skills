import React from 'react';
import Cert from './Cert';
import { PDFDownloadLink } from '@react-pdf/renderer';
function CertDownld() {
	return (
		<div className="mt-10">
		
			<PDFDownloadLink document={<Cert />} fileName="Opticatl Fiber Splier">
				{({ loading }) =>
					loading ? (
						<button className="bg-gray-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-5">
							<svg
								class="fill-current w-4 h-4 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
							</svg>
							<span>Loading</span>
						</button>
					) : (
						<button className="bg-gray-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-5">
							<svg
								className="fill-current w-4 h-4 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
							</svg>
							<span>Download</span>
						</button>
					)
				}
			</PDFDownloadLink>
		</div>
	);
}

export default CertDownld;
