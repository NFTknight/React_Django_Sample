import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderFull from '../components/header-full'
import FooterGray from '../components/footer-gray'
import "./problemSet.css";
import axios from 'axios';
import { Link } from 'react-router-dom'

import { Button } from "@mui/material";

import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;


  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const columns = [
  {id: 'id', label: 'ID', minWidth: 20, align: 'center', bgcolor:'rgb(244,244,244)', border:'1px solid #FFFFFF'},
  {id: 'is_premium', label: 'Question\u00a0Name', minWidth: 250, align: 'center', bgcolor:'rgb(244,244,244)', border:'1px solid #FFFFFF' },
  {id: 'difficulty', label: 'Difficulty', minWidth: 120, align: 'center', bgcolor:'rgb(244,244,244)', border:'1px solid #FFFFFF'},
  {id: 'user_submission_status', label: 'Status', minWidth: 100, align: 'center', bgcolor:'rgb(244,244,244)', border:'1px solid #FFFFFF'},
  {id: 'tags', label: 'Tags', minWidth: 120, align: 'center', bgcolor:'rgb(244,244,244)', border:'1px solid #FFFFFF'},
  {id: 'Actions', label: 'Actions', minWidth: 80, align: 'center', bgcolor:'rgb(244,244,244)', border:'1px solid #FFFFFF'},
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function ProblemSet(){
  
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
  });
  const [questions, setQuestions] = useState([]);
  const [quests, setQuests] = useState([]);
  const [frameworklanguages,setFrameworklanguages] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const deleteQuestion = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await api.delete(`/api/questions/${id}/`);
        // Filter out the deleted question from the state
        const updatedQuestions = questions.filter(question => question.id !== id);
        setQuestions(updatedQuestions);
        alert("Question deleted successfully!");
      } catch (error) {
        console.error('Error deleting question:', error);
        alert("Failed to delete the question.");
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchFrameworks();
    fetchUserinfo();
  }, []);
  
  const fetchQuestions = async () => {
    try {
      const response = await api.get('/api/questions/');
      setQuestions(response.data);
      setQuests(response.data);// Update the state with fetched questions
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };  
  const fetchFrameworks = async () => {
    try {
      const response = await api.get('/api/frameworklanguages/');
      setFrameworklanguages(response.data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };
  const fetchUserinfo = async () => {
    try {
      const response = await api.get('/api/userprofile/');
      setUserinfo(response.data.user);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };
  // console.log(userinfo.is_staff)
  const frameworks = [...new Set(frameworklanguages.map(item => item.framework.name))];
  const languages = [...new Set(frameworklanguages.map(item => item.language.name))];
  const types = questions.flatMap(item => item.tags.map(n => n.name));
  const Alltags = [...new Set(types)];

  const navigate = useNavigate()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questions.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const Create = () => {
    navigate('/question/create')
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  const [clickid, setClickid] = useState('default')
  const [clickqname, setClickqname] = useState('default')
  const [clickdiff, setClickdiff] = useState('default')
  const [clickstatus, setClickstatus] = useState('default')
  const [filterData, setFilterData] = useState({
    quest: "All",
    diff: "All",
    status: "All",
    tags: [],
    frames:[],
    langs:[],
  });

  const sortedByDesc = (e) => {
    const comparator = getComparator('desc', e.target.parentElement.id);
    setQuests(questions.sort(comparator));
    if (e.target.parentElement.id=='id') {
      setClickid('down')
      setClickqname('default')
      setClickdiff('default')
      setClickstatus('default')
    } else if(e.target.parentElement.id=='difficulty'){
      setClickdiff('down')
      setClickqname('default')
      setClickid('default')
      setClickstatus('default')
    } else if(e.target.parentElement.id=='user_submission_status') {
      setClickstatus('down')
      setClickqname('default')
      setClickdiff('default')
      setClickid('default')
    }
  }
  const sortedByAsc = (e) => {
    const comparator = getComparator('asc', e.target.parentElement.id);
    setQuests(questions.sort(comparator));
    if (e.target.parentElement.id=='id') {
      setClickid('up')
      setClickqname('default')
      setClickdiff('default')
      setClickstatus('default')
    } else if(e.target.parentElement.id=='user_submission_status') {
      setClickstatus('up')
      setClickqname('default')
      setClickdiff('default')
      setClickid('default')
    }
  }

  const sortedByQuestAsc = () => {
    const sortedData = questions.sort((a, b) => {
      if (a.is_premium === true && b.is_premium === false) { return -1; }
      if (a.is_premium === false && b.is_premium === true) { return 1; }
      return a.name.localeCompare(b.name);
    });
    setQuests(sortedData)
    setClickstatus('default')
    setClickqname('up')
    setClickdiff('default')
    setClickid('default')
  }

  const sortedByQuestDesc = () => {
    const sortedData = questions.sort((a, b) => {
      if (a.is_premium === true && b.is_premium === false) { return 1; }
      if (a.is_premium === false && b.is_premium === true) { return -1; }
      return a.name.localeCompare(b.name);
    });
    setQuests(sortedData)
    setClickstatus('default')
    setClickqname('down')
    setClickdiff('default')
    setClickid('default')
  }

  const sortedByDiffAsc = () => {
    const sortedData = questions.sort((a, b) => {
      if (a.difficulty === "Hard" && b.difficulty === "Medium") { return -1; }
      if (a.difficulty === "Medium" && b.difficulty === "Hard") { return 1; }
      if (a.difficulty === "Medium" && b.difficulty === "Easy") { return 1; }
      if (a.difficulty === "Easy" && b.difficulty === "Medium") { return -1; }
      if (a.difficulty === "Hard" && b.difficulty === "Easy") { return -1; }
      if (a.difficulty === "Easy" && b.difficulty === "Hard") { return 1; }
      return a.name.localeCompare(b.name);
    });
    setQuests(sortedData)
    setClickdiff('up')
    setClickqname('default')
    setClickid('default')
    setClickstatus('default')
  }

  const sortedByDiffDesc = () => {
    const sortedData = questions.sort((a, b) => {
      if (a.difficulty === "Hard" && b.difficulty === "Medium") { return 1; }
      if (a.difficulty === "Medium" && b.difficulty === "Hard") { return -1; }
      if (a.difficulty === "Medium" && b.difficulty === "Easy") { return -1; }
      if (a.difficulty === "Easy" && b.difficulty === "Medium") { return 1; }
      if (a.difficulty === "Hard" && b.difficulty === "Easy") { return 1; }
      if (a.difficulty === "Easy" && b.difficulty === "Hard") { return -1; }
      return a.name.localeCompare(b.name);
    });
    setQuests(sortedData)
    setClickdiff('down')
    setClickqname('default')
    setClickid('default')
    setClickstatus('default')
  }

  const ChangeFilterData = (event) => {
    setFilterData({...filterData, [event.target.name]:event.target.value});
  };

  const ChangeTags = (event) => {
    const {
      target: { value },
    } = event;
    setFilterData({...filterData,tags:typeof value === 'string' ? value.split(',') : value})
  };

  const ChangeFrames = (event) => {
    const {
      target: { value },
    } = event;
    setFilterData({...filterData,frames:typeof value === 'string' ? value.split(',') : value})
  };

  const ChangeLangs = (event) => {
    const {
      target: { value },
    } = event;
    setFilterData({...filterData,langs:typeof value === 'string' ? value.split(',') : value})
  };
  useEffect(()=>{
    const filterQuestions = () => {
      return questions.filter(q => {
        
        const matchesQuestion =
        filterData.quest === "All" || 
        (filterData.quest === "Premium" && q.is_premium === true) || 
        (filterData.quest === "Free" && q.is_premium === false);
        const matchesDiff = filterData.diff === "All" || q.difficulty === filterData.diff;
        const matchesStatus = filterData.status === "All" || q.user_submission_status === filterData.status;
        const matchesTags =  filterData.tags.every(tag => q.tags.map(tag => tag.name)?.includes(tag));
        const matchesFrames =  filterData.frames.every(frame => q.framework_languages_detail.map(n => n.framework.name).includes(frame));
        const matchesLangs =  filterData.langs.every(lang => q.framework_languages_detail.map(n => n.language.name).includes(lang));
        return matchesQuestion && matchesDiff && matchesStatus && matchesTags && matchesFrames && matchesLangs;
      });
    };
  
    const filteredQuestions = filterQuestions();
   setQuests(filteredQuestions)
  },[filterData])

  return(
    <div className='problemset'>
      <HeaderFull />
      <div className='content'>
        <div className='createbtn'>
          <Button variant='contained' sx={{borderRadius:'10px'}} onClick={Create}>Create New Question</Button>
        </div>
        <div className='filter'>
          <FormControl sx={{ m: 1, width: 300 }} size='small'>
            <InputLabel id="demo-multiple-checkbox-label">Frameworks</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={filterData.frames}
              onChange={ChangeFrames}
              input={<OutlinedInput label="Frameworks" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {frameworks.map((frame) => (
                <MenuItem key={frame} value={frame}>
                  <Checkbox checked={filterData.frames.indexOf(frame) > -1} />
                  <ListItemText primary={frame} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }} size='small'>
            <InputLabel id="demo-multiple-checkbox-label">Languages</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={filterData.langs}
              onChange={ChangeLangs}
              input={<OutlinedInput label="Languages" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {languages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  <Checkbox checked={filterData.langs.indexOf(lang) > -1} />
                  <ListItemText primary={lang} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-controlled-open-select-label">Question</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={filterData.quest}
              label="Question"
              name="quest"
              onChange={ChangeFilterData}
            >
              <MenuItem value='All'>All</MenuItem>
              <MenuItem value='Free'>Free</MenuItem>
              <MenuItem value='Premium'>Premium</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-controlled-open-select-label">Difficulty</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={filterData.diff}
              label="Difficulty"
              name="diff"
              onChange={ChangeFilterData}
            >
              <MenuItem value='All'>All</MenuItem>
              <MenuItem value='Easy'>Easy</MenuItem>
              <MenuItem value='Medium'>Medium</MenuItem>
              <MenuItem value='Hard'>Hard</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={filterData.status}
              label="Status"
              name="status"
              onChange={ChangeFilterData}
            >
              <MenuItem value='All'>All</MenuItem>
              <MenuItem value='todo'>todo</MenuItem>
              <MenuItem value='none'>none</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }} size='small'>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={filterData.tags}
              onChange={ChangeTags}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {Alltags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={filterData.tags.indexOf(tag) > -1} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='table'>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="custom pagination table" size='small'>
                <TableHead sx={{height:'53px'}}>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}
                        style={{ minWidth: column.minWidth, backgroundColor:column.bgcolor, border:column.border, fontWeight:"bold", fontSize:'16px'}}
                      >
                        {column.label}
                        {column.label == "ID" && <IconButton aria-label="delete" id={column.id}>
                            {clickid == "default" && <UnfoldMoreIcon onClick={sortedByAsc} />}
                            {clickid == "up" && <KeyboardArrowUpIcon onClick={sortedByDesc} />}
                            {clickid == "down" && <KeyboardArrowDownIcon onClick={sortedByAsc} />}</IconButton>
                        }
                        {column.label == "Question\u00a0Name" && <IconButton aria-label="delete" id={column.id}>
                            {clickqname == "default" && <UnfoldMoreIcon onClick={sortedByQuestAsc} />}
                            {clickqname == "up" && <KeyboardArrowUpIcon onClick={sortedByQuestDesc} />}
                            {clickqname == "down" && <KeyboardArrowDownIcon onClick={sortedByQuestAsc} />}</IconButton>
                        }
                        {column.label == "Difficulty" && <IconButton aria-label="delete" id={column.id}>
                            {clickdiff == "default" && <UnfoldMoreIcon onClick={sortedByDiffAsc} />}
                            {clickdiff == "up" && <KeyboardArrowUpIcon onClick={sortedByDiffDesc} />}
                            {clickdiff == "down" && <KeyboardArrowDownIcon onClick={sortedByDiffAsc} />}</IconButton>
                        }
                        {column.label == "Status" && <IconButton aria-label="delete" id={column.id}>
                            {clickstatus == "default" && <UnfoldMoreIcon onClick={sortedByAsc} />}
                            {clickstatus == "up" && <KeyboardArrowUpIcon onClick={sortedByDesc} />}
                            {clickstatus == "down" && <KeyboardArrowDownIcon onClick={sortedByAsc} />}</IconButton>
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? quests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : quests
                  ).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row" style={{ width: 20, border:'1px solid rgb(245,245,245)' }} align="center">
                        {row.id}
                      </TableCell>
                      <TableCell style={{ width: 250, fontSize:'18px', color:'blue', border:'1px solid rgb(245,245,245)' }} align="center">
                        <Link to={`/questions/${row.id}`}>{row.question_name}</Link>
                        {row.is_premium == true &&
                          <Button variant='contained' size='small' color='success' sx={{marginLeft:'5px'}}>Premium</Button>
                        }
                      </TableCell>
                      <TableCell style={{ width: 120, border:'1px solid rgb(245,245,245)' }} align="center">
                        {row.difficulty}
                      </TableCell>
                      <TableCell style={{ width: 100, border:'1px solid rgb(245,245,245)' }} align="center">
                        {row.user_submission_status}
                      </TableCell>
                      <TableCell style={{ width: 120, border:'1px solid rgb(245,245,245)'}} align="center">
                        {row.tags.map((tag)=> (
                          <Button size='small' variant='outlined' sx={{padding:'0px', marginRight:'1px'}}>{tag.name}</Button>
                        ))}
                      </TableCell>
                      <TableCell style={{ width: 80, border:'1px solid rgb(245,245,245)' }} align="center">
                        {userinfo.is_staff == false && userinfo.is_superuser == false ?
                          <div>
                            <IconButton aria-label="edit" size="small" color="primary" sx={{margin:'10px'}} disabled>
                              <Link to={`/question/edit/${row.id}`}><ModeIcon fontSize="inherit" /></Link>
                            </IconButton>
                            <IconButton aria-label="delete" size="small" color="error" disabled>
                              <DeleteIcon onClick={() => deleteQuestion(row.id)} fontSize="inherit" />
                            </IconButton>
                          </div>
                          :
                          <div>
                            <IconButton aria-label="edit" size="small" color="primary" sx={{margin:'10px'}}>
                              <Link to={`/question/edit/${row.id}`}><ModeIcon fontSize="inherit" /></Link>
                            </IconButton>
                            <IconButton aria-label="delete" size="small" color="error">
                              <DeleteIcon onClick={() => deleteQuestion(row.id)} fontSize="inherit" />
                            </IconButton>
                          </div>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              sx={{minWidth:'850px', width:'100%', float:'right', backgroundColor:'rgb(244,244,244)'}}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={questions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </Paper>
        </div>
      </div>
      <FooterGray />
    </div>
  )
}