import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Slide } from 'react-reveal';
import MaterialTable from 'material-table';

import { deleteProduct, transferProductToAnotherPage } from '../../actions'

class ProductsTable extends Component {

  state = {
    redirectToProductEditId: "",
    redirectToProductAddId: false
  }

  editProduct = (data) => {
    this.props.transferProductToAnotherPage(data);
    this.setState({redirectToProductEditId: data._id})
  }

  addProduct = () => {
    this.setState({redirectToProductAddId: true})
  }

  render(){
    if(this.state.redirectToProductEditId !== ""){
      return (<Redirect to={`productEdit/${this.state.redirectToProductEditId}`}/>)
    }
    if(this.state.redirectToProductAddId === true){
      return(<Redirect to={`productAdd`}/>)
    }
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
            { title: 'Кол/Купленных', field: 'count'},
            { title: 'Популярный', field: 'isPopular', render: rowData => {
              if(rowData.isPopular){
                return "В популярных"
              }
              else{
                return "Не в популярных"
              }
            }}
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
            onClick: (event, rowData) => this.editProduct(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Добавить товар',
            isFreeAction: true,
            onClick: (event) => this.addProduct()
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
    </div>
      );
  }
}

const mapStateToProps = store => {
    return {
      products: store.productsReducer.products,
      status: store.productsReducer.status
    }
  }

const mapDispatchToProps = {
    deleteProduct,
    transferProductToAnotherPage
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(ProductsTable)