import { View, Text } from "react-native";
import React from "react";
import firebase from "../utils/firebase";

const Logout = () => {
	const closeSession = () => {
		firebase.auth().signOut();
	};

	return (
		<View>
			<Text onPress={closeSession}>Logout</Text>
		</View>
	);
};

export default Logout;
