import React, { useEffect } from 'react'
import Newpost from '../components/NewPost'
import { useSelector, useDispatch } from 'react-redux'
import { getAllQuestions } from '../store/post'
import Post from '../components/Post'
import Grid from '@material-ui/core/Grid'
import Header from '../components/Header'
import ListAllUsers from '../components/ListAllUsers'
function Home() {
  const dispatcher = useDispatch()
  const { posts, arePostLoaded } = useSelector((store) => store.posts)

  useEffect(() => {
    const getAllPosts = async () => {
      dispatcher(getAllQuestions())
    }
    getAllPosts()
  }, [])
  return (
    <Grid container direction='column' spacing={10} style={{ maxWidth: '100vw' }}>
      <Grid item xm={12}>
        <Header />
      </Grid>
      <Grid container direction='row' item xm={12} justify='space-evenly' spacing={10}>
        <Grid item xs={2} lg={2}></Grid>
        <Grid item xs={8} lg={7}>
          <Grid container direction='column' style={{ margin: '50px 0px' }}>
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
