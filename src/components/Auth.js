import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import RegisterForm from "./RegisterForm";
import firebase from "../utils/firebase";

const Auth = () => {
	const [show, setShow] = useState(false);
	const [dataLogin, setDataLogin] = useState({
		email: "",
		password: "",
	});

	const iniciarSesion = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(dataLogin.email, dataLogin.password);
	};
	return (
		<>
			<StatusBar barStyle={"light-content"} />
			<SafeAreaView style={styles.container}>
				{!show ? (
					<>
						<View style={styles.fieldsContainer}>
							<Text style={styles.text}>AgendaApp</Text>
							<TextInput
								placeholder="Username"
								style={styles.input}
								placeholderTextColor={"#cbcbcb"}
								onChange={(e) =>
									setDataLogin({ ...dataLogin, email: e.nativeEvent.text })
								}
								secureTextEntry={false}
								autoCapitalize="none"
								autoCorrect={false}
							/>
							<TextInput
								placeholder="Password"
								style={styles.input}
								placeholderTextColor={"#cbcbcb"}
								onChange={(e) =>
									setDataLogin({ ...dataLogin, password: e.nativeEvent.text })
								}
								secureTextEntry={true}
								autoCapitalize="none"
								autoCorrect={false}
							/>
						</View>
						<View style={styles.optionsContainer}>
							<TouchableOpacity
								onPress={() => {
									setShow(!show);
								}}
							>
								<Text style={styles.smallInput}>Register</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={iniciarSesion}>
								<Text style={styles.smallInput}>Log In</Text>
							</TouchableOpacity>
						</View>
					</>
				) : (
					<>
						<RegisterForm show={show} setShow={setShow} />
					</>
				)}
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#333",
	},
	fieldsContainer: {
		width: "80%",
		padding: 15,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#555",
	},
	optionsContainer: {
		width: "80%",
		padding: 15,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#222",
	},
	text: {
		color: "white",
		fontSize: 20,
		marginVertical: 10,
	},
	input: {
		width: "80%",
		height: 30,
		backgroundColor: "#0b5351",
		borderRadius: 10,
		color: "white",
		fontSize: 16,
		marginVertical: 5,
	},
	smallInput: {
		width: 100,
		height: 30,
		alignSelf: "center",
		textAlign: "center",
		backgroundColor: "#0b5351",
		borderRadius: 10,
		color: "white",
		fontSize: 16,
		marginVertical: 5,
	},
});

export default Auth;
