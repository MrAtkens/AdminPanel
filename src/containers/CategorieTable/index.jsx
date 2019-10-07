import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Slide } from 'react-reveal'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MaterialTable from 'material-table';

import { fetchCategories, addCategorie, editCategorie, deleteCategorie } from '../../actions'

 
class CategorieTable extends Component {

  state={
    categories: this.props.categories
  }

  componentWillMount(){
      this.props.fetchCategories()
  }

  render(){
    return(
   <div>
    <Slide top duration={1300}>
      <MaterialTable
          title="Таблица Категорий"
          columns={[
            { title: 'Индекс категорий', field: '_id', editable: 'never' },
            { title: 'Категория', field: 'name' },
            { title: 'Номер категорий', field: 'idCategorie', type: 'numeric' },
          ]}
          data={this.props.categories}
          options={{
            exportButton: true,
            actionsColumnIndex: -1,
          }}
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
                this.props.deleteCategorie(oldData._id) 
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
        categories: store.categoriesReducer.categories
    }
  }

const mapDispatchToProps = {
    fetchCategories,
    addCategorie,
    editCategorie,
    deleteCategorie
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(CategorieTable)