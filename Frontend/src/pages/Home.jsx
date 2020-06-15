import React, { useEffect } from 'react'
import Newpost from '../components/NewPost'
import { useSelector, useDispatch } from 'react-redux'
import { getAllQuestions } from '../store/post'
import Post from '../components/Post'
import Grid from '@material-ui/core/Grid'
import Header from '../components/Header'
function Home() {
  const dispatcher = useDispatch()
  const { posts, arePostLoaded } = useSelector((store) => store.posts)

  useEffect(() => {
    console.log('getting new posts')
    const getAllPosts = async () => {
      dispatcher(getAllQuestions())
    }
    getAllPosts()
  }, [])
  return (
    <Grid container direction='column' spacing={10}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Grid container direction='row' justify='stretch'>
          <Grid item xl={3} lg={3} sm={3}></Grid>
          <Grid item xl={6} lg={6} sm={6}>
            <Grid container direction='column' justify='center' alignItems='stretch' style={{ margin: '10 100px' }}>
              <Grid item>
                <Newpost />
              </Grid>
              <Grid item>{arePostLoaded && posts.map((data) => <Post content={data} />)}</Grid>
            </Grid>
          </Grid>
          <Grid item xl={3} lg={3} sm={3}></Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home
