import axios from 'axios';

export const PostOrdersAPI = async (data) => {
    const url = `${process.env.REACT_APP_BASE_URL}/orders`
    try {
      return axios({
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/json',
        },
        data
      })
        .then(res => res)
        .catch(err =>
          {if (err.response) {
              return err.response
            } else if (err.request) {
              console.log("post orders axios request", err)
            } else {
              console.log("post orders axios error something else", err.request)
            }
          }
        )
    } catch (error) {
      if (error.response) {
        console.log("post orders response error catch: ", error.response)
      }
    }
}