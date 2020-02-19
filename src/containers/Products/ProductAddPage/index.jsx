import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Slide } from 'react-reveal';
import ChipInput from 'material-ui-chip-input';
import CancelIcon from '@material-ui/icons/Cancel';
import draftToHtml from 'draftjs-to-html';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import { Button, Dialog, DialogActions, DialogTitle, TextField, DialogContent, InputAdornment, MenuItem, Grid } from '@material-ui/core';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css';

import { addProduct } from '../../../actions'
import avaibleList from '../../avaibilityList'

const URL = 'http://localhost:3444/notmultiple'

const data = {
  mainImage: {
    zoomImage: '1.jpg',
    image: '1.jpg',
    smallImage: '1.jpg',
    cartImage: '1.jpg',
    alt: ''
  },
  _id: '',
  name: '',
  description: '',
  fullDescription: '',
  price: null,
  stockPrice: null,
  isAvaible: 'достаточно',
  categories: [],
  isPopular: false,
  contentState: EditorState.createEmpty()
}

class ProductAddPage extends Component {

    state = {
        product: data,
        isAvaible: data.isAvaible,
        isPopular: data.isPopular,
        editorState: EditorState.createEmpty()
    }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  changeIsAvaible = e => {
    this.setState({isAvaible: e.target.value});
  };
  
  changeIsPopular = e => {
    this.setState({isPopular: e.target.value});
  }


  handleAdd = () => {
    const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    let product = this.state.product
    product.fullDescription = markup
    product.name = this.inputName.value
    product.price = this.inputPrice.value
    product.stockPrice = this.inputStockPrice.value
    product.description = this.inputDescription.value
    product.mainImage.alt = this.inputAlt.value
    product.isAvaible = this.state.isAvaible
    this.props.addProduct(product)
  }
  
  handleAddChip = (chip) => {
    const data = this.state.product.categories
    data.push(chip)
    this.setState({product:{
      ...this.state.product,
      categories: data}
    });  
  }

  handleDeleteChip = (chip, index) => {
    const data = this.state.product.categories
    data.splice(index, 1)
    this.setState({product:{
      ...this.state.product,
      categories: data}
    }); 
  }

  render(){
    const { editorState, product, isAvaible, isPopular } = this.state;
    return(
   <div>
    <Slide top duration={1300}>
      <Dialog open={true} aria-labelledby="editor-dialog-title" fullScreen={true}>
        <DialogTitle>
            <Link to="/products" className={'textDecNone'}>
              <CancelIcon />
            </Link>
          <TextField name="name" label="Название" variant="outlined"  margin="normal"
          fullWidth
          defaultValue={product.name}
          inputRef={(inputName) => this.inputName = inputName}/>
        </DialogTitle>
        <DialogContent>
          <Grid>
            <TextField name="price" label="Цена в тг" className="price-field" variant="outlined" margin="normal"
            inputRef={(inputPrice) => this.inputPrice = inputPrice}
            type="number"
            defaultValue={product.price}
            InputProps={{
              endAdornment: <InputAdornment position="end">тг</InputAdornment>,
            }}/>
            <TextField name="stockPrice" label="Скидка в тг" variant="outlined" margin="normal" className="price-field"
            inputRef={(inputStockPrice) => this.inputStockPrice = inputStockPrice}
            type="number"
            defaultValue={product.stockPrice}
            InputProps={{
              endAdornment: <InputAdornment position="end">тг</InputAdornment>,
            }}/>
             <TextField select className="price-field" variant="outlined" label="Наличие" margin="normal"
            name="isAvaible"
            onChange={e => this.changeIsAvaible(e)}
            value={isAvaible}>
            {avaibleList.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
            </TextField>
            <TextField select className="price-field" variant="outlined" label="Популярность" margin="normal"
            name="isPopular"
            onChange={e => this.changeIsPopular(e)}
            value={isPopular}>
              <MenuItem value={true}>В популярных</MenuItem>
              <MenuItem value={false}>Не в популярных</MenuItem>
            </TextField>
          </Grid>
            <ChipInput value={product.categories} fullWidth label='Категорий' name="categories"
            onAdd={(chip) => this.handleAddChip(chip)}
            onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
            placeholder='Напишите категорию и нажмите на enter'/>
            <TextField name="description" label="Описание" multiline variant="outlined" margin="normal"
            rows="5"
            inputRef={(inputDescription) => this.inputDescription = inputDescription}
            fullWidth
            defaultValue={product.description}/>
          <Grid className="text-editor">
            <Editor
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              placeholder="Основное описание здесь можно писать всё что угодно ..."
              onEditorStateChange={this.onEditorStateChange}/>
          </Grid>
          <TextField name="alt" label="Имя картинки" fullWidth variant="outlined" margin="normal"
            inputRef={(inputAlt) => this.inputAlt = inputAlt}
            defaultValue={product.mainImage.alt}/>
          <Grid className="block-uploader" container spacing={3}>
            <Grid className="image-uploader" item xs={3}>
              <ImagesUploader url={URL} optimisticPreviews multiple={false}
                onLoadEnd={(err, data) => {
                  this.setState({product:{...this.state.product, mainImage:{...this.state.product.mainImage, zoomImage: data}}}); 
                }}
                label="Загрузка увеличенной картинки 1280x1280"/>
            </Grid>
            <Grid className="image-uploader" item xs={3}>
              <ImagesUploader url={URL} optimisticPreviews multiple={false}
                className="image-uploader"
                onLoadEnd={(err, data) => {
                  this.setState({product:{...this.state.product, mainImage:{...this.state.product.mainImage, image: data}}}); 
                }}
                label="Загрузка подробной картинки 570x570"/>
            </Grid>
            <Grid className="image-uploader" item xs={3}>
              <ImagesUploader url={URL} optimisticPreviews multiple={false}
                className="image-uploader"
                onLoadEnd={(err, data) => {
                  this.setState({product:{...this.state.product, mainImage:{...this.state.product.mainImage, smallImage: data}}}); 
                }}
                label="Загрузка витринной картинки 324x324"/>
            </Grid>
            <Grid className="image-uploader" item xs={3}>
              <ImagesUploader url={URL} optimisticPreviews multiple={false}
                className="image-uploader"
                onLoadEnd={(err, data) => {
                  this.setState({product:{...this.state.product, mainImage:{...this.state.product.mainImage, cartImage: data}}}); 
                }}
                label="Загрузка корзинной картинки 82x82"/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Link to="/products" className={'textDecNone'}>
            <Button color="primary">
              Отменить
            </Button>
          </Link>
          <Button onClick={this.handleAdd} color="primary">
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
      status: store.productsReducer.status
    }
  }

const mapDispatchToProps = {
  addProduct,
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(ProductAddPage)