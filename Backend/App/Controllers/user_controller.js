const { getDoc, doc } = require('firebase/firestore');
const { app } = require('../../firebaseConfig');
const { db, auth } = require('../../firestore');
const { getAuth, signInWithEmailAndPassword, signInWithRedirect } = require("firebase/auth");
const {GoogleAuthProvider} = require("firebase/auth");


const addUsers = async (req, res) => {
    let resObj = {};
    const { name, email, password } = req.body;
    const { id } = req.params;
    if (id) {
        const docRef=await db.collection('Users').doc(id).get();
        if(docRef.exists){
            await db.collection('Users').doc(id).set({
                "name": name || docRef.data().name,
                "email": email || docRef.data().email,
                updatedAt: new Date(),
            });
            resObj = {
                status: 200,
                message: "User updated successfully"
            };
        }
        else{
            resObj = {
                status: 401,
                message: "User not found"
            };
        }
    }
    else {
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: name,
        });
        await db.collection("Users").doc(userRecord.uid).set({
            name,
            email,
            createdAt: new Date(),
        })
            .then((userCredential) => {
                const user = userCredential.user
                resObj = {
                    status: 200,
                    message: "User added successfully"
                };
            })
            .catch((error) => {
                resObj = {
                    status: 401,
                    message: "User not found",
                    error: error
                };
            });
    }
    res.status(resObj.status).json({ message: resObj.message });
}

const loginUser = async (req, res) => {
    let resObj = {};
    const {google}=req.params;
    console.log(google)
    const { email, password } = req.body;
    const auth=getAuth(app);
    const provider = new GoogleAuthProvider();

    if(google=='false'){
        const userRecord = await signInWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            resObj = {
                status: 200,
                message: "User logged in successfully"
            };
        })
        .catch((error) => {
            resObj = {
                status: 401,
                message: "User not found",
                error: error
            };
        });
    }
    else{
    //    await signInWithRedirect(auth,provider);
    resObj = {
        status: 200,
        message: "google",
    };

    }
    // console.log(email, password);
    // resObj = {
    //     status: 200,
    //     message: "User logged in successfully"
    // };

    // resObj = {
    //     status: 401,
    //     message: "User not found"
    // };
    res.status(resObj.status).json({ message: resObj.message });
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        // const docRef=doc(db, "Users", id);
        
        // const docSnap = await getDoc(docRef);
        const docRef=await db.collection('Users').doc(id).get();
        // const docSnap=await docRef.get();
        if(docRef.exists){
            console.log(docRef.data());
        }
        else{
            console.log("No such document");
        }
        res.status(200).json({ message: "User fetched successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "User Not Found" });
    }
}

const delUser = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);
        await db.collection('Users').doc(id).delete();
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "User Not Found" });
    }
}

module.exports = {
    addUsers,
    loginUser,
    getUser,
    delUser
}