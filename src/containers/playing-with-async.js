  async getApiData(method) {
    const apiUrl = "https://api.instagram.com/v1/users/self/?access_token="
    const accessToken = "";
    switch (method) {
      case 'get':
        const response = await fetch(apiUrl + accessToken);
        const data = await response.json();
        return data;
         
          2nd approch and bad approch start
          return fetch(apiUrl + accessToken)
            .then((response) => {
              if(response.ok) {
                return response.json();
              } else {
                throw new Error('Server response wasn\'t OK');
              }
            })
            .then((json) => {
              return json;
            });
          2nd approch and bad approch end
        
        break;
      default:
        break;
    }
  }
  async componentWillMount() {
    const data = await this.getApiData('get');
    console.log(data, 'datas');
    /*
      bad approch 2nd approch start
      const valid = this.getApiData('get').then(data => {
      console.log(data, 'owow');
      })  
      bad approch 2nd approch end
    */
  }
