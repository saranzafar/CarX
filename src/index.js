const express = require('express');
const bcrypt = require('bcrypt');
const collection = require("./config");
const AdminForm = require("./admin");
const session = require('express-session');
const multer = require('multer');
const { ObjectId } = require('mongodb');
let authentication = "no";

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.static("views"));

// for img 
app.use(express.urlencoded({ extended: true }));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add express-session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a strong and unique secret
    resave: true,
    saveUninitialized: true
}));

function userApproval(req, res, next) {
    if (authentication == "approvedForUser") {
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized: User approval denied' });
    }
}
function adminApproval(req, res, next) {
    if (authentication == "approvedForAdmin") {
        return next();
    } else {
        return res.status(403).json({ message: 'Forbidden: Admin approval denied' });
    }
}

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/signup', (req, res) => {
    res.render('signup');
});
app.get('/admin', async (req, res, next) => {
    try {
        // Fetch data using mongoose query with await
        const users = await AdminForm.find({});
        // Render the EJS template with the users data
        res.render('admin', { users: users });
    } catch (error) {
        console.error("Error While fetching data from DB");
        next(error); // Pass the error to the error handling middleware
    }
});

app.get('/edit/:id', async (req, res) => {
    const entryId = req.params.id;
    const entryDetails = await AdminForm.findById(entryId);
    res.render('edit', { entryDetails });
});
app.get('/user', (req, res) => {
    res.render('user');
});


app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password,
        role: 'user',
    };
    try {
        const existingUser = await collection.findOne({ name: data.name });
        if (existingUser) {
            return res.send("User already exists, please choose another name");
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        const userData = await collection.insertMany(data);
        console.log(userData);
        authentication = "approvedForUser";

        // Store user information in the session
        req.session.user = { name: data.name, role: 'user' };

        return res.redirect('/');
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.username });

        if (!user) {
            return res.send("Username not found!");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.send('Invalid password');
        } else {
            if (user.name === 'admin' && validPassword) {
                user.role = 'admin';
                authentication = "approvedForAdmin";
                req.session.user = user; // Store user information in the session
                return res.redirect('admin');
            }
            authentication = "approvedForUser";
            req.session.user = user; // Store user information in the session
            return res.redirect('user');
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/admin", upload.single('image'), async (req, res) => {
    const { buffer, mimetype } = req.file;
    const adminData = {
        image: buffer,
        imageType: mimetype,
        name: req.body.name,
        Model: req.body.model,
        NumberPlate: req.body.numberplate,
        MaxSpeed: req.body.maxspeed,
        Color: req.body.color,
        Date: req.body.date,
        Price: req.body.price,
        EngineType: req.body.engine,
    };
    try {
        const newAdmin = new AdminForm(adminData);
        await newAdmin.save();
        console.log('Data saved successfully');
        // Send a success status to the client
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
        // Send an error status to the client
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/update', upload.single('image'), async (req, res) => {
    try {
        const { entryId, name, model, numberplate, maxspeed, color, date, EngineType } = req.body;
        const image = req.file;

        const updatedEntry = {
            name: name,
            Model: model,
            NumberPlate: numberplate,
            MaxSpeed: maxspeed,
            Color: color,
            Date: date,
            EngineType: EngineType
        };

        if (image) {
            updatedEntry.imageType = image.mimetype;
            updatedEntry.image = image.buffer;
        }

        const filter = { _id: new ObjectId(entryId) };
        const update = { $set: updatedEntry };

        await AdminForm.updateOne(filter, update);

        console.log('Data updated successfully');
        res.redirect('/admin');
        // res.status(200).json({message: "Data Updated Successfully!"})

    } catch (updateErr) {
        console.error('Error updating data:', updateErr);
        res.status(500).send('Internal Server Error');
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
