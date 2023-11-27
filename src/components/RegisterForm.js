import React, { useState } from "react";
import { validateEmail } from "../utils/validations";
import firebase from "../utils/firebase";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const RegisterForm = ({ show, setShow }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		repeatPassword: "",
	});

	const [errores, setErrores] = useState({
		errorCorreo: false,
		errorPassword: false,
	});

	const validarDatos = () => {
		if (
			formData.email != "" &&
			formData.password != "" &&
			formData.repeatPassword != ""
		) {
			if (!validateEmail(formData.email)) {
				console.log("email incorrecto");
				setErrores({ errorCorreo: true });
			}
			if (formData.password !== formData.repeatPassword) {
				console.log("password incorrecto");
				setErrores({ errorPassword: true });
			}

			console.log("los datos pasaron");
			firebase
				.auth()
				.createUserWithEmailAndPassword(formData.email, formData.password);
		} else {
			setErrores({
				errorCorreo: true,
				errorPassword: true,
			});
		}
	};

	return (
		<>
			<View style={styles.mainContainer}>
				<View style={styles.formContainer}>
					<Text style={styles.titleText}>Register</Text>
					<TextInput
						placeholder="Email"
						style={styles.input}
						placeholderTextColor={"#cbcbcb"}
						onChange={(e) =>
							setFormData({ ...formData, email: e.nativeEvent.text })
						}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
					/>
					<TextInput
						placeholder="Password"
						style={styles.input}
						placeholderTextColor={"#cbcbcb"}
						onChange={(e) =>
							setFormData({ ...formData, password: e.nativeEvent.text })
						}
						secureTextEntry={true}
						autoCapitalize="none"
						autoCorrect={false}
					/>
					<TextInput
						placeholder="Repeat Password"
						style={styles.input}
						placeholderTextColor={"#cbcbcb"}
						onChange={(e) =>
							setFormData({ ...formData, repeatPassword: e.nativeEvent.text })
						}
						secureTextEntry={true}
						autoCapitalize="none"
						autoCorrect={false}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.smallInput} onPress={validarDatos}>
						<Text style={styles.text}>Register</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.smallInput}
						onPress={() => {
							setShow(false);
						}}
					>
						<Text style={styles.text}>Back to Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		width: "100%",
		backgroundColor: "#333",
		justifyContent: "center",
		alignItems: "center",
	},
	formContainer: {
		width: "80%",
		padding: 15,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#555",
	},
	buttonContainer: {
		width: "80%",
		padding: 15,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#222",
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
		width: 150,
		height: 30,
		alignSelf: "center",
		textAlign: "center",
		backgroundColor: "#0b5351",
		borderRadius: 10,
		color: "white",
		fontSize: 16,
		marginVertical: 5,
	},
	titleText: {
		color: "white",
		fontSize: 20,
		marginBottom: 15,
	},
	text: {
		color: "white",
		marginTop: 5,
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
});
export default RegisterForm;
