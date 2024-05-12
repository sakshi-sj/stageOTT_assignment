import { Request, Response } from 'express';
import UserModel from '../models/user'; 
import UserListModel from '../models/users_list';
import { getRedisClient } from '../cache'

export const addItemToList = async (req: Request, res: Response) => {
  try {
    const { userId, itemId } = req.params;

    // Check if user exists
    const userExists = await UserModel.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add item to user's list if not already present
    const userList = await UserListModel.findOneAndUpdate(
      { userId },
      { $addToSet: { items: itemId } },
      { new: true, upsert: true }
    );

    const redisClient = getRedisClient();

    await redisClient.set(userId, JSON.stringify(userList));

    return res.status(200).json(userList);
  } catch (error) {
    console.error('Error adding item to list:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const removeItemFromList = async (req: Request, res: Response) => {
  try {
    const { userId, itemId } = req.params;

    // Check if user exists
    const userExists = await UserModel.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove item from user's list
    const userList = await UserListModel.findOneAndUpdate(
      { userId },
      { $pull: { items: itemId } },
      { new: true }
    );

    const redisClient = getRedisClient();

    redisClient.set(userId, JSON.stringify(userList));
    return res.status(200).json(userList);
  } catch (error) {
    console.error('Error removing item from list:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const listItemsInList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Check if user exists
    const userExists = await UserModel.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }
    const redisClient = getRedisClient();

    const data = await redisClient.get(userId);

    if (data) {
        return res.status(200).json(JSON.parse(data));
    }

    // Get user's list
    const userList = await UserListModel.findOne({ userId });
    if (!userList) {
      return res.status(200).json({ items: [] }); // User has no items in the list
    }

    await redisClient.set(userId, JSON.stringify(userList));

    return res.status(200).json(userList);
  } catch (error) {
    console.error('Error listing items:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
