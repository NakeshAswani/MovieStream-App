const { supabase, adminSupabase } = require('../../supabaseConfig');

const addUser = async (request, response) => {
    let responseObject = {};
    const { name, email, password } = request.body;
    const { id } = request.params;
    if (!id) {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            name,
            email,
            password
        });
        if (authError) {
            responseObject = {
                status: 400,
                message: authError.message,
            };
        }
        else {
            responseObject = {
                status: 200,
                message: "User created successfully",
            };
        }
        const { data: insertData, error: insertError } = await supabase.from('Users').insert([{ Uid: authData.user.id, Name: name, Email: email }]);
        if (insertError) {
            responseObject = {
                status: 400,
                message: insertError.message,
            };
        }
        else {
            responseObject = {
                status: 200,
                message: "User added successfully",
            };
        }
    }
    else {
        const { data: user, error: userError } = await supabase.from('Users').select('*').eq('Uid', id);
        if (userError) {
            responseObject = {
                status: 400,
                message: userError.message,
            };
        }
        else {
            const { data: updateData, error: updateError } = await supabase.from('Users').update({ Name: name, Email: email }).eq('Uid', id);
            if (updateError) {
                responseObject = {
                    status: 400,
                    message: updateError.message,
                };
            }
            else {
                responseObject = {
                    status: 200,
                    message: "User updated successfully",
                };
            }
            const { data: authUser, error: authError } = await adminSupabase.auth.admin.updateUserById(id, { email, name });
            if (authError) {
                responseObject = {
                    status: 400,
                    message: authError.message,
                };
            }
            else {
                responseObject = {
                    status: 200,
                    message: "User updated successfully",
                };
            }
        }
    }
    response.send(responseObject);
}

const forgotPassword = async (request, response) => {
    let responseObject = {}
    const { email, password } = request.body;
    console.log(email, password)
    const { data: userData, error: userError } = await supabase.from('Users').select('*').eq('Email', email)
    if (userError) {
        responseObject = {
            status: 400,
            message: userError.message,
        }
    }
    else {
        console.log(userData)
        const { data: authData, error: authError } = await adminSupabase.auth.admin.updateUserById(userData[0].Uid, { password });
        console.log(authData)
        if (authError) {
            responseObject = {
                status: 400,
                message: authError.message,
            }
        }
        else {
            responseObject = {
                status: 200,
                message: "User password updated successfully",
            }
        }
    }
    response.send(responseObject);
}

const loginUser = async (request, response) => {
    let responseObject = {}
    const { email, password } = request.body;
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    if (authError) {
        responseObject = {
            status: 400,
            message: authError.message,
        }
    }
    else {
        responseObject = {
            status: 200,
            message: "User logged in successfully",
            data: authData
        }
    }
    response.send(responseObject);
}

const getUser = async (request, response) => {
    let responseObject = {}
    const { id } = request.params;
    const { data: user, error: userError } = await supabase.from('Users').select('*').eq('Uid', id)
    if (userError) {
        responseObject = {
            status: 400,
            message: userError.message,
        }
    }
    else {
        responseObject = {
            status: 200,
            message: "User fetched successfully",
            data: user[0]
        }
    }
    response.send(responseObject);
};

const deleteUser = async (request, response) => {
    let responseObject = {}
    const { id } = request.params;
    const { data: dbData, error: dbError } = await supabase.from('Users').delete().eq('Uid', id)
    if (dbError) {
        responseObject = {
            status: 400,
            message: dbError.message,
        }
    }
    else {
        responseObject = {
            status: 200,
            message: "User deleted successfully",
        }
    }
    const { data: authUser, error: authError } = await adminSupabase.auth.admin.deleteUser(id)
    if (authError) {
        responseObject = {
            status: 400,
            message: authError.message,
        }
    }
    else {
        responseObject = {
            status: 200,
            message: "User deleted successfully",
        }
    }
    response.send(responseObject);
}

module.exports = {
    addUser,
    forgotPassword,
    loginUser,
    getUser,
    deleteUser
};