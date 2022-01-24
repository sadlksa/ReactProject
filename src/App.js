import { Component } from 'react';
import './App.css';
class ProductList extends Component{
  constructor(props){
    super(props)
    this.state={
      objects:[],
      DataisLoaded: false
    };
  }
  componentDidMount= () =>{
    fetch('https://assessment-edvora.herokuapp.com')
    .then(res => res.json())
    .then((json) => {
      this.setState({
        objects: json,
        DataisLoaded: true
      })
    })
  }
  render(){
    const {DataisLoaded, objects}=this.state;
    var uniqueNames=[];
    objects.map(o => {
    if(!uniqueNames.includes(o.product_name))
      uniqueNames.push(o.product_name)
    })
    var uniqueBrands=[];
    objects.map(o => {
    if(!uniqueBrands.includes(o.brand_name))
    uniqueBrands.push(o.brand_name)
    })
    if(!DataisLoaded)
    return(<div><h1 className='loading'>Please Wait Resources Are Loading...</h1></div>);
    else{
    return(
      <div className='All'>
        {leftContainer(uniqueNames,objects)}
      <div className="right-container">
        <div className="title-subtitle-container">
        {title()}
        {subTitle()}
        </div>
        <div className="Containers">
        <div className='App'>
          {uniqueBrands.map(unique => productContainer(unique,objects))}
        </div>
        </div>
        </div>
        </div>
    )
    }
  }
}
class DropDowns extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      state: null,
      city: null
    };
    this.handleChangeProducts = this.handleChangeProducts.bind(this);
    this.handleChangeStates = this.handleChangeStates.bind(this);
    this.handleChangeCities = this.handleChangeCities.bind(this);
  }
  handleChangeProducts(Newname) {
    this.setState({ name: Newname.target.value });
  }
  handleChangeStates(NewState) {
    this.setState({ state: NewState.target.value });
  }
  handleChangeCities(NewCity) {
    this.setState({ city: NewCity.target.value });
  }
  render(){
    return (
      <div className="dropdown-container">
      <select className="products-dropdown" id='product' onChange={this.handleChangeProducts}>
        <option value="" class="dropdown-element" selected disabled>Products</option>
        {this.props.productnames.map(name => {
            return (
             <option class="dropdown-element" value={name}>{name}</option>
            )
        })}
      </select>
      <select className="states-dropdown" id='state' onChange={this.handleChangeStates}>
        <option value="" class="dropdown-element" selected disabled>States</option>
        {this.state.name==null ? 
        this.props.states.map(state => {
          return (
            <option class="dropdown-element" value={state}>{state}</option>
          )
        }) : 
        this.props.fullObject.filter(object =>
          object.product_name == this.state.name
          ).map(object => {
            return (
              <option class="dropdown-element" value={object.address.state}>{object.address.state}</option>
            )
          })}
      </select>
      <select className="city-dropdown" id='city' onChange={this.handleChangeCities}>
        <option value="" class="dropdown-element" selected disabled>Cities</option>
          {this.state.name==null && this.state.state==null ?
            this.props.cities.map(city => {
              return (
               <option class="dropdown-element" value={city}>{city}</option>
              )
            })
            :
            this.props.fullObject.filter(object =>
              object.address.state == this.state.state
              ).map(object => {
                return (
                  <option class="dropdown-element" value={object.address.city}>{object.address.city}</option>
                )
              })
          }
      </select>
      </div>
    )
  }
}
class ProductContainer extends Component{
  constructor(props) {
    super(props);
    this.state={
      count: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState({count : this.state.count+306.5})
    console.log(this.state.count)
    var brand=this.props.object.map(o => {
      return o.brand_name
    })
    var container=document.getElementById(brand[0]);
    container.style.transform="translate("+(-this.state.count)+"px)";
    console.log(container.style.transform)
  }
  render(){
    var brand=this.props.object.map(o => {
      return o.brand_name
    })
    return (
      <div className='viewport' id='viewport'>
      <div className="productsDetailsContainer" id={brand[0]}>
        {this.props.object.map(o => {
          return (
            <div className='inner'>
        <div className='inside'>
        <img className="image" src={o.image}/>
        <div className='names'>
        <p>Product Name: {o.product_name}</p>
        <p>Brand Name: {o.brand_name}</p>
        <p>$ {o.price}</p>
        </div>
        </div>
        <div className='lower'>
        <p>{o.address.city},{o.address.state}</p>
        <p>Date: {o.date}</p>
        </div>
        <div className='description'>
          <p>{o.discription}</p>
        </div>
        </div>
          )
        })}
        </div>
        <button className='arrow' onClick={this.handleClick}>&gt;</button>
        </div>
    )
  }
}
function indexPage() {
  return (
    <div className="index-page">
        <ProductList/> 
    </div>
  );
}
  function leftContainer(Productnames,Object){
    var uniqueCity=[];
    Object.map(o => {
    if(!uniqueCity.includes(o.address.city))
      uniqueCity.push(o.address.city)
    })
    var uniqueState=[];
    Object.map(o => {
    if(!uniqueState.includes(o.address.state))
    uniqueState.push(o.address.state)
    })
    return(
      <div className="left-container">
            <input type="text" placeholder="Filters" className="editable-text"></input>
              <DropDowns productnames={Productnames} states={uniqueState} cities={uniqueCity} fullObject={Object}/>
        </div>
    );
  }
    function title(){
        return(
          <div className="title">
              <p>Edvora</p>
          </div>
        );
  }
  function subTitle(){
    return(
      <div className="subtitle">
        <p>Products</p>
      </div>
    );
  } 
  function productContainer(object,wholeObject){
    var CorrespondingObject=wholeObject.filter(element => element.brand_name===object)
    return(
      <div className="productsContainer">
        {productTitle(object)}
        {productSlider(CorrespondingObject)}
      </div>
    );
  }
  function productTitle(name){
    return(
      <div className="productName">
        <p>{name}</p>
      </div>
    );
  }
  function productSlider(corObject){
    return (
      <div className='viewport'>
      <div className="productsDetailsContainer">
        <ProductContainer object={corObject} />
      </div>
      </div>
    );
  }
export default indexPage;
