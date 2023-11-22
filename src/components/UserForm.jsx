"use client";
import React from "react";
import { useState } from "react";

const UserForm = () => {
	const [user, setUser] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<div>
			<h1>Register User</h1>
			<form action="">
				<label htmlFor="user">Username</label>
				<input
					id="user"
					type="text"
					placeholder="user"
					onChange={(e) => setUser(e.target.value)}
					value={user}
				/>
				<label htmlFor="email">Email</label>
				<input
					id="user"
					type="text"
					placeholder="user"
					onChange={(e) => setUser(e.target.value)}
					value={user}
				/>
				<label htmlFor="password">Password</label>
				<input
					id="user"
					type="text"
					placeholder="user"
					onChange={(e) => setUser(e.target.value)}
					value={user}
				/>
			</form>
		</div>
	);
};

export default UserForm;
