import React, { useEffect, useState } from 'react';

import {
	Text,
	Document,
	Page,
	Image,
	StyleSheet,
	View,
	Font,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
	body: {
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		fontFamily: 'Oswald',
	},
	author: {
		fontSize: 30,
		textAlign: 'center',
		marginBottom: 40,
		marginTop: 40,
		fontFamily: 'Oswald',
		fontWeight: 'bold',
	},
	subtitle: {
		fontSize: 18,
		// margin: 12,
		fontFamily: 'Oswald',
		textAlign: 'center',
		marginBottom: 10,
		marginTop: 30,
	},
	text: {
		// margin: 12,
		fontSize: 14,
		// textAlign: 'justify',
		fontFamily: 'Times-Roman',
		textAlign: 'center',
	},
	image: {
		marginVertical: 15,
		marginHorizontal: 100,
		width: 120,
		position: 'absolute',
		bottom: 230,
		left: 130,
		textAlign: 'center',
	},
	sign: {
		width: 150,
		height: 150,
		position: 'absolute',
		bottom: 80,
		right: 20,
	},
	header: {
		fontSize: 12,
		marginBottom: 20,
		textAlign: 'center',
		color: 'gray',
	},
	adress: {
		margin: 12,
		fontSize: 14,
		fontFamily: 'Times-Roman',
		position: 'absolute',
		bottom: 30,
		right: 10,
	},
	authors: {
		fontSize: 12,
		textAlign: 'center',
		marginBottom: 20,
	},
	page: {
		page: { backgroundColor: 'tomato' },
	},
	details: {
		fontSize: 13,
		textAlign: 'justify',
		fontFamily: 'Times-Roman',
		textAlign: 'start',
		marginLeft: 15,
		position: 'absolute',
		left: 10,
		bottom: 90,
	},
	eskill: {
		position: 'absolute',
		top: 0,
	},
});
Font.register({
	family: 'Oswald',
	src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});
function Cert() {
	const [word, setWord] = useState('rajukumar');
	const [email, setEmail] = useState('email@email.com');
	const [qrCode, setQrCode] = useState('');
	const [size, setSize] = useState(400);
	useEffect(() => {
		setQrCode(
			`http://api.qrserver.com/v1/create-qr-code/?data=${word},${email}!&size=${size}x${size}`
		);
	}, [word, size, email]);

	return (
		<Document className="" >
			<Page style={{ backgroundColor: 'white' }} >
				<Image src="/eskill.png"></Image>
				<Text style={styles.author} className="">
					Certificate{' '}
				</Text>
				<Text style={styles.authors}>this is certify that</Text>
				<Text style={styles.subtitle}>Admin</Text>
				<Text style={styles.text}>
					{' '}
					Successfully completed the training for the job role of
				</Text>
				<Text style={styles.subtitle}>
					{' '}
					Optical Fiber Splier (ELE/TEL/Q6400) Level-3
				</Text>
				<Image src={qrCode} alt="qrcode" style={styles.image} />
				<Image src="/sign.jpg" style={styles.sign}></Image>
				<View style={styles.details}>
					<Text style={{ marginBottom: 5 }} className="hidden">
						Date of Birth:XXXXX
					</Text>

					<Text style={{ marginBottom: 5 }} className="hidden">
						Institute Name: Abc Def Geh
					</Text>
					<Text style={{ marginBottom: 5 }} className="hidden">
						Enrollement Number:1254688778962
					</Text>
					<Text style={{ marginBottom: 5 }} className="hidden">
						Issued By:Electronics Sector Council Of India
					</Text>
				</View>
			</Page>
		</Document>
	);
}

export default Cert;
