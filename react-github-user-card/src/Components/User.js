import React from 'react';
import axios from 'axios'
import ProfileCards from './ProfileCards'

class User extends React.Component{

// CREATE STATE WITH THE USER AND THEIR INFORMATION
  constructor(){
    super();
    this.state = {
      user: 'JameaKidrick',
      userInfo: [],
      followerArray: [],
      userFollowers: '',
      followerInfo: []
    }
  }

  // USE COMPONENTDIDMOUNT (SIMILAR TO USEEFFECT) TO SEND AXIOS REQUEST FOR USER INFORMATION
  // SET USERINFORMATION BASED ON DATA RECEIVED FROM RESPONSE
  // SET UP 3 AXIOS REQUESTS:
    // 1) FOR MY PROFILE INFO
    // 2) TO FIND FOLLOWER
    // 3) FOR FOLLOWER'S PROFILE INFO
  componentDidMount(){
    axios
    .get(`https://api.github.com/search/usersq=${this.state.user}&client_id=08df25b458e0cba6deaf&client_secret=6dec993fb98a33832480ed7326f2f8367a4d9e16`)
    .then(response => {
      // console.log('userInfo', response.data)
      this.setState({
        userInfo: response.data
      })

      axios
      .get(`https://api.github.com/search/usersq=${this.state.user}&client_id=08df25b458e0cba6deaf&client_secret=6dec993fb98a33832480ed7326f2f8367a4d9e16`)
      .then(response => {
        console.log('userFollowers', response.data)
        response.data.forEach(item => {
          axios
          .get(`https://api.github.com/search/usersq=${item}&client_id=08df25b458e0cba6deaf&client_secret=6dec993fb98a33832480ed7326f2f8367a4d9e16`)
          
          .then(response => {
            console.log('RESPONSE', response.data)
            
            this.setState({
              followerInfo: response.data
            })
          })
        })
      })
    })
  }

  // SET UP cDU TO RERENDER COMPONENT AFTER SEARCHING FOR A NEW USER WHICH CHANGES THE USER STATE

  // componentDidUpdate(prevState){
  //   if(this.state.user !== prevState.user){
  //     axios
  //       .get(`https://api.github.com/users/${this.state.user}`)
  //       .then(response => {
  //         this.setState({
  //           userInfo: response.data
  //         })
  //       })
  //       .catch(error => 
  //         console.log('Search Error', error))
  //   }
  // }

  handleChange = e => {
    this.setState({
      user: e.target.value
    })
  }

  // SEND USERINFO TO PROFILE CARDS AS PROPS
  render() {
    console.log(this.state.followerArray)
    return(
      <div>
        <input
          type='text'
          value={this.state.user}
          onChange={this.handleChange}
          placeholder='Find a User'
        />
        <button onClick={this.newUser}>Search</button>
        <ProfileCards 
        info={this.state.userInfo} 
        followerInfo={this.state.followerInfo}
        />
      </div>
    )
  }
}

export default User;