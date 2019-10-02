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
  componentDidMount(){
    axios
    .get(`https://api.github.com/users/${this.state.user}`)
    .then(response => {
      // console.log('userInfo', response.data)
      this.setState({
        userInfo: response.data
      })

      for(let i = 0; i < 3; i++){
        // SET UP SECOND AXIOS TO GET FOLLOWER LOGIN RANDOMLY THEN USE ANOTHER AXIOS CALL TO GET THEIR INFORMATION
          // GET RID OF DUPLICATES AND -1
        axios
        .get(`https://api.github.com/users/${this.state.user}/followers`)
        .then(response => {
          // console.log('userFollowers', response.data)
          let n = Math.floor(Math.abs(Math.random()*response.data.length-1))
          this.setState({
            // followerArray: [...this.state.followerArray, response.data[n].login]
            ...this.state, followerArray:response.data[n].login
          })

          // this.state.followerArray.forEach(item => {
            axios
            .get(`https://api.github.com/users/${this.state.followerArray}`)
            
            .then(response => {
              console.log('RESPONSE', response.data)
              
              this.setState({
                followerInfo: response.data
              })
            })
          // })
        })
      }
    })
  }

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
        />
        <button onClick={this.newUser}>Find a User</button>
        <ProfileCards 
        info={this.state.userInfo} 
        followerInfo={this.state.followerInfo}
        />
      </div>
    )
  }
}

export default User;