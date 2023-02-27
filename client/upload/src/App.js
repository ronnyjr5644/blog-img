
import './App.css';
import React,{Component} from 'react';
import axios from 'axios';
import formFields from './formFields';


class Form extends Component {
  state={file:null};
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: ''
    }
  }

  
onFileChange(event){
  this.setState({
    file: event.target.files
  })
  console.log(event.target.files)
}
  render(){
    return (
      <div className="App">
       <form onSubmit={this.onSubmit.bind(this)}>
      <h5>confirm your entries</h5> 
      {this.renderFields()}
      <h5>Add an Image</h5>
      <input type="file" accept="image/*" onChange={this.onFileChange.bind(this)} />
      {this.render.Buttons()}
       </form>
      </div>
    );
  
}
}





export default App;
