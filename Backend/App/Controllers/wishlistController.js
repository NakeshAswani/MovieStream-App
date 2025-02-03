const { supabase } = require('../../supabaseConfig');
const fs = require('fs');

const addWishlist = async (request, response) => {
    let responseObject = {};
    const { Uid, Pid, Pname, Pdesc, Pimage } = request.body;
    const { data: wishlistData, error: wishlistError } = await supabase.from('Wishlist').insert([{ Uid, Pid, Pname, Pdesc, Pimage }]);
    if (wishlistError) {
        responseObject = {
            status: 400,
            message: wishlistError.message,
        };
    }
    else {
        responseObject = {
            status: 200,
            message: "Added to wishlist",
        };
    }
    response.send(responseObject);
}

const getWishlist = async (request, response) => {
    let responseObject = {};
    const { id } = request.params;
    const { data: wishlistData, error: wishlistError } = await supabase.from('Wishlist').select().eq('Uid', id);
    if (wishlistError) {
        responseObject = {
            status: 400,
            message: wishlistError.message,
        };
    }
    else {
        responseObject = {
            status: 200,
            message: "data found",
            wishlistData
        };
    }
    response.send(responseObject);
}

const deleteWishlist = async (request, response) => {
    let responseObject = {};
    const { id } = request.params;
    // const { data: wishlistData, error: wishlistError } = await supabase.from('Wishlist').delete().eq('Wid', id);
    // if (wishlistError) {
    //     responseObject = {
    //         status: 400,
    //         message: wishlistError.message,
    //     };
    // }
    // else {
    //     fs.unlinkSync(`uploads/wishlist/${wishlistData.Pimage}`)
    //     responseObject = {
    //         status: 200,
    //         message: "data deleted",
    //     };
    // }
    const { data: wishlistData, error: wishlistError } = await supabase.from('Wishlist').select("*").eq('Wid', id);
    if (wishlistError) {
        responseObject = {
            status: 400,
            message: wishlistError.message,
        };
    }
    else {
        fs.unlinkSync(`uploads/wishlist/${wishlistData[0].Pimage}`);
        const { data: deleteData, error: deleteError } = await supabase.from('Wishlist').delete().eq('Wid', wishlistData[0].Wid);
        if (deleteError) {
            responseObject = {
                status: 400,
                message: deleteError.message,
            };
        }
        else {
            responseObject = {
                status: 200,
                message: "data deleted",
            };
        }
    }
    response.send(responseObject);
}

module.exports = {
    addWishlist,
    getWishlist,
    deleteWishlist
};