
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
    isRaining:"",
    searchCityInput:"",
  }

  // this method will be called after a change in state or change in props
  // componentDidUpdate(prevProps, prevState){
  //   console.log("The component was updated");
  //   if(this.state.weather !== prevState.weather){
  //     const isRaining = this.state.weather.includes("rain");
  //     if(isRaining){
  //       this.setState({
  //         isRaining:"Rain rain go away!"
  //       })
  //     }
  //   }
  // }

  searchCity=(event)=>{
    event.preventDefault();
    // const city=document.querySelector('#city').value
    const city = this.state.searchCityInput
    this.getCityWeather(city)
    this.getCityImage(city)
    this.setState({ searchCityInput: '' })
  }

  getCityWeather = (city)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`
    // native fetch
    // fetch(url).then(res =>res.json()).then(result=>console.log(result)).catch()
    axios(url).then((response) =>{
      document.body.style.backgroundImage="url(image:response.data[0].image.url)"
      console.log(response.data)
      this.setState({
        temp:response.data.main.temp.toFixed(1),
        weather:response.data.weather[0].description,
        high:response.data.main.temp_max.toFixed(1),
        low: response.data.main.temp_min.toFixed(1),
        cityName: response.data.name, 
        icon: response.data.weather[0].icon
      })
     
    })
    
  }
  getCityImage = (city)=>{
    
    const options = {
      method: 'GET',
      url: 'https://google-image-search1.p.rapidapi.com/',
      params: {keyword: city, max: '5'},
      headers: {
        'x-rapidapi-host': 'google-image-search1.p.rapidapi.com',
        'x-rapidapi-key': '2813eb5737msh7eb31687acb9d2cp1a8ea2jsn1e273e3d2fe2'
      }
    };
    
// for(let i=0; i<10; i++){
//   const random10= Math.floor(Math.random()*10);

// }

   
   const random5 = Math.floor(Math.random()*5)

    axios.request(options).then((response) =>{
      this.setState({
        image:response.data[random5].image.url
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
        <div className='search-area'>
        <h1>Weather App</h1>
        <div>
          
          <form onSubmit={this.searchCity}>
            <input 
              type="text" 
              name="city" 
              id="city" 
              placeholder="Enter a City Name"
              value={this.state.searchCityInput}
              onChange={(e) => this.setState({ searchCityInput: e.target.value })}
            />
          </form>
        </div>
      
        <hr/>
        {this.state.cityName && (<WeatherDetails 
          cityName={this.state.cityName}
          temp={this.state.temp}
          high={this.state.high}
          low={this.state.low}
          weather={this.state.weather}
          icon={this.state.icon}
          // image={this.state.image}

        />)}
        {/* {this.state.image} */}
        </div>
        <img className="city-background" src={this.state.image} alt=""/>
      </div>
    );

  }
  
}

export default App;
