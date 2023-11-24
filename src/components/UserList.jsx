import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { FIRESTORE_DB } from "../utils/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const UserList = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const userRef = collection(FIRESTORE_DB, "contactos");
		const subscriber = onSnapshot(userRef, {
			next: (snapshot) => {
				const users = [];
				snapshot.docs.forEach((doc) => {
					users.push({
						id: doc.id,
						...doc.data(),
					});
				});
				setUsers(users);
				//console.log(users);
			},
		});
		return () => subscriber();
	}, []);

	return (
		<View style={styles.container}>
			<>
				<Text style={styles.text}>Agria</Text>
				{users.map((user) => {
					<Text style={styles.text} key={user.id}>
						{user.name}
					</Text>;
				})}
			</>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#223",
		justifyContent: "center",
		alignItems: "center",
		width: 300,
		borderRadius: 20,
	},
	text: {
		color: "white",
	},
});
export default UserList;
