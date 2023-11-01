import express from 'express';
import fs from 'fs';
import csv from 'csv-parser';

const router = express.Router();

router.get('/topology-dashboard-data', (req, res) => {
    const results = [];
    const results2 = [];

    fs.createReadStream('./data/UE-details.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            fs.createReadStream('./data/gNB-details.csv')
                .pipe(csv())
                .on('data', (data) => results2.push(data))
                .on('end', () => {
                    res.json({ devices: results, tower: results2 });
                });
        });
});

export default router;
