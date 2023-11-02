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

router.get('/kpi-dashboard-data', (req, res) => {
    const data = {
      'Avg UE Connected': [],
      'Avg RSRP': [],
      'Avg SINR': [],
      'Avg CQI': [],
      'Resource Util': [],
      'Call Drops': []
    };
  
    fs.createReadStream('./data/tower-kpi-data.csv')
      .pipe(csv())
      .on('data', (csvData) => {
        const avgUEConnected = parseFloat(csvData['Avg UE Connected']);
        const avgRSRP = parseFloat(csvData['Avg RSRP']);
        const avgSINR = parseFloat(csvData['Avg SINR']);
        const avgCQI = parseFloat(csvData['Avg CQI']);
        const resourceUtil = parseFloat(csvData['Resource Util']);
        const callDrops = parseFloat(csvData['Call Drops']);
  
        data['Avg UE Connected'].push(avgUEConnected);
        data['Avg RSRP'].push(avgRSRP);
        data['Avg SINR'].push(avgSINR);
        data['Avg CQI'].push(avgCQI);
        data['Resource Util'].push(resourceUtil);
        data['Call Drops'].push(callDrops);
    
      })
      .on('end', () => {
        res.json(data);
      });
  });
router.get('/energy-dashboard-data', (req, res) => {
    const data = {
      'Total Energy': [],
      'Energy per Data': [],
      'Energy per User': []
    };
  
    fs.createReadStream('./data/tower-energy-data.csv')
      .pipe(csv())
      .on('data', (csvData) => {
        const totalEnergy = parseFloat(csvData['Total Energy']);
        const energyPerData = parseFloat(csvData['Energy per Data']);
        const energyPerUser = parseFloat(csvData['Energy per User']);
  
        data['Total Energy'].push(totalEnergy);
        data['Energy per Data'].push(energyPerData);
        data['Energy per User'].push(energyPerUser);

      })
      .on('end', () => {
        res.json(data);
      });
  });


  

export default router;
