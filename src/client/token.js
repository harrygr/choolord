module.exports = (payload) => {
      if (payload.password == 'password') {
        const response = { data: {
          access_token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjQiLCJleHAiOjE0ODY0MTExOTIsImlhdCI6MTQ4MzgxOTE5MiwiaXNzIjoiUGhlZGRpdCIsImp0aSI6ImE2OTFmMGUwLWNiZDMtNDcxNy1iODg2LTQ5Y2RkMDI3M2VkYiIsInBlbSI6e30sInN1YiI6IlVzZXI6NCIsInR5cCI6ImFjY2VzcyJ9.heGn3W4OuvUjpP86LqYrDCKXHA0SMACySBV7unF3HdDuDQKWNtxkPTwS0zr4FFFE7TV3imaa0FscTD8jT5TsRQ',
          refresh_token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjQiLCJleHAiOjE0ODY0MTExOTIsImlhdCI6MTQ4MzgxOTE5MiwiaXNzIjoiUGhlZGRpdCIsImp0aSI6ImE2OTFmMGUwLWNiZDMtNDcxNy1iODg2LTQ5Y2RkMDI3M2VkYiIsInBlbSI6e30sInN1YiI6IlVzZXI6NCIsInR5cCI6ImFjY2VzcyJ9.heGn3W4OuvUjpP86LqYrDCKXHA0SMACySBV7unF3HdDuDQKWNtxkPTwS0zr4FFFE7TV3imaa0FscTD8jT5TsRQ',
          expires_in: new Date().valueOf() + 1e8
        }}

        return Promise.resolve(response)
      }

      return Promise.reject({data: 'unauthorised'})
    }
