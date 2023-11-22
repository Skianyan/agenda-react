import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
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
						<TouchableOpacity
							onPress={() => {
								setShow(!show);
							}}
						>
							<Text style={styles.input}>Register</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={iniciarSesion}>
							<Text style={styles.input}>Log In</Text>
						</TouchableOpacity>
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
		backgroundColor: "black",
	},
	texto: {
		color: "white",
		fontSize: 20,
		marginTop: 15,
	},
	input: {
		width: "80%",
		padding: "15",
		backgroundColor: "#0b5351",
		borderRadius: 15,
		color: "white",
		fontSize: 16,
		marginVertical: 10,
	},
});

export default Auth;
