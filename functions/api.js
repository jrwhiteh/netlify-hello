
require('dotenv').config();
const {
    DATABASE_URL,
    SUPABASE_SERVICE_API_KEY
} = process.env;

// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
  const segments = path.split('/').filter(e => e)

  switch (event.httpMethod) {
    case 'GET':
      /* GET /.netlify/functions/api */
      if (segments.length === 0) {
        // Get everything from the Resume table
            let { data: resume, error } = await supabase
            .from('Resume')
            .select('*')
            return {
                statusCode: 200,
                body: JSON.stringify(resume)
              }
      }



      /* GET /.netlify/functions/api/123456 */
      if (segments.length === 1) {
        event.id = segments[0]
        return read(event, context)
      } else {
        return {
          statusCode: 500,
          body: 'too many segments in GET request'
        }
      }



    /* POST /.netlify/functions/api */
    case 'POST':
      return create(event, context)





    /* PUT /.netlify/functions/api/123456 */
    case 'PUT':
      if (segments.length === 1) {
        event.id = segments[0]
        return update(event, context)
      } else {
        return {
          statusCode: 500,
          body: 'invalid segments in POST request, must be /.netlify/functions/api/123456'
        }
      }



    /* DELETE /.netlify/functions/api/123456 */
    case 'DELETE':
      if (segments.length === 1) {
        event.id = segments[0]
        return delete(event, context)
      } else {
        return {
          statusCode: 500,
          body: 'invalid segments in DELETE request, must be /.netlify/functions/api/123456'
        }
      }



    /* Fallthrough case */
    default:
      return {
        statusCode: 500,
        body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE'
      }
  }
}