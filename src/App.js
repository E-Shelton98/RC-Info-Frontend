//import React
import React, { useState, useEffect } from 'react';
//import App stylesheet
import './App.css';
//Import React Router Items
import { Route, Link, Switch } from 'react-router-dom';
//Import Display Component
import Display from './Display';
//Import Form Component
import Form from './Form';

function App() {
	//URL VARIABLE
	const url = 'https://rc-app-backend.herokuapp.com';

	//empty rc vehicle for Form
	const emptyVehicle = {
		name: '',
		img: '',
	};

	//STATE TO HOLD RC VEHICLES
	const [rc_Vehicles, setRC_Vehicles] = useState([]);
	//STATE TO HOLD RC COMPANIES
	const [rc_Companies, setRC_Companies] = useState([]);
	//STATE TO HOLD SELECTED RC VEHICLE
	const [selectedVehicle, setSelectedVehicle] = useState(emptyVehicle);


	//FUNCTION TO FETCH COMPANIES
	const getCompanies = () => {
		fetch(url + '/rc_api')
			.then((response) => response.json())
			.then((data) => {
				console.log('This is data: ', data);
				setRC_Companies(data);
				
			});
	};

	//FUNCTION TO FETCH VEHICLES
	const getVehicles = () => {
		fetch(url + '/rc_vehicle')
			.then((response) => response.json())
			.then((data) => {
				console.log("This is vehicles: ", data)
				setRC_Vehicles(data);
			});
	};

	//Get vehicles on page load
	useEffect(() => {
		getVehicles();
		getCompanies();
	}, []);

	//handleCreate Function for creating vehicles
	const handleCreate = (newVehicle) => {
		fetch(url + '/rc_vehicle/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newVehicle),
		}).then((response) => getVehicles());
	};

	//handleUpdate to update a vehicle when form is clicked
	const handleUpdate = (rcVehicle) => {
		fetch(url + '/rc_vehicle/' + rcVehicle._id, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(rcVehicle),
		}).then((response) => getVehicles());
	};

	//selectVehicle which selects a vehicle
	const selectVehicle = (vehicle) => {
		setSelectedVehicle(vehicle);
	};

	//deleteVehicle function to delete a vehicle
	const deleteVehicle = (vehicle) => {
		fetch(url + '/rc_vehicle/' + vehicle._id, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(() => {
			getVehicles();
		});
	};

	return (
		<div className='App'>
			<h1>RC VEHICLES AND COMPANIES</h1>
			<hr />
			<Link to='/create'>
				<button>Add Vehicle</button>
			</Link>
			<main>
				<Switch>
					<Route
						exact
						path='/'
						render={(rp) => (
							<Display
								{...rp}
								companies={rc_Companies}
								vehicles={rc_Vehicles}
								selectVehicle={selectVehicle}
								deleteVehicle={deleteVehicle}
							/>
						)}
					/>
					<Route
						exact
						path='/create'
						render={(rp) => (
							<Form
								{...rp}
								label='create'
								vehicle={selectedVehicle}
								handleSubmit={handleCreate}
							/>
						)}
					/>
					<Route
						exact
						path='/edit'
						render={(rp) => (
							<Form
								{...rp}
								label='update'
								vehicle={selectedVehicle}
								handleSubmit={handleUpdate}
							/>
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}

export default App;
