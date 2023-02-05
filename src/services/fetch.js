async function apiClient(route, method, body){
    try {
      if(body){
       
        const response = await fetch(`https://ubclick.onrender.com/${route}`, {
          method: method,
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        });
        return response
      }else{
        const response = await fetch(`http://192.168.43.156/${route}`, {
          method: method,
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        });
        return response
      }
       
    }catch(err){
        return err
    }
}

export { apiClient };
