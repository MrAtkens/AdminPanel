import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Slide } from 'react-reveal'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MaterialTable from 'material-table';

import { fetchUsers, deleteSelectedUsers } from '../../actions'
 
class UserTable extends Component {

  componentWillMount(){
      this.props.fetchUsers()
  }

  render(){
    return(
   <div>
    <Slide top duration={1300}>
      <MaterialTable
          title="Таблица Пользователя"
          columns={[
            { title: 'Индекс пользователя', field: '_id', editable: 'never' },
            { title: 'Имя', field: 'name' },
            { title: 'Телефон', field: 'phone' },
            { title: 'Email', field: 'email' },
            { title: 'Город', field: 'city' }
          ]}
          data={this.props.users}
          options={{
            exportButton: true,
            actionsColumnIndex: -1,
            selection: true
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
        actions={[
          {
              tooltip: 'Удалить всех выбранных пользователей',
              icon: 'delete',
              onClick: (evt, ids) => this.props.deleteSelectedUsers(ids)
          }
        ]}
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
      users: store.usersReducer.users
    }
  }

const mapDispatchToProps = {
    fetchUsers,
    deleteSelectedUsers
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(UserTable)