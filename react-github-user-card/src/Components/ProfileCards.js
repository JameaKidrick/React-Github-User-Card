import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';


// STYLES
const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  profiles:{
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '3%'
  },
  card: {
    width: '45%',
    padding: '2%'
  },
  textContainer: {

  }
});


// CREATED A FUNCTION VS CLASS COMPONENT BECAUSE THESE ARE JUST CARDS THAT WILL NOT BE CONTROLLING THEMSELVES IN ANY WAY
// BRAIN PROCESS = TEMPLATE USED FOR DESIGN OR STRUCTURE ? FUNCTIONAL COMPONENT : CLASS COMPONENT
const ProfileCards = props => {
  const classes = useStyles();
  return(
    <div className={classes.profiles}>
      <Card className={classes.card}>
        <Avatar src={props.info.avatar_url} className={classes.bigAvatar} />
        <div className={classes.textContainer}>
          <Typography gutterBottom variant="h4">{props.info.name} </Typography>
          <Typography gutterBottom variant="h6"  color="textSecondary">{props.info.bio} </Typography>
          <Typography variant="body2" color="textSecondary" component="p">Location: {props.info.location}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Followers: {props.info.followers} </Typography>
          <Typography variant="body2" color="textSecondary" component="p">Following: {props.info.following} </Typography>
        </div>
      </Card>

      <Divider variant="inset" />

      <Card className={classes.card}>
        <Avatar src={props.followerInfo.avatar_url} className={classes.bigAvatar} />
        <div className={classes.textContainer}>
          <Typography gutterBottom variant="h4">{props.followerInfo.name} </Typography>
          <Typography gutterBottom variant="h6"  color="textSecondary">{props.followerInfo.bio} </Typography>
          <Typography variant="body2" color="textSecondary" component="p">Location: {props.followerInfo.location}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Followers: {props.followerInfo.followers} </Typography>
          <Typography variant="body2" color="textSecondary" component="p">Following: {props.followerInfo.following} </Typography>
        </div>
      </Card>
    </div>
  )
}

export default ProfileCards;