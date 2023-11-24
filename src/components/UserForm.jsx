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

import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

const UserForm = ({ showForm, setShowForm }) => {
	const [value, setValue] = useState(dayjs());
	const [users, setUsers] = useState();
	const [name, setName] = useState();
	const [phone, setPhone] = useState();
	const [email, setEmail] = useState();

	useEffect(() => {}, []);
	const addUser = async () => {
		const user = await addDoc(collection(FIRESTORE_DB, "contactos"), {
			name: name,
			phone: phone,
			email: email,
			date: value,
		});
		console.log(user);
	};
	const [userData, setUserData] = useState("");

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
				<View style={styles.container}>
					<DateTimePicker
						value={value}
						onValueChange={(date) => setValue(date)}
						mode={"date"}
						headerTextStyle={(color = "white")}
					/>
				</View>
				<Button onPress={addUser} title="Add User" disabled={name === ""} />
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
});

export default UserForm;
