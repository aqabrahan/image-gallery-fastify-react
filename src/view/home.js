import { Card, CardContent, Container, Grid, CardHeader } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import Gallery from '../components/gallery';
import Uploader from '../components/uploader';
import { getImages, uploadImage } from '../services/images';

const Home = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getImages()
    .then(({data}) => {
      if (data.length > 0) {
        setImages(
            data.map((image) => ({
                original: `${image.url}`,
                thumbnail: `${image.url}`
            }))
        );
      }
    })
    .catch(err => {
      setError('Error on get images');
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Container fixed>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Gallery images={images} error={error} loading={loading} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Upload Image"
            />
            <CardContent>
              <Uploader onUploadHandle={uploadImage} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home;
