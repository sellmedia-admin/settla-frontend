import logo from "../assets/images/svg/settla-logo.svg";
import logoWhite from "../assets/images/svg/settla-logo-white.svg";
import store from "../assets/images/jpg/store-smile-settla.jpg";
import happy from "../assets/images/jpg/happy-settla.jpg";
import smile from "../assets/images/jpg/smile-settla.jpg";
import case1 from "../assets/images/jpg/case1.jpg";
import cargo from "../assets/images/jpg/cargo.jpg";
import house from "../assets/images/jpg/house.jpg";
import handshake from "../assets/images/jpg/handshake.jpg";
import market from "../assets/images/jpg/market.jpg";
import flight from "../assets/images/jpg/flight.jpg";
import classroom from "../assets/images/jpg/classroom.jpg";
import student from "../assets/images/jpg/student.jpg";
import team from "../assets/images/jpg/team.jpg";
import team1 from "../assets/images/jpg/team1.jpg";
import team2 from "../assets/images/jpg/team2.jpg";
import team3 from "../assets/images/jpg/team3.jpg";
import team4 from "../assets/images/jpg/team4.jpg";
import usd from "../assets/images/png/usd.png";
import gbp from "../assets/images/png/gbp.png";
import eur from "../assets/images/png/eur.png";
import cad from "../assets/images/png/cad.png";
import yen from "../assets/images/png/yen.png";
import flag from "../assets/images/png/flags.png";
import flags2 from "../assets/images/png/flags2.png";
import createAccount from "../assets/images/svg/icons/user-add.svg";
import quick from "../assets/images/svg/icons/shield.svg";
import payIn from "../assets/images/svg/icons/pay-in.svg";
import payOut from "../assets/images/svg/icons/pay-out.svg";
import conversion from "../assets/images/svg/icons/refresh.svg";
import receipt from "../assets/images/svg/icons/document.svg";
import x from "../assets/images/svg/icons/x-logo.svg";
import linkedin from "../assets/images/svg/icons/linkedin.svg";
import facebook from "../assets/images/svg/icons/facebook.svg";
import instagram from "../assets/images/svg/icons/instagram.svg";
import messenger from "../assets/images/svg/icons/messenger.svg";
import notification from "../assets/images/svg/icons/notification.svg";
import transactionHistory from "../assets/images/png/transaction_history.png";

import nigeria from "../assets/svg/nigeria.svg";
import usa from "../assets/svg/usa.svg";
import canada from "../assets/svg/canada.svg";
import uk from "../assets/svg/uk.svg";
import add from "../assets/svg/home/add.svg";
import add2 from "../assets/images/svg/icons/add2.svg";
import add3 from "../assets/images/svg/icons/add3.svg";
import avatar from "../assets/images/svg/icons/avatar.svg";
import avatar2 from "../assets/images/svg/icons/avatar2.svg";
import reload from "../assets/images/svg/icons/reload.svg";
import payout from "../assets/images/svg/icons/payout.svg";
import receive from "../assets/images/svg/icons/receive.svg";
import fund from "../assets/images/svg/icons/fund.svg";
import edit from "../assets/images/svg/icons/edit.svg";
import delete_ from "../assets/images/svg/icons/delete.svg";
import minus from "../assets/svg/home/minus.svg";

export const imgs = {
	logo: logo,
	logoWhite: logoWhite,
	store: store,
	happy: happy,
	smile: smile,
	team: team,
	flag: flag,
	flags2: flags2,
	createAccount: createAccount,
	quick: quick,
	payIn: payIn,
	payOut: payOut,
	conversion: conversion,
	receipt: receipt,
	transactionHistory: transactionHistory,
	add: add,
	add2: add2,
	add3: add3,
	avatar: avatar,
	avatar2: avatar2,
	reload: reload,
	payout: payout,
	receive: receive,
	fund: fund,
	edit: edit,
	delete_: delete_,
	minus: minus,
	x: x,
	linkedin: linkedin,
	facebook: facebook,
	instagram: instagram,
	messenger: messenger,
	notification: notification,
};

