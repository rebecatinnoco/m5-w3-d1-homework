import './App.css';
import React, {useState} from 'react';
import {Card} from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [login, setLogin] = useState(false);
  const [data,setData] = useState({});
  const[picture,setPicture] = useState('');
  
  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  return (
    <div class="container">
      <Card style={{width:'800px'}} className="mx-auto mt-5">
        <Card.Header className="pb-4">My React App</Card.Header>
        <Card.Body>
          <Card.Text>
            {!login &&
            <React.Fragment>
            <h3>Please login using one of the following:</h3>
            {/* Login Form */}
            <LoginForm />
            {/* FB Login Button */}
            <FacebookLogin 
              appId="511393377657922"
              autoLoad={false}
              fields="name,email,picture"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              icon="fa-facebook"
            />
            </React.Fragment>  
            }
            {login &&
            <Home fbpic={picture} fbdata={data}/>
            }
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

function LoginForm() {
  return (
    <form className="border mt-3 mb-5 p-3 bg-white">
      <label className="m-2">Name:</label>
      <input type="text" name="name" placeholder="Your name"/>
      <label className="m-2">Email:</label>
      <input type="email" name="email" placeholder="Your email"/>
      <input type="submit" value="Login" className="btn bg-success text-white my-3"/>
    </form>
  )
}

function Home ({fbpic,fbdata}) {
  return (
    <React.Fragment>
    <img src={fbpic} alt={fbdata.name} />
    <h3 className="d-inline text-success mx-2">
      Welcome Back {fbdata.name}!
    </h3>
    <p className="my-5">This is the home page of the app.</p>
    </React.Fragment>
  )
}

export default App;
