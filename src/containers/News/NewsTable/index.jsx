import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Slide } from 'react-reveal';
import MaterialTable from 'material-table';

import { deleteNews, transferNewsToAnotherPage } from '../../../actions'

class NewsTable extends Component {

  state = {
    redirectToNewsEditId: "",
    redirectToNewsAddId: false
  }

  editNews = (data) => {
    this.props.transferNewsToAnotherPage(data);
    this.setState({redirectToNewsEditId: data._id})
  }

  addNews = () => {
    this.setState({redirectToNewsAddId: true})
  }

  render(){
    if(this.state.redirectToNewsEditId !== ""){
      return (<Redirect to={`newsEdit/${this.state.redirectToNewsEditId}`}/>)
    }
    if(this.state.redirectToNewsAddId === true){
      return(<Redirect to={`newsAdd`}/>)
    }
    return(
   <div>
    <Slide top duration={1300}>
      <MaterialTable
          title="Таблица Продуктов"
          columns={[
            { title: 'Картинка', field: 'titleImage', render: rowData => <img src={rowData.titleImage} alt={rowData.alt} style={{width: 100}}/> },
            { title: 'Индекc новости', field: '_id', editable: 'never' },
            { title: 'Имя', field: 'name' },
            { title: 'Заголовок', field: 'title' },
            { title: 'Приоритет', field: 'priority' },
          ]}
          data={this.props.news}
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
                      {rowData.title} 
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
            onClick: (event, rowData) => this.editNews(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Добавить товар',
            isFreeAction: true,
            onClick: (event) => this.addNews()
          }
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise(resolve => {
              resolve();
              this.props.deleteNews(oldData._id) 
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
      news: store.newsReducer.news,
      status: store.newsReducer.status
    }
  }

const mapDispatchToProps = {
    deleteNews,
    transferNewsToAnotherPage
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(NewsTable)