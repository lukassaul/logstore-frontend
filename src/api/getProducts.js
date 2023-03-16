import axios from 'axios';

export const GetProductsAPI = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/products`
    try {
      return axios({
        method: 'GET',
        url: url,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res)
        .catch(err =>
          {if (err.response) {
              return err.response
            } else if (err.request) {
              console.log("get products axios request", err)
            } else {
              console.log("get products axios error something else", err.request)
            }
          }
        )
    } catch (error) {
      if (error.response) {
        console.log("get products response error catch: ", error.response)
      }
    }
}

// export const GetProductsAPI = async () => {
//     axios.get(`${process.env.REACT_APP_BASE_URL}/products`)
//       .then(res => {
//         const products = res;
//         console.log("products: ", products)
//         return products;
//       })
// }