export const constants = {
	converts: [
		{id: 1, currency: 'USD', icon: usd},
		{id: 1, currency: 'GBP', icon: gbp},
		{id: 1, currency: 'EUR', icon: eur},
		{id: 1, currency: 'CAD', icon: cad},
		{id: 1, currency: 'YEN', icon: yen},
	],
	settlaSteps: [
		{ id: 1, title: 'Account Creation Made Simple', subtitle: 'Easily establish your account in just a few moments, streamlining your entry into our platform.' },
		{ id: 2, title: 'Seamless Currency Conversion', subtitle: 'Effortlessly convert currencies with our intuitive and efficient solution, ensuring smooth transactions worldwide.' },
		{ id: 3, title: 'Instant Payment Processing', subtitle: 'Experience instant payment processing for swift and convenient transactions, anytime, anywhere.' },
	],
	caseStudies: [
		{ id: 1, image: case1, date: 'March 26, 2024', title: 'How Settla Streamlines Procurement and Remittance in Africa', link: '/case-study/case1'},
		{ id: 2, image: cargo, date: 'March 26, 2024', title: 'How Settla is bridging the gap between Naira and other currencies.', link: '/case-study/case1'},
		{ id: 3, image: house, date: 'March 26, 2024', title: 'How Settla is bridging the gap between Naira and other currencies.', link: '/case-study/case1'},
		{ id: 4, image: handshake, date: 'March 26, 2024', title: 'How Settla is bridging the gap between merchants and supplier', link: '/case-study/case1'},
		{ id: 5, image: market, date: 'March 26, 2024', title: 'How Settla is bridging the gap between Naira and other currencies.', link: '/case-study/case1'},
		{ id: 6, image: flight, date: 'March 26, 2024', title: 'How Settla is bridging the gap between Naira and other currencies.', link: '/case-study/case1'},
		{ id: 7, image: classroom, date: 'March 26, 2024', title: 'How Settla is bridging the gap between Naira and other currencies.', link: '/case-study/case1'},
		{ id: 8, image: student, date: 'March 26, 2024', title: 'How Settla is bridging the gap between Naira and other currencies.', link: '/case-study/case1'},
	],
	team: [
		{ id: 1, image: team1, jd: 'Scrum Master', name: 'Simon Sais', icon1: x, icon2: linkedin, icon3: facebook, link1: '#', link2: '#', link3: '#'},
		{ id: 2, image: team2, jd: 'Chief Engineer', name: 'Opa Williams', icon1: x, icon2: linkedin, icon3: facebook, link1: '#', link2: '#', link3: '#'},
		{ id: 3, image: team3, jd: 'Compliance Specialist', name: 'Omowunmi Kpapa', icon1: x, icon2: linkedin, icon3: facebook, link1: '#', link2: '#', link3: '#'},
		{ id: 4, image: team4, jd: 'Product Designer', name: 'Lizzy Benson', icon1: x, icon2: linkedin, icon3: facebook, link1: '#', link2: '#', link3: '#'},
	],
};

export const caseStudy = {
	aboutTitle: "Samanta Furnitures", 
	aboutText: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ", 
	challenges: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.", 
	challenge1Title: "Manual Collaboration:", 
	challenge1Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis ", 
	challenge2Title: "Difficulty in Tracking Invoices:", 
	challenge2Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis ", 
	challenge3Title: "Delayed Payments:", 
	challenge3Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis ", 
	solution: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni.",
	solution1Title: "Centralized Document Management:",
	solution1Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ",
	solution2Title: "Automated Notifications:",
	solution2Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ",
	solution3Title: "Secure Communication:",
	solution3Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ",
	solution4Title: "Invoice Financing:",
	solution4Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ",
	result: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ",
	result1Title: "Enhanced Efficiency:",
	result1Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ",
	result2Title: "Faster Payments:",
	result2Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ",
	result3Title: "Stronger Relationship:",
	result3Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed ",
};

export const flags = {
	NGN: {
		icon: <img alt="flag" className={`w-[32px] h-[32px]`} src={nigeria} />,
		label: "Nigerian Naira",
		symbol: "₦",
	},
	USD: {
		icon: <img alt="flag" className={`w-[32px] h-[32px]`} src={usa} />,
		label: "United States Dollar",
		symbol: "$",
	},
	CAD: {
		icon: <img alt="flag" className={`w-[32px] h-[32px]`} src={canada} />,
		label: "Canadian Dollar",
		symbol: "$",
	},
	GBP: {
		icon: <img alt="flag" className={`w-[32px] h-[32px]`} src={uk} />,
		label: "British Pounds",
		symbol: "£",
	},
	POUND: {
		icon: <img alt="flag" className="w-[32px] h-[32px]" src={uk} />,
		label: "British Pounds",
		symbol: "£",
	},
};

