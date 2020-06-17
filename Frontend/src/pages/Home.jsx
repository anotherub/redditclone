import React, { useEffect } from 'react'
import Newpost from '../components/NewPost'
import { useSelector, useDispatch } from 'react-redux'
import { getAllQuestions } from '../store/post'
import Post from '../components/Post'
import Grid from '@material-ui/core/Grid'
import Header from '../components/Header'
import ListAllUsers from '../components/ListAllUsers'
import Sidebar from '../components/Sidebar'
import Divider from '@material-ui/core/Divider'

function Home() {
  const dispatcher = useDispatch()
  const { posts, arePostLoaded, eachPost } = useSelector((store) => store.posts)

  useEffect(() => {
    const getAllPosts = async () => {
      dispatcher(getAllQuestions())
    }
    getAllPosts()
  }, [])
  return (
    <Grid direction='column' spacing={10} style={{ flex: 1, display: 'flex', minHeight: '0px' }}>
      <Grid item xm={12}>
        <Header />
      </Grid>
      <Grid
        container
        direction='row'
        item
        xm={12}
        justify='space-evenly'
        spacing={8}
        style={{ position: 'absolute', top: '60px' }}
      >
        <Grid item xs={2} lg={2} alignItems='stretch' style={{ borderRight: '1px solid lightgray' }}>
          <Sidebar />
        </Grid>
        <Grid item xs={8} lg={7} style={{}}>
          <Grid container direction='column' style={{ flex: 1, overflow: 'auto', minHeight: '0px' }}>
            <Grid item>
              <Newpost />
            </Grid>
            <Grid item>{arePostLoaded && posts.map((data) => <Post content={data} />)}</Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} lg={3}>
          <ListAllUsers />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home
