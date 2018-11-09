import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Features from './components/Features.jsx';
import TechSpecs from './components/TechSpecs.jsx';
import normalizePort from 'normalize-port';

var port = normalizePort(process.env.PORT || '8081');

class Productdescriptions extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "Features",
      descriptions: [],
      product: []
    }
  }

  componentDidMount(){
    let id = window.location.pathname.replace(/\/product\//,'');
    //console.log(id);
    //if(id){
      // $.get('/productdescriptions',(data) =>{ //get all the data
      //   console.log(data[0]);
      //   this.setState({
      //     product: data[0]
      //   })
      // })
    // }else{
      $.get('http://fectrail-env.k3wc6evxm5.us-east-1.elasticbeanstalk.com/product/data/' + id,(productData) =>{
        //console.log(productData);
        this.setState({
          product: productData
        })
      })
    //}
  }
  changeView(){
    if(this.state.view === "Features"){
      this.setState({
        view:"TechSpecs"
      })
    } else{
      this.setState({
        view:"Features"
      })
    }
  }

  renderView() {
    const {view} = this.state;
    if(view === "Features"){
      return <Features features={this.state.product.features}/>
    }else if (view === "TechSpecs"){
      return <TechSpecs techSpecs={this.state.product.techSpecs}/>
    }
  }
  render() {
    return(
      <p><strong>The nitty gritty</strong></p>
      <div className="tabs">
      <button id="switchState"
        onClick={() => this.changeView()}>
        {this.state.view}
      </button>
      {this.renderView()}
      </div>
    );
  }
}



//ReactDOM.render(< Productdescriptions />, document.getElementById('productDescriptions'));

export default Productdescriptions;
