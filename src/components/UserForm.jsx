"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import {
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { addDoc, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../utils/firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

const UserForm = ({ showForm, setShowForm, currentUser }) => {
	const [date, setDate] = useState(new Date(1598051730000));
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [isValid, setIsValid] = useState({
		name: true,
		phone: true,
		email: true,
	});
	const [show, setShow] = useState(false);

	useEffect(() => {}, []);

	const addUser = async () => {
		const user = await addDoc(collection(FIRESTORE_DB, currentUser.uid), {
			name: name,
			phone: phone,
			email: email,
			date: date.toDateString(),
		});
		console.log(user);
	};

	const onDateChange = (e, selectedDate) => {
		setShow(false);
		setDate(selectedDate);
	};

	const validateForm = () => {
		setIsValid({
			["name"]: false,
			["email"]: false,
			["phone"]: false,
		});

		if (/^[A-Za-z]+$/.test(name)) {
			setIsValid({
				...isValid,
				["name"]: name.length > 5,
			});
		}
		if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/.test(email)) {
			setIsValid({
				...isValid,
				["email"]: true,
			});
		}
		if (phone.length > 7) {
			setIsValid({
				...isValid,
				["phone"]: true,
			});
		}
		if (isValid.name && isValid.phone && isValid.email) addUser();
	};

	return (
		<View style={styles.mainContainer}>
			<Text style={styles.titleText}>Register User</Text>
			<ScrollView>
				<Text style={styles.text}>Contact Name</Text>
				<View>
					<TextInput
						placeholder="Contact Name"
						style={styles.input}
						placeholderTextColor={"#cbcbcb"}
						onChangeText={(text) => setName(text)}
						value={name}
						secureTextEntry={false}
						autoCapitalize="none"
						autoCorrect={false}
					/>
					{!isValid.name && (
						<Text style={styles.errorText}>Please enter a valid name</Text>
					)}
				</View>
				<Text style={styles.text}>Phone Number</Text>
				<TextInput
					placeholder="Phone"
					style={styles.input}
					placeholderTextColor={"#cbcbcb"}
					onChangeText={(text) => setPhone(text)}
					value={phone}
					secureTextEntry={false}
					autoCapitalize="none"
					autoCorrect={false}
				/>
				{!isValid.phone && (
					<Text style={styles.errorText}>
						Please enter a valid phone number
					</Text>
				)}
				<Text style={styles.text}>Email</Text>
				<TextInput
					placeholder="Email"
					style={styles.input}
					placeholderTextColor={"#cbcbcb"}
					onChangeText={(text) => setEmail(text)}
					value={email}
					secureTextEntry={false}
					autoCapitalize="none"
					autoCorrect={false}
				/>
				{!isValid.email && (
					<Text style={styles.errorText}>Please enter a valid email</Text>
				)}
				<View style={styles.container}>
					<Button onPress={() => setShow(true)} title="Show date picker" />
					{show && (
						<DateTimePicker value={date} mode="date" onChange={onDateChange} />
					)}
				</View>
				<Button
					onPress={validateForm}
					title="Add User"
					disabled={name === ""}
				/>
				<TouchableOpacity
					style={styles.btn}
					onPress={() => {
						setShowForm(!showForm);
					}}
				>
					<Text style={styles.text}>Return</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};
const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		width: "100%",
		backgroundColor: "#235",
		justifyContent: "center",
		alignItems: "center",
		width: 300,
		padding: 20,
		borderRadius: 20,
	},
	input: {
		width: 250,
		height: 30,
		backgroundColor: "#0b5351",
		borderRadius: 10,
		color: "white",
		fontSize: 16,
		marginVertical: 5,
	},
	btn: {
		marginTop: 20,
		width: "80%",
		backgroundColor: "#234e36",
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
	},
	titleText: {
		color: "white",
		fontSize: 20,
		marginBottom: 15,
	},
	text: {
		color: "white",
	},
	errorText: {
		color: "red",
		fontSize: 10,
	},
});

export default UserForm;