// export const million_things = [
// 	{ name: "Payment", icon: payment },
// 	{ name: "Receive money", icon: receive },
// 	{ name: "Cross border payment", icon: europe },
// 	{ name: "Retail payments", icon: retail },
// ];

export const questions = [
	{
		question: "Where can I send money from",
		answer: "You can send money from the United Kingdom, United States, Canada & Nigeria",
	},
	{
		question: "How long does it take for me recipient to receive payment",
		answer: "Transaction takes 1-2 business days",
	},
	{
		question: "I am experiencing delays during transfers",
		answer: "If you’re experiencing delays in transfers you can contact us via email info@settla.io",
	},
	{
		question: "How secure is settla",
		answer: (
			<p>
				1. We're a licensed money transmitter and we’re licensed in and are regulated by the authorities in the countries we operate in.{" "}
				<br />
				2. We have a dedicated anti-fraud team. We work round the clock to keep your account and money protected from even the most
				sophisticated fraud. <br />
				3. We’re committed to keeping your personal data safe, and we’re transparent in how we collect, process, and store it.
			</p>
		),
	},
];

export const Countries = {
	NG: "Nigeria",
	BD: "Bangladesh",
	BE: "Belgium",
	BF: "Burkina Faso",
	BG: "Bulgaria",
	BA: "Bosnia and Herzegovina",
	BB: "Barbados",
	WF: "Wallis and Futuna",
	BL: "Saint Barthelemy",
	BM: "Bermuda",
	BN: "Brunei",
	BO: "Bolivia",
	BH: "Bahrain",
	BI: "Burundi",
	BJ: "Benin",
	BT: "Bhutan",
	JM: "Jamaica",
	BW: "Botswana",
	// BV: 'Bouvet Island',
	WS: "Samoa",
	BQ: "Bonaire, Saint Eustatius and Saba ",
	BR: "Brazil",
	BS: "Bahamas",
	JE: "Jersey",
	BY: "Belarus",
	BZ: "Belize",
	RU: "Russia",
	RW: "Rwanda",
	RS: "Serbia",
	TL: "East Timor",
	RE: "Reunion",
	TM: "Turkmenistan",
	TJ: "Tajikistan",
	RO: "Romania",
	TK: "Tokelau",
	GW: "Guinea-Bissau",
	GU: "Guam",
	GT: "Guatemala",
	// GS: 'South Georgia and the South Sandwich Islands',
	GR: "Greece",
	GQ: "Equatorial Guinea",
	GP: "Guadeloupe",
	JP: "Japan",
	GY: "Guyana",
	GG: "Guernsey",
	GF: "French Guiana",
	GE: "Georgia",
	GD: "Grenada",
	GB: "United Kingdom",
	GA: "Gabon",
	SV: "El Salvador",
	GN: "Guinea",
	GM: "Gambia",
	GL: "Greenland",
	GI: "Gibraltar",
	GH: "Ghana",
	OM: "Oman",
	TN: "Tunisia",
	JO: "Jordan",
	HR: "Croatia",
	HT: "Haiti",
	HU: "Hungary",
	HK: "Hong Kong",
	HN: "Honduras",
	// HM: 'Heard Island and McDonald Islands',
	VE: "Venezuela",
	PR: "Puerto Rico",
	PS: "Palestinian Territory",
	PW: "Palau",
	PT: "Portugal",
	SJ: "Svalbard and Jan Mayen",
	PY: "Paraguay",
	IQ: "Iraq",
	PA: "Panama",
	PF: "French Polynesia",
	PG: "Papua New Guinea",
	PE: "Peru",
	PK: "Pakistan",
	PH: "Philippines",
	// PN: 'Pitcairn',
	PL: "Poland",
	PM: "Saint Pierre and Miquelon",
	ZM: "Zambia",
	EH: "Western Sahara",
	EE: "Estonia",
	EG: "Egypt",
	ZA: "South Africa",
	EC: "Ecuador",
	IT: "Italy",
	VN: "Vietnam",
	SB: "Solomon Islands",
	ET: "Ethiopia",
	SO: "Somalia",
	ZW: "Zimbabwe",
	SA: "Saudi Arabia",
	ES: "Spain",
	ER: "Eritrea",
	ME: "Montenegro",
	MD: "Moldova",
	MG: "Madagascar",
	MF: "Saint Martin",
	MA: "Morocco",
	MC: "Monaco",
	UZ: "Uzbekistan",
	MM: "Myanmar",
	ML: "Mali",
	MO: "Macao",
	MN: "Mongolia",
	MH: "Marshall Islands",
	MK: "Macedonia",
	MU: "Mauritius",
	MT: "Malta",
	MW: "Malawi",
	MV: "Maldives",
	MQ: "Martinique",
	MP: "Northern Mariana Islands",
	MS: "Montserrat",
	MR: "Mauritania",
	IM: "Isle of Man",
	UG: "Uganda",
	TZ: "Tanzania",
	MY: "Malaysia",
	MX: "Mexico",
	IL: "Israel",
	FR: "France",
	IO: "British Indian Ocean Territory",
	SH: "Saint Helena",
	FI: "Finland",
	FJ: "Fiji",
	FK: "Falkland Islands",
	FM: "Micronesia",
	FO: "Faroe Islands",
	NI: "Nicaragua",
	NL: "Netherlands",
	NO: "Norway",
	NA: "Namibia",
	VU: "Vanuatu",
	NC: "New Caledonia",
	NE: "Niger",
	NF: "Norfolk Island",
	NZ: "New Zealand",
	NP: "Nepal",
	NR: "Nauru",
	NU: "Niue",
	CK: "Cook Islands",
	XK: "Kosovo",
	CI: "Ivory Coast",
	CH: "Switzerland",
	CO: "Colombia",
	CN: "China",
	CM: "Cameroon",
	CL: "Chile",
	CC: "Cocos Islands",
	CA: "Canada",
	CG: "Republic of the Congo",
	CF: "Central African Republic",
	CD: "Democratic Republic of the Congo",
	CZ: "Czech Republic",
	CY: "Cyprus",
	CX: "Christmas Island",
	CR: "Costa Rica",
	CW: "Curacao",
	CV: "Cape Verde",
	CU: "Cuba",
	SZ: "Swaziland",
	SY: "Syria",
	SX: "Sint Maarten",
	KG: "Kyrgyzstan",
	KE: "Kenya",
	SS: "South Sudan",
	SR: "Suriname",
	KI: "Kiribati",
	KH: "Cambodia",
	KN: "Saint Kitts and Nevis",
	KM: "Comoros",
	ST: "Sao Tome and Principe",
	SK: "Slovakia",
	KR: "South Korea",
	SI: "Slovenia",
	KP: "North Korea",
	KW: "Kuwait",
	SN: "Senegal",
	SM: "San Marino",
	SL: "Sierra Leone",
	SC: "Seychelles",
	KZ: "Kazakhstan",
	KY: "Cayman Islands",
	SG: "Singapore",
	SE: "Sweden",
	SD: "Sudan",
	DO: "Dominican Republic",
	DM: "Dominica",
	DJ: "Djibouti",
	DK: "Denmark",
	VG: "British Virgin Islands",
	DE: "Germany",
	YE: "Yemen",
	DZ: "Algeria",
	US: "United States",
	UY: "Uruguay",
	YT: "Mayotte",
	// UM: 'United States Minor Outlying Islands',
	LB: "Lebanon",
	LC: "Saint Lucia",
	LA: "Laos",
	TV: "Tuvalu",
	TW: "Taiwan",
	TT: "Trinidad and Tobago",
	TR: "Turkey",
	LK: "Sri Lanka",
	LI: "Liechtenstein",
	LV: "Latvia",
	TO: "Tonga",
	LT: "Lithuania",
	LU: "Luxembourg",
	LR: "Liberia",
	LS: "Lesotho",
	TH: "Thailand",
	// TF: 'French Southern Territories',
	TG: "Togo",
	TD: "Chad",
	TC: "Turks and Caicos Islands",
	LY: "Libya",
	VA: "Vatican",
	VC: "Saint Vincent and the Grenadines",
	AE: "United Arab Emirates",
	AD: "Andorra",
	AG: "Antigua and Barbuda",
	AF: "Afghanistan",
	AI: "Anguilla",
	VI: "U.S. Virgin Islands",
	IS: "Iceland",
	IR: "Iran",
	AM: "Armenia",
	AL: "Albania",
	AO: "Angola",
	// AQ: 'Antarctica',
	AS: "American Samoa",
	AR: "Argentina",
	AU: "Australia",
	AT: "Austria",
	AW: "Aruba",
	IN: "India",
	AX: "Aland Islands",
	AZ: "Azerbaijan",
	IE: "Ireland",
	ID: "Indonesia",
	UA: "Ukraine",
	QA: "Qatar",
	MZ: "Mozambique",
};

export const validUploadTypes = ["jpg", "png", "jpeg", "pdf"];
