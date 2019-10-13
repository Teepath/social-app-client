import React, { Component } from 'react'
import Link  from 'react-router-dom/Link';

import withStyles from '@material-ui/core/styles/withStyles';

import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'


const styles = {
    card: {
        display: 'flex', 
        marginBottom: 20,
    },
    image:{
        minWidth:200,
    },
    content:{
        padding:30
    }
}

class StreamUI extends Component {
   
    render() {
    dayjs.extend(relativeTime)
        const {classes, 
            stream:{body, 
                createdAt, 
                userImage,
                 userHandle, 
                 streamId,
                 commentCount} } = this.props
        return (
            <Card className={classes.card} key={streamId}>
                <CardMedia
                image={userImage}
                title="profile Image"
                className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography variant='h5' 
                    component={Link} to={`/users/${userHandle}`}
                    color="primary"
                    >
                    {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt.toString()).fromNow()}
                    </Typography>
                    <Typography variant="body"> {body}</Typography>
                </CardContent>
                
            </Card>
        )
    }
}

export default withStyles(styles)(StreamUI)
