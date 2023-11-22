import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import firebase from "../utils/firebase";
import UserForm from "./UserForm";

const Main = () => {
	const [showForm, setShowForm] = useState(false);
	const closeSession = () => {
		firebase.auth().signOut();
	};

	return (
		<View style={styles.mainContainer}>
			<View style={styles.contactsContainer}>
				<Text style={styles.text}>Hola</Text>
			</View>
			<View style={styles.buttonContainer}>
				<>
					<TouchableOpacity
						onPress={() => {
							setShow(!show);
						}}
					>
						<Button title="Add User" />
					</TouchableOpacity>
				</>
				<Button onPress={closeSession} title="Logout" />
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	text: {
		color: "white",
	},
	mainContainer: {
		flex: 1,
		backgroundColor: "black",
	},
	contactsContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer: {
		backgroundColor: "#333",
		paddingVertical: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
});
export default Main;
