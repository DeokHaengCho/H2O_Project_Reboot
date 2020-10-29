import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  headline: {
    marginLeft: theme.spacing(1)
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = props => {
  const { className, ...rest } = props;
  const [userList, setUserList] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editSearchTerm, setEditSearchTerm] = useState('')

  useEffect(()=>{
    axios.get(`http://13.125.133.39:8080/H2O/user/userList`)
    .then(response => {
        setUserList(response.data)
    })
    .catch(
        error => {
            throw (error)
        }
    )
},[]);

console.log(userList)
const searchTermInput = (e) => {
  setSearchTerm(e.target.value)
}

const dynamicSearch = () => {
  return userList.userName.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
}


  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      
      <div className={classes.row}
                  style={{fontWeight:"bold", fontSize:"x-large", minWidth:"200"}}>사용자 관리
        <span className={classes.spacer} />
          <input style={{maxWidth:200, display:'flex', flexWrap:'wrap', alignContent:'center'}} 
                type='text' value={searchTerm} onChange={searchTermInput} placeholder = '사용자 검색'/>
          <Link to="/admin/UserAdd">
          <Button
            color="primary"
            variant="contained"
          >
            사용자 등록
          </Button>
        </Link>
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
