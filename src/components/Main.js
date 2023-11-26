import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import firebase from "../utils/firebase";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Main = () => {
	const [showForm, setShowForm] = useState(false);
	const closeSession = () => {
		firebase.auth().signOut();
	};
	const formToggle = () => {
		showForm == true ? setShowForm(false) : setShowForm(true);
	};

	const auth = getAuth();
	const currentUser = auth.currentUser;

	if (currentUser) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/auth.user
		// ...
		console.log(typeof currentUser.uid);
	} else {
		// No user is signed in.
	}
	return (
		<View style={styles.mainContainer}>
			<View style={styles.contactsContainer}>
				{showForm ? (
					<UserForm
						showForm={showForm}
						setShowForm={setShowForm}
						currentUser={currentUser}
					/>
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
