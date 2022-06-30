import React from 'react';
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
  Pagination,
} from 'react-crud-table';
import './ArticlesTable.css';


const DescriptionRenderer = ({ field }) => <textarea {...field} />;

let tasks = [
  {
    id: 1,
    Tanggal:"22",
    judul: 'Create an example',
    author:"Radema",
    Topik:"HTML",
    Kategori:"Pemula"
  },
  {
    id: 2,
    Tanggal:"222",
    judul: 'Create an example',
    author:"Radema",
    Topik:"HTML",
    Kategori:"Pemula",
  },
  {
    id: 3,
    Tanggal:"222",
    judul: 'Create an example',
    author:"Radema",
    Topik:"HTML",
    Kategori:"Pemula",
  },
];

const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === 'id') {
    sorter = data.direction === 'ascending' ?
      SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter = data.direction === 'ascending' ?
      SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};


let count = tasks.length;
const service = {
    fetchItems: payload => {
        const { activePage, itemsPerPage } = payload.pagination;
        const start = (activePage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        let result = Array.from(tasks);
        result = result.sort(getSorter(payload.sort));
        return Promise.resolve(result.slice(start, end));
      },
  create: (task) => {
    count += 1;
    tasks.push({
      ...task,
      id: count,
    });

    return Promise.resolve(task);
  }, fetchTotal: payload => {
    return Promise.resolve(tasks.length);
  },
  update: (data) => {
    const task = tasks.find(t => t.id === data.id);
    task.Tanggal = data.Tanggal;
    task.judul = data.judul;
    task.author = data.author;
    task.Topik = data.Topik;
    task.Kategori = data.Kategori;
    return Promise.resolve(task);
  },
  delete: (data) => {
    const task = tasks.find(t => t.id === data.id);
    tasks = tasks.filter(t => t.id !== task.id);
    return Promise.resolve(task);
  },
};

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const ArticleTable = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Tabel Artikel"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field
          name="id"
          label="Id"
          hideInCreateForm
          readOnly
        />
         <Field
          name="Tanggal"
          label="Tanggal"
          placeholder="Tanggal"
        />
        
        <Field
          name="judul"
          label="Judul"
          placeholder="Title"
        />
        <Field
          name="author"
          label="Author"
          render={DescriptionRenderer}
        />
        <Field
          name="Topik"
          label="Topik"
          placeholder="Topik"
        />
         <Field
          name="Kategori"
          label="Kategori"
          placeholder="Kategori"
          
        />
      </Fields>

      <Pagination  color="primary"
        itemsPerPage={2}
        fetchTotalOfItems={payload => service.fetchTotal(payload)}
      />

      <CreateForm
        title="Article Creation"
        message="Create a new Article!"
        trigger="Create Article"
        onSubmit={task => service.create(task)}
        submitText="Create"
        validate={(values) => {
          const errors = {};
          if (!values.Tanggal) {
            errors.Tanggal = 'Please, provide task\'s Tanggal';
          }

          if (!values.judul) {
            errors.judul = 'Please, provide task\'s judul';
          }
          if (!values.author) {
            errors.author = 'Please, provide task\'s author';
          }
          if (!values.Topik) {
            errors.Topik = 'Please, provide task\'s Topik';
          }
          if (!values.Kategori) {
            errors.Kategori = 'Please, provide task\'s Kategori';
          }


          return errors;
        }}
      />

      <UpdateForm
        title="Task Update Process"
        message="Update task"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
        validate={(values) => {
          const errors = {};

          if (!values.id) {
            errors.id = 'Please, provide id';
          }

          if (!values.Tanggal) {
            errors.Tanggal = 'Please, provide task\'s Tanggal';
          }

          if (!values.judul) {
            errors.judul = 'Please, provide task\'s judul';
          }
          if (!values.author) {
            errors.author = 'Please, provide task\'s author';
          }
          if (!values.Topik) {
            errors.Topik = 'Please, provide task\'s Topik';
          }
          if (!values.Kategori) {
            errors.Kategori = 'Please, provide task\'s Kategori';
          }

          return errors;
        }}
      />

      <DeleteForm
        title="Task Delete Process"
        message="Are you sure you want to delete the task?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
        validate={(values) => {
          const errors = {};
          if (!values.id) {
            errors.id = 'Please, provide id';
          }
          return errors;
        }}
      />
    </CRUDTable>
  </div>
);

ArticleTable.propTypes = {};

export default ArticleTable;


