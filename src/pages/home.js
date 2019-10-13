import React, { Component } from 'react'
import axios from 'axios';

import Grid from '@material-ui/core/Grid';


import StreamUI from '../components/stream'

class Home extends Component {
    state = {
        streams:null
    }

    componentDidMount(){
        axios.get('/streams')
        .then(res =>{
            console.log(res.data)
            this.setState({
                streams: res.data
            })
        }).catch(err => console.log(err))
    }

    render() {

        let recentStreamsMarkup = this.state.streams ?(
             this.state.streams.map((stream) => <StreamUI key={stream.stremId} stream={stream} />)
        ): (<p> Loading....</p>)
        return (
           <Grid container spacing={16}>
               <Grid item  sm={8} xs={12}>
                    {recentStreamsMarkup}
               </Grid>
          
           
           <Grid item  sm={4} xs={12}>
               <p> Profile</p>
           </Grid>
       </Grid>
        )
    }
}


export default Home;
