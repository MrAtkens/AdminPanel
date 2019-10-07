import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Slide } from 'react-reveal';
import MaterialTable from 'material-table';
import ChipInput from 'material-ui-chip-input';
import CancelIcon from '@material-ui/icons/Cancel';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import { Button, Dialog, DialogActions, DialogTitle, IconButton, TextField, DialogContent, InputAdornment, MenuItem, Grid } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css';

import { fetchProducts, addProduct, editProduct, deleteProduct } from '../../actions'
import avaibleList from './avaibilityList'

const URL = 'http://localhost:3444/notmultiple'

class ProductTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
        isEditOpen: false,
        isAddOpen: false,
        product: {},
        isAvaible: '',
        editorState: null
    };

  }

  changeIsAvaible = e => {
    this.setState({isAvaible: e.target.value});
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }


  handleIsEditOpen = (data) => {
    if(this.state.isEditOpen === false){
      this.setState({ isEditOpen: true })
      this.setState({ product: data })
      this.setState({ isAvaible: data.isAvaible })
      const contentBlock = htmlToDraft(data.fullDescription);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const data = EditorState.createWithContent(contentState);
        this.setState({editorState: data})
      }
    }
    else{
      this.setState({ product: {} })
      this.setState({ isAvaible: null })
      this.setState({ isEditOpen: false })
    }
  }

  handleIsAddOpen = () => {
    if(this.state.isAddOpen === false){
      this.setState({ isAddOpen: true })
      this.setState({ product: {
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
        price: 0,
        stockPrice: 0,
        isAvaible: '',
        categories: []
      }})
      const contentState = EditorState.createEmpty()
      this.setState({editorState: contentState})
    }
    else
      this.setState({ isAddOpen: false })
  }

  handleEdit = () => {
    const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    const product = this.state.product
    product.fullDescription = markup
   
    product.name = this.inputName.value
    product.price = this.inputPrice.value
    product.stockPrice = this.inputStockPrice.value
    product.description = this.inputDescription.value
    product.mainImage.alt = this.inputAlt.value
    product.isAvaible = this.state.isAvaible

    this.props.editProduct(this.state.product._id, product)
  }

  handleAdd = () => {
    const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    const product = this.state.product
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

  componentWillMount(){
      this.props.fetchProducts()
  }

  render(){
    const { editorState, product, isAvaible } = this.state;
    return(
   <div>
    <Slide top duration={1300}>
      <MaterialTable
          title="Таблица Продуктов"
          columns={[
            { title: 'Картинка', field: 'mainImage', render: rowData => <img src={rowData.mainImage.image} alt={rowData.mainImage.alt} style={{width: 100}}/> },
            { title: 'Индекс продукта', field: '_id', editable: 'never' },
            { title: 'Имя', field: 'name' },
            { title: 'Цена', field: 'price' },
            { title: 'Скидочна цена', field: 'stockPrice' },
            { title: 'Наличия', field: 'isAvaible' },
            { title: 'Кол/Купленных', field: 'count'}
          ]}
          data={this.props.products}
          options={{
            exportButton: true,
            actionsColumnIndex: -1,
          }}
          detailPanel={[
              {
                tooltip: 'Показать всю информацию',
                render: rowData => {
                  return (
                    <div
                      style={{
                        fontSize: 16,
                        marginLeft: 20,
                        textAlign: "center",
                        color: 'black' }}>
                      {rowData.description} 
                    </div>
                  )}
              }
          ]}
          localization={{
            pagination: {
                labelDisplayedRows: '{от}-{до} из {количество}',
                labelRowsSelect: 'строк',
                labelRowsPerPage: 'Строк в страницы',
                firstTooltip: 'Первая страница',
                firstAriaLabel: 'Первая страница',
                previousTooltip: 'Предыдущая страница',
                nextTooltip: 'Следующая страница',
                lastTooltip: 'Последняя страница',
            },
            toolbar: {
                nRowsSelected: '{0} строк выбрано',
                addRemoveColumns: 'Добавить или удалить столбцы',
                showColumnsTitle: 'Показать столбцы',
                showColumnsAriaLabel: 'Показать столбцы',
                exportTitle: 'Экспорт',
                exportName: 'Экспорт в CSV',
                searchPlaceholder: 'Поиск',
                searchTooltip: 'Поиск'
            },
            header: {
                actions: 'Операций'
            },
            body: {
                emptyDataSourceMessage: 'Нет записей для вывода',
                filterRow: {
                    filterTooltip: 'Фильтр'
                },
                addTooltip: 'Добавить',
                editTooltip: 'Изменить',
                deleteTooltip: 'Удалить',
                editRow: {
                  deleteText: 'Вы уверенны что хотите удалить эту строку',
                  cancelTooltip: 'Отменить',
                  saveTooltip: 'Сохранить'  
                },

            }
        }}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Изменить',
            onClick: (event, rowData) => this.handleIsEditOpen(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Добавить товар',
            isFreeAction: true,
            onClick: (event) => this.handleIsAddOpen()
          }
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise(resolve => {
              resolve();
              this.props.deleteProduct(oldData._id) 
            })
        }}
        />
    </Slide>

      {/* Dialogs and Toasts  */}
      {this.state.isEditOpen ? <Dialog open={this.state.isEditOpen} onClose={this.handleIsEditOpen} aria-labelledby="editor-dialog-title" fullScreen={true}>
        <DialogTitle>
          <IconButton    
            aria-label="Закрыть"
            onClick={this.handleIsEditOpen}
            className="buttonCancel"
            edge="start">
            <CancelIcon />
          </IconButton>
          <TextField name="name" label="Название" variant="outlined"  margin="normal"
          fullWidth
          defaultValue={product.name}
          inputRef={inputName => this.inputName = inputName}/>
        </DialogTitle>
        <DialogContent>
          <Grid>
            <TextField name="price" label="Цена в тг" className="price-field" variant="outlined" margin="normal"
            inputRef={inputPrice => this.inputPrice = inputPrice}
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
              editorClassName="editor-class"
              onEditorStateChange={this.onEditorStateChange}/>
          </Grid>
          <TextField name="alt" label="Имя картинки" fullWidth variant="outlined" margin="normal"
            inputRef={(inputAlt) => this.inputAlt = inputAlt}
            defaultValue={product.mainImage.alt}/>
          <Grid className="block-uploader" container spacing={3}>
            <Grid className="image-uploader" item xs={3}>
              <ImagesUploader url={URL} optimisticPreviews multiple={false}
                image={this.state.product.mainImage.zoomImage}
                onLoadEnd={(err, data) => {
                  this.setState({product:{...this.state.product, mainImage:{...this.state.product.mainImage, zoomImage: data}}}); 
                }}
                label="Загрузка увеличенной картинки 1280x1280"/>
            </Grid>
            <Grid className="image-uploader" item xs={3}>
              <ImagesUploader url={URL} optimisticPreviews multiple={false}
                image={this.state.product.mainImage.image}
                className="image-uploader"
                onLoadEnd={(err, data) => {
                  this.setState({product:{...this.state.product, mainImage:{...this.state.product.mainImage, image: data}}}); 
                }}
                label="Загрузка подробной картинки 570x570"/>
            </Grid>
            <Grid className="image-uploader" item xs={3}>
              <ImagesUploader url={URL} optimisticPreviews multiple={false}
                image={this.state.product.mainImage.smallImage}
                className="image-uploader"
                onLoadEnd={(err, data) => {
                  this.setState({product:{...this.state.product, mainImage:{...this.state.product.mainImage, smallImage: data}}}); 
                }}
                label="Загрузка витринной картинки 324x324"/>
            </Grid>
            <Grid className="image-uploader" item xs={3}>
              <ImagesUploader url={URL} optimisticPreviews multiple={false}
                image={this.state.product.mainImage.cartImage}
                className="image-uploader"
                onLoadEnd={(err, data) => {
                  this.setState({product:{...this.state.product, mainImage:{...this.state.product.mainImage, cartImage: data}}}); 
                }}
                label="Загрузка корзинной картинки 82x82"/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleIsEditOpen} color="primary">
            Отменить
          </Button>
          <Button onClick={this.handleEdit} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog> : null}     
      {/* Add Dialog */}
      {this.state.isAddOpen ? <Dialog open={this.state.isAddOpen} onClose={this.handleIsAddOpen} aria-labelledby="editor-dialog-title" fullScreen={true}>
        <DialogTitle>
          <IconButton    
            aria-label="Закрыть"
            onClick={this.handleIsAddOpen}
            className="buttonCancel"
            edge="start">
            <CancelIcon />
          </IconButton>
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
            defa={product.stockPrice}
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
              editorClassName="editor-class"
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
          <Button onClick={this.handleIsAddOpen} color="primary">
            Отменить
          </Button>
          <Button onClick={this.handleAdd} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>: null}     
      <ToastContainer
      position={'bottom-left'}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover/>   
    </div>
      );
  }
}

const mapStateToProps = store => {
    return {
      products: store.productsReducer.products
    }
  }

const mapDispatchToProps = {
    fetchProducts,
    addProduct,
    editProduct,
    deleteProduct
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(ProductTable)