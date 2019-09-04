import React,{Component} from 'react'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MaterialTable from 'material-table';

import { fetchProducts, deleteProduct } from '../../actions'
 
class ProductTable extends Component {

  componentDidMount(){
      this.props.fetchProducts()
  }

  render(){
    return(
   <div>
    <MaterialTable
        title="Таблица Продуктов"
        columns={[
          { title: 'Avatar', field: 'mainImage', render: rowData => <img src={rowData.mainImage.image} style={{width: 100, borderRadius: '50%'}}/> },
          { title: 'Индекс продукта', field: '_id', editable: 'never' },
          { title: 'Имя', field: 'name' },
          { title: 'Цена', field: 'price' },
          { title: 'Скидочна цена', field: 'stockPrice' },
          { title: 'Наличия', field: 'isAvaible' },
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
                      fontSize: 24,
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
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            resolve();
            this.props.addCategorie(newData)  
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            resolve();
            this.props.editCategorie(oldData._id, newData) 
          }),
        onRowDelete: (oldData) =>
          new Promise(resolve => {
            resolve();
            this.props.deleteProduct(oldData._id) 
          })
      }}
      />
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
    deleteProduct
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(ProductTable)