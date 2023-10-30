import express from 'express';
import fs from 'fs';
import csv from 'csv-parser';

const router = express.Router();

router.get('/gnb-details', (req, res) => {
    const results = [];
    fs.createReadStream('./data/gNB-details.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

router.get('/ue-details', (req, res) => {
    const results = [];
    fs.createReadStream('./data/UE-details.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

export default router;
