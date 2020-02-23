import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import CancelIcon from '@material-ui/icons/Cancel';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import ImagesUploader from 'react-images-uploader';
import DateFnsUtils from '@date-io/date-fns';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import { Button, Dialog, DialogActions, DialogTitle, TextField, DialogContent, Grid, CircularProgress } from '@material-ui/core';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

import { editNews, fetchNewsById } from '../../../actions'

const URL = 'http://localhost:3444/notmultiple'



class NewsEditPage extends Component {

  state = {
    blog: {},
    editorState: EditorState.createEmpty()
  };

  componentDidMount(){
    const url = window.location.href
    const id = url.substring(31)
    this.props.fetchNewsById(id)
  }

  componentDidUpdate(prevProps){
    if(this.props.blog !== prevProps.blog){
      const contentBlock = htmlToDraft(this.props.blog.description);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const data = EditorState.createWithContent(contentState);
      this.setState({editorState: data, blog: this.props.blog});
    }
  }


  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleEdit = () => {
    const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    let blog = this.state.blog
    blog.fullDescription = markup
    blog.name = this.inputName.value
    blog.priority = this.inputPriority.value
    blog.title = this.inputTitle.value
    blog.description = markup
    blog.alt = this.inputAlt.value
    this.props.editNews(this.state.blog._id, blog)
  }

  dateChange = date => {
    this.setState({blog:{...this.state.blog, creationDate: date}}); 
  }  

  render(){
    const { blog } = this.props
    const editorState = this.state.editorState
    if(this.props.status === Boolean){
      return(<CircularProgress style={{position: "absolute", right: "50%", bottom: "50%"}}/>)
    }
    return(
   <div>
    <Fade>
    <Dialog open={true} aria-labelledby="editor-dialog-title" fullScreen={true}>
    <DialogTitle>
            <Link to="/news" className={'textDecNone'}>
                <CancelIcon />
            </Link>
          <TextField name="name" label="Название" variant="outlined"  margin="normal"
          fullWidth defaultValue={blog.name}
          inputRef={inputName => this.inputName = inputName}/>
        </DialogTitle>
        <DialogContent>
          <Grid>
            <TextField name="priority" label="Приоритет" variant="outlined" margin="normal" className="price-field"
            inputRef={(inputPriority) => this.inputPriority = inputPriority}
            type="number"
            defaultValue={blog.priority} />

            <TextField name="description" label="Заголовак" multiline variant="outlined" margin="normal"
            rows="5"
            inputRef={(inputTitle) => this.inputTitle = inputTitle}
            fullWidth
            defaultValue={blog.title}/>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Дата публикаций"
              format="MM/dd/yyyy"
              onChange={this.dateChange}
              value={this.state.blog.creationDate}
              KeyboardButtonProps={{
                'aria-label': 'Дата публикаций',
              }}/>
            </MuiPickersUtilsProvider>

            
          </Grid>

          <Grid className="text-editor">
            <Editor
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              placeholder = "Основное текст статьи, здесь можно писать всё что угодно ..."
              onEditorStateChange={this.onEditorStateChange}/>
          </Grid>

          <TextField name="alt" label="Имя картинки" fullWidth variant="outlined" margin="normal"
            inputRef={(inputAlt) => this.inputAlt = inputAlt}
            defaultValue={blog.alt}/>
          <Grid className="block-uploader" container>
            <Grid className="image-uploader" item xs={12}>
              <ImagesUploader url={URL} optimisticPreviews multiple={false}
                image={blog.titleImage}
                onLoadEnd={(err, data) => {
                  this.setState({blog:{...this.state.blog, titleImage: data}}); 
                }}
                label="Загрузка картинки рекомендуемые размеры 1000x700"/>
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Link to="/news" className={'textDecNone'}>
            <Button color="primary">
                Отменить
            </Button>
          </Link>
          <Button onClick={this.handleEdit} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>  
    </Fade>
    </div>
      );
  }
}

const mapStateToProps = store => {
    return {
      blog: store.newsReducer.blog,
      status: store.newsReducer.status
    }
  }

const mapDispatchToProps = {
    editNews,
    fetchNewsById
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(NewsEditPage)