
import React, {Component} from "react";
import axios from "axios";
import WeatherDetails from "./WeatherDetails";



class App extends Component{
  state = {
    temp:"",
    cityName:"",
    weather:"",
    high: "",
    low:"",
    icon:"",
    isRaining:""
  }

  // this method will be called after a change in state or change in props
  componentDidUpdate(prevProps, prevState){
    console.log("The component was updated");
    if(this.state.weather !== prevState.weather){
      const isRaining = this.state.weather.includes("rain");
      if(isRaining){
        this.setState({
          isRaining:"Rain rain go away!"
        })
      }
    }
  }

  searchCity=(event)=>{
    event.preventDefault();
    const city=document.querySelector('#city').value
    this.getCityWeather(city)
    this.getCityImage(city)
  }

  getCityWeather = (city)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`
    // native fetch
    // fetch(url).then(res =>res.json()).then(result=>console.log(result)).catch()
    axios(url).then((response) =>{
      console.log(response.data)
      this.setState({
        temp:response.data.main.temp,
        weather:response.data.weather[0].description,
        high:response.data.main.temp_max,
        low: response.data.main.temp_min,
        cityName: response.data.name, 
        icon: response.data.weather[0].icon
      })
     
    })
    
  }
  getCityImage = (city)=>{
    
    const options = {
      method: 'GET',
      url: 'https://google-image-search1.p.rapidapi.com/',
      params: {keyword: city, max: '10'},
      headers: {
        'x-rapidapi-host': 'google-image-search1.p.rapidapi.com',
        'x-rapidapi-key': '2813eb5737msh7eb31687acb9d2cp1a8ea2jsn1e273e3d2fe2'
      }
    };
    
    axios.request(options).then((response) =>{
      this.setState({
        image:response.data[0].image.url
      })
      console.log(response.data)
      
     
    }).catch(function (error) {
      console.error(error);
    });

  }
  

  render(){
    // const imgUrl='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/2560px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg'
    return (
      <div className="App">
        <h1>Weather App</h1>
        <div>
          <form onSubmit={this.searchCity}>
            <input type="text" name="city" id="city" placeholder="Enter a City Name"/>
          </form>
        </div>
        <h4>{this.state.isRaining}</h4>
        <hr/>
        {this.state.cityName && (<WeatherDetails 
          cityName={this.state.cityName}
          temp={this.state.temp}
          high={this.state.high}
          low={this.state.low}
          weather={this.state.weather}
          icon={this.state.icon}
          image={this.state.image}

        />)}
        {/* {this.state.image} */}
        {/* <img src={this.state.image}/> */}
      </div>
    );

  }
  
}

export default App;
