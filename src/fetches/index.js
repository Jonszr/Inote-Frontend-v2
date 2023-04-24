


export const signup = async (user) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": user.email,
        "name": user.name,
        "password": user.password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let res = undefined;
    await fetch("http://localhost:3000/blogserver/blog/signup", requestOptions)
        .then(response => response.json())
        .then(result => res = result)
        .catch(error => console.log('error', error));
    console.log(res);
    return res;
}

export const signin = async (user) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var raw = JSON.stringify({
        "email": user.email,
        "password": user.password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let res = undefined;
    await fetch("http://localhost:3000/blogserver/blog/signin", requestOptions)
        .then(response => response.json())
        .then(result => res = result)
        .catch(error => console.log('error', error));
    console.log(res);

    return res;
}

export const getUserByToken = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyOWFkNWIxOWUzODZjMTY5OWIzNGNkNSIsIm5hbWUiOiJqb25zaGkiLCJlbWFpbCI6ImpvbnNoaUBnbWFpbC5jb20iLCJmb2xsb3dpbmciOltdLCJmb2xsb3dlcnMiOltdLCJyb2xlIjoic3Vic2NyaWJlciIsImNyZWF0ZWQiOiIyMDIyLTA2LTA0VDAzOjQ2OjU3LjIyMloiLCJfX3YiOjAsImFib3V0IjoiSSBsaWtlIGNvZGluZyBzbyBtdWNoIiwidXBkYXRlZCI6IjIwMjItMDctMDVUMDA6MTg6MTguNjQ1WiJ9LCJpYXQiOjE2NTcwODM0MDEsImV4cCI6MTY1NzE2OTgwMX0.dUPrN7ye7RYq7UrKeDkBo2jo-4dQVX7JiX2yHvE5u10`);
    myHeaders.append("cookies", token);


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    let res = undefined;
    await fetch("http://localhost:3000/blogserver/blog/auth", requestOptions)
        .then((response) => response.json())
        .then(result => res = result)
        .catch(error => console.log('error', error))
    console.log(res)
    return res.data;

}
export const signout = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyOWFkNWIxOWUzODZjMTY5OWIzNGNkNSIsIm5hbWUiOiJqb25zaGkiLCJlbWFpbCI6ImpvbnNoaUBnbWFpbC5jb20iLCJmb2xsb3dpbmciOltdLCJmb2xsb3dlcnMiOltdLCJyb2xlIjoic3Vic2NyaWJlciIsImNyZWF0ZWQiOiIyMDIyLTA2LTA0VDAzOjQ2OjU3LjIyMloiLCJfX3YiOjAsImFib3V0IjoiSSBsaWtlIGNvZGluZyBzbyBtdWNoIiwidXBkYXRlZCI6IjIwMjItMDctMDVUMDA6MTg6MTguNjQ1WiJ9LCJpYXQiOjE2NTcwODM0MDEsImV4cCI6MTY1NzE2OTgwMX0.dUPrN7ye7RYq7UrKeDkBo2jo-4dQVX7JiX2yHvE5u10`);
    
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/blogserver/blog/signout", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}