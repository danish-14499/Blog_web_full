
import { Grid } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

const Home = () => {

    return (
        <>
            <Banner />
            <Grid container>
                {/* <Grid item lg={2} xs={12} sm={2}> */}
                <Grid item lg={12} xs={12} sm={12}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={12} lg={12}>
                    <Posts />
                </Grid>
            </Grid>
        </>
    )
}

export default Home;