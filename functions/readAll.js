// Grab our credentials from a .env file or environment variables
require('dotenv').config();
const {
    VITE_PUBLIC_DATABASE_URL,
    VITE_PUBLIC_SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(VITE_PUBLIC_DATABASE_URL, VITE_PUBLIC_SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
exports.handler = async event => {

    // Get everything from the notes table
    let { data: notes, error } = await supabase
        .from('Resume')
        .select('*')

  // Did it work?
  console.log(data, error);
  
}