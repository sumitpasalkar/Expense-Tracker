import { Card, CardContent, Grid, Typography } from '@mui/material';
import { BarChart, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Bar } from 'recharts';
import { useEffect, useState } from 'react';
import { DailyGraph, MonthGraph } from '../api/FetchGraph';

export const Home = () =>{
    const userId = localStorage.getItem("userId");
    const [dailyGraph , setDailyGraph] = useState({expense:0 , income:0});
    const [MonthlyGraph , setMonthlyGraph] = useState({expense:0 , income:0});
    useEffect ( () =>{
        fetchDailyGraph();
        fetchMonthlyGraph();
    },[])

    const fetchDailyGraph = async ()=>{
        const res = await DailyGraph(userId);
        if(res.success){
            console.log('Monthly Graph Data:', res.data);
            setDailyGraph(res.data);
        }
    }
    const fetchMonthlyGraph = async ()=>{
        const res = await MonthGraph(userId);
        console.log('Monthly Graph Data:', res.data);
        if(res.success){
            setMonthlyGraph({
                income: parseFloat(res.data.income),  
                expense: parseFloat(res.data.expense) 
            });       
         }
    }

    const pieData = [
        { name: 'Income', value: MonthlyGraph.income },
        { name: 'Expense', value: MonthlyGraph.expense }
    ];

    const COLORS = ['#4CAF50', '#F44336'];

    return (
        <div className='container mt-5'>
          <div className='row'>
            <Grid container spacing={3}>
              {/* First graph */}
              <Grid item xs={12} md={6}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h5" component="div" align="center" gutterBottom>
                      Daily Income vs Expense
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                data={[
                    { name: 'Daily', income: dailyGraph.income, expense: dailyGraph.expense },
                ]}
                margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                
                <Bar
                    dataKey="income"
                    fill="#4CAF50" 
                    barSize={40}
                    label={{ position: 'top' }}
                />
                
                <Bar
                    dataKey="expense"
                    fill="#F44336"
                    barSize={40}
                    label={{ position: 'top' }}
                />
                </BarChart>

                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
      
              {/* Second graph */}
              <Grid item xs={12} md={6}>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h5" component="div" align="center" gutterBottom>
                      Monthly Income Vs Expense
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="80%"
                                            label={({ name, value }) => `${name}: ${value}`}                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      );
      
      
}