import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactEcharts from 'echarts-for-react';
import { makeStyles } from '@material-ui/core/styles';
import autoHeight from './autoHeight'
import React from 'react';
import op from '../../crawler/op'

var electron = window.require('electron')
// 子进程的 ipc 模块
var ipcRenderer = electron.ipcRenderer;

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  bg: {
    backgroundColor: 'white',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));



function getUrl(url) {
  ipcRenderer.send('op')
  // fetch(url)
}

function ContainedButtons({ height }) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: 'https://www.baidu.com/',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });

  const [list, setList] = React.useState(JSON.parse(localStorage.getItem('url')) || [])
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <div className={classes.bg}>
      <TextField
        id="standard-name"
        label="Name"
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
      />
      <Button variant="contained" color="primary" className={classes.button} onClick={() => getUrl(values.name)}>
        海贼王
        </Button>

      {/* <ReactEcharts
        option={{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        }
        }
        style={{ height: '100vh', width: '100%' }}
        className="react_for_echarts"
      // onEvents={{'click':onChartClick}  }
      /> */}
      {
        list.map(l => <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Word of the Day
          </Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
          </Typography>
          </CardContent>
        </Card>)
      }

    </div>
  );
}

export default autoHeight()(ContainedButtons)