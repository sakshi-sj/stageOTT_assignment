import express, { Router } from "express";
import { addItemToList, removeItemFromList, listItemsInList } from '../controllers/users_list';

const router: Router = express.Router();

router.post('/add-to-list/:userId/:itemId' , addItemToList);

router.delete('/remove-from-list/:userId/:itemId', removeItemFromList);

router.get('/list-items/:userId', listItemsInList);

export const userListRouter = router;