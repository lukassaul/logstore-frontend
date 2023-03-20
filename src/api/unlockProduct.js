import axios from 'axios';

export const PostUnlockProductAPI = async (data) => {
    const url = `${process.env.REACT_APP_BASE_URL}/products/unlock`
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
              console.log("post unlock products axios request", err)
            } else {
              console.log("post unlock products axios error something else", err.request)
            }
          }
        )
    } catch (error) {
      if (error.response) {
        console.log("post unlock products response error catch: ", error.response)
      }
    }
}