const { createClient } = require('@supabase/supabase-js')

require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabaseRoleKey = process.env.SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const adminSupabase = createClient(supabaseUrl, supabaseRoleKey)

module.exports = {supabase, adminSupabase};