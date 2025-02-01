// const { getDoc, doc, addDoc, collection } = require('firebase/firestore');
// const { app } = require('../../firebaseConfig');
// const { db, auth } = require('../../firestore');
// const { getAuth, signInWithEmailAndPassword, signInWithRedirect, createUserWithEmailAndPassword } = require("firebase/auth");
// const { GoogleAuthProvider } = require("firebase/auth");

const { createUserWithEmailAndPassword } = require("firebase/auth");
const { db, auth } = require("../../firebaseConfig");
const { getDoc, addDoc, collection, doc, updateDoc } = require("firebase/firestore");


// const addUsers = async (req, res) => {
//     let resObj = {};
//     const { name, email, password } = req.body;
//     const { id } = req.params;
//     if (id) {
//         const docRef = await db.collection('Users').doc(id).get();
//         if (docRef.exists) {
//             await db.collection('Users').doc(id).set({
//                 "name": name || docRef.data().name,
//                 "email": email || docRef.data().email,
//                 updatedAt: new Date(),
//             });
//             resObj = {
//                 status: 200,
//                 message: "User updated successfully"
//             };
//         }
//         else {
//             resObj = {
//                 status: 401,
//                 message: "User not found"
//             };
//         }
//     }
//     else {
//         // const userRecord = await auth.createUser({
//         //     email,
//         //     password,
//         //     displayName: name,
//         // });
//         const auth = getAuth(app);
//         const userRecord = await createUserWithEmailAndPassword(auth, email, password);
//         // await db.collection("Users").doc(userRecord.user.uid).set({
//         //     name,
//         //     email,
//         //     createdAt: new Date(),
//         // })
//         //     .then((userCredential) => {
//         //         const user = userCredential.user
//         //         resObj = {
//         //             status: 200,
//         //             message: "User added successfully"
//         //         };
//         //     })
//         //     .catch((error) => {
//         //         resObj = {
//         //             status: 401,
//         //             message: "User ! found",
//         //             error: error
//         //         };
//         //     });
//         await addDoc(collection(db, "Users"), {
//             name,
//             email,
//             createdAt: new Date(),
//         })
//             .then((userCredential) => {
//                 const user = userCredential.user
//                 resObj = {
//                     status: 200,
//                     message: "User added successfully"
//                 };
//             })
//             .catch((error) => {
//                 resObj = {
//                     status: 401,
//                     message: "User ! found",
//                     error: error
//                 };
//             });
//     }
//     res.status(resObj.status).json({ message: resObj.message, error: resObj.error | "" });
// }

// const loginUser = async (req, res) => {
//     let resObj = {};
//     const { google } = req.params;
//     console.log(google)
//     const { email, password } = req.body;
//     const auth = getAuth(app);
//     const provider = new GoogleAuthProvider();

//     if (google == 'false') {
//         const userRecord = await signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 resObj = {
//                     status: 200,
//                     message: "User logged in successfully"
//                 };
//             })
//             .catch((error) => {
//                 resObj = {
//                     status: 401,
//                     message: "User not found",
//                     error: error
//                 };
//             });
//     }
//     else {
//         //    await signInWithRedirect(auth,provider);
//         resObj = {
//             status: 200,
//             message: "google",
//         };

//     }
//     // console.log(email, password);
//     // resObj = {
//     //     status: 200,
//     //     message: "User logged in successfully"
//     // };

//     // resObj = {
//     //     status: 401,
//     //     message: "User not found"
//     // };
//     res.status(resObj.status).json({ message: resObj.message });
// }

// const getUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(id);
//         // const docRef=doc(db, "Users", id);

//         // const docSnap = await getDoc(docRef);
//         const docRef = await db.collection('Users').doc(id).get();
//         // const docSnap=await docRef.get();
//         if (docRef.exists) {
//             console.log(docRef.data());
//         }
//         else {
//             console.log("No such document");
//         }
//         res.status(200).json({ message: "User fetched successfully" });
//     }
//     catch (error) {
//         console.log(error);
//         res.status(401).json({ message: "User Not Found" });
//     }
// }

// const delUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await auth.deleteUser(id);
//         await db.collection('Users').doc(id).delete();
//         res.status(200).json({ message: "User deleted successfully" });
//     }
//     catch (error) {
//         console.log(error);
//         res.status(401).json({ message: "User Not Found" });
//     }
// }

// module.exports = {
//     addUsers,
//     loginUser,
//     getUser,
//     delUser
// }


const addUsers = async (request, response) => {
    let responseObject = {};
    const { name, email, password } = request.body;
    const { id } = request.params;
    if (id) {
        const docRef = await getDoc(doc(db, "Users", id));
        console.log(docRef.data());
        if (docRef.exists) {
            if(email){
                await auth.updateUser(id, {
                    email: email
                })
            }
            await updateDoc(doc(db, "Users", id), {
                "name": name || docRef.data().name,
                "email": email || docRef.data().email,
                updatedAt: new Date(),
            });
            responseObject = {
                status: 200,
                message: "User updated successfully"
            };
        }
        else {
            responseObject = {
                status: 401,
                message: "User not found"
            };
        }
    }
    else {
        let uid;
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                uid = userCredential.user.uid;
                responseObject = {
                    status: 200,
                    message: "User created successfully"
                };
            })
            .catch((error) => {
                responseObject = {
                    status: 401,
                    message: "User not created"
                };
            });
            await addDoc(collection(db, "Users"), {
                uid,
                name,
                email,
                createdAt: new Date(),
            })
        // await db.collection("Users").doc(userRecord.user.uid).set({
        //     name,
        //     email,
        //     createdAt: new Date(),
        // })
            .then(() => {
                responseObject = {
                    status: 200,
                    message: "User added successfully"
                };
            })
            .catch((error) => {
                responseObject = {
                    status: 401,
                    message: "User not added"
                };
            });
    }
    response.send(responseObject);
}

module.exports = {
    addUsers
}