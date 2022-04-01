
/**
 * Function for post requests.
 * @params {String} url Url for the request.
 * @params {Object} body Body of the post request
 */
const postRequest=async (url, body)=>{
    const resp=await  fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, credentials: 'include',
        body: JSON.stringify(body)
      })
      return resp
}
/**
 * 
 * Function for get requests.
 * @params {String} url Url for the request.
 */
const getRequest= async (url)=>{
    const resp=await  fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }, credentials: 'include'
      })
      return resp
}
export {
  getRequest, 
  postRequest
}