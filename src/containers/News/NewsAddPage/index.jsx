import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Slide } from 'react-reveal';
import CancelIcon from '@material-ui/icons/Cancel';
import draftToHtml from 'draftjs-to-html';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import { Button, Dialog, DialogActions, DialogTitle, TextField, DialogContent, Grid } from '@material-ui/core';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css';

import { addNews } from '../../../actions'

const URL = 'http://localhost:3444/notmultiple'



class NewsEditPage extends Component {

   state = {
        news: {
            name: '',
            title: '',
            priority: 0,
            creationDate: Date,
            titleImage: '',
            alt: '',
            description: ''
        },
        editorState: EditorState.createEmpty()
    };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleAdd = () => {
    const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    let news = this.state.news
    news.fullDescription = markup
   
    news.name = this.inputName.value
    news.priority = this.inputPriority.value
    news.title = this.inputTitle.value
    news.description = markup
    news.creationDate = this.inputDate.value
    news.alt = this.inputAlt.value

    this.props.addNews(news)
  }
  

  render(){
    const { editorState, news } = this.state;
    return(
   <div>
    <Slide top duration={1300}>
    <Dialog open={true} aria-labelledby="editor-dialog-title" fullScreen={true}>
    <DialogTitle>
            <Link to="/news" className={'textDecNone'}>
                <CancelIcon />
            </Link>
          <TextField name="name" label="Название" variant="outlined"  margin="normal"
          fullWidth defaultValue={news.name}
          inputRef={inputName => this.inputName = inputName}/>
        </DialogTitle>
        <DialogContent>
          <Grid>
            <TextField name="priority" label="Приоритет" variant="outlined" margin="normal" className="price-field"
            inputRef={(inputPriority) => this.inputPriority = inputPriority}
            type="number"
            defaultValue={news.priority} />

            <TextField name="title" label="Загаловак" rows="6" variant="outlined" margin="normal" className="price-field"
            inputRef={(inputTitle) => this.inputTitle = inputTitle}
            defaultValue={news.title} />

            <TextField name="creationDate" label="Дата публикаций" variant="outlined" margin="normal" className="price-field"
            inputRef={(inputDate) => this.inputDate = inputDate}
            type="date-local"/>
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
            defaultValue={news.alt}/>
          <Grid className="block-uploader" container>
            <Grid className="image-uploader" item xs={12}>
              <ImagesUploader url={URL} optimisticPreviews multiple={false}
                image={this.state.news.titleImage}
                onLoadEnd={(err, data) => {
                  this.setState({news:{...this.state.news, titleImage: this.state.titleImage}}); 
                }}
                label="Загрузка увеличенной картинки 1280x1280"/>
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
    </Slide>
    </div>
      );
  }
}

const mapStateToProps = store => {
    return {
      news: store.newssReducer.news,
      status: store.newssReducer.status
    }
  }

const mapDispatchToProps = {
    addNews,
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(NewsEditPage)