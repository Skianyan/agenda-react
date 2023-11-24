import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import firebase from "../utils/firebase";
import UserForm from "./UserForm";
import UserList from "./UserList";

const Main = () => {
	const [showForm, setShowForm] = useState(false);
	const closeSession = () => {
		firebase.auth().signOut();
	};
	const formToggle = () => {
		showForm == true ? setShowForm(false) : setShowForm(true);
	};

	return (
		<View style={styles.mainContainer}>
			<View style={styles.contactsContainer}>
				{showForm ? (
					<UserForm showForm={showForm} setShowForm={setShowForm} />
				) : (
					<UserList></UserList>
				)}
			</View>

			<View style={styles.buttonContainer}>
				<Button onPress={formToggle} title="Show Form" />
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
		flex: 14,
		justifyContent: "center",
		alignItems: "center",
		color: "yellow",
	},
	buttonContainer: {
		flex: 1,
		gap: 50,
		backgroundColor: "#333",
		paddingVertical: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
});
export default Main;
