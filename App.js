import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import firebase from "./src/utils/firebase";
import "firebase/compat/auth";

import Auth from "./src/components/Auth";
import Logout from "./src/components/Logout";

export default function App() {
	const [user, setUser] = useState(undefined);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((response) => {
			setUser(response);
		});
	}, []);

	if (user === undefined) return null;

	return (
		<SafeAreaView style={styles.container}>
			{user ? <Logout /> : <Auth />}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		height: "100%",
	},
});
