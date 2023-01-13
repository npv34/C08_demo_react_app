import {useDispatch, useSelector} from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import {Button} from "@mui/material";
import {removeProduct} from "../../features/cart/cartSlice";
function Cart() {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch()
    console.log(cart)
    const handleDelete = (pId) => {
        let product = cart.items.filter(item => item.id === pId)
        dispatch(removeProduct(product[0]))
    }

    return (
        <>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {cart.items.map(item => (
                    <ListItem key={item.id}>
                        <ListItemAvatar>
                            <Avatar>
                                <ImageIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.title} secondary={item.price} />
                        <Button onClick={()=>handleDelete(item.id)}>Xoa</Button>
                    </ListItem>
                ))}



            </List>
        </>
    )
}

export default Cart
