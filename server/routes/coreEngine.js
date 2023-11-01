import express from 'express'
import request from 'request'

const router = express.Router()

router.get('/model-1', (req,res) => {
    request('http://127.0.0.1:5000/model-1', (error, response, body) => {
    if (error) {
      console.error('error:', error);
      res.status(500).send('Error occurred while making the request.');
    } else {
      res.send(body);
    }
  });
})

router.get('/model-2', (req,res) => {
    request('http://127.0.0.1:5000/model-2', (error, response, body) => {
    if (error) {
      console.error('error:', error);
      res.status(500).send('Error occurred while making the request.');
    } else {
      res.send(body);
    }
  });
})


export default router