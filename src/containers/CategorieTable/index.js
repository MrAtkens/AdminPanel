import React,{Component} from 'react'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import { fetchCategories, addCategorie, deleteCategorie } from '../../actions'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
 
class CategorieGrid extends Component {
  constructor(props) {
    super(props);

    this.tableRef = React.createRef();
  }

  state={
    categories: this.props.categories,
  }

  componentDidMount(){
      this.props.fetchCategories()
  }

  render(){
    return(
   <div>
    <MaterialTable
        title="Таблица Категорий"
        tableRef={this.tableRef}
        columns={[
          { title: 'Индекс категорий', field: '_id', editable: 'never' },
          { title: 'Категория', field: 'name' },
          { title: 'Номер категорий', field: 'idCategorie', type: 'numeric' },
        ]}
        data={this.props.categories}
        icons={tableIcons}
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
      actions={[
        {
          icon: 'refresh',
          tooltip: 'Refresh Data',
          isFreeAction: true,
          onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
        }
      ]}
        editable={{
          onRowAdd: newData =>
          new Promise(resolve => {
            resolve();
            this.props.addCategorie(newData)  
         }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.categories];
                data[data.indexOf(oldData)] = newData;
                this.setState({ ...this.state, data });
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
                resolve();
                this.props.deleteCategorie(oldData._id) 
            }),
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
        categories: store.categoriesReducer.categories
    }
  }

const mapDispatchToProps = {
    fetchCategories,
    addCategorie,
    deleteCategorie
}

  export default connect(
    mapStateToProps, mapDispatchToProps
  )(CategorieGrid)