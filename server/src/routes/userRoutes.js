import { Router } from 'express';
import * as UserService from '../services/userService';

const router = Router();

router.get('/', async (req, res, next) => {
  const result = await UserService.getUsers();
  res.json(result);
  next();
});

router.get('/:id', async (req, res, next) => {
  const result = await UserService.getUser({
    id: req.params.id,
  });
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error('User not found');
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const result = await UserService.createUser(req.body);
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error('User creation failed');
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const result = await UserService.updateUser(
    {
      id: req.params.id,
    },
    req.body,
  );
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error(`User with id of ${req.params.id} not found`);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const result = await UserService.deleteUser({
    id: req.params.id,
  });
  if (result) {
    res.json(result);
    next();
  } else {
    const err = new Error(`User with id of ${req.params.id} not found`);
    next(err);
  }
});

export default router;
