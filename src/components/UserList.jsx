import {
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
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
				<Text style={styles.titleCont}>Contacts</Text>
				{users.length > 0 && (
					<View style={styles.contactsCont}>
						{users.map((user) => {
							return (
								<View style={styles.contactCard} key={user.id}>
									<Text style={styles.text}>Email: {user.email}</Text>
									<Text style={styles.text}>Name: {user.name}</Text>
									<Text style={styles.text}>Phone: {user.phone}</Text>
								</View>
							);
						})}
					</View>
				)}
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
	contactsCont: {
		flex: 14,
		backgroundColor: "#222",
		gap: 10,
		marginBottom: 25,
	},
	titleCont: {
		flex: 1,
		color: "white",
		alignSelf: "center",
		alignItems: "center",
		marginTop: 20,
	},
	contactCard: {
		backgroundColor: "#555",
		flexDirection: "column",
		color: "white",
		padding: 10,
		borderRadius: 15,
	},
	text: {
		color: "white",
	},
});
export default UserList;
