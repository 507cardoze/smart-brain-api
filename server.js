const express = require('express');
const bodyParser = require ('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

const app = express();


app.use(bodyParser.json());
app.use(cors());



const database = {
	users: [
	{
		id: '123',
		name: 'Jhon',
		password: 'cookies',
		email: 'john@gmail.com',
		entries: 0,
		joined: new Date()
	},
	{
		id: '124',
		name: 'Sally',
		password: 'bananas',
		email: 'sally@gmail.com',
		entries: 0,
		joined: new Date()
	}
  ]
}


app.get('/', (req, res) =>{
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email 
		&& req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
			res.status(400).json('error logging in');
		}
})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
});
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);

})

app.get('/profile/:id', (req, res) =>{
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		}
	})

	if (!found) {
		 	res.status(400).json('No such user');
		 }
})

app.put('/image', (req, res) =>{
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if (!found) {
		 	res.status(400).json('No such user');
		 }
})




// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });




app.listen(3025, () =>{
	console.log('app is running on port 3025');
});