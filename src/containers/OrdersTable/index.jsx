import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Slide } from 'react-reveal'
import MaterialTable from 'material-table';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchOrders, acceptOrder, deleteOrder } from '../../actions'
 
class OrdersTable extends Component {

  componentWillMount(){
      this.props.fetchOrders()
  }

  componentDidUpdate(prevProps) {
    // Популярный пример (не забудьте сравнить пропсы):
    if (this.props.status !== prevProps.status) {
      if(this.props.status === true){
        this.props.fetchOrders()
      }
    }
  }

  render(){
    return(
   <div>
      <Slide top duration={1300}>
        <MaterialTable
            title="Таблица Заказов"
            columns={[
              { title: 'Индекс продукта', field: '_id', editable: 'never' },
              { title: 'Имя', field: 'name' },
              { title: 'Email', field: 'email' },
              { title: 'Город', field: 'city' },
              { title: 'Телефон', field: 'phone' },
              { title: 'Цена', field: 'orderPrice'}
            ]}
            data={this.props.orders}
            options={{
              exportButton: true,
              actionsColumnIndex: -1,
            }}
            detailPanel={[
                {
                  tooltip: 'Показать всю информацию',
                  render: rowData => {
                    return (
                        <MaterialTable
                        title="Таблица Продуктов"
                        columns={[
                            { title: 'Avatar', field: 'mainImage', render: product => <img src={product.mainImage.image} alt={product.mainImage.alt} style={{width: 100}}/> },
                            { title: 'Индекс продукта', field: '_id', editable: 'never' },
                            { title: 'Имя', field: 'name' },
                            { title: 'Цена', field: 'price' },
                            { title: 'Скидочна цена', field: 'stockPrice' },
                            { title: 'Наличия', field: 'isAvaible' },
                            { title: 'Кол/Купленных', field: 'count'}
                        ]}
                        data={rowData.orderProducts}
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
                      />
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
            rowData => ({
              icon: 'check',
              tooltip: 'Подтвердить заказ',
              onClick: (event, rowData) => (this.props.acceptOrder(rowData).then(this.props.deleteOrder(rowData._id)))
            })
          ]}
          editable={{
            onRowDelete: (oldData) =>
              new Promise(resolve => {
                resolve();
                this.props.deleteOrder(oldData._id) 
              })
          }}
          />
      </Slide>
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
        orders: store.ordersReducer.orders,
        status: store.ordersReducer.status
    }
  }

const mapDispatchToProps = {
    fetchOrders,
    acceptOrder,
    deleteOrder,
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(OrdersTable)