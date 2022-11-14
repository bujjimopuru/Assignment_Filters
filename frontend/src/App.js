import {Component} from 'react'
import { BsFillRecordFill,BsFilter} from "react-icons/bs";
import { AiFillAppstore,AiOutlineMenu,AiOutlineSearch} from "react-icons/ai";
import './App.css';

const CardItem=(props)=>{
  const {cardDetails}=props
  const {name,user_name,budget_name,spent,available_to_spend,card_type,expiry,limit}=cardDetails
  return(
    
    <div className='cards'>
      <h3>{name}</h3>
      <div className='image-con'>
      <p className="card-text">{user_name}: {budget_name}</p>
      <img className='logo' src={spent.imgUrl} alt="fire"/>
      </div>
      <div className='image-con'>
      <button className="card-type">{card_type}</button>
      <p className="card-text"><i>{expiry} limit {limit} {spent.currency}</i></p>
      </div>
      <hr className='line' style={{color: "red",border:"solid 1px green",borderRadius:"20px", marginLeft:"10px",
      marginRight:"15px",height:"5px",
      background:`linear-gradient(90deg,green ${(available_to_spend.value)/(limit)*100}%,red ${(spent.value)/(limit)*100}%)`}}/>
      <div className='image-con'>
      <p><BsFillRecordFill className='circle'/> Spent</p>
      <p className="card-text"><i>{spent.value} {spent.currency}</i></p>
      </div>
      <div className='image-con'>
      <p> <BsFillRecordFill className='circle1'/> Available to spend</p>
      <p className="card-text"><i>{available_to_spend.value} {available_to_spend.currency}</i></p>
    </div>
    </div>
  )
}
class App extends Component{
  state={cardsList:[],cardsFilteredList:[],isFilted:false,searchResults:[],showFilter:true,sub:"",selectValue:""}
  componentDidMount(){
    this.getCardsData()
  }
  getCardsData=async ()=>{
    const response=await fetch('/cards')
    const data=await response.json()
    //console.log(data)
    this.setState({cardsList:data})
  }

  getButtonCards=(event)=>{
    const {cardsList}=this.state
    let cardsFiltered;
    if(event.target.value==='All'){
      cardsFiltered=cardsList
    }
    else{
      cardsFiltered=cardsList.filter(item=>
        item.status===event.target.value)
    }
    this.setState({cardsFilteredList:cardsFiltered,isFilted:false})
  }

  getModal=()=>{
    this.setState({isFilted:true})
  }
  getClosedModal=()=>{
    this.setState({isFilted:false})
  }
  getSbscription=(event)=>{
// console.log(event.target.value)
this.setState({sub:event.target.value})
  }
  getBurner=(event)=>{
    // console.log(event.target.value)
    this.setState({sub:event.target.value})
      }
  filterApply=(event)=>{
    const {sub,selectValue,cardsList}=this.state
    const searchFilters = cardsList.filter(element => {
      return element.card_type === sub && element.user_name === selectValue;
    });
      this.setState({searchResults:searchFilters,showFilter:false,isFilted:false})
  }
  getSelectValue=(event)=>{
    //console.log(event.target.value)
    this.setState({selectValue:event.target.value})
  }

  filterCancel=()=>{
    this.setState({showFilter:true,searchResults:[],isFilted:false})
  }
  render(){
    const {cardsFilteredList,isFilted,showFilter,searchResults,selectValue}=this.state
    return(
      <div className="">
      <div className='new-card'>
      <div className='headin-con'>
      <h1 className='cards-hd'>Virtual cards</h1>
      <div>
      <img src="https://i.ibb.co/sq3Q4qW/video-Icon.png" className='logo1' alt='videoicon'/>
      </div>
        <p className='learn-hd'>Learn More</p>
      </div>
      <button className='button'>+ Virtual card</button>
      </div>
      <div className='menu-list'>
      <div className='buttons-list'>
        <button className='btn' value="All" onClick={this.getButtonCards}>All</button>
        <button className='btn' value="active" onClick={this.getButtonCards}>Your</button>
        <button className='btn' value="block" onClick={this.getButtonCards}>Block</button>
      </div>
      <div>
        <AiFillAppstore className='menu-logo'/>
        <AiOutlineMenu className='menu-logo'/>
      </div>
      </div>
      <div className='filter-list'>
        <AiOutlineSearch className='filter-logo'/>
        <button className='filter-btn' onClick={this.getModal}><BsFilter className='filter-logo1'/> Filter</button>
      </div>
      {isFilted && (<div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={this.getClosedModal}
          >
            X
          </button>
        </div>
        <div className="title">
          <p>Filters</p>
          <hr/>
        </div>
        <div className="inputs">
        <input className="checkbox-sub" type="checkbox" value="subscription" onChange={this.getSbscription}/> Subscription
        <input className="checkbox-sub" type="checkbox" value="burner" onChange={this.getBurner}/> Burner
        </div>
        <p className="cardholder">Card Holder</p>
        <select className="select-option" value={selectValue} onChange={this.getSelectValue}>
            <option value="select card holder">Select card holder</option>
            <option value="Vishal">Vishal</option>
            <option value="Rajesh">Rajesh</option>
            <option value="Rajith">Rajith</option>
            <option value="Mayank">Mayank</option>
        </select>
        <div className="footer">
        <button id="apply-button" onClick={this.filterApply}>Apply</button>
          <button id="cancelBtn" onClick={this.filterCancel}>Clear</button>
        </div>
      </div>
    </div>)}
    {showFilter&&
        <ul className='card-container'>
          {cardsFilteredList.map(item=>(
            <CardItem key={item.owner_id} cardDetails={item}/>
          ))}
        </ul>
    }
    <ul className='card-container'>
          {searchResults.map(item=>(
            <CardItem key={item.owner_id} cardDetails={item}/>
          ))}
        </ul>
      </div>
    )
  }
}

export default App