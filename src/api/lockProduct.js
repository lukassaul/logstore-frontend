import axios from 'axios';

export const PostLockProductAPI = async (data) => {
    console.log("post lock product: ", data)
    const url = `${process.env.REACT_APP_BASE_URL}/products/lock`
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
              console.log("post lock products axios request", err)
            } else {
              console.log("post lock products axios error something else", err.request)
            }
          }
        )
    } catch (error) {
      if (error.response) {
        console.log("post lock products response error catch: ", error.response)
      }
    }
}