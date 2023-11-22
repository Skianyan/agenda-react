import React, { useState } from "react";
import { validateEmail } from "../utils/validations";
import firebase from "../utils/firebase";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

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
			if (formData.password != formData.repeatPassword) {
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

			<TouchableOpacity style={styles.btn} onPress={validarDatos}>
				<Text style={styles.texto}>Registrar</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.btn}
				onPress={() => {
					setShow(false);
				}}
			>
				<Text style={styles.texto}>Regresar</Text>
			</TouchableOpacity>
		</>
	);
};

const styles = StyleSheet.create({
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
		padding: "15",
		backgroundColor: "#0b5351",
		borderRadius: 15,
		color: "white",
		fontSize: 16,
		marginVertical: 10,
	},
	texto: {
		color: "white",
		fontSize: 20,
	},
});
export default RegisterForm;
