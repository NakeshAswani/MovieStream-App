const { supabase } = require('../../supabaseConfig');

const addWishlist = async (request, response) => {
    let responseObject = {};
    const { Uid, Pid, Pname, Pdesc } = request.body;
    const Pimage = request.file.filename;
    const { data: wishlistData, error: wishlistError } = await supabase.from('Wishlist').insert([{ Uid, Pid, Pname, Pdesc, Pimage }]);
    console.log(wishlistData)
    if (wishlistError) {
        responseObject = {
            status: 400,
            message: wishlistError,
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

module.exports = {
    addWishlist
};