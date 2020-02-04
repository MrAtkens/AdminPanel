import React,{Component} from 'react'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MaterialTable from 'material-table';
import { Slide } from 'react-reveal'

import { fetchMails, deleteSelectedMails } from '../../actions'
 
class MailsTable extends Component {

  state={
    mails: this.props.mails
  }

  componentDidUpdate(prevProps) {
    // Популярный пример (не забудьте сравнить пропсы):
    if (this.props.status !== prevProps.status) {
      if(this.props.status === true){
        this.props.fetchMails()
      }
    }
  }

  render(){
    return(
   <div>
    <Slide top duration={1300}>
      <MaterialTable
          title="Таблица Письм"
          columns={[
            { title: 'Индекс письма', field: '_id', editable: 'never' },
            { title: 'Email', field: 'email' },
            { title: 'Имя', field: 'name' },
            { title: 'Телефон', field: 'phone'},
          ]}
          detailPanel={[
              {
                tooltip: 'Показать сообщение',
                render: rowData => {
                  return (
                    <div
                      style={{
                        fontSize: 24,
                        marginLeft: 20,
                        color: 'black' }}>
                      {rowData.message} 
                    </div>
                  )}
              }
          ]}
          data={this.props.mails}
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
              tooltip: 'Удалить все выбранные письма',
              icon: 'delete',
              onClick: (evt, ids) => this.props.deleteSelectedMails(ids)
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
        mails: store.mailsRedurcer.mails,
        status: store.mailsRedurcer.status
    }
  }

const mapDispatchToProps = {
    fetchMails,
    deleteSelectedMails
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(MailsTable)