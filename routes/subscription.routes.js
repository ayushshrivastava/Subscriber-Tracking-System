import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req,res)=> res.send( {
    title: 'Get all subscriptions'
}));

subscriptionRouter.get('/:id',(req,res)=> res.send( {
    title: 'Get subscription by id'
}));

subscriptionRouter.post('/',(req,res)=> res.send( {
    title: 'Create new subscription'
}));

subscriptionRouter.put('/:id',(req,res)=> res.send( {
    title: 'Update subscription by id'
}));

subscriptionRouter.delete('/:id',(req,res)=> res.send( {
    title: 'Delete subscription by id'
}));

subscriptionRouter.get('/user/:id',(req,res)=> res.send({
    title: 'Get all User Subacriptions by id'
}))

subscriptionRouter.put('/:id/cancel',(req,res)=>res.send({
    title: 'Cancel subscription by id'
}))

subscriptionRouter.get('/upcoming-renewals',(req,res)=>res.send({
    title: 'Get all upcoming renewals'
})) 

export default subscriptionRouter;