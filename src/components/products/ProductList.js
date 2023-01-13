import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions, Grid} from '@mui/material';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addToCart} from "../../features/cart/cartSlice";
let data = [
    {
        id: 1,
        title: 'Iphone 14 proMax 256GB',
        price: 340000,
        img: 'https://didongviet.vn/pub/media/catalog/product//i/p/iphone-14-128gb-didongviet_1.jpg'
    },
    {
        id: 2,
        title: 'Iphone 14 proMax 128GB',
        price: 200000,
        img: 'https://didongviet.vn/pub/media/catalog/product//i/p/iphone-14-128gb-didongviet_1.jpg'
    },
    {
        id: 3,
        title: 'Iphone 12 proMax 256GB',
        price: 150000,
        img: 'https://didongviet.vn/pub/media/catalog/product//i/p/iphone-14-128gb-didongviet_1.jpg'
    }
]


export default function ProductList() {
    const [products, setProducts] = useState(data);
    const dispatch = useDispatch()
    const handleAddToCart = (pId) => {
        let product = products.filter(product => product.id == pId)
        dispatch(addToCart(product[0]))
    }

    return (
        <>
            <Grid container spacing={2}>
            {products.map(product => (
                <Grid key={product.id} item xs={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={product.img}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.price}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small"
                                    color="primary"
                                    variant="contained"
                                    onClick={()=>handleAddToCart(product.id)}
                            >
                                Add to cart
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
            </Grid>
        </>

    );
}